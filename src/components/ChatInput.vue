<template>
    <div class="input-group">
        <div class="me-1" @click="handleSend">
            <span class="input-group-text"><font-awesome-icon :icon="['fas', props.icon]" :size="props.size" /></span>
        </div>
        <input type="text" class="form-control" @keyup.enter="handleSend" :placeholder="props.placeholder"
            v-model="message">
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
type propsShape = {
    icon: string,
    size: 'xl' | 'sm' | 'lg' | 'xs',
    placeholder: string,
}
const message = ref('')
const props = defineProps<propsShape>()
const emits = defineEmits(['send-message'])
const handleSend = () => {
    emits('send-message', message.value)
    message.value = ''
}
</script>
<style></style>