<script setup lang="ts">
import ChatSetting from '@/components/ChatSetting.vue';
import { useUser } from '@/store/User'
import { storeToRefs } from 'pinia'
const userStore = useUser()
const { user } = storeToRefs(userStore)



</script>

<template>
  <div v-if="user">
    <ChatSetting :isAdmin="user.isAdmin" />
    <router-view></router-view>
  </div>
</template>
