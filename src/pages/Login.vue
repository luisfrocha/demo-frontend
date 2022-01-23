<template>
  <div id="app" class="w-full h-full flex flex-col justify-center bg-gray-300">
    <div v-if="showPasswordReset" class="w-full h-full flex flex-col justify-center items-center p-4">
      <PasswordReset />
    </div>
    <div v-else-if="userSession === null" class="w-full h-full flex flex-col justify-center items-center p-4">
      <Auth />
    </div>
  </div>
</template>
<script setup>
  import { computed } from 'vue';
  import { userSession } from './vuetils/useAuth';
  import { getParameterByName } from './lib/helpers';
  const showPasswordReset = computed(() => getParameterByName('type', location.href) === 'recovery');
</script>
