import type { message } from '@/interfaces/message'
import { ref, watch, toValue } from 'vue'
import { useFetchMessages } from '@/composables/FetchMessages'
import socket from '@/listeners/socket'
import { getPrivateMessagesUrl } from '@/api/requests'

export const usePrivateMessages = () => {
  const list = ref(0)
  const msgToSkip = ref(0)
  const isLast = ref(true)
  const isTyping = ref(false)
  const { data, isLoading, error, loadMessages } = useFetchMessages()

  const messages = ref<message[]>([])

  const bindPrivateMessagesEvents = () => {
    socket.off('user-private:message')
    socket.off('user-private:typing')
    socket.off('user-private:finish-typing')
    socket.on('user-private:message', (message: message) => {
      messages.value.push(message)
      msgToSkip.value += 1
    })
    socket.on('user-private:typing', () => {
      isTyping.value = true
    })
    socket.on('user-private:finish-typing', () => {
      isTyping.value = false
    })
  }
  const joinRoomEmitter = (privateChatName: string) => {
    socket.emit('user-private:join', privateChatName)
  }
  const messageEmitter = ({
    content,
    date,
    userId,
    privateChatName
  }: {
    content: string
    date: Date
    userId: string
    privateChatName: string
  }) => {
    socket.emit('user-private:message', { to: userId, content, date, privateChatName })
  }
  watch(data, () => {
    messages.value.unshift(...data.value.messages)
    isLast.value = data.value.lastList
  })

  const loadNextMessages = (userId: string) => {
    list.value += 1
    const url = `${getPrivateMessagesUrl}/${userId}/${toValue(list)}?skip=${toValue(msgToSkip)}`
    loadMessages(url)
  }
  const resetMessages = () => {
    list.value = 0
    msgToSkip.value = 0
    isLast.value = true
    messages.value = []
    error.value = undefined
    isLoading.value = false
  }

  return {
    isLoading,
    error,
    messages,
    isLast,
    isTyping,
    bindPrivateMessagesEvents,
    joinRoomEmitter,
    resetMessages,
    messageEmitter,
    loadNextMessages
  }
}