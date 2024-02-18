import { createRouter, createWebHistory } from 'vue-router'
import JoinRoomView from '@/views/JoinRoomView.vue'
import CreateRoomView from '@/views/CreateRoomView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'join',
      component: JoinRoomView
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/CreateAccountView.vue')
    },
    {
      path: '/room',
      name: 'room',
      component: CreateRoomView
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'chat-room-main',
          component: () => import('@/components/ChatRoomMain.vue')
        },
        { path: 'profile', name: 'profile', component: () => import('@/views/ProfileView.vue') },
        {
          path: 'private/:idUser',
          name: 'chat-private-main',
          component: () => import('@/components/ChatPrivateMain.vue')
        }
      ]
    }
  ]
})
