<template>
  <LeagueManager v-if="userSession !== null" />
  <Auth v-else />
</template>
<script setup>
  import Auth from '../../components/Auth.vue';
  import { userSession } from '../../vuetils/useAuth';
  import LeagueManager from '../../components/LeagueManager.vue';
</script>
<style lang="postcss" scoped></style>
