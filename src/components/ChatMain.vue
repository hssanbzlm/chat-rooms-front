<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue';
import ChatMessage from '@/components/ChatMessage.vue';
import ChatProfile from '@/components/ChatProfile.vue';
import ChatHeader from '@/components/ChatHeader.vue'
import ChatSpinner from "@/components/ChatSpinner.vue"
import ChatAlert from '@/components/ChatAlert.vue'
import { useMessage } from '@/composables/Message'
import { useConnectedUsers } from '@/composables/ConnectedUsers';
import { useTypingUsers } from "@/composables/TypingUsers"
import socket from '@/listeners/socket'
import { onMounted } from 'vue';
import { useInfiniteScroll } from '@vueuse/core'
import { ref, computed } from 'vue'

const { isLoading, error, messages, isLast, bindMessagesEvents, messageEmitter, loadNextMessages } = useMessage()
const { connectedUsers, binConnectedUsersEvent } = useConnectedUsers()
const { typingUserEmitter, notTypingUserEmitter, bindTypingUsers, typingUsers } = useTypingUsers()
const el = ref<HTMLElement>()
onMounted(() => {
    socket.connect()
    bindMessagesEvents()
    binConnectedUsersEvent()
    bindTypingUsers()
})

useInfiniteScroll(el, () => {
    loadNextMessages()
}, { distance: 50, direction: 'top', interval: 2000, canLoadMore: () => !isLast.value })

const sendMessage = (message: string) => {
    messageEmitter(message)
}
const isTyping = () => {
    typingUserEmitter()
}
const isNotTyping = () => {
    notTypingUserEmitter()
}

const typing = computed(() => {
    return typingUsers.value.length > 0 ? typingUsers.value.join(',') + ' typing' : ''
})

</script>

<template>
    <div class="container pt-1">
        <div class="card shadow-lg mb-4 d-flex flex-row">
            <div class="people-list p-3 d-none d-md-inline ">
                <ChatInput size="xl" icon="magnifying-glass" placeholder="Search ...." />
                <div class="chat-list overflow-auto mt-4 mb-0">
                    <ChatProfile v-for="user in connectedUsers" :key="user._id"
                        :img="'https://bootdey.com/img/Content/avatar/avatar1.png'" :name="user.fullName"
                        :status="'connected'" />
                </div>
            </div>
            <div class="chat w-100">
                <ChatHeader :chatName="'First chat'" :created="'10/10/2024'" />
                <div v-if="isLoading" class="position-absolute start-50 mt-1">
                    <ChatSpinner />
                </div>
                <div v-if="error">
                    <ChatAlert msg="Error loading messages" type="alert-danger" />
                </div>
                <div v-if="messages" class="chat-history overflow-auto d-flex flex-column-reverse p-3" ref="el">
                    <ul>
                        <ChatMessage v-for="message in messages" :key="message._id" :msg="message" />
                    </ul>
                </div>
                <div v-if="messages" class="mb-1 p-1">
                    <small class="text-muted">{{ typing }}</small>
                    <ChatInput size="xl" icon="paper-plane" placeholder="Enter text here..." @send-message="sendMessage"
                        @typing="isTyping" @not-typing="isNotTyping" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.people-list {
    width: 300px;
}

.chat-history,
.chat-list {
    height: 68vh;
}


@media (min-width: 768px) {
    .chat {
        border-left: 1px solid #eaeaea
    }
}
</style>
