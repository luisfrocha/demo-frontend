<script setup>
  import { onMounted, ref, toRefs, nextTick, onUnmounted } from 'vue';
  import { format } from 'date-fns';
  import { supabase } from '../lib/supabase';
  import { MinusIcon, PlusIcon } from '@heroicons/vue/outline';
  import { TransitionRoot } from '@headlessui/vue';

  const props = defineProps({ match: { type: Object, required: true } });
  const { match } = toRefs(props);
  const newScore = ref({});
  const goalsSubscription = ref(null);
  const scoreInput = ref(null);
  const savingScore = ref(false);

  onMounted(() => {
    goalsSubscription.value = supabase
      .from(`goal:match_id=eq.${match.value.id}`)
      .on('INSERT', payload => {
        match.value.goals.push(payload.new);
      })
      .on('DELETE', payload => {
        match.value.goals = match.value.goals.filter(goal => goal.id !== payload.old.id);
      })
      .subscribe();
  });

  const showNewScoreForm = (match, scorer) => {
    newScore.value = {
      match_id: match.id,
      team_id: match[scorer].id,
      score_minute: null,
    };
    nextTick(() => {
      scoreInput.value.focus();
    });
  };

  const reduceScore = async (match, scorer) => {
    const scorerGoals = match.goals.filter(goal => goal.team_id === match[scorer].id);
    const { error } = await supabase
      .from('goal')
      .delete()
      .match({ id: scorerGoals[scorerGoals.length - 1].id });
    if (!error) {
      match.goals = match.goals.filter(goal => goal.id !== scorerGoals[scorerGoals.length - 1].id);
    }
  };

  const saveNewScore = async () => {
    savingScore.value = true;
    try {
      const { error, data: goal } = await supabase.from('goal').insert(newScore.value).single();
      if (error) {
        console.log(error);
      } else {
        newScore.value = {};
        match.value.goals.push(goal);
      }
    } catch (error) {
      console.log(error);
    } finally {
      savingScore.value = false;
    }
  };
  onUnmounted(() => {
    if (goalsSubscription.value) {
      supabase.removeSubscription(goalsSubscription.value);
    }
  });
