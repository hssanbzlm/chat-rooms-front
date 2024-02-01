import { useAxios } from '@vueuse/integrations/useAxios'
import { getMethod, getMessagesUrl } from '@/api/requests'
import { type message } from '@/interfaces/message'
import { ref, watch } from 'vue'

export function useMessages() {
  const list = ref(1)
  const { isLoading, error, data, execute } = useAxios()
  const messages = ref<message[]>([])
  const nextMessageList = () => (list.value += list.value + 1)

  const loadMessages = async () => {
    await execute(`${getMessagesUrl}/${list.value}`, {
      method: getMethod,
      withCredentials: true
    })
    if (data.value) {
      messages.value.push(...data.value.messages)
    }
  }
  watch(
    list,
    () => {
      loadMessages()
    },
    { immediate: true }
  )

  return {
    nextMessageList,
    messages,
    isLoading,
    error
  }
}
