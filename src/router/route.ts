import { createRouter, createWebHistory } from 'vue-router'
import CreateAccountView from '@/views/CreateAccountView.vue'
import JoinRoomView from '@/views/JoinRoomView.vue'
import CreateRoomView from '@/views/CreateRoomView.vue'
import ChatMain from '@/components/ChatMain.vue'
import ProfileView from '@/views/ProfileView.vue'
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
      component: CreateAccountView
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
        { path: '', name: 'chat-main', component: () => ChatMain },
        { path: 'profile', name: 'profile', component: () => ProfileView }
      ]
    }
  ]
})
