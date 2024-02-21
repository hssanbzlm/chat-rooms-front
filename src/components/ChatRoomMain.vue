<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue';
import ChatListMessage from '@/components/ChatListMessage.vue';
import ChatConnectedList from '@/components/ChatConnectedList.vue';
import ChatHeader from '@/components/ChatHeader.vue'
import ChatSpinner from "@/components/ChatSpinner.vue"
import ChatAlert from '@/components/ChatAlert.vue'
import { useMessage } from '@/store/Message'
import { useUser } from '@/store/User';
import { useTypingUsers } from "@/store/TypingUsers"
import { computed, onMounted, ref } from 'vue'
import SearchInput from './SearchInput.vue';
import { useConnectedUsers } from '@/store/ConnectedUsers';
import { storeToRefs } from 'pinia'

const typingUsersStore = useTypingUsers()
const { typingUsers } = storeToRefs(typingUsersStore)
const messageStore = useMessage()
const { isLoading, isLast, error, messages } = storeToRefs(messageStore)
const userStore = useUser()
const { user } = storeToRefs(userStore)
const connectedUsersStore = useConnectedUsers()
const { connectedUsers } = storeToRefs(connectedUsersStore)
const searchText = ref('')


onMounted(() => {
    typingUsersStore.finishTypingUserEmitter()
})

const sendMessage = (message: string) => {
    const date = new Date()
    messageStore.messageEmitter({ content: message, date })
}
const isTyping = () => {
    typingUsersStore.typingUserEmitter()
}
const isNotTyping = () => {
    typingUsersStore.finishTypingUserEmitter()
}

const typing = computed(() => {
    return typingUsers.value.length > 0 ? typingUsers.value.join(',') + ' typing' : ''
})

const loadMessages = () => {
    messageStore.loadNextMessages()
}
const handleSearch = (text: string) => {
    searchText.value = text
}
const displayedUsers = computed(() => {
    return connectedUsers.value.filter((user) => user.fullName.includes(searchText.value.trim()))
})
</script>

<template>
    <div class="container pt-1">
        <div class="card shadow-lg mb-4 d-flex flex-row">
            <div class="people-list p-3 d-none d-md-inline ">
                <SearchInput @search="handleSearch" />
                <div class="chat-list overflow-auto mt-4 mb-0">
                    <ChatConnectedList :connectedUsers="displayedUsers" />
                </div>
            </div>
            <div class="chat w-100">
                <ChatHeader :name="user?.belongsTo!" />
                <div v-if="isLoading" class="position-absolute start-50 mt-1">
                    <ChatSpinner />
                </div>
                <div v-if="error">
                    <ChatAlert msg="Error loading messages" type="alert-danger" />
                </div>
                <ChatListMessage :messages="messages" :isLast="isLast" @load-next-messages="loadMessages" />
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

@media (min-width: 768px) {
    .chat {
        border-left: 1px solid #eaeaea
    }
}
</style>
