<template>
  <router-view v-if="userSession !== null" />
  <Auth v-else />
</template>
<script setup>
  import Auth from '../../components/Auth.vue';
  import { userSession } from '../../vuetils/useAuth';
</script>
<style lang="postcss" scoped></style>
