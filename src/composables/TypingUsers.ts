import { ref } from 'vue'
import socket from '@/listeners/socket'
import { useUser } from '@/store/User'
export function useTypingUsers() {
  const userStore = useUser()
  const typingUsers = ref<string[]>([])

  const bindTypingUsers = () => {
    socket.on('user-typing', (payload: string) => {
      typingUsers.value.push(payload)
    })
    socket.on('not-typing', (payload: string) => {
      typingUsers.value = typingUsers.value.filter((fn) => fn !== payload)
    })
  }

  const typingUserEmitter = () => {
    socket.emit('user-typing', userStore.user?.fullName)
  }
  const notTypingUserEmitter = () => {
    socket.emit('not-typing', userStore.user?.fullName)
  }

  return {
    bindTypingUsers,
    typingUserEmitter,
    notTypingUserEmitter,
    typingUsers
  }
}