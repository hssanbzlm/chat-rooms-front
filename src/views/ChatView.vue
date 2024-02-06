<script setup lang="ts">
import ChatSetting from '@/components/ChatSetting.vue';
import ChatMain from '@/components/ChatMain.vue'
import { useUser } from '@/store/User'

const userStore = useUser()


</script>

<template>
  <ChatSetting :isAdmin="userStore.user!.isAdmin" />
  <ChatMain />
</template>
