<script setup>
  import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption, TransitionRoot } from '@headlessui/vue';
  import { HomeIcon, ChevronDownIcon, CheckIcon, XCircleIcon, SelectorIcon } from '@heroicons/vue/solid';
  import { onMounted, ref, computed, watch, nextTick } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { supabase } from '../lib/supabase';

  const route = useRoute();
  const router = useRouter();

  const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
  ];
  const selected = ref(people[3]);

  const leagues = ref([]);
  const loadingLeagues = ref(true);
  const loadLeaguesError = ref('');
  const selectedLeague = ref(+route?.params?.league || null);
  const leagueHovered = ref(false);
  const leagueSubscription = ref(null);

  const seasons = ref([]);
  const loadingSeasons = ref(false);
  const loadSeasonsError = ref('');
  const selectedSeason = ref(+route?.params?.season || null);
  const seasonHovered = ref(false);
  const seasonSubscription = ref(null);

  const matchDays = ref([]);
  const loadMatchdaysError = ref('');
  const matches = ref([]);
  const loadMatchesError = ref('');

  const selectedLeagueInfo = computed(() => {
    return route?.params?.league ? leagues.value.find(league => league.id === +route.params.league) || {} : {};
  });

  const selectedSeasonInfo = computed(() => {
    return route?.params?.season ? seasons.value.find(season => season.id === +route.params.season) || {} : {};
  });

  onMounted(async () => {
    loadLeaguesError.value = '';
    loadingLeagues.value = true;
    try {
      const { error, data: tempLeagues } = await supabase.from('league').select('id,name');
      if (error) {
        loadLeaguesError.value = error.message;
      } else {
        leagues.value = tempLeagues;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingLeagues.value = false;
    }
    if (route.params.league) {
      loadSeasonsError.value = '';
      loadingSeasons.value = true;
      try {
        const { error, data: tempSeasons } = await supabase
          .from('season')
          .select('id,name')
          .eq('league_id', route.params.league);
        if (error) {
          loadSeasonsError.value = error.message;
        } else {
          seasons.value = tempSeasons;
        }
      } catch (error) {
        console.log(error);
      } finally {
        loadingSeasons.value = false;
      }
    }

    leagueSubscription.value = supabase
      .from(`league`)
      .on('INSERT', payload => {
        leagues.value.push(payload.new);
      })
      .on('UPDATE', payload => {
        const index = leagues.value.findIndex(league => league.id === payload.new.id);
        leagues.value.splice(index, 1, payload.new);
      })
      .on('DELETE', payload => {
        const index = leagues.value.findIndex(league => league.id === payload.old.id);
        leagues.value.splice(index, 1);
        if (payload.old.id === +route.params.league) {
          router.push('/');
        }
      })
      .subscribe();

    seasonSubscription.value = supabase
      .from(`season:league_id=${route.params.league}`)
      .on('INSERT', payload => {
        seasons.value.push(payload.new);
      })
      .on('UPDATE', payload => {
        const index = seasons.value.findIndex(season => season.id === payload.new.id);
        seasons.value.splice(index, 1, payload.new);
      })
      .on('DELETE', payload => {
        const index = seasons.value.findIndex(season => season.id === payload.old.id);
        seasons.value.splice(index, 1);
        if (payload.old.id === +route.params.season) {
          router.push('/');
        }
      })
      .subscribe();
  });

  const goHome = () => {
    selectedSeason.value = null;
    nextTick(() => {
      selectedLeague.value = null;
    });
  };

  watch(
    () => selectedLeague.value,
    league => {
      selectedSeason.value = null;
      nextTick(() => {
        router.push(league ? `/${league}` : '/');
        leagueHovered.value = false;
        if (league) {
          loadLeagueSeasons(league);
        }
      });
    }
  );

  watch(
    () => selectedSeason.value,
    season => {
      router.push(season ? `/${route.params.league}/${season}` : `/${route.params.league}`);
      seasonHovered.value = false;
      if (season) {
        loadSeasonMatchdays(season);
      }
    }
  );

  const loadLeagueSeasons = async league => {
    if (league) {
      try {
        const { data: newSeasons } = await supabase.from('season').select('id,name').eq('league_id', league);
        seasons.value = newSeasons;
      } catch (error) {
        console.log(error);
      }
    } else {
      selectedSeason.value = null;
    }
  };

  const loadSeasonMatchdays = async season => {
    if (season) {
      try {
        const { data: newMatchdays } = await supabase.from('matchday').select('id,name').eq('season_id', season);
        matchDays.value = newMatchdays;
      } catch (error) {
        console.log(error);
      }
    }
  };
</script>
<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="bg-white rounded-md shadow px-2 flex space-x-2">
      <li class="flex">
        <div class="flex items-center justify-center">
          <div class="text-gray-400 hover:text-gray-500 w-8 flex" @click="goHome">
            <HomeIcon class="flex-shrink-0 h-5 w-5 mx-auto my-auto" aria-hidden="true" />
            <span class="sr-only">Inicio</span>
          </div>
        </div>
      </li>
      <li class="flex">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-6 h-full text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <div
            :class="['ml-3 text-sm font-medium text-gray-500 hover:text-gray-700 relative', selectedLeague && 'mr-2']"
            @mouseenter="leagueHovered = true"
            @mouseleave="leagueHovered = false"
          >
            <Listbox as="div" v-model="selectedLeague">
              <div class="my-2 relative">
                <ListboxButton
                  class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <span class="block truncate">
                    {{
                      loadingLeagues
                        ? 'Cargando ligas...'
                        : selectedLeague
                        ? selectedLeagueInfo.name
                        : leagues.length > 0
                        ? selectedLeague
                          ? ''
                          : 'Selecciona liga'
                        : 'No hay ligas disponibles'
                    }}
                  </span>
                  <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition ease-in duration-100"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      as="template"
                      v-for="league in leagues"
                      :key="league.id"
                      :value="league.id"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9',
                        ]"
                      >
                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                          {{ league.name }}
                        </span>

                        <span
                          v-if="selected"
                          :class="[
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                          ]"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
            <TransitionRoot
              v-if="selectedLeague"
              as="template"
              :show="leagueHovered"
              enter="transition duration-150"
              enter-from="-translate-x-full opacity-0"
              enter-to="translate-x-0 opacity-100"
              leave="transition duration-150"
              leave-from="translate-x-0 opacity-100"
              leave-to="-translate-x-full opacity-0"
            >
              <div class="absolute top-1/3 left-full cursor-pointer" @click="selectedLeague = null">
                <XCircleIcon class="ml-1 my-auto h-4 w-4" />
              </div>
            </TransitionRoot>
          </div>
          <svg
            v-if="route.params.league"
            class="flex-shrink-0 w-6 h-full text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <div
            v-if="route.params.league"
            :class="[
              'ml-3 text-sm font-medium text-gray-500 hover:text-gray-700 relative transition duration-1000',
              seasonHovered && 'mr-4',
            ]"
            @mouseenter="seasonHovered = true"
            @mouseleave="seasonHovered = false"
          >
            <Listbox as="div" v-model="selectedSeason">
              <div class="my-2 relative">
                <ListboxButton
                  class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <span class="block truncate">
                    {{
                      loadingSeasons
                        ? 'Cargando temporadas...'
                        : selectedSeason
                        ? selectedSeasonInfo.name
                        : seasons.length > 0
                        ? selectedSeason
                          ? ''
                          : 'Selecciona temporada'
                        : 'No hay temporadas disponibles'
                    }}
                  </span>
                  <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition ease-in duration-100"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      as="template"
                      v-for="season in seasons"
                      :key="season.id"
                      :value="season.id"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9',
                        ]"
                      >
                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                          {{ season.name }}
                        </span>

                        <span
                          v-if="selected"
                          :class="[
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                          ]"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
            <TransitionRoot
              v-if="selectedSeason"
              as="template"
              :show="seasonHovered"
              enter="transition duration-150"
              enter-from="-translate-x-full opacity-0"
              enter-to="translate-x-0 opacity-100"
              leave="transition duration-150"
              leave-from="translate-x-0 opacity-100"
              leave-to="-translate-x-full opacity-0"
            >
              <div class="absolute top-1/3 left-full cursor-pointer" @click="selectedSeason = null">
                <XCircleIcon class="ml-1 my-auto h-4 w-4" />
              </div>
            </TransitionRoot>
          </div>
        </div>
      </li>
    </ol>
  </nav>
</template>
