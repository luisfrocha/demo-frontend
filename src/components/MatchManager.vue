<script setup>
  import { TransitionRoot, Listbox, ListboxOptions, ListboxOption, ListboxButton, ListboxLabel } from '@headlessui/vue';
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { PhotographIcon, ChevronDownIcon, CheckIcon } from '@heroicons/vue/outline';
  import { supabase } from '../lib/supabase';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const loadingMatches = ref(true);
  const loadingTeams = ref(true);
  const loadError = ref('');
  const saveError = ref('');
  const matchesSubscription = ref(null);
  const teamsSubscription = ref(null);
  const showNewMatchForm = ref(false);
  const matches = ref([]);
  const teams = ref([]);
  const newMatchHostId = ref(null);
  const newMatchVisitorId = ref(null);
  const newMatchStartTime = ref(null);

  const saveNewMatch = async () => {
    saveError.value = '';
    try {
      let { error } = await supabase
        .from('match')
        .insert({
          matchday: route.params.matchday,
          host: newMatchHostId.value,
          visitor: newMatchVisitorId.value,
          match_date: newMatchStartTime.value,
          match_time: newMatchStartTime.value,
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

  onMounted(async () => {
    loadError.value = '';
    try {
      const { error, data: tempMatches } = await supabase
        .from('match')
        .select('id,matchday,host(id,name,logo),visitor(id,name,logo),match_date,match_time')
        .eq('matchday', route.params.matchday);
      if (error) {
        loadError.value = error.message;
      } else {
        matches.value = tempMatches;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingMatches.value = false;
    }

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

    matchesSubscription.value = supabase
      .from(`match:league=eq.${route.params.league}`)
      .on('INSERT', payload => {
        matches.value.push(payload.new);
      })
      .on('UPDATE', payload => {
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

  const filteredHostTeams = computed(() => {
    return teams.value.filter(team => team.id !== newMatchVisitorId.value);
  });

  const newMatchVisitor = computed(() => {
    return newMatchVisitorId.value ? teams.value.find(team => team.id === newMatchVisitorId.value) : {};
  });

  const filteredVisitorTeams = computed(() => {
    return teams.value.filter(team => team.id !== newMatchHostId.value);
  });
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
          <div class="flex">
            <div class="flex-1 flex flex-col p-8">
              <img
                class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
                :src="match.host.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
                :alt="match.host.name"
              />
              <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ match.host.name }}</h3>
            </div>
            <div class="flex-1 flex flex-col p-8">
              <img
                class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
                :src="match.visitor.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
                :alt="match.visitor.name"
              />
              <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ match.visitor.name }}</h3>
            </div>
          </div>
          <dl class="mt-1 flex-grow flex flex-col justify-between">
            <dt class="sr-only">Empieza</dt>
            <dd class="text-gray-500 text-sm">{{ match.match_date }} {{ match.match_time }}</dd>
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
            <div class="flex">
              <div class="flex-1 flex flex-col px-4 py-3">
                <img
                  v-if="newMatchHostId"
                  class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
                  :src="newMatchHost.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
                  alt="Local"
                />
                <PhotographIcon v-else class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl" />
                <h3 class="mt-6 text-gray-900 text-sm font-medium">
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
                          class="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
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
              <div class="flex-1 flex flex-col px-4 py-3">
                <img
                  v-if="newMatchVisitorId"
                  class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
                  :src="newMatchVisitor.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
                  alt="Visitante"
                />
                <PhotographIcon v-else class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl" />
                <h3 class="mt-6 text-gray-900 text-sm font-medium">
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
                          class="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                    (!newMatchLogo || !newMatchName) && 'pointer-events-none opacity-50',
                  ]"
                  :disabled="!newMatchLogo || !newMatchName"
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
