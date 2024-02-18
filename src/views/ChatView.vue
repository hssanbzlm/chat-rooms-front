<script setup lang="ts">
import ChatSetting from '@/components/ChatSetting.vue';
import { useUser } from '@/store/User'
import { useConnectedUsers } from '@/store/ConnectedUsers';
import { useRoom } from '@/composables/Room'
import { useMessage } from '@/store/Message'
import { useTypingUsers } from "@/store/TypingUsers"
import socket from "@/listeners/socket"
const userStore = useUser()
const { bindTypingUsers } = useTypingUsers()
const { bindRoomState } = useRoom()
const { bindConnectedUsersEvent } = useConnectedUsers()
const { bindMessagesEvents } = useMessage()
socket.off()
bindConnectedUsersEvent()
bindRoomState()
bindMessagesEvents()
bindTypingUsers()


</script>

<template>
  <div v-if="userStore.user">
    <ChatSetting :isAdmin="userStore.user.isAdmin" />
    <router-view></router-view>
  </div>
</template>
