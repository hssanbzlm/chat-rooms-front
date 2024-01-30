import { createRouter, createWebHistory } from 'vue-router'
import CreateAccountView from '@/views/CreateAccountView.vue'
import JoinRoomView from '@/views/JoinRoomView.vue'
import CreateRoomView from '@/views/CreateRoomView.vue'
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/account',
      name: 'account',
      component: CreateAccountView
    },
    {
      path: '/room',
      name: 'room',
      component: CreateRoomView
    },
    {
      path: '/join',
      name: 'join',
      component: JoinRoomView
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})
