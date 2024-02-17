import { useAxios } from '@vueuse/integrations/useAxios'
import socket from '@/listeners/socket'
import { deleteMethod, destroyRoomUrl, leaveRoomUrl, postMethod } from '@/api/requests'
import { useUser } from '@/store/User'
import router from '@/router'
import { useMessage } from '@/store/Message'

export function useRoom() {
  const { isLoading, error, execute } = useAxios()
  const userStore = useUser()
  const messageStore = useMessage()

  const bindRoomState = () => {
    socket.on('room:destroyed', async () => {
      await leaveRoom()
    })
  }

  const leaveRoom = async () => {
    const { data } = await execute(leaveRoomUrl, { withCredentials: true, method: postMethod })
    if (data) {
      socket.disconnect()
      socket.off()
      userStore.setUser(undefined)
      messageStore.resetMessages()
      router.push({ name: 'join' })
    }
  }
  const destroyRoom = async () => {
    const { data } = await execute(destroyRoomUrl, { withCredentials: true, method: deleteMethod })
    if (data) {
      socket.emit('room:destroyed')
      socket.disconnect()
      socket.off()
      userStore.setUser(undefined)
      messageStore.resetMessages()
      router.push({ name: 'join' })
    }
  }
  return {
    isLoading,
    error,
    destroyRoom,
    leaveRoom,
    bindRoomState
  }
}