</script>
<template>
  <li class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
    <div class="flex flex-wrap">
      <div class="flex-1 flex flex-col py-1">
        <img
          class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
          :src="match.host.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
          :alt="match.host.name"
        />
        <h3 class="mt-6 text-gray-900 text-sm font-medium">
          {{ match.host.name }}
        </h3>
      </div>
      <div class="flex-1 flex flex-col py-1">
        <img
          class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
          :src="match.visitor.logo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')"
          :alt="match.visitor.name"
        />
        <h3 class="mt-6 text-gray-900 text-sm font-medium">
          {{ match.visitor.name }}
        </h3>
      </div>
      <div class="bg-white px-2 py-3 flex items-center justify-between border-t border-gray-200 sm:px-3 mx-auto w-full">
        <div class="flex-1 flex items-center justify-between w-full">
          <div class="w-full">
            <nav class="relative z-0 flex rounded-md w-full justify-center" aria-label="Pagination">
              <button
                :class="[
                  'relative flex items-center p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 my-4 sm:p-1 lg:p-2',
                  match.goals.filter(goal => goal.team_id === match.host.id).length === 0 &&
                    'pointer-events-none opacity-50',
                ]"
                :disabled="match.goals.filter(goal => goal.team_id === match.host.id).length === 0"
                @click="reduceScore(match, 'host')"
              >
                <span class="sr-only">Reducir Marcador</span>
                <MinusIcon class="h-4 w-4 sm:w-3 sm:h-3 lg:h-4 lg:w-4" aria-hidden="true" />
              </button>
              <span
                class="relative inline-flex items-center px-4 py-2 bg-white text-4xl font-bold text-gray-700 sm:px-2 sm:py-1 sm:text-2xl md:text-3xl lg:text-4xl"
              >
                {{ match.goals.filter(goal => goal.team_id === match.host.id).length }}
              </span>
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 my-4 sm:p-2"
                @click="showNewScoreForm(match, 'host')"
              >
                <span class="sr-only">Añadir Gol</span>
                <PlusIcon class="h-4 w-4 sm:w-3 sm:h-3 lg:h-4 lg:w-4" aria-hidden="true" />
              </button>
              <span
                class="relative inline-flex items-center px-4 py-2 bg-white text-xl font-bold text-gray-700 sm:px-2 sm:py-1 sm:text-lg md:text-xl"
              >
                -
              </span>
              <button
                :class="[
                  'relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 my-4 sm:p-1 lg:p-2',
                  match.goals.filter(goal => goal.team_id === match.visitor.id).length === 0 &&
                    'pointer-events-none opacity-50',
                ]"
                :disabled="match.goals.filter(goal => goal.team_id === match.visitor.id).length === 0"
                @click="reduceScore(match, 'visitor')"
              >
                <span class="sr-only">Reducir Marcador</span>
                <MinusIcon class="h-4 w-4 sm:w-3 sm:h-3 lg:h-4 lg:w-4" aria-hidden="true" />
              </button>
              <span
                class="relative inline-flex items-center px-4 py-2 bg-white text-4xl font-bold text-gray-700 sm:px-2 sm:py-1 sm:text-2xl md:text-3xl lg:text-4xl"
              >
                {{ match.goals.filter(goal => goal.team_id === match.visitor.id).length }}
              </span>
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 my-4 sm:p-1 lg:p-2"
                @click="showNewScoreForm(match, 'visitor')"
              >
                <span class="sr-only">Añadir gol</span>
                <PlusIcon class="h-4 w-4 sm:w-3 sm:h-3 lg:h-4 lg:w-4" aria-hidden="true" />
              </button>
              <TransitionRoot
                :show="!!newScore.match_id && newScore.match_id === match.id"
                as="template"
                enter="transition duration-150"
                enter-from="-translate-y-full opacity-0"
                enter-to="translate-y-0 opacity-100"
                leave="transition duration-150"
                leave-from="translate-y-0 opacity-100"
                leave-to="-translate-y-full opacity-0"
              >
                <div
                  :class="[
                    'absolute top-0 w-full h-full sm:h-16 md:h-18 bg-white shadow sm:rounded-lg py-2.5 flex items-center justify-between space-x-3 border',
                    newScore.team_id === match.visitor.id && 'flex-row-reverse',
                  ]"
                >
                  <div class="min-w-0 flex-1 flex items-center space-x-2 h-full px-2">
                    <input
                      v-model="newScore.score_minute"
                      ref="scoreInput"
                      type="number"
                      name="score_minute"
                      id="score_minute"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md h-full text-center"
                      placeholder="minuto"
                    />
                  </div>
                  <div class="flex-shrink-0 p-2 align-center justify-center flex flex-col">
                    <button
                      type="button"
                      :class="[
                        'inline-flex items-center px-2.5 py-0 my-1 mt-2 border border-transparent text-xs font-medium rounded text-green-100 hover:text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:focus:ring-green-600 justify-center',
                        (!newScore.score_minute || savingScore) && 'pointer-events-none opacity-50',
                      ]"
                      :disabled="!newScore.score_minute || savingScore"
                      @click="saveNewScore"
                    >
                      <span class="text-sm font-medium text-gray-900"> Save </span>
                    </button>
                    <button
                      type="button"
                      :class="[
                        'inline-flex items-center px-2.5 py-0 my-1 mb-2 border border-transparent text-xs font-medium rounded bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:focus:ring-red-600 justify-center',
                      ]"
                      @click="newScore = {}"
                    >
                      <span class="text-sm font-medium text-white"> Cancel </span>
                    </button>
                  </div>
                </div>
              </TransitionRoot>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <dl class="mt-1 flex-grow flex flex-col justify-center align-center">
      <dt class="sr-only">Empieza</dt>
      <dd class="text-gray-500 text-md font-bold">
        {{ format(match.match_dt, 'Pp') }}
      </dd>
    </dl>
  </li>
</template>
