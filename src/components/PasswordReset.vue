<template>
  <main class="w-full sm:w-1/2 xl:w-1/3">
    <div class="border-teal p-8 border-t-12 mb-6 rounded-lg shadow-lg bg-white">
      <div class="mb-4">
        <label class="font-bold text-grey-darker block mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          class="
            block
            appearance-none
            w-full
            bg-white
            border border-grey-light
            hover:border-grey
            px-2
            py-2
            rounded
            shadow
          "
          placeholder="Your password"
        />
      </div>

      <div class="flex flex-col gap-2">
        <a href="#" class="btn-black" tabindex="0" @click="handleUpdateUser({ password: password })">
          Update password
        </a>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  const name = 'Auth';
  import { ref } from 'vue';
  import { handleUpdateUser } from '../vuetils/useAuth';
  const password = ref('');
</script>
