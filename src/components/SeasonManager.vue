<script setup>
  import { PlusSmIcon, ExclamationIcon } from '@heroicons/vue/outline';
  import { nextTick, onMounted, ref } from 'vue';
  import { TransitionRoot } from '@headlessui/vue';
  import { supabase } from '../lib/supabase';

  const seasons = ref([]);
  const showNewSeason = ref(false);
  const seasonName = ref('');
  const seasonNameRef = ref(null);
  const loadError = ref('');

  onMounted(async () => {
    loadError.value = '';
    try {
      const { error, data: tempSeasons } = await supabase.from('season').select('id,name');
      if (error) {
        loadError.value = error.message;
      } else {
        seasons.value = tempSeasons;
      }
    } catch (error) {
      console.log(error);
    }
  });

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
    });
  };

  const saveNewSeason = () => {};
</script>
<template>
  <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
    <div class="px-4 py-5 sm:px-6 relative">
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
        <div class="flex justify-end h-7 absolute">
          <input
            v-model="seasonName"
            ref="seasonNameRef"
            type="text"
            name="text"
            id="text"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:text-sm border-gray-300 rounded-md p-2"
            placeholder="Nombre de temporada"
          />
          <button
            type="button"
            :class="[
              'inline-flex items-center p-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3',
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
      </TransitionRoot>
      <div class="flex justify-between relative">
        <label for="location" class="block text-sm font-medium text-gray-700 leading-3 py-2">Temporada</label>
        <TransitionRoot
          as="template"
          :show="!showNewSeason"
          enter="transition duration-150"
          enter-from="-translate-y-full opacity-0"
          enter-to="translate-y-0 opacity-100"
          leave="transition duration-150"
          leave-from="translate-y-0 opacity-100"
          leave-to="-translate-y-full opacity-0"
        >
          <button
            type="button"
            class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
            @click="activateNewSeason"
          >
            <PlusSmIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </TransitionRoot>
      </div>
      <TransitionRoot
        :show="!showNewSeason && seasons.length > 0"
        enter="transition duration-75"
        enter-from="-translate-y-full opacity-0"
        enter-to="translate-y-0 opacity-100"
        leave="transition duration-150"
        leave-from="translate-y-0 opacity-100"
        leave-to="-translate-y-full opacity-0"
      >
        <select
          id="location"
          name="location"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option :value="null">Select a season</option>
          <option v-for="season in seasons" :key="season.id">{{ season.name }}</option>
        </select>
      </TransitionRoot>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <div v-if="loadError" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <ExclamationIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Something happened!</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ loadError }}</p>
            </div>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>
