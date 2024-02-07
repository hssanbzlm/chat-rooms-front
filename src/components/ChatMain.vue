<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue';
import ChatMessage from '@/components/ChatMessage.vue';
import ChatProfile from '@/components/ChatProfile.vue';
import ChatHeader from '@/components/ChatHeader.vue'
import { useMessage } from '@/composables/Message'
import { useConnectedUsers } from '@/composables/ConnectedUsers';
import socket from '@/listeners/socket'
import { useUser } from '@/store/User';
import { onMounted } from 'vue';
import type { message } from '@/interfaces/message';

const { isLoading, error, messages, bindMessagesEvents, messageEmitter } = useMessage()
const { connectedUsers, binConnectedUsersEvent } = useConnectedUsers()
const userStore = useUser()

onMounted(() => {
    socket.connect()
    bindMessagesEvents()
    binConnectedUsersEvent()
})
const isMyMessage = (message: message) => {
    return message.sender.userName == userStore.user?.userName

}
const sendMessage = (message: string) => {
    messageEmitter(message)
}

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
                <div v-if="isLoading"> LOADING</div>
                <div v-else-if="error">
                    ERROR
                </div>
                <div v-else class="chat-history overflow-auto p-3">
                    <ul>
                        <ChatMessage v-for="message in messages" :key="message._id" :isMyMessage="isMyMessage(message)"
                            :time="message.date.toString()" :img="'https://bootdey.com/img/Content/avatar/avatar7.png'"
                            :message="message.content" :fullName="isMyMessage(message) ? 'You' : message.sender.fullName" />
                    </ul>
                </div>
                <div class="mb-1 p-1">
                    <ChatInput size="xl" icon="paper-plane" placeholder="Enter text here..." @send-message="sendMessage" />
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
