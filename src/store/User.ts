import { useAxios } from '@vueuse/integrations/useAxios'
import { ref } from 'vue'
import type { User } from '../interfaces/user'
import { joinRoomUrl, postMethod } from '@/api/requests'
import { defineStore } from 'pinia'

export const useUser = defineStore('user', () => {
  const { isLoading, error, execute } = useAxios()
  const user = ref<User>()

  const joinRoom = async ({ username, roomCode }: { username: any; roomCode: any }) => {
    const { data } = await execute(joinRoomUrl, {
      withCredentials: true,
      method: postMethod,
      data: { userName: username, roomCode }
    })
    if (data.value) {
      user.value = data.value
    }
  }
  const setUser = (payload: User) => {
    user.value = payload
  }
  return {
    joinRoom,
    setUser,
    isLoading,
    error,
    user
  }
})
