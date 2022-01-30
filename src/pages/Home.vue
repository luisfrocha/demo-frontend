<script setup>
  // import { /* ref, */ computed } from 'vue';
  // import { /* isEqual, */ parseISO, getTime, format, closestIndexTo } from 'date-fns';
  // import {
  //   ChevronRightIcon,
  //   ChevronLeftIcon,
  //   ChevronDoubleLeftIcon,
  //   ChevronDoubleRightIcon,
  // } from '@heroicons/vue/solid';
  // import ChartJSComponent from '../components/ChartJSComponent.vue';
  // import data from '../data';
  import Breadcrumbs from '../components/Breadcrumbs.vue';
  // import MatchDay from '../components/MatchDay.vue';
  // import { useRoute } from 'vue-router';

  // const route = useRoute();
  // const currentDateIndex = ref(0);

  // const formattedScores = computed(() => {
  //   let dates = [];
  //   data.forEach(team => {
  //     team.data.forEach(match => {
  //       dates.push(match.x);
  //     });
  //   });
  //   dates = [...new Set(dates)];
  //   dates = dates.map(date => parseISO(date));
  //   dates.sort((date1, date2) => getTime(date1) - getTime(date2));

  //   return data.map(team => {
  //     team.points = 0;
  //     team.goals = 0;
  //     dates.forEach((date, dateIndex) => {
  //       const foundDateIndex = team.data.findIndex(match => match.x === format(date, 'yyyy-MM-dd'));
  //       if (foundDateIndex === -1) {
  //         const index = closestIndexTo(date, team.data);
  //         const newDate = format(date, 'yyyy-MM-dd');
  //         team.data.splice(index, 0, { date, x: newDate, y: 0 });
  //       } else {
  //         if (!!!team.data[foundDateIndex].date) {
  //           team.data[foundDateIndex].date = date;
  //         }
  //         if (dateIndex === 1 && !team.data[foundDateIndex].goals) {
  //           team.data[foundDateIndex].y = null;
  //         }
  //       }
  //     });
  //     team.data = team.data
  //       .sort((match1, match2) => getTime(match1.date) - getTime(match2.date))
  //       .map((match, matchIndex) => {
  //         if (matchIndex > 0) {
  //           if (!!match.goals) {
  //             if (match.goals.favor > match.goals.against) {
  //               team.points += 3;
  //             } else if (match.goals.favor === match.goals.against) {
  //               team.points++;
  //             }
  //             team.goals += match.goals.favor - match.goals.against;
  //             match.y = team.points + team.goals * 0.1;
  //           } else if (!!team.data[matchIndex - 1] && matchIndex > 1) {
  //             match.y = team.data[matchIndex - 1].y;
  //           } else {
  //             match.y = null;
  //           }
  //         }
  //         return match;
  //       });
  //     return team;
  //   });
  // });

  // const newLabels = computed(() => formattedScores.value[0].data.map(match => match.date));

  // const scoreData = computed(() =>
  //   formattedScores.value.map(team => ({
  //     ...team,
  //     data: team.data.filter(match => isEqual(match.date, newLabels.value[currentDateIndex.value])),
  //   }))
  // );
</script>
<template>
  <Breadcrumbs />
  <router-view />
  <!-- <MatchDay v-if="route.params.season" /> -->
  <!-- <ChartJSComponent class="chart" :options="scoreData" :data="scoreData" /> -->
  <!-- <div class="flex justify-between mt-3">
    <button
      :class="[
        'inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        currentDateIndex === 0 ? 'pointer-events-none opacity-50' : null,
      ]"
      :disabled="currentDateIndex === 0"
      @click="currentDateIndex = 0"
    >
      <ChevronDoubleLeftIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
      First
    </button>
    <button
      :class="[
        'inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        currentDateIndex === 0 ? 'pointer-events-none opacity-50' : null,
      ]"
      :disabled="currentDateIndex === 0"
      @click="currentDateIndex = currentDateIndex - 1"
    >
      <ChevronLeftIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
      Previous
    </button>
    <span>{{ format(newLabels[currentDateIndex], 'MM/dd/yyyy') }}</span>
    <button
      :class="[
        'inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        currentDateIndex === newLabels.length - 1 ? 'pointer-events-none opacity-50' : null,
      ]"
      :disabled="currentDateIndex === newLabels.length - 1"
      @click="currentDateIndex = currentDateIndex + 1"
    >
      Next
      <ChevronRightIcon class="-mr-0.5 ml-2 h-4 w-4" aria-hidden="true" />
    </button>
    <button
      :class="[
        'inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        currentDateIndex === newLabels.length - 1 ? 'pointer-events-none opacity-50' : null,
      ]"
      :disabled="currentDateIndex === newLabels.length - 1"
      @click="currentDateIndex = newLabels.length - 1"
    >
      Last
      <ChevronDoubleRightIcon class="-mr-0.5 ml-2 h-4 w-4" aria-hidden="true" />
    </button>
  </div> -->
</template>

<style lang="postcss" scoped></style>
