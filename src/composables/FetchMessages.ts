import { useAxios } from '@vueuse/integrations/useAxios'
import { getMethod, getMessagesUrl } from '@/api/requests'
import { toValue, type Ref, watch } from 'vue'

export function useFetchMessages(list: Ref<number>, msgToSkip: Ref<number>) {
  const { isLoading, error, data, execute } = useAxios()

  const loadMessages = async () => {
    await execute(`${getMessagesUrl}/${toValue(list)}`, {
      method: getMethod,
      withCredentials: true
    })
  }

  watch(
    list,
    () => {
      loadMessages()
    },
    { immediate: true }
  )

  return {
    loadMessages,
    data,
    isLoading,
    error
  }
}
