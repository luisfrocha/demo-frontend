<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const tabs = computed(() => [
    {
      name: 'Temporadas',
      to: `/admin/${route.params.league}`,
      current: route.name !== 'teams-editor',
    },
    {
      name: 'Equipos',
      to: `/admin/${route.params.league}/teams`,
      current: route.name === 'teams-editor',
    },
  ]);
</script>
<template>
  <div class="mb-2">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Selecciona una pestaña</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <router-link as="option" v-for="tab in tabs" :key="tab.name" :selected="tab.current" :to="tab.to">
          {{ tab.name }}
        </router-link>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <router-link
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.to"
            active-class="border-indigo-500 text-indigo-600"
            :class="[
              tab.current
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}
          </router-link>
        </nav>
      </div>
    </div>
  </div>
  <router-view />
</template>
