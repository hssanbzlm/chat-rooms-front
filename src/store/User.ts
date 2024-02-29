import { useAxios } from '@vueuse/integrations/useAxios'
import { ref } from 'vue'
import type { User } from '../interfaces/user'

import { putMethod, updateUserUrl, getMethod, isAuthUrl } from '@/api/requests'
import { defineStore } from 'pinia'

export const useUser = defineStore('user', () => {
  const { isLoading, error, execute } = useAxios()
  const user = ref<User>()

  const updateUser = async (payload: FormData) => {
    const { data } = await execute(updateUserUrl, {
      withCredentials: true,
      withXSRFToken: true,
      method: putMethod,
      data: payload
    })
    if (data.value && user.value) {
      user.value = { ...user.value, fullName: data.value.fullName, avatar: data.value.avatar }
    }
  }
  const isUserAuth = async () => {
    const { data } = await execute(isAuthUrl, {
      method: getMethod,
      withCredentials: true,
      withXSRFToken: true
    })
    if (data.value) {
      user.value = data.value
    }
  }
  return {
    isUserAuth,
    updateUser,
    isLoading,
    error,
    user
  }
})
