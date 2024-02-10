import { ref } from 'vue'
import type { User } from '@/interfaces/user'
import socket from '@/listeners/socket'
export function useConnectedUsers() {
  const connectedUsers = ref<User[]>([])

  const bindConnectedUsersEvent = () => {
    socket.on('user-join', (data) => {
      connectedUsers.value = data
    })
    socket.on('user-leave', (data) => {
      connectedUsers.value = data
    })
  }

  return { connectedUsers, bindConnectedUsersEvent }
}
