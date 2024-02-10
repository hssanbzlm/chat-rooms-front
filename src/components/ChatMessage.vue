<template>
    <li :class="[{ 'd-flex flex-column align-items-end': !isMyMessage }, 'list-group-item', 'p-3']">
        <div class="fw-bold fst-italic" :class="[{ 'me-2': isMyMessage }]">
            {{ isMyMessage ? 'You' : props.msg.sender.fullName }}
        </div>
        <div class="message-data mb-2">
            <span class="message-data-time">{{ props.msg.date }}</span>
            <img v-if="!isMyMessage" :src="'https://bootdey.com/img/Content/avatar/avatar7.png'" alt="avatar"
                class="rounded">
        </div>
        <div :class="['message p-3 rounded', isMyMessage ? 'my-message' : 'other-message']">
            {{ props.msg.content }}
        </div>
    </li>
</template>
<script setup lang="ts">
import type { message } from '@/interfaces/message';
import { computed } from "vue"
import { useUser } from '@/store/User'

const userStore = useUser()
const props = defineProps<{ msg: message }>()

const isMyMessage = computed(() => {
    return userStore.user?.userName === props.msg.sender.userName
})
</script>
<style scoped>
.message {
    color: #444;
    display: inline-block;
}

.message-data img {
    width: 40px
}

.message-data-time {
    color: #434651;
}

.my-message {
    background: #efefef
}

.other-message {
    background: #e8f1f3;
}
</style>