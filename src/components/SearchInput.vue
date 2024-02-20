<template>
    <div class="input-group">
        <input type="text" class="form-control" @input="onSearch" placeholder="Search" v-model="text">
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const emits = defineEmits(['search'])

const onSearch = () => {
    emits('search', text.value)
}

</script>
<style></style>