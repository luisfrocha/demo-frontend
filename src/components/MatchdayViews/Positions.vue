<script setup>
  import { computed, useAttrs, ref } from 'vue';
  import { Chart, Grid, Line, Tooltip } from 'vue3-charts';

  const data = ref([
    { name: 'Jan', pl: 1000, avg: 500, inc: 300 },
    { name: 'Feb', pl: 2000, avg: 900, inc: 400 },
    { name: 'Apr', pl: 400, avg: 400, inc: 500 },
    { name: 'Mar', pl: 3100, avg: 1300, inc: 700 },
    { name: 'May', pl: 200, avg: 100, inc: 200 },
    { name: 'Jun', pl: 600, avg: 400, inc: 300 },
    { name: 'Jul', pl: 500, avg: 90, inc: 100 },
  ]);

  const attrs = useAttrs();
  const table = computed(() => attrs.table);
  const pageWidth = computed(() => {
    return !!attrs.pageWidth ? attrs.pageWidth : 10;
  });
  const tableList = computed(() =>
    table.value.positions.map((team, index) => ({
      name: team.name,
      position: index + 1,
      logo: team.logo,
      points: team.pointsTotal,
      color: team.color,
    }))
  );
  const direction = ref('horizontal');
  const margin = ref({
    left: 0,
    top: 20,
    right: 20,
    bottom: 0,
  });
</script>
<template>
  <pre>{{ table }}</pre>
  <Chart :size="{ width: pageWidth, height: 400 }" :data="data" :margin="margin" :direction="direction">
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Line :dataKeys="['name', 'pl']" />
    </template>
    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          name: { hide: true },
          pl: { color: '#0077b6' },
          avg: { label: 'average', color: 'red' },
          inc: { hide: true },
        }"
      />
    </template>
  </Chart>
</template>
