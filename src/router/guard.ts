import { router } from './route'
import { useAxios } from '@vueuse/integrations/useAxios'
import { isAuthUrl, getMethod } from '@/api/requests'
const { execute } = useAxios()
router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    try {
      const { data } = await execute(isAuthUrl, { method: getMethod, withCredentials: true })
      if (data.value) return true
      else return false
    } catch (err) {
      return { name: 'join' }
    }
  } else {
    if (from.fullPath == '/' && to.name != 'join') {
      return { name: 'chat' }
    }
  }
})

export default router
