<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue';
import ChatListMessage from '@/components/ChatListMessage.vue';
import ChatConnectedList from '@/components/ChatConnectedList.vue';
import ChatHeader from '@/components/ChatHeader.vue'
import ChatSpinner from "@/components/ChatSpinner.vue"
import ChatAlert from '@/components/ChatAlert.vue'
import { useMessage } from '@/store/Message'
import { useTypingUsers } from "@/composables/TypingUsers"
import { computed, onMounted } from 'vue'
const { typingUserEmitter, finishTypingUserEmitter, bindTypingUsers, typingUsers } = useTypingUsers()
const messageStore = useMessage()

onMounted(() => {
    bindTypingUsers()
})

const sendMessage = (message: string) => {
    messageStore.messageEmitter(message)
}
const isTyping = () => {
    typingUserEmitter()
}
const isNotTyping = () => {
    finishTypingUserEmitter()
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
                    <ChatConnectedList />
                </div>
            </div>
            <div class="chat w-100">
                <ChatHeader />
                <div v-if="messageStore.isLoading" class="position-absolute start-50 mt-1">
                    <ChatSpinner />
                </div>
                <div v-if="messageStore.error">
                    <ChatAlert msg="Error loading messages" type="alert-danger" />
                </div>
                <ChatListMessage />
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
@/store/Message