<script setup lang="ts">
import { useConnectedUsers } from '@/store/ConnectedUsers';
import { useRoom } from '@/composables/RoomManager'
import { useMessage } from '@/store/Message'
import { useTypingUsers } from "@/store/TypingUsers"
import socket from "@/listeners/socket"
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
  <router-view></router-view>
</template>

<style scoped></style>
