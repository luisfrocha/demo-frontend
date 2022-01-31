<script setup>
  import { onMounted, ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { supabase } from '../../lib/supabase';

  const route = useRoute();
  const router = useRouter();

  const matchdays = ref([]);
  const matchdaySubscription = ref(null);
  const selectedMatchday = ref(route?.params?.matchday || null);

  console.log(route);

  const tabs = computed(() => [
    { name: 'Tabla', to: '', route_name: 'position_table', current: true },
    { name: 'Puntos', to: 'puntos', route_name: 'points_graph', current: false },
    { name: 'Posiciones', to: 'posicion', route_name: 'position_graph', current: false },
  ]);

  const loadMatchdays = async () => {
    if (route.params.season) {
      try {
        const { error, data } = await supabase
          .from('matchday')
          .select(
            'id,name,season_id,sort_order,matches:match(id,match_dt,host:team!match_host_id_fkey(id,name,logo),visitor:team!match_visitor_id_fkey(id,name,logo),goals:goal(id,team_id,score_minute))'
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
      }
    }
  };

  onMounted(() => {
    loadMatchdays();

    //   matchdaySubscription.value = supabase
    //     .from(`matchday:season_id=eq.${route.params.season}`)
    //     .on('INSERT', payload => {
    //       matchdays.value.push(payload.new);
    //     })
    //     .on('UPDATE', payload => {
    //       const index = matchdays.value.findIndex(matchday => matchday.id === payload.new.id);
    //       matchdays.value.splice(index, 1, payload.new);
    //     })
    //     .on('DELETE', payload => {
    //       const index = matchdays.value.findIndex(matchday => matchday.id === payload.old.id);
    //       matchdays.value.splice(index, 1);
    //     })
    //     .subscribe();
  });
</script>
<template>
  <div class="flex flex-col">
    <div class="flex justify-center">Jornadas</div>
    <nav class="relative z-0 inline-flex -space-x-px justify-center" aria-label="Pagination">
      <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
      <router-link
        v-for="(matchday, dayIndex) in matchdays"
        :key="matchday.id"
        :to="`/${route.params.league}/${route.params.season}/${matchday.id}`"
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
    </nav>
    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select
          id="tabs"
          name="tabs"
          class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        >
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
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
    <router-view />
  </div>
</template>
