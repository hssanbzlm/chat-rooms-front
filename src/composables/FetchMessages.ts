import { useAxios } from '@vueuse/integrations/useAxios'
import { getMethod } from '@/api/requests'

export function useFetchMessages() {
  const { isLoading, error, data, execute } = useAxios()

  const loadMessages = async (url: string) => {
    await execute(url, {
      method: getMethod,
      withCredentials: true
    })
  }

  return {
    loadMessages,
    data,
    isLoading,
    error
  }
}
