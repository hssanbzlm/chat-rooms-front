import { router } from './route'
import { useAxios } from '@vueuse/integrations/useAxios'
import { isAuthUrl, getMethod } from '@/api/requests'
import { useUser } from '@/store/User'
const { execute } = useAxios()
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const userStore = useUser()
    if (userStore.user) {
      next()
    } else {
      try {
        const { data } = await execute(isAuthUrl, { method: getMethod, withCredentials: true })
        if (data.value) {
          userStore.setUser(data.value)
          next()
        } else next({ name: 'join' })
      } catch (err) {
        next({ name: 'join' })
      }
    }
  } else {
    if (to.redirectedFrom && to.redirectedFrom.name === 'chat') next()
    else if (to.redirectedFrom === undefined && from.name === undefined) {
      next({ name: 'chat' })
    } else next()
  }
})

export default router
