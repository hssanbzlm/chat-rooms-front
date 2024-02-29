import { router } from './route'
import { useUser } from '@/store/User'
router.beforeEach(async (to, from, next) => {
  const userStore = useUser()
  if (to.meta.requiresAuth) {
    if (userStore.user) {
      next()
    } else {
      try {
        await userStore.isUserAuth()
        if (userStore.user) {
          next()
        } else next({ name: 'join' })
      } catch (err) {
        next({ name: 'join' })
      }
    }
  } else {
    if (userStore.user) next({ name: 'chat-room-main' })
    else if (to.redirectedFrom && to.redirectedFrom.name === 'chat-room-main') next()
    else if (to.redirectedFrom === undefined && from.name === undefined) {
      next({ name: 'chat-room-main' })
    } else next()
  }
})

export default router
