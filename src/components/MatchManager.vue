<script setup>
  import { TransitionRoot, Listbox, ListboxOptions, ListboxOption, ListboxButton, ListboxLabel } from '@headlessui/vue';
  import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
  import { PhotographIcon, ChevronDownIcon, CheckIcon } from '@heroicons/vue/outline';
  import { format, parseISO } from 'date-fns';
  import { PlusIcon, MinusIcon, RefreshIcon } from '@heroicons/vue/solid';
  import Datepicker from 'vue3-date-time-picker';
  import 'vue3-date-time-picker/dist/main.css';
  import { supabase } from '../lib/supabase';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const loadingMatches = ref(true);
  const loadingTeams = ref(true);
  const loadError = ref('');
  const saveError = ref('');
  const matchesSubscription = ref(null);
  const teamsSubscription = ref(null);
  const goalsSubscription = ref(null);
  const showNewMatchForm = ref(false);
  const matches = ref([]);
  const teams = ref([]);
  const newMatchHostId = ref(null);
  const newMatchVisitorId = ref(null);
  const newMatchStart = ref(null);
  const newScore = ref({});
  const scoreInputs = ref({});
  const savingScore = ref(false);

  const saveNewMatch = async () => {
    saveError.value = '';
    try {
      let { error } = await supabase
        .from('match')
        .insert({
          matchday: route.params.matchday,
          host: newMatchHostId.value,
          visitor: newMatchVisitorId.value,
          match_dt: newMatchStart.value,
        })
        .single();
      if (error) {
        saveError.value = error.message;
      } else {
        cancelNewMatch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadMatches = async () => {
    loadError.value = '';
    loadingMatches.value = true;
    try {
      const { error, data: tempMatches } = await supabase
        .from('match')
        .select('id,matchday,host(id,name,logo),visitor(id,name,logo),match_dt,goals:goal(id,team_id,score_minute)')
        .eq('matchday', route.params.matchday)
        .order('match_dt', { ascending: true })
        .order('score_minute', { foreignTable: 'goal', ascending: true });
      if (error) {
        loadError.value = error.message;
      } else {
        matches.value = tempMatches.map(match => ({ ...match, match_dt: parseISO(match.match_dt) }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingMatches.value = false;
    }
  };

  onMounted(async () => {
    loadMatches();
    loadError.value = '';
    try {
      const { error, data: tempTeams } = await supabase
        .from('team')
        .select('id,name,logo')
        .eq('league', route.params.league);
      if (error) {
        loadError.value = error.message;
      } else {
        teams.value = tempTeams;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingTeams.value = false;
    }

    goalsSubscription.value = supabase
      .from('goal')
      .on('INSERT', payload => {
        const matchIndex = matches.value.findIndex(match => match.id === payload.new.match_id);
        if (matchIndex > -1) {
          matches.value[matchIndex].goals.push(payload.new);
        }
      })
      .on('DELETE', payload => {
        const matchIndex = matches.value.findIndex(match => match.id === payload.old.match_id);
        if (matchIndex > -1) {
          matches.value[matchIndex].goals = matches.value[matchIndex].goals.filter(goal => goal.id !== payload.old.id);
        }
      })
      .subscribe();

    matchesSubscription.value = supabase
      .from(`match:matchday=eq.${route.params.matchday}`)
      .on('INSERT', payload => {
        payload.new.host = teams.value.find(team => team.id === payload.new.host);
        payload.new.visitor = teams.value.find(team => team.id === payload.new.visitor);
        payload.new.match_dt = parseISO(payload.new.match_dt);
        payload.new.goals = [];
        matches.value.push(payload.new);
      })
      .on('UPDATE', async payload => {
        payload.new.host = teams.value.find(team => team.id === payload.new.host);
        payload.new.visitor = teams.value.find(team => team.id === payload.new.visitor);
        payload.new.match_dt = parseISO(payload.new.match_dt);
        payload.new.goals = await supabase
          .from('goal')
          .select('id,team_id,score_minute')
          .eq('match_id', payload.new.id);
        const index = matches.value.findIndex(match => match.id === payload.new.id);
        matches.value.splice(index, 1, payload.new);
      })
      .on('DELETE', payload => {
        const index = matches.value.findIndex(match => match.id === payload.old.id);
        matches.value.splice(index, 1);
      })
      .subscribe();

    teamsSubscription.value = supabase
      .from(`team:league=eq.${route.params.league}`)
      .on('INSERT', payload => {
        teams.value.push(payload.new);
      })
      .on('UPDATE', payload => {
        matches.value = matches.value.map(match => {
          if (match.host.id === payload.new.id) {
            match.host = payload.new;
          }
          if (match.visitor.id === payload.new.id) {
            match.visitor = payload.new;
          }
          return match;
        });
        const index = teams.value.findIndex(team => team.id === payload.new.id);
        teams.value.splice(index, 1, payload.new);
      })
      .on('DELETE', payload => {
        const index = teams.value.findIndex(team => team.id === payload.old.id);
        teams.value.splice(index, 1);
      })
      .subscribe();
  });

  onUnmounted(() => {
    supabase.removeSubscription(matchesSubscription.value);
    supabase.removeSubscription(teamsSubscription.value);
    supabase.removeSubscription(goalsSubscription.value);
  });

  const activateNewMatchForm = () => {
    newMatchHostId.value = null;
    newMatchVisitorId.value = null;
    showNewMatchForm.value = true;
  };
  const cancelNewMatch = () => {
    newMatchHostId.value = null;
    newMatchVisitorId.value = null;
    showNewMatchForm.value = false;
  };

  const newMatchHost = computed(() => {
    return newMatchHostId.value ? teams.value.find(team => team.id === newMatchHostId.value) : {};
  });
  const selectedTeams = computed(() => matches.value.map(match => [match.host.id, match.visitor.id]).flat());

  const filteredHostTeams = computed(() => {
    return teams.value.filter(team => !selectedTeams.value.includes(team.id) && team.id !== newMatchVisitorId.value);
  });

  const newMatchVisitor = computed(() => {
    return newMatchVisitorId.value ? teams.value.find(team => team.id === newMatchVisitorId.value) : {};
  });

  const filteredVisitorTeams = computed(() => {
    return teams.value.filter(team => !selectedTeams.value.includes(team.id) && team.id !== newMatchHostId.value);
  });

  const showNewScoreForm = (match, scorer) => {
    newScore.value = { match_id: match.id, team_id: match[scorer].id, score_minute: null };
    nextTick(() => {
      scoreInputs.value[match.id].focus();
    });
  };

  const reduceScore = async (match, scorer) => {
    const scorerGoals = match.goals.filter(goal => goal.team_id === match[scorer].id);
    await supabase
      .from('goal')
      .delete()
      .match({ id: scorerGoals[scorerGoals.length - 1].id });
  };

  const saveNewScore = async () => {
    savingScore.value = true;
    try {
      const { error, data: newScoreResult } = await supabase.from('goal').insert(newScore.value).single();
      if (error) {
        console.log(error);
      } else {
        newScore.value = {};
      }
    } catch (error) {
      console.log(error);
    } finally {
      savingScore.value = false;
    }
  };
</script>
<template>
  <div class="bg-white shadow rounded-lg divide-y divide-gray-200">
    <div class="px-2 py-3 sm:px-3">
      <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div class="ml-4 mt-2">
            <h3 class="text-lg leading-6 font-medium text-gray-900 my-1">
              Partidos Jornada {{ route.params.matchday }}
            </h3>
          </div>
          <div class="ml-4 mt-2 flex-shrink-0">
            <TransitionRoot
              :show="!showNewMatchForm"
              class="flex"
              enter="transition duration-150"
              enter-from="scale-0 opacity-0"
              enter-to="scale-100 opacity-100"
              leave="transition duration-150"
              leave-from="scale-100 opacity-100"
              leave-to="scale-0 opacity-0"
            >
              <button
                type="button"
                class="relative inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="activateNewMatchForm"
              >
                Añadir Partido
              </button>
              <button
                type="button"
                :class="[
                  'relative inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 h-full ml-1',
                  loadingMatches && 'pointer-events-none opacity-50',
                ]"
                :disabled="loadingMatches"
                @click="loadMatches"
              >
                <RefreshIcon class="h-4 w-4" />
              </button>
            </TransitionRoot>
          </div>
        </div>
      </div>
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-3">
        <li
          v-for="match in matches"
          :key="match.id"
          class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div class="flex flex-wrap">
            <div class="flex-1 flex flex-col py-1">
              <img
                class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
                :src="match.host.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
                :alt="match.host.name"
              />
              <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ match.host.name }}</h3>
            </div>
            <div class="flex-1 flex flex-col py-1">
              <img
                class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
                :src="match.visitor.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
                :alt="match.visitor.name"
              />
              <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ match.visitor.name }}</h3>
            </div>
            <div
              class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mx-auto w-full"
            >
              <div class="flex-1 flex justify-between sm:hidden w-full">
                <a
                  href="#"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Reducir
                </a>
                <a
                  href="#"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Añadir
                </a>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between w-full">
                <div class="w-full">
                  <nav class="relative z-0 inline-flex rounded-md mx-auto" aria-label="Pagination">
                    <button
                      :class="[
                        'relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 my-4',
                        match.goals.filter(goal => goal.team_id === match.host.id).length === 0 &&
                          'pointer-events-none opacity-50',
                      ]"
                      :disabled="match.goals.filter(goal => goal.team_id === match.host.id).length === 0"
                      @click="reduceScore(match, 'host')"
                    >
                      <span class="sr-only">Reducir Marcador</span>
                      <MinusIcon class="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span class="relative inline-flex items-center px-4 py-2 bg-white text-4xl font-bold text-gray-700">
                      {{ match.goals.filter(goal => goal.team_id === match.host.id).length }}
                    </span>
                    <button
                      class="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 my-4"
                      @click="showNewScoreForm(match, 'host')"
                    >
                      <span class="sr-only">Añadir Gol</span>
                      <PlusIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    <span class="relative inline-flex items-center px-4 py-2 bg-white text-xl font-bold text-gray-700">
                      -
                    </span>
                    <button
                      :class="[
                        'relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 my-4',
                        match.goals.filter(goal => goal.team_id === match.visitor.id).length === 0 &&
                          'pointer-events-none opacity-50',
                      ]"
                      :disabled="match.goals.filter(goal => goal.team_id === match.visitor.id).length === 0"
                      @click="reduceScore(match, 'visitor')"
                    >
                      <span class="sr-only">Reducir Marcador</span>
                      <MinusIcon class="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span class="relative inline-flex items-center px-4 py-2 bg-white text-4xl font-bold text-gray-700">
                      {{ match.goals.filter(goal => goal.team_id === match.visitor.id).length }}
                    </span>
                    <button
                      class="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 my-4"
                      @click="showNewScoreForm(match, 'visitor')"
                    >
                      <span class="sr-only">Añadir gol</span>
                      <PlusIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    <TransitionRoot
                      :show="!!newScore.match_id && newScore.match_id === match.id"
                      as="template"
                      enter="transition duration-150"
                      enter-from="-translate-y-full opacity-0"
                      enter-to="translate-y-0 opacity-100"
                      leave="transition duration-150"
                      leave-from="translate-y-0 opacity-100"
                      leave-to="-translate-y-full opacity-0"
                    >
                      <div
                        :class="[
                          'absolute top-0 w-full h-full bg-white shadow sm:rounded-lg py-2.5 flex items-center justify-between space-x-3 border',
                          newScore.team_id === match.visitor.id && 'flex-row-reverse',
                        ]"
                      >
                        <div class="min-w-0 flex-1 flex items-center space-x-2 h-full px-2">
                          <input
                            v-model="newScore.score_minute"
                            :ref="
                              el => {
                                scoreInputs[match.id] = el;
                              }
                            "
                            type="number"
                            name="score_minute"
                            id="score_minute"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md h-full text-center"
                            placeholder="minuto"
                          />
                        </div>
                        <div class="flex-shrink-0 p-2 align-center justify-center flex flex-col">
                          <button
                            type="button"
                            :class="[
                              'inline-flex items-center px-2.5 py-0 my-1 mt-2 border border-transparent text-xs font-medium rounded text-green-100 hover:text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:focus:ring-green-600 justify-center',
                              (!newScore.score_minute || savingScore) && 'pointer-events-none opacity-50',
                            ]"
                            :disabled="!newScore.score_minute || savingScore"
                            @click="saveNewScore"
                          >
                            <span class="text-sm font-medium text-gray-900"> Save </span>
                          </button>
                          <button
                            type="button"
                            :class="[
                              'inline-flex items-center px-2.5 py-0 my-1 mb-2 border border-transparent text-xs font-medium rounded bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:focus:ring-red-600 justify-center',
                            ]"
                            @click="newScore = {}"
                          >
                            <span class="text-sm font-medium text-white"> Cancel </span>
                          </button>
                        </div>
                      </div>
                    </TransitionRoot>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <dl class="mt-1 flex-grow flex flex-col justify-center align-center">
            <dt class="sr-only">Empieza</dt>
            <dd class="text-gray-500 text-md font-bold">{{ format(match.match_dt, 'Pp') }}</dd>
          </dl>
        </li>
        <TransitionRoot
          as="template"
          :show="showNewMatchForm"
          enter="transition duration-150"
          enter-from="scale-0 opacity-0"
          enter-to="scale-100 opacity-100"
          leave="transition duration-150"
          leave-from="scale-100 opacity-100"
          leave-to="scale-0 opacity-0"
        >
          <li
            key="new_match"
            class="col-span-1 flex flex-col text-left bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div class="flex flex-wrap">
              <div class="flex-1 flex flex-col py-1">
                <img
                  v-if="newMatchHostId"
                  class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
                  :src="newMatchHost.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
                  alt="Local"
                />
                <PhotographIcon v-else class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl" />
                <h3 class="mt-2 mx-2 text-gray-900 text-sm font-medium">
                  <Listbox as="div" v-model="newMatchHostId">
                    <ListboxLabel class="sr-only"> Selecciona Equipo Local </ListboxLabel>
                    <div class="relative">
                      <div class="inline-flex w-full shadow-sm rounded-md divide-x divide-indigo-600">
                        <div class="relative w-full z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                          <div
                            class="relative w-full inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white"
                          >
                            <p class="ml-2.5 text-sm font-medium">{{ newMatchHost.name }}</p>
                          </div>
                          <ListboxButton
                            class="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                          >
                            <span class="sr-only">Selecciona Equipo Local</span>
                            <ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
                          </ListboxButton>
                        </div>
                      </div>

                      <transition
                        leave-active-class="transition ease-in duration-100"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <ListboxOptions
                          class="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-auto bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none max-h-48"
                        >
                          <ListboxOption
                            as="template"
                            v-for="option in filteredHostTeams"
                            :key="option.id"
                            :value="option.id"
                            v-slot="{ active, selected }"
                          >
                            <li
                              :class="[
                                active ? 'text-white bg-indigo-500' : 'text-gray-900',
                                'cursor-default select-none relative p-4 text-sm',
                              ]"
                            >
                              <div class="flex flex-col">
                                <div class="flex justify-between">
                                  <p :class="selected ? 'font-semibold' : 'font-normal'">
                                    {{ option.name }}
                                  </p>
                                  <span v-if="selected" :class="active ? 'text-white' : 'text-indigo-500'">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                </h3>
              </div>
              <div class="flex-1 flex flex-col py-1">
                <img
                  v-if="newMatchVisitorId"
                  class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
                  :src="newMatchVisitor.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
                  alt="Visitante"
                />
                <PhotographIcon v-else class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl" />
                <h3 class="mt-2 text-gray-900 text-sm font-medium mx-2">
                  <Listbox as="div" v-model="newMatchVisitorId">
                    <ListboxLabel class="sr-only"> Selecciona Visitante </ListboxLabel>
                    <div class="relative w-full">
                      <div class="inline-flex w-full shadow-sm rounded-md divide-x divide-indigo-600">
                        <div class="relative w-full z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                          <div
                            class="relative w-full inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white"
                          >
                            <p class="ml-2.5 text-sm font-medium">{{ newMatchVisitor.name }}</p>
                          </div>
                          <ListboxButton
                            class="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                          >
                            <span class="sr-only">Selecciona Visitante</span>
                            <ChevronDownIcon class="h-5 w-5 text-white" aria-hidden="true" />
                          </ListboxButton>
                        </div>
                      </div>

                      <transition
                        leave-active-class="transition ease-in duration-100"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <ListboxOptions
                          class="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-auto bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none max-h-48"
                        >
                          <ListboxOption
                            as="template"
                            v-for="option in filteredVisitorTeams"
                            :key="option.id"
                            :value="option.id"
                            v-slot="{ active, selected }"
                          >
                            <li
                              :class="[
                                active ? 'text-white bg-indigo-500' : 'text-gray-900',
                                'cursor-default select-none relative p-4 text-sm',
                              ]"
                            >
                              <div class="flex flex-col">
                                <div class="flex justify-between">
                                  <p :class="selected ? 'font-semibold' : 'font-normal'">
                                    {{ option.name }}
                                  </p>
                                  <span v-if="selected" :class="active ? 'text-white' : 'text-indigo-500'">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                </h3>
              </div>
              <div class="flex-1 flex flex-col px-6 py-3 grow-1"><Datepicker v-model="newMatchStart" /></div>
            </div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div class="w-0 flex-1 flex">
                <button
                  class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-1 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 bg-red-100 hover:bg-red-200 transition duration-200"
                  @click="cancelNewMatch"
                >
                  Cancelar
                </button>
              </div>
              <div class="-ml-px w-0 flex-1 flex">
                <button
                  :class="[
                    'relative w-0 flex-1 inline-flex items-center justify-center py-1 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 bg-green-100 hover:bg-green-200 transition duration-200',
                    (!newMatchHostId || !newMatchVisitorId || !newMatchStart) && 'pointer-events-none opacity-50',
                  ]"
                  :disabled="!newMatchHostId || !newMatchVisitorId || !newMatchStart"
                  @click="saveNewMatch"
                >
                  Guardar
                </button>
              </div>
            </div>
          </li>
        </TransitionRoot>
      </ul>
    </div>
  </div>
</template>
<style>
  .match-input {
    width: calc(100% + 1.8rem) !important;
  }
</style>
