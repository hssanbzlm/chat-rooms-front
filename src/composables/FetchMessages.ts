import { useAxios } from '@vueuse/integrations/useAxios'
import { getMethod, getMessagesUrl } from '@/api/requests'
import { toValue, type Ref, watch } from 'vue'

export function useFetchMessages(list: Ref<number>, msgToSkip: Ref<number>) {
  const { isLoading, error, data, execute } = useAxios()

  const loadMessages = async () => {
    await execute(`${getMessagesUrl}/${toValue(list)}?skip=${toValue(msgToSkip)}`, {
      method: getMethod,
      withCredentials: true
    })
  }

  watch(list, () => {
    if (list.value > 0) loadMessages()
  })

  return {
    loadMessages,
    data,
    isLoading,
    error
  }
}
