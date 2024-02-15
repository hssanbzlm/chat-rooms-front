import type { message } from '@/interfaces/message'
import { ref, watch } from 'vue'
import { useFetchMessages } from '@/composables/FetchMessages'
import socket from '@/listeners/socket'
import { defineStore } from 'pinia'

export const useMessage = defineStore('message', () => {
  const list = ref(1)
  const msgToSkip = ref(0)
  const isLast = ref(true)
  const { data, isLoading, error } = useFetchMessages(list, msgToSkip)

  const messages = ref<message[]>([])

  const bindMessagesEvents = () => {
    socket.on('user:message', (data) => {
      messages.value.push(data)
      msgToSkip.value += 1
    })
  }
  const messageEmitter = ({ content, date }: { content: string; date: Date }) => {
    socket.emit('user:message', { content, date })
  }
  watch(data, () => {
    messages.value.unshift(...data.value.messages)
    isLast.value = data.value.lastList
  })

  const loadNextMessages = () => {
    list.value += 1
  }

  return {
    isLoading,
    error,
    messages,
    isLast,
    bindMessagesEvents,
    messageEmitter,
    loadNextMessages
  }
})
