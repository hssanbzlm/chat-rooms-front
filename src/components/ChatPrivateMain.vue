<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue';
import ChatListMessage from '@/components/ChatListMessage.vue';
import ChatHeader from '@/components/ChatHeader.vue'
import ChatSpinner from "@/components/ChatSpinner.vue"
import ChatAlert from '@/components/ChatAlert.vue'
import { useUser } from '@/store/User';
import type { message } from '@/interfaces/message';
import router from '@/router';
const messages: message[] = [{ _id: 'unique', content: 'works', date: new Date(), sender: { _id: 'unique2', fullName: 'JJ', roomName: '', isAdmin: false, userName: '', avatar: '' }, receiver: '' }]
const isLast = true
const isLoading = false
const isError = false
const userStore = useUser()
const chatWith = router.currentRoute.value.params['idUser']
console.log(chatWith)

const sendMessage = (message: string) => {
    console.log('message sent')
}


const loadNextMessages = () => {
    console.log('next messages')
}
</script>

<template>
    <div class="container pt-1 d-flex justify-content-center">
        <div class="card shadow-lg mb-4 d-flex flex-row w-75">
            <div class="chat w-100">
                <ChatHeader :name="userStore.user?.roomName!" />
                <div v-if="isLoading" class="position-absolute start-50 mt-1">
                    <ChatSpinner />
                </div>
                <div v-if="isError">
                    <ChatAlert msg="Error loading messages" type="alert-danger" />
                </div>
                <ChatListMessage :messages="messages" :isLast="isLast" @load-next-messages="loadNextMessages" />
                <div v-if="messages" class="mb-1 p-1">
                    <ChatInput size="xl" icon="paper-plane" placeholder="Enter text here..." @send-message="sendMessage" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@media (min-width: 768px) {
    .chat {
        border-left: 1px solid #eaeaea
    }
}
</style>
