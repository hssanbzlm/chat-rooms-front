<template>
    <li :class="[{ 'd-flex flex-column align-items-end': !props.isMyMessage }, 'list-group-item', 'p-3']">
        <div class="message-data mb-2">
            <span class="message-data-time">{{ props.time }}</span>
            <img v-if="!props.isMyMessage" :src="props.img" alt="avatar" class="rounded">
        </div>
        <div :class="['message p-3 rounded', props.isMyMessage ? 'my-message' : 'other-message']"> {{ props.message }}
        </div>
    </li>
</template>
<script setup lang="ts">
type propsShape = {
    time: string,
    img?: string,
    message: string
    isMyMessage: boolean
}
const props = defineProps<propsShape>()
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