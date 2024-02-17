import { useAxios } from '@vueuse/integrations/useAxios'
import { ref } from 'vue'
import type { User } from '../interfaces/user'
import { joinRoomUrl, postMethod, putMethod, updateUserUrl } from '@/api/requests'
import { defineStore } from 'pinia'

export const useUser = defineStore('user', () => {
  const { isLoading, error, execute } = useAxios()
  const user = ref<User>()

  const joinRoom = async ({ username, roomCode }: { username: string; roomCode: string }) => {
    const { data } = await execute(joinRoomUrl, {
      withCredentials: true,
      method: postMethod,
      data: { userName: username, roomCode }
    })
    if (data.value) {
      user.value = data.value
    }
  }
  const setUser = (payload: User | undefined) => {
    user.value = payload
  }
  const updateUser = async (payload: FormData) => {
    const { data } = await execute(updateUserUrl, {
      withCredentials: true,
      method: putMethod,
      data: payload
    })
    if (data.value && user.value) {
      user.value = { ...user.value, fullName: data.value.fullName, avatar: data.value.avatar }
    }
  }
  return {
    joinRoom,
    setUser,
    updateUser,
    isLoading,
    error,
    user
  }
})
