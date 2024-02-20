import { ref } from 'vue'
import socket from '@/listeners/socket'
import { useUser } from '@/store/User'
import { defineStore } from 'pinia'
export const useTypingUsers = defineStore('typingUsers', () => {
  const userStore = useUser()
  const typingUsers = ref<string[]>([])
  const bindTypingUsers = () => {
    socket.off('user:typing')
    socket.off('user:finish-typing')
    socket.on('user:typing', (payload: string) => {
      if (
        payload !== userStore.user?.fullName &&
        !typingUsers.value.find((fullName) => fullName === payload)
      ) {
        typingUsers.value.push(payload)
      }
    })

    socket.on('user:finish-typing', (payload: string) => {
      typingUsers.value = typingUsers.value.filter((fn) => fn !== payload)
    })
  }

  const typingUserEmitter = () => {
    socket.emit('user:typing', userStore.user?.fullName)
  }
  const finishTypingUserEmitter = () => {
    socket.emit('user:finish-typing', userStore.user?.fullName)
  }

  return {
    bindTypingUsers,
    typingUserEmitter,
    finishTypingUserEmitter,
    typingUsers
  }
})
