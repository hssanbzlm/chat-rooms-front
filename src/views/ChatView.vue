<script setup lang="ts">
import ChatSetting from '@/components/ChatSetting.vue';
import ChatMain from '@/components/ChatMain.vue'
import { useUser } from '@/store/User'

const userStore = useUser()


</script>

<template>
  <div v-if="userStore.user">
    <ChatSetting :isAdmin="userStore.user.isAdmin" />
    <ChatMain />
  </div>
</template>
