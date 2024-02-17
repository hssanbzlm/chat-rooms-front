import { ref } from 'vue'
import type { User } from '@/interfaces/user'
import socket from '@/listeners/socket'
import { defineStore } from 'pinia'
export const useConnectedUsers = defineStore('connectedUsers', () => {
  const connectedUsers = ref<User[]>([])

  const bindConnectedUsersEvent = () => {
    socket.off('user:join')
    socket.off('user:leave')
    socket.on('user:join', (data) => {
      connectedUsers.value = data
    })
    socket.on('user:leave', (data) => {
      connectedUsers.value = data
    })
  }
  return { connectedUsers, bindConnectedUsersEvent }
})
