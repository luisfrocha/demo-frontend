<script setup>
  import { TransitionRoot } from '@headlessui/vue';
  import { ref, nextTick, onMounted, onUnmounted } from 'vue';
  import { supabase } from '../lib/supabase';
  import { useRoute } from 'vue-router';
  import FileUpload from './FileUpload.vue';

  const route = useRoute();
  const loadingTeams = ref(true);
  const loadError = ref('');
  const saveError = ref('');
  const selectedLeague = ref(parseInt(route?.params?.league) || null);
  const subscription = ref(null);
  const newTeamName = ref('');
  const newTeamLogo = ref('');
  const newTeamNameRef = ref(null);
  const showNewTeamForm = ref(false);
  const teams = ref([]);

  const saveNewTeam = async () => {
    saveError.value = '';
    try {
      let { error, data: newTeam } = await supabase
        .from('team')
        .insert({ name: newTeamName.value, league: selectedLeague.value, logo: newTeamLogo.value })
        .single();
      if (error) {
        saveError.value = error.message;
      } else {
        cancelNewTeam();
      }
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    loadError.value = '';
    try {
      const { error, data: tempTeams } = await supabase
        .from('team')
        .select('id,name,logo')
        .eq('league', route.params.league);
      if (error) {
        loadError.value = error.message;
      } else {
        teams.value = tempTeams;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingTeams.value = false;
    }

    subscription.value = supabase
      .from(`team:league=eq.${route.params.league}`)
      .on('INSERT', payload => {
        console.log(payload.new);
        teams.value.push(payload.new);
      })
      .on('UPDATE', payload => {
        const index = teams.value.findIndex(team => team.id === payload.new.id);
        teams.value.splice(index, 1, payload.new);
      })
      .on('DELETE', payload => {
        const index = teams.value.findIndex(team => team.id === payload.old.id);
        teams.value.splice(index, 1);
      })
      .subscribe();
  });

  onUnmounted(() => {
    supabase.removeSubscription(subscription.value);
  });

  const activateNewTeamForm = () => {
    newTeamName.value = '';
    newTeamLogo.value = null;
    showNewTeamForm.value = true;
    nextTick(() => {
      newTeamNameRef.value.focus();
    });
  };
  const cancelNewTeam = () => {
    newTeamName.value = '';
    newTeamLogo.value = null;
    showNewTeamForm.value = false;
  };
</script>
<template>
  <div class="bg-white shadow rounded-lg divide-y divide-gray-200">
    <div class="px-2 py-3 sm:px-3">
      <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div class="ml-4 mt-2">
            <h3 class="text-lg leading-6 font-medium text-gray-900 my-1">Equipos</h3>
          </div>
          <div class="ml-4 mt-2 flex-shrink-0">
            <TransitionRoot
              :show="!showNewTeamForm"
              enter="transition duration-150"
              enter-from="scale-0 opacity-0"
              enter-to="scale-100 opacity-100"
              leave="transition duration-150"
              leave-from="scale-100 opacity-100"
              leave-to="scale-0 opacity-0"
            >
              <button
                type="button"
                class="relative inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="activateNewTeamForm"
              >
                Añadir Equipo
              </button>
            </TransitionRoot>
          </div>
        </div>
      </div>
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3">
        <li
          v-for="team in teams"
          :key="team.id"
          class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div class="flex-1 flex flex-col p-8">
            <img
              class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
              :src="team.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
              :alt="team.name"
            />
            <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ team.name }}</h3>
          </div>
        </li>
        <TransitionRoot
          as="template"
          :show="showNewTeamForm"
          enter="transition duration-150"
          enter-from="scale-0 opacity-0"
          enter-to="scale-100 opacity-100"
          leave="transition duration-150"
          leave-from="scale-100 opacity-100"
          leave-to="scale-0 opacity-0"
        >
          <li
            key="new_team"
            class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div class="flex-1 flex flex-col px-4 py-3">
              <FileUpload v-model="newTeamLogo" />
              <div
                class="relative border-0 px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 mt-1 transition duration-200"
              >
                <label
                  for="newTeamName"
                  class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                  >Nombre de nuevo equipo</label
                >
                <input
                  v-model="newTeamName"
                  ref="newTeamNameRef"
                  type="text"
                  name="newTeamName"
                  id="newTeamName"
                  class="team-input block w-max border-2 border-gray-300 rounded-md p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm h-12 text-center -ml-3.5 -mt-2.5 -mb-2.5 -mr-20 transition duration-200"
                  placeholder="Nombre de nuevo equipo"
                />
              </div>
            </div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div class="w-0 flex-1 flex">
                <button
                  class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-1 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 bg-red-100 hover:bg-red-200 transition duration-200"
                  @click="cancelNewTeam"
                >
                  Cancelar
                </button>
              </div>
              <div class="-ml-px w-0 flex-1 flex">
                <button
                  :class="[
                    'relative w-0 flex-1 inline-flex items-center justify-center py-1 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 bg-green-100 hover:bg-green-200 transition duration-200',
                    (!newTeamLogo || !newTeamName) && 'pointer-events-none opacity-50',
                  ]"
                  :disabled="!newTeamLogo || !newTeamName"
                  @click="saveNewTeam"
                >
                  Guardar
                </button>
              </div>
            </div>
          </li>
        </TransitionRoot>
      </ul>
    </div>
  </div>
</template>
<style>
  .team-input {
    width: calc(100% + 1.8rem) !important;
  }
</style>
