<script setup>
  import { ref, computed, useAttrs } from 'vue';

  const attrs = useAttrs();
  const table = computed(() => attrs.table);

  const headers = ref([
    { key: '', title: 'Pos' },
    { key: '', title: 'Club' },
    { key: '', title: 'JJ' },
    { key: '', title: 'JG' },
    { key: '', title: 'JE' },
    { key: '', title: 'JP' },
    { key: '', title: 'GF' },
    { key: '', title: 'GC' },
    { key: '', title: 'Dif' },
    { key: '', title: 'Pts' },
    { key: '', title: 'JJ' },
    { key: '', title: 'JG' },
    { key: '', title: 'JE' },
    { key: '', title: 'JP' },
    { key: '', title: 'GF' },
    { key: '', title: 'GC' },
    { key: '', title: 'Dif' },
    { key: '', title: 'Pts' },
    { key: '', title: 'JJ' },
    { key: '', title: 'JG' },
    { key: '', title: 'JE' },
    { key: '', title: 'JP' },
    { key: '', title: 'GF' },
    { key: '', title: 'GC' },
    { key: '', title: 'Dif' },
    { key: '', title: 'Pts' },
  ]);
</script>
<template>
  <div class="flex flex-col my-2">
    <div class="overflow-x-auto rounded-lg">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th colspan="10">
                  <div class="my-1 mx-2 flex">
                    <div class="rounded-lg bg-white shadow-md sm:grid sm:grid-cols-3 uppercase w-auto">
                      <div class="flex flex-row border-b border-gray-100 justify-center sm:border-0 sm:border-r">
                        <div
                          class="flex text-xs font-medium text-gray-500 align-center justify-center items-center px-2"
                        >
                          <div class="text-2xl font-extrabold text-green-500 mr-1">&bullet;</div>
                          <div>Clasificado</div>
                        </div>
                      </div>
                      <div
                        class="flex flex-row border-t border-b border-gray-100 p-1 justify-center sm:border-0 sm:border-l sm:border-r"
                      >
                        <div
                          class="flex text-xs font-medium text-gray-500 align-center justify-center items-center px-2"
                        >
                          <div class="text-2xl font-extrabold text-red-500 mr-1">&bullet;</div>
                          <div>Reclasificado Local</div>
                        </div>
                      </div>
                      <div class="flex flex-row border-t border-gray-100 p-1 justify-center sm:border-0 sm:border-l">
                        <div
                          class="flex text-xs font-medium text-gray-500 align-center justify-center items-center px-2"
                        >
                          <div class="text-2xl font-extrabold text-blue-600 mr-1">&bullet;</div>
                          <div>Reclasificado Visitante</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
                <th colspan="8" class="uppercase text-xs bg-lime-500 text-white">Local</th>
                <th colspan="10" class="uppercase text-xs bg-blue-900 text-white">Visitante</th>
              </tr>
              <tr>
                <th
                  v-for="column in headers"
                  :key="column.title"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ column.title }}
                </th>
              </tr>
            </thead>
            <tbody is="vue:transition-group" name="flip-list" tag="tbody">
              <tr
                v-for="(team, teamIdx) in table"
                :key="`team_${team.id}`"
                :class="[teamIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50', 'hover:bg-gray-100']"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                  {{ teamIdx + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <img class="inline-block h-8 w-8" :src="team.logo" :alt="team.name" />
                  {{ team.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.matchesPlayed }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.matchesWon }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.matchesTied }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.matchesLost }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.goalsInFavor }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.goalsAgainst }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.goalDifference }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.pointsTotal }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.host.matchesPlayed }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.host.matchesWon }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.host.matchesTied }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.host.matchesLost }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.host.goalsInFavor }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.host.goalsAgainst }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.host.goalDifference }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.host.pointsTotal }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.visitor.matchesPlayed }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.visitor.matchesWon }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.visitor.matchesTied }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.visitor.matchesLost }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.visitor.goalsInFavor }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.visitor.goalsAgainst }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.visitor.goalDifference }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ team.visitor.pointsTotal }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .flip-list-move {
    transition: transform 0.4s ease;
  }
</style>
