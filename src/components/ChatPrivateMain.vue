<script setup lang="ts">
import ChatInput from '@/components/ChatInput.vue';
import ChatListMessage from '@/components/ChatListMessage.vue';
import ChatHeader from '@/components/ChatHeader.vue'
import ChatSpinner from "@/components/ChatSpinner.vue"
import ChatAlert from '@/components/ChatAlert.vue'
import { useUser } from '@/store/User';
import { useConnectedUsers } from '@/store/ConnectedUsers';
import { privateChatGenerator } from '@/utils/utils'
import router from '@/router';
import { usePrivateMessages } from '@/composables/PrivateMessages';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';


const { isLoading, error, messages, bindPrivateMessagesEvents, loadNextMessages, resetMessages, messageEmitter, joinRoomEmitter, isLast } = usePrivateMessages()
const userStore = useUser()
const connectedUserStore = useConnectedUsers()
const userId = router.currentRoute.value.params['idUser'] as string
const chatWith = connectedUserStore.connectedUsers.find((u) => u.userId === userId)
const privateChatName = privateChatGenerator(chatWith?.userName!, userStore.user?.userName!)
bindPrivateMessagesEvents()

onBeforeMount(() => {
    if (!chatWith)
        router.push({ path: '/chat' })
})
onMounted(() => {
    joinRoomEmitter(privateChatName)
})

onUnmounted(() => {
    resetMessages()
})

const sendMessage = (message: string) => {
    messageEmitter({ content: message, date: new Date(), privateChatName, userId })
}
const loadMore = () => {
    loadNextMessages(userId)
}

</script>

<template>
    <div class="container pt-1 d-flex justify-content-center">
        <div class="card shadow-lg mb-4 d-flex flex-row w-75">
            <div class="chat w-100">
                <ChatHeader v-if="chatWith" :name="chatWith.fullName!" />
                <div v-if="isLoading" class="position-absolute start-50 mt-1">
                    <ChatSpinner />
                </div>
                <div v-if="error">
                    <ChatAlert msg="Error loading messages" type="alert-danger" />
                </div>
                <ChatListMessage :messages="messages" :isLast="isLast" @load-next-messages="loadMore" />
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
