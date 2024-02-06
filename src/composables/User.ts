import { useAxios } from '@vueuse/integrations/useAxios'
import { ref } from 'vue'
import type { User } from '../interfaces/user'
import { joinRoomUrl, postMethod } from '@/api/requests'

export function useUser() {
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
  return {
    joinRoom,
    isLoading,
    error,
    user
  }
}
