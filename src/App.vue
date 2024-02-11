<script setup lang="ts">
import { useConnectedUsers } from '@/store/ConnectedUsers';
const { bindConnectedUsersEvent } = useConnectedUsers()
bindConnectedUsersEvent()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
@/store/ConnectedUsers