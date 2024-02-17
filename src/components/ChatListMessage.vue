<template>
    <div v-if="messageStore.messages" class="chat-history overflow-auto d-flex flex-column-reverse p-3" ref="el">
        <ul>
            <ChatMessage v-for="message in messageStore.messages" :msg="message" :key="message._id" />
        </ul>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue"
import ChatMessage from "@/components/ChatMessage.vue"
import { useMessage } from '@/store/Message'
import { useInfiniteScroll } from '@vueuse/core'

const el = ref<HTMLElement>()

const messageStore = useMessage()

onMounted(() => {
    messageStore.bindMessagesEvents()
    if (messageStore.messages.length == 0)
        messageStore.loadNextMessages()
})

useInfiniteScroll(el, () => {
    messageStore.loadNextMessages()
}, { distance: 50, direction: 'top', interval: 2000, canLoadMore: () => !messageStore.isLast })

</script>