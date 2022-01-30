<script setup>
  import { PlusSmIcon, CheckIcon, ChevronDownIcon, ExclamationIcon } from '@heroicons/vue/outline';
  import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue';
  import { TransitionRoot, ListboxLabel, ListboxButton, ListboxOption, ListboxOptions, Listbox } from '@headlessui/vue';
  import { supabase } from '../lib/supabase';
  import { useRoute, useRouter } from 'vue-router';

  const seasons = ref([]);
  const showNewSeason = ref(false);
  const route = useRoute();
  const router = useRouter();
  const seasonName = ref('');
  const seasonNameRef = ref(null);
  const loadingSeasons = ref(true);
  const loadError = ref('');
  const saveError = ref('');
  const selectedLeague = ref(parseInt(route?.params?.league) || null);
  const selectedSeason = ref(parseInt(route?.params?.season) || null);
  const subscription = ref(null);

  const activateNewSeason = () => {
    showNewSeason.value = true;
    seasonName.value = '';
    nextTick(() => {
      seasonNameRef.value.focus();
    });
  };

  const cancelNewSeason = () => {
    showNewSeason.value = false;
    nextTick(() => {
      seasonName.value = '';
      saveError.value = '';
    });
  };

  const saveNewSeason = async () => {
    saveError.value = '';
    try {
      let { error, data: newSeason } = await supabase
        .from('season')
        .insert({ name: seasonName.value, league_id: selectedLeague.value })
        .single();
      if (error) {
        saveError.value = error.message;
      } else {
        selectedSeason.value = newSeason.id;
        nextTick(() => {
          cancelNewSeason();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    loadError.value = '';
    try {
      const { error, data: tempSeasons } = await supabase
        .from('season')
        .select('id,name')
        .eq('league_id', selectedLeague.value);
      if (error) {
        loadError.value = error.message;
      } else {
        seasons.value = tempSeasons;
        // if (selectedSeason.value && !seasons.value.find(season => season.id === selectedSeason.value)) {
        //   router.push(`/admin/${selectedLeague.value}`);
        // }
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingSeasons.value = false;
    }

    subscription.value = supabase
      .from(`season:league_id=eq.${route.params.league}`)
      .on('INSERT', async payload => {
        seasons.value.push(payload.new);
      })
      .on('UPDATE', async payload => {
        const index = seasons.value.findIndex(season => season.id === payload.new.id);
        seasons.value.splice(index, 1, payload.new);
      })
      .on('DELETE', payload => {
        const index = seasons.value.findIndex(season => season.id === payload.old.id);
        seasons.value.splice(index, 1);
      })
      .subscribe();
  });

  onUnmounted(() => {
    supabase.removeSubscription(subscription.value);
  });
</script>
<template>
  <div class="bg-white shadow rounded-lg divide-y divide-gray-200">
    <div class="p-0">
      <div class="flex justify-between align-center relative">
        <div class="block text-sm font-medium text-gray-700 leading-3 p-1">
          <Listbox as="div" v-model="selectedSeason">
            <ListboxLabel class="sr-only">Selecciona temporada</ListboxLabel>
            <div class="relative">
              <div class="inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                  <div
                    :class="[
                      'relative inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white',
                      seasons.length === 0 && 'rounded-r-md pr-3',
                    ]"
                  >
                    <div>{{ seasons.length > 0 ? 'Temporada seleccionada:' : 'Añade la primer temporada' }}</div>
                    <p v-if="seasons.length > 0" class="ml-2.5 text-sm font-medium">
                      {{ selectedSeason ? seasons.find(league => league.id === selectedSeason)?.name : '' }}
                    </p>
                  </div>
                  <ListboxButton
                    v-if="seasons.length > 0"
                    class="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    <span class="sr-only">Selecciona temporada</span>
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
                    v-for="season in seasons"
                    :key="season.name"
                    :value="season.id"
                    v-slot="{ active, selected }"
                  >
                    <li
                      :class="[
                        active ? 'text-white bg-indigo-500' : 'text-gray-900',
                        'cursor-default select-none relative p-2 text-sm',
                      ]"
                      @click="router.push(`/admin/${route.params.league}/${season.id}`)"
                    >
                      <div class="flex flex-col">
                        <div class="flex justify-between">
                          <p :class="selected ? 'font-semibold' : 'font-normal'">
                            {{ season.name }}
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
          :show="showNewSeason"
          enter="transition duration-150"
          enter-from="-translate-x-full opacity-0"
          enter-to="translate-x-0 opacity-100"
          leave="transition duration-150"
          leave-from="translate-x-0 opacity-100"
          leave-to="-translate-x-full opacity-0"
        >
          <div class="flex flex-col relative items-end right-0 grow-1 w-full sm:w-auto my-1.5 mr-1">
            <div class="flex justify-end h-7">
              <input
                v-model="seasonName"
                ref="seasonNameRef"
                type="text"
                name="text"
                id="text"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-2/3 md:w-1/3 lg:w-1/2 sm:text-sm border-gray-300 rounded-md p-2"
                placeholder="Nombre de temporada"
              />
              <button
                type="button"
                :class="[
                  'inline-flex items-center px-2.5 py-1.5 border border-transparent  text-xs font-medium rounded text-indigo-100 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3',
                  !seasonName && 'opacity-50 pointer-events-none',
                ]"
                :disabled="!seasonName"
                @click="saveNewSeason"
              >
                Guardar
              </button>
              <button
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
                @click="cancelNewSeason"
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
          :show="!showNewSeason"
          enter="transition duration-150"
          enter-from="translate-x-full opacity-0"
          enter-to="translate-x-0 opacity-100"
          leave="transition duration-150"
          leave-from="translate-x-0 opacity-100"
          leave-to="translate-x-full opacity-0"
        >
          <button
            type="button"
            class="absolute right-0 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3 mr-1"
            @click="activateNewSeason"
          >
            <PlusSmIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </TransitionRoot>
      </div>
    </div>
    <div v-if="loadError || (seasons.length > 0 && selectedSeason)" class="px-0">
      <div v-if="loadError || saveError" class="rounded-md bg-red-50 p-2">
        <div class="flex">
          <div class="flex-shrink-0">
            <ExclamationIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">¡Hubo un problema!</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ loadError || saveError }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedSeason" class="p-2">
        <router-view />
      </div>
    </div>
  </div>
</template>
