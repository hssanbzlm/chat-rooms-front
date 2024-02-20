import type { message } from '@/interfaces/message'
import { ref, watch, toValue } from 'vue'
import { useFetchMessages } from '@/composables/FetchMessages'
import socket from '@/listeners/socket'
import { defineStore } from 'pinia'
import { getMessagesUrl } from '@/api/requests'

export const useMessage = defineStore('message', () => {
  const list = ref(0)
  const msgToSkip = ref(0)
  const isLast = ref(true)
  const { data, isLoading, error, loadMessages } = useFetchMessages()

  const messages = ref<message[]>([])

  const bindMessagesEvents = () => {
    socket.off('user:message')
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
    const url = `${getMessagesUrl}/${toValue(list)}?skip=${toValue(msgToSkip)}`
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
    bindMessagesEvents,
    resetMessages,
    messageEmitter,
    loadNextMessages
  }
})
