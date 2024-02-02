import { useAxios } from '@vueuse/integrations/useAxios'
import { getMethod, getMessagesUrl } from '@/api/requests'
import { ref, watch } from 'vue'

export function useMessagesRequest() {
  const list = ref(1)
  const { isLoading, error, data, execute } = useAxios()
  const nextMessageList = () => (list.value += list.value + 1)

  const loadMessages = async () => {
    await execute(`${getMessagesUrl}/${list.value}`, {
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
    nextMessageList,
    data,
    isLoading,
    error
  }
}
