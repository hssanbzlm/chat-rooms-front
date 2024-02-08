import type { message } from '@/interfaces/message'
import { ref, watch } from 'vue'
import { useFetchMessages } from '@/composables/FetchMessages'
import socket from '@/listeners/socket'

export function useMessage() {
  const list = ref(1)
  const msgToSkip = ref(0)
  const { data, isLoading, error } = useFetchMessages(list, msgToSkip)

  const messages = ref<message[]>([])

  const bindMessagesEvents = () => {
    socket.on('new-message', (data) => {
      messages.value.push(data)
      msgToSkip.value += 1
    })
  }
  const messageEmitter = (message: string) => {
    socket.emit('send-message', message)
  }
  watch(data, () => {
    messages.value.push(...data.value.messages)
    msgToSkip.value = 0
  })

  const loadNextMessages = () => {
    list.value += 1
  }

  return {
    isLoading,
    error,
    messages,
    bindMessagesEvents,
    messageEmitter,
    loadNextMessages
  }
}
