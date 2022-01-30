<script setup>
  import { PlusSmIcon, CheckIcon, ChevronDownIcon, ExclamationIcon } from '@heroicons/vue/outline';
  import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue';
  import { TransitionRoot, ListboxLabel, ListboxButton, ListboxOption, ListboxOptions, Listbox } from '@headlessui/vue';
  import { supabase } from '../lib/supabase';
  import { useRoute, useRouter } from 'vue-router';
  import MatchManager from './MatchManager.vue';

  const matchdays = ref([]);
  const showNewMatchday = ref(false);
  const route = useRoute();
  const router = useRouter();
  const matchdayName = ref('');
  const matchdayNameRef = ref(null);
  const loadingMatchdays = ref(true);
  const loadError = ref('');
  const saveError = ref('');
  const selectedSeason = ref(parseInt(route?.params?.season) || null);
  const selectedMatchday = ref(parseInt(route?.params?.matchday) || null);
  const subscription = ref(null);

  const activateNewMatchday = () => {
    showNewMatchday.value = true;
    matchdayName.value = '';
    nextTick(() => {
      matchdayNameRef.value.focus();
    });
  };

  const cancelNewMatchday = () => {
    showNewMatchday.value = false;
    nextTick(() => {
      matchdayName.value = '';
      saveError.value = '';
    });
  };

  const saveNewMatchday = async () => {
    saveError.value = '';
    try {
      let { error, data: newMatchday } = await supabase
        .from('matchday')
        .insert({ name: matchdayName.value, season_id: selectedSeason.value, sort_order: matchdays.value.length + 1 })
        .single();
      if (error) {
        saveError.value = error.message;
      } else {
        selectedMatchday.value = newMatchday.id;
        nextTick(() => {
          cancelNewMatchday();
          router.push(`/admin/${route.params.league}/${route.params.season}/${newMatchday.id}`);
          matchdays.value.push(newMatchday);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    loadError.value = '';
    try {
      const { error, data: tempMatchdays } = await supabase
        .from('matchday')
        .select('id,name,sort_order')
        .eq('season_id', route.params.season);
      if (error) {
        loadError.value = error.message;
      } else {
        matchdays.value = tempMatchdays;
        if (
          route.params.matchday &&
          !matchdays.value.find(matchday => matchday.id === parseInt(route.params.matchday))
        ) {
          router.push(`/admin/${selectedSeason.value}`);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingMatchdays.value = false;
    }

    subscription.value = supabase
      .from(`matchday:season_id.eq=${route.params.season}`)
      .on('INSERT', async payload => {
        matchdays.value.push(payload.new);
      })
      .on('UPDATE', async payload => {
        const index = matchdays.value.findIndex(matchday => matchday.id === payload.new.id);
        matchdays.value.splice(index, 1, payload.new);
      })
      .on('DELETE', payload => {
        const index = matchdays.value.findIndex(matchday => matchday.id === payload.old.id);
        matchdays.value.splice(index, 1);
      })
      .subscribe();
  });

  onUnmounted(() => {
    supabase.removeSubscription(subscription.value);
  });
</script>
<template>
  <div class="bg-white shadow rounded-lg divide-y divide-gray-200">
    <div class="px-2 py-1">
      <div class="flex justify-between align-center relative">
        <div class="block text-sm font-medium text-gray-700 leading-3 py-1">
          <Listbox as="div" v-model="selectedMatchday">
            <ListboxLabel class="sr-only">Selecciona jornada</ListboxLabel>
            <div class="relative">
              <div class="inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                  <div
                    :class="[
                      'relative inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white',
                      matchdays.length === 0 && 'rounded-r-md pr-3',
                    ]"
                  >
                    <div>{{ matchdays.length > 0 ? 'Jornada seleccionada:' : 'Añade la primer jornada' }}</div>
                    <p v-if="matchdays.length > 0" class="ml-2.5 text-sm font-medium">
                      {{ matchdays.find(season => season.id === +route.params.matchday)?.name }}
                    </p>
                  </div>
                  <ListboxButton
                    v-if="matchdays.length > 0"
                    class="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    <span class="sr-only">Selecciona jornada</span>
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
                  class="origin-top-left absolute z-10 left-0 mt-1.5 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <ListboxOption
                    as="template"
                    v-for="matchday in matchdays"
                    :key="matchday.name"
                    :value="matchday.id"
                    v-slot="{ active, selected }"
                  >
                    <li
                      :class="[
                        active ? 'text-white bg-indigo-500' : 'text-gray-900',
                        'cursor-default select-none relative p-2 text-sm',
                      ]"
                      @click="router.push(`/admin/${route.params.league}/${route.params.season}/${matchday.id}`)"
                    >
                      <div class="flex flex-col">
                        <div class="flex justify-between">
                          <p :class="selected ? 'font-semibold' : 'font-normal'">
                            {{ matchday.name }}
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
        </div>
        <TransitionRoot
          as="template"
          :show="showNewMatchday"
          enter="transition duration-150"
          enter-from="-translate-x-full opacity-0"
          enter-to="translate-x-0 opacity-100"
          leave="transition duration-150"
          leave-from="translate-x-0 opacity-100"
          leave-to="-translate-x-full opacity-0"
        >
          <div class="flex flex-col relative items-end right-0 grow-1 w-full sm:w-auto my-1.5">
            <div class="flex justify-end h-7">
              <input
                v-model="matchdayName"
                ref="matchdayNameRef"
                type="text"
                name="text"
                id="text"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-2/3 md:w-1/3 lg:w-1/2 sm:text-sm border-gray-300 rounded-md p-2"
                placeholder="Nombre de jornada"
              />
              <button
                type="button"
                :class="[
                  'inline-flex items-center px-2.5 py-1.5 border border-transparent  text-xs font-medium rounded text-indigo-100 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3',
                  !matchdayName && 'opacity-50 pointer-events-none',
                ]"
                :disabled="!matchdayName"
                @click="saveNewMatchday"
              >
                Guardar
              </button>
              <button
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
                @click="cancelNewMatchday"
              >
                Cancelar
              </button>
            </div>
            <TransitionRoot
              as="template"
              :show="!!saveError"
              enter="transition duration-150"
              enter-from="-translate-y-full opacity-0"
              enter-to="translate-y-0 opacity-100"
              leave="transition duration-150"
              leave-from="translate-y-0 opacity-100"
              leave-to="-translate-y-full opacity-0"
            >
              <div class="text-red-500 w-2/3 text-sm p-1 my-2 bg-red-100 border-red-200 border rounded">
                {{ saveError }}
              </div>
            </TransitionRoot>
          </div>
        </TransitionRoot>
        <TransitionRoot
          as="template"
          :show="!showNewMatchday"
          enter="transition duration-150"
          enter-from="translate-x-full opacity-0"
          enter-to="translate-x-0 opacity-100"
          leave="transition duration-150"
          leave-from="translate-x-0 opacity-100"
          leave-to="translate-x-full opacity-0"
        >
          <button
            type="button"
            class="absolute right-0 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
            @click="activateNewMatchday"
          >
            <PlusSmIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </TransitionRoot>
      </div>
    </div>
    <div v-if="loadError || (matchdays.length > 0 && selectedMatchday)" class="px-4 py-5 sm:p-1">
      <div v-if="loadError || saveError" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <ExclamationIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Something happened!</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ loadError || saveError }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="p-1">
        <MatchManager
          v-if="selectedMatchday"
          :matchday="matchdays.find(matchday => matchday.id === +selectedMatchday)"
        />
      </div>
    </div>
  </div>
</template>
