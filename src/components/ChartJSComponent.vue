<script setup>
  import { computed, toRefs, ref, watchEffect } from 'vue';
  import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
  import { format } from 'date-fns';

  const props = defineProps({ data: { type: Array }, type: { type: String } });
  const { data, type } = toRefs(props);

  const chartJS = ref(null);

  const allOffsets = {
    2: [-0.21, 0.18],
    4: [-0.212, 0.19, 0.19, 0.19],
    6: [-0.346, -0.218, -0.08, 0.05, 0.184, 0.315],
    8: [-0.35, -0.218, -0.08, -0.08, 0.05, 0.05, 0.185, 0.315],
    10: [-0.375, -0.295, -0.215, -0.135, -0.055, 0.025, 0.106, 0.185, 0.268, 0.345],
    12: [-0.375, -0.295, -0.215, -0.135, -0.055, 0.025, 0.106, 0.185, 0.268, 0.345, 0.268, 0.345],
    14: [-0.375, -0.295, -0.215, -0.135, -0.055, 0.025, 0.106, 0.185, 0.268, 0.345, 0.268, 0.345, 0.268, 0.345],
    16: [-0.39, -0.34, -0.29, -0.24, -0.19, -0.14, -0.09, -0.04, 0.01, 0.06, 0.11, 0.16, 0.21, 0.26, 0.31, 0.36],
    18: [
      -0.393,
      -0.347,
      -0.303,
      -0.26,
      -0.215,
      -0.17,
      -0.126,
      -0.081,
      -0.037,
      0.007,
      0.052,
      0.095,
      0.14,
      0.185,
      0.23,
      0.275,
      0.32,
      0.365,
    ],
  };

  const teamLogoPlugin = {
    id: 'teamLogo',
    afterDatasetDraw(chart) {
      const {
        data: { datasets: tempTeams },
        _metasets: metasets,
        ctx,
        scales: { x, y },
      } = chart;
      ctx.restore();
      const teams = tempTeams.filter(team => team.data[0] !== null);
      const offsets = allOffsets[teams.length];
      metasets.forEach(column => {
        const teamIndex = teams.findIndex(t => t.label === column.label);
        if (teamIndex !== -1 && !!teams[teamIndex].logo) {
          ctx.drawImage(
            teams[teamIndex].logo,
            x.getPixelForValue(offsets[teamIndex]),
            y.getPixelForValue(teams[teamIndex].data[0]) - 30 / 2,
            30,
            30
          );
        }
      });
      ctx.save();
    },
  };

  const initialData = {
    labels: ['0', '1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
        data: [0, 12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: '# of No Votes',
        data: [0, 6, 23, 7, 10, 5, 12],
        fill: false,
        backgroundColor: 'rgb(37, 99, 132)',
        borderColor: 'rgba(37, 99, 132, 0.2)',
      },
    ],
  };

  const options = computed(() => ({
    type,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        beginAtZero: true,
        grid: {
          offset: true,
        },
      },
    },
    layout: {
      margin: 30,
    },
    plugins: {
      legend: {
        title: { display: true, text: 'Team Standings' },
        position: 'right',
        labels: {
          sort: function (a, b, data) {
            return data.datasets[b.datasetIndex].data[0] - data.datasets[a.datasetIndex].data[0];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += `: ${Math.floor(context.raw)}`;
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        fullSize: true,
        text: 'LigaMX Season 2021-2022',
        font: { weight: 'bold', size: 20 },
      },
    },
  }));

  const formatData = data => {
    initialData.labels = data[0].data.map(match => format(match.date, 'MM/dd/yyyy'));
    initialData.datasets = data.map(team => ({
      ...team,
      label: team.id,
      data: team.data.map(match => match.y),
      fill: false,
      backgroundColor: team.color,
      borderColor: team.line,
      skipNull: true,
      clip: 15,
    }));
    return initialData;
  };
  const formattedData = computed(() => ({
    id: 'bar',
    type: 'bar',
    data: {
      labels: data.value.map(({ id }) => id),
      datasets: [
        {
          backgroundColor: data.value.map(({ color }) => color),
          data: data.value.map(({ data }) => data.map(({ y }) => y)),
        },
      ],
    },
  }));
  const beforeRenderLogic = event => {
    //...
    //if(a === b) {
    //  event.preventDefault()
    //}
  };
  watchEffect(() => {
    const chart = chartJS.value;
    console.log(chart);
    if (chart) {
      chart.data.labels = data.value.map(({ id }) => id);
      chart.data.datasets = [
        {
          backgroundColor: data.value.map(({ color }) => color),
          data: data.value.map(({ data }) => data.map(({ y }) => y)),
        },
      ];
      chart.update();
    }
  }, data.value);
</script>
<template>
  <div class="h-full">
    <vue3-chart-js
      :id="formattedData.id"
      ref="chartJS"
      :type="formattedData.type"
      :data="formattedData.data"
      @before-render="beforeRenderLogic"
    />
  </div>
</template>
