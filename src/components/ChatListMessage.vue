<template>
    <div v-if="props.messages" class="chat-history overflow-auto d-flex flex-column-reverse" ref="el">
        <ul>
            <ChatMessage v-for="message in props.messages" :msg="message" :key="message._id" />
        </ul>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue"
import ChatMessage from "@/components/ChatMessage.vue"
import { useInfiniteScroll } from '@vueuse/core'
import type { message } from "@/interfaces/message";
const props = defineProps<{ messages: message[], isLast: boolean }>()
const emits = defineEmits(['load-next-messages'])
const el = ref<HTMLElement>()

onMounted(() => {
    if (props.messages.length == 0)
        emits('load-next-messages')
})

useInfiniteScroll(el, () => {
    emits('load-next-messages')
}, { distance: 50, direction: 'top', interval: 2000, canLoadMore: () => !props.isLast })

</script>