<script setup>
  import { PlusSmIcon } from '@heroicons/vue/outline';
  import { nextTick, ref, onMounted, onUnmounted, watch } from 'vue';
  import { TransitionRoot } from '@headlessui/vue';
  import { supabase } from '../lib/supabase';
  import { useRouter } from 'vue-router';

  const leagues = ref([]);
  const showNewLeague = ref(false);
  const leagueName = ref('');
  const leagueNameRef = ref(null);
  const loadingLeagues = ref(true);
  const subscription = ref(null);
  const saveError = ref('some error');
  const selectedLeague = ref(null);
  const router = useRouter();

  const activateNewLeague = () => {
    showNewLeague.value = true;
    leagueName.value = '';
    nextTick(() => {
      leagueNameRef.value.focus();
    });
  };

  const cancelNewLeague = () => {
    showNewLeague.value = false;
    nextTick(() => {
      leagueName.value = '';
    });
  };

  watch(selectedLeague, val => {
    router.push(`/admin/${val}`);
  });

  const saveNewSeason = async () => {
    try {
      saveError.value = '';
      let { error, data: newLeague } = await supabase.from('league').insert({ name: leagueName.value }).single();
      if (error) {
        console.log(error);
        saveError.value = error.message;
      } else {
        console.log(newLeague);
        selectedLeague.value = newLeague.id;
        nextTick(() => {
          cancelNewLeague();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    try {
      const { data: tempLeagues } = await supabase.from('league').select('name, id');
      if (tempLeagues) {
        leagues.value = tempLeagues;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingLeagues.value = false;
    }

    subscription.value = supabase
      .from('league')
      // .on('*', payload => {
      //   console.log(payload);
      // })
      .on('INSERT', async payload => {
        leagues.value.push(payload.new);
      })
      .on('UPDATE', async payload => {
        if (payload.new.head !== payload.old.head) {
          const { data: head } = await supabase
            .from('user')
            .select('first_name,last_name')
            .match({ id: payload.new.head })
            .single();
          if (head) {
            payload.new.user = head;
          }
        }
        const index = groups.value.findIndex(group => group.id === payload.new.id);
        groups.value.splice(index, 1, payload.new);
      })
      .on('DELETE', payload => {
        const index = leagues.value.findIndex(league => league.id === payload.old.id);
        leagues.value.splice(index, 1);
      })
      .subscribe();
  });

  onUnmounted(() => {
    supabase.removeSubscription(subscription.value);
  });
</script>
<template>
  <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
    <div class="px-4 py-5 sm:px-6">
      <div class="flex justify-between relative">
        <label for="location" class="block text-sm font-medium text-gray-700 leading-3 py-2">Liga</label>
        <TransitionRoot
          as="template"
          :show="showNewLeague"
          enter="transition duration-150"
          enter-from="-translate-x-full opacity-0"
          enter-to="translate-x-0 opacity-100"
          leave="transition duration-150"
          leave-from="translate-x-0 opacity-100"
          leave-to="-translate-x-full opacity-0"
        >
          <div class="flex justify-end h-7 absolute right-0 grow-1 w-full sm:w-auto">
            <input
              v-model="leagueName"
              ref="leagueNameRef"
              type="text"
              name="text"
              id="text"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-2/3 md:w-1/3 lg:w-1/2 sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="Nombre de liga"
            />
            <button
              type="button"
              :class="[
                'inline-flex items-center p-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3',
                !leagueName && 'opacity-50 pointer-events-none',
              ]"
              :disabled="!leagueName"
              @click="saveNewSeason"
            >
              Guardar
            </button>
            <button
              type="button"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
              @click="cancelNewLeague"
            >
              Cancelar
            </button>
          </div>
        </TransitionRoot>
        <TransitionRoot
          as="template"
          :show="!showNewLeague"
          enter="transition duration-150"
          enter-from="translate-x-full opacity-0"
          enter-to="translate-y-0 opacity-100"
          leave="transition duration-150"
          leave-from="translate-y-0 opacity-100"
          leave-to="translate-x-full opacity-0"
        >
          <button
            type="button"
            class="absolute right-0 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
            @click="activateNewLeague"
          >
            <PlusSmIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </TransitionRoot>
      </div>
      <TransitionRoot
        :show="!showNewLeague && leagues.length > 0"
        enter="transition duration-75"
        enter-from="-translate-y-full opacity-0"
        enter-to="translate-y-0 opacity-100"
        leave="transition duration-150"
        leave-from="translate-y-0 opacity-100"
        leave-to="-translate-y-full opacity-0"
      >
        <select
          v-model="selectedLeague"
          id="location"
          name="location"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option :value="null">Selecciona una Liga</option>
          <option v-for="league in leagues" :key="league.id" :value="league.id">{{ league.name }}</option>
        </select>
      </TransitionRoot>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <router-view />
    </div>
  </div>
</template>
