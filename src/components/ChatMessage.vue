<template>
    <li :class="[{ 'd-flex flex-column align-items-end': !isMyMessage }, 'list-group-item', 'p-3 pb-0']">
        <div class="message-data">
            <span :class="['msg-sender fw-bold', { 'me-1': !isMyMessage }]">{{ isMyMessage ? 'You' :
                props.msg.sender.fullName
            }}</span>
            <img v-if="!isMyMessage" :src="myAvatar" alt="avatar" class="rounded-circle avatar">
        </div>
        <div class="fst-italic" :class="[{ 'me-2': isMyMessage }]">
            <div class="message-data-time">{{ msgDate }}</div>
        </div>
        <div :class="['message p-2 rounded', isMyMessage ? 'my-message' : 'other-message']">
            <span class="message-content">{{ props.msg.content }}</span>
        </div>
    </li>
</template>
<script setup lang="ts">
import type { IMessage } from '@/interfaces/Message';
import { computed } from "vue"
import { useUser } from '@/store/User'
import { useDateFormat } from '@vueuse/core'

const userStore = useUser()
const props = defineProps<{ msg: IMessage }>()

const isMyMessage = computed(() => {
    return userStore.user?.userName === props.msg.sender.userName
})

const msgDate = computed(() => {
    return useDateFormat(props.msg.date, 'dddd HH:mm aa MMMM-DD ').value
})

const myAvatar = computed(() => {
    return props.msg.sender.avatar ? props.msg.sender.avatar : 'https://ui-avatars.com/api/?name=' + `${props.msg.sender.fullName}`
})
</script>

<style scoped>
.message {
    color: #444;
    display: inline-block;
}

.msg-sender {
    font-size: 0.6em;
}

.message-data-time {
    font-size: 0.6em;
}

.my-message {
    background: #efefef
}

.other-message {
    background: #e8f1f3;
}

.avatar {
    height: 20px;
    width: 20px;
}

.message-content {
    font-size: 0.9em;
}
</style>@/interfaces/Message