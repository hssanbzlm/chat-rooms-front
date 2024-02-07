import type { message } from '@/interfaces/message'
import { ref, watch } from 'vue'
import { useMessagesRequest } from '@/composables/MessagesRequest'
import socket from '@/listeners/socket'

export function useMessage() {
  const { data, isLoading, error, nextMessageList } = useMessagesRequest()

  const messages = ref<message[]>([])

  const bindMessagesEvents = () => {
    socket.on('new-message', (data) => {
      messages.value.push(data)
    })
  }
  const messageEmitter = (message: string) => {
    socket.emit('send-message', message)
  }
  watch(data, () => {
    messages.value.push(...data.value.messages)
  })

  return {
    isLoading,
    error,
    messages,
    nextMessageList,
    bindMessagesEvents,
    messageEmitter
  }
}
