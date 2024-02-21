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

const useTypingUserStore = useTypingUsers()
const messageStore = useMessage()
const userStore = useUser()
const useConnectedUsersStore = useConnectedUsers()
const searchText = ref('')


onMounted(() => {
    useTypingUserStore.finishTypingUserEmitter()
})

const sendMessage = (message: string) => {
    const date = new Date()
    messageStore.messageEmitter({ content: message, date })
}
const isTyping = () => {
    useTypingUserStore.typingUserEmitter()
}
const isNotTyping = () => {
    useTypingUserStore.finishTypingUserEmitter()
}

const typing = computed(() => {
    return useTypingUserStore.typingUsers.length > 0 ? useTypingUserStore.typingUsers.join(',') + ' typing' : ''
})

const loadNextMessages = () => {
    messageStore.loadNextMessages()
}
const handleSearch = (text: string) => {
    searchText.value = text
}
const displayedUsers = computed(() => {
    return useConnectedUsersStore.connectedUsers.filter((user) => user.fullName.includes(searchText.value.trim()))
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
                <ChatHeader :name="userStore.user?.belongsTo!" />
                <div v-if="messageStore.isLoading" class="position-absolute start-50 mt-1">
                    <ChatSpinner />
                </div>
                <div v-if="messageStore.error">
                    <ChatAlert msg="Error loading messages" type="alert-danger" />
                </div>
                <ChatListMessage :messages="messageStore.messages" :isLast="messageStore.isLast"
                    @load-next-messages="loadNextMessages" />
                <div v-if="messageStore.messages" class="mb-1 p-1">
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
