<script setup>
  import { onMounted, ref, computed, onUnmounted, watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { supabase } from '../../lib/supabase';
  import { RefreshIcon } from '@heroicons/vue/outline';
  import { debounce } from 'lodash-es';

  const route = useRoute();
  const router = useRouter();

  const matchdays = ref([]);
  const teams = ref([]);
  const matchdaySubscription = ref(null);
  const teamsSubscription = ref(null);
  const goalsSubscription = ref([]);
  const computedRoute = computed(() => route);
  const loadingMatchdays = ref(true);
  const mainContainer = ref(null);
  const pageWidth = ref(0);

  const matchView = computed(() => ({
    get: () => (route.name === 'position_graph' ? 'posicion' : 'tabla'),
    set: val => {
      console.log(val);
    },
  }));

  const tabs = computed(() => [
    { name: 'Tabla', to: '', route_name: 'position_table', current: true },
    {
      name: 'Posiciones',
      to: 'posicion',
      route_name: 'position_graph',
      current: false,
    },
  ]);

  const loadMatchdays = async () => {
    loadingMatchdays.value = true;
    if (route.params.season) {
      try {
        const { error, data } = await supabase
          .from('matchday')
          .select(
            'id,name,season_id,sort_order,matches:match(id,match_dt,host_id,host:team!match_host_id_fkey(id,name,logo,color),visitor_id,visitor:team!match_visitor_id_fkey(id,name,logo,color),goals:goal(id,team_id,score_minute))'
          )
          .eq('season_id', route.params.season);
        if (error) {
          console.log(error);
        } else {
          matchdays.value = data.sort((a, b) => a.sort_order - b.sort_order);
          if (!route.params.matchday) {
            router.push(`/${route.params.league}/${route.params.season}/${data[0].id}`);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        loadingMatchdays.value = false;
      }
    }
  };

  const matchesUpToMatchday = computed(() => {
    const index = matchdays.value.findIndex(md => md.id === +route.params.matchday);
    return matchdays.value.slice(0, index + 1);
  });

  const resizeChart = () => {
    if (mainContainer.value) {
      pageWidth.value = mainContainer.value.offsetWidth;
    }
  };

  onMounted(async () => {
    window.addEventListener('resize', debounce(resizeChart, 250));
    resizeChart();
    try {
      const { error, data: teamList } = await supabase
        .from('team')
        .select('id,name,logo,color')
        .eq('league_id', route.params.league);
      if (error) {
        console.log(error);
      } else {
        teams.value = teamList.map(team => updateTeamNumbers(team));
      }
    } catch (error) {
      console.log(error);
    }
    loadMatchdays();

    matchdaySubscription.value = supabase
      .from(`matchday:season_id=eq.${route.params.season}`)
      .on('INSERT', () => {
        loadMatchdays();
      })
      .on('UPDATE', () => {
        loadMatchdays();
      })
      .on('DELETE', () => {
        loadMatchdays();
      })
      .subscribe();

    teamsSubscription.value = supabase
      .from(`team:league_id=eq.${computedRoute.value.params.league}`)
      .on('INSERT', () => {
        console.log('new team inserted');
        loadMatchdays();
      })
      .on('UPDATE', () => {
        loadMatchdays();
      })
      .on('DELETE', () => {
        loadMatchdays();
      })
      .subscribe();
  });

  watchEffect(() => {
    if (goalsSubscription.value.length) {
      goalsSubscription.value.forEach(sub => {
        supabase.removeSubscription(sub);
      });
      goalsSubscription.value = [];
    }
    matchesUpToMatchday.value.forEach(matchday => {
      matchday.matches.forEach(match => {
        const temp = supabase
          .from(`goal:match_id=eq.${match.id}`)
          .on('INSERT', payload => {
            console.log(
              matchdays.value.map(md => md.id),
              payload.new.match_id
            );
            if (matchdays.value.map(md => md.id).includes(payload.new.match_id)) {
              loadMatchdays();
            }
          })
          .on('UPDATE', payload => {
            console.log(
              matchdays.value.map(md => md.id),
              payload.new.match_id
            );
            if (matchdays.value.map(md => md.id).includes(payload.new.match_id)) {
              loadMatchdays();
            }
          })
          .on('DELETE', payload => {
            console.log(
              matchdays.value.map(md => md.id),
              payload.old.match_id
            );
            if (matchdays.value.map(md => md.id).includes(payload.old.match_id)) {
              loadMatchdays();
            }
          })
          .subscribe();
        goalsSubscription.value.push(temp);
      });
    });
  });

  onUnmounted(() => {
    supabase.removeSubscription(matchdaySubscription.value);
    supabase.removeSubscription(teamsSubscription.value);
    window.removeEventListener('resize', debounce(resizeChart, 250));
  });

  watchEffect(() => {
    teams.value = teams.value.map(team => updateTeamNumbers(team));
  });

  const updateTeamNumbers = team => {
    team.host = {
      matchesPlayed: matchesPlayed(team.id, 'host'),
      matchesWon: matchesWon(team.id, 'host'),
      matchesTied: matchesTied(team.id, 'host'),
      matchesLost: matchesLost(team.id, 'host'),
      goalsInFavor: goalsInFavor(team.id, 'host'),
      goalsAgainst: goalsAgainst(team.id, 'host'),
      goalDifference: goalDifference(team.id, 'host'),
      pointsTotal: pointsTotal(team.id, 'host'),
    };
    team.visitor = {
      matchesPlayed: matchesPlayed(team.id, 'visitor'),
      matchesWon: matchesWon(team.id, 'visitor'),
      matchesTied: matchesTied(team.id, 'visitor'),
      matchesLost: matchesLost(team.id, 'visitor'),
      goalsInFavor: goalsInFavor(team.id, 'visitor'),
      goalsAgainst: goalsAgainst(team.id, 'visitor'),
      goalDifference: goalDifference(team.id, 'visitor'),
      pointsTotal: pointsTotal(team.id, 'visitor'),
    };
    team = {
      ...team,
      matchesPlayed: team.host.matchesPlayed + team.visitor.matchesPlayed,
      matchesWon: team.host.matchesWon + team.visitor.matchesWon,
      matchesTied: team.host.matchesTied + team.visitor.matchesTied,
      matchesLost: team.host.matchesLost + team.visitor.matchesLost,
      goalsInFavor: team.host.goalsInFavor + team.visitor.goalsInFavor,
      goalsAgainst: team.host.goalsAgainst + team.visitor.goalsAgainst,
      goalDifference: team.host.goalDifference + team.visitor.goalDifference,
      pointsTotal: team.host.pointsTotal + team.visitor.pointsTotal,
    };
    return team;
  };

  const matchesPlayed = (teamId, type) => {
    return matchesUpToMatchday.value
      .map(day =>
        day.matches.filter(match =>
          type ? match[`${type}_id`] === teamId : match.host_id === teamId || match.visitor_id === teamId
        )
      )
      .flat().length;
  };

  const matchesWon = (teamId, type) => {
    return matchesUpToMatchday.value
      .map(day =>
        day.matches
          .filter(match =>
            type ? match[`${type}_id`] === teamId : match.host_id === teamId || match.visitor_id === teamId
          )
          .filter(match => {
            const goalsFavor = match.goals.filter(goal => goal.team_id === teamId).length;
            const goalsAgainst = match.goals.filter(goal => goal.team_id !== teamId).length;
            return goalsFavor > goalsAgainst;
          })
      )
      .flat().length;
  };

  const matchesTied = (teamId, type) => {
    return matchesUpToMatchday.value
      .map(day =>
        day.matches
          .filter(match =>
            type ? match[`${type}_id`] === teamId : match.host_id === teamId || match.visitor_id === teamId
          )
          .filter(match => {
            const goalsFavor = match.goals.filter(goal => goal.team_id === teamId).length;
            const goalsAgainst = match.goals.filter(goal => goal.team_id !== teamId).length;
            return goalsFavor === goalsAgainst;
          })
      )
      .flat().length;
  };

  const matchesLost = (teamId, type) => {
    return matchesUpToMatchday.value
      .map(day =>
        day.matches
          .filter(match =>
            type ? match[`${type}_id`] === teamId : match.host_id === teamId || match.visitor_id === teamId
          )
          .filter(match => {
            const goalsFavor = match.goals.filter(goal => goal.team_id === teamId).length;
            const goalsAgainst = match.goals.filter(goal => goal.team_id !== teamId).length;
            return goalsFavor < goalsAgainst;
          })
      )
      .flat().length;
  };

  const goalsInFavor = (teamId, type) => {
    let goals = 0;
    matchesUpToMatchday.value.forEach(day => {
      day.matches
        .filter(match =>
          type ? match[`${type}_id`] === teamId : match.host_id === teamId || match.visitor_id === teamId
        )
        .forEach(match => {
          goals += match.goals.filter(goal => goal.team_id === teamId).length;
        });
    });
    return goals;
  };

  const goalsAgainst = (teamId, type) => {
    let goals = 0;
    matchesUpToMatchday.value.forEach(day => {
      day.matches
        .filter(match =>
          type ? match[`${type}_id`] === teamId : match.host_id === teamId || match.visitor_id === teamId
        )
        .forEach(match => {
          goals += match.goals.filter(goal => goal.team_id !== teamId).length;
        });
    });
    return goals;
  };

  const goalDifference = (teamId, type) => {
    return goalsInFavor(teamId, type) - goalsAgainst(teamId, type);
  };

  const pointsTotal = (teamId, type) => {
    return matchesWon(teamId, type) * 3 + matchesTied(teamId, type);
  };

  const sortTeamPosition = (a, b) => {
    // return b.pointsTotal + b.goalDifference + b.goalsInFavor - (a.pointsTotal + a.goalDifference + a.goalsInFavor);
    return b.pointsTotal - a.pointsTotal
      ? b.pointsTotal - a.pointsTotal
      : b.goalDifference - a.goalDifference
      ? b.goalDifference - a.goalDifference
      : b.goalsInFavor - a.goalsInFavor
      ? b.goalsInFavor - a.goalsInFavor
      : b.goalsAgainst - a.goalsAgainst
      ? b.goalsAgainst - a.goalsAgainst
      : 0;
  };

  const sortedTeams = computed(() => [...teams.value].sort(sortTeamPosition));
</script>
<template>
  <div class="flex flex-col overflow-auto max-h-screen">
    <nav
      class="sticky top-0 z-10 inline-flex -space-x-px justify-center items-center bg-white p-1"
      aria-label="Pagination"
    >
      <div class="flex justify-center mr-2">Jornadas</div>
      <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
      <router-link
        v-for="(matchday, dayIndex) in matchdays"
        :key="matchday.id"
        :to="`/${route.params.league}/${route.params.season}/${matchday.id}${
          route.name === 'position_graph' ? '/posicion' : ''
        }`"
        aria-current="page"
        :class="[
          'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
          !dayIndex && 'rounded-l-md',
          matchdays.length > 0 && dayIndex === matchdays.length - 1 && 'rounded-r-md',
          matchday.id === +route.params.matchday &&
            'pointer-events-none z-10 bg-indigo-50 border-indigo-500 text-indigo-600',
        ]"
      >
        {{ dayIndex + 1 }}
      </router-link>
      <div>
        <button
          type="button"
          :class="[
            'relative inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 h-full ml-2',
            loadingMatchdays && 'pointer-events-none opacity-50',
          ]"
          :disabled="loadingMatchdays"
          @click="loadMatchdays"
        >
          <RefreshIcon class="h-4 w-4" />
        </button>
      </div>
    </nav>
    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Selecciona vista</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select
          id="tabs"
          name="tabs"
          class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          v-model="matchView"
        >
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current" :value="tab.name">
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
          <router-link
            v-for="(tab, tabIdx) in tabs"
            :key="tab.name"
            :to="`/${route.params.league}/${route.params.season}/${route.params.matchday}/${tab.to}`"
            :class="[
              tab.route_name === route.name ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
              tabIdx === 0 ? 'rounded-l-lg' : '',
              tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
              'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
            ]"
            :aria-current="tab.route_name === route.name ? 'page' : undefined"
          >
            <span>{{ tab.name }}</span>
            <span
              aria-hidden="true"
              :class="[
                tab.route_name === route.name ? 'bg-indigo-500' : 'bg-transparent',
                'absolute inset-x-0 bottom-0 h-0.5',
              ]"
            />
          </router-link>
        </nav>
      </div>
    </div>
    <router-view :table="sortedTeams" />
  </div>
</template>
