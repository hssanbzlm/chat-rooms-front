import { useAxios } from '@vueuse/integrations/useAxios'
import socket from '@/listeners/socket'
import { deleteMethod, destroyRoomUrl, leaveRoomUrl, postMethod } from '@/api/requests'
import { useUser } from '@/store/User'
import router from '@/router'
import { useMessage } from '@/store/Message'
import { useTypingUsers } from '@/store/TypingUsers'
import { useConnectedUsers } from '@/store/ConnectedUsers'

export function useRoom() {
  const { isLoading, error, execute } = useAxios()
  const userStore = useUser()
  const messageStore = useMessage()
  const typingUsersStore = useTypingUsers()
  const connectedUsersStore = useConnectedUsers()

  const bindRoomState = () => {
    socket.off('room:destroyed')
    socket.on('room:destroyed', async () => {
      await leaveRoom()
    })
  }

  const leaveRoom = async () => {
    const { data } = await execute(leaveRoomUrl, { withCredentials: true, method: postMethod })
    if (data) {
      socket.disconnect()
      userStore.setUser(undefined)
      messageStore.resetMessages()
      typingUsersStore.typingUsers = []
      connectedUsersStore.connectedUsers = []
      router.push({ name: 'join' })
    }
  }
  const destroyRoom = async () => {
    const { data } = await execute(destroyRoomUrl, { withCredentials: true, method: deleteMethod })
    if (data) {
      socket.emit('room:destroyed')
      socket.disconnect()
      userStore.setUser(undefined)
      typingUsersStore.typingUsers = []
      connectedUsersStore.connectedUsers = []
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
