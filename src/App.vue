<script setup lang="ts">
import { useConnectedUsers } from '@/composables/ConnectedUsers';
const { bindConnectedUsersEvent } = useConnectedUsers()
bindConnectedUsersEvent()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
