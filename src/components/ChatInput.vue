<template>
    <div class="input-group">
        <div class="me-1">
            <span class="input-group-text"><font-awesome-icon :icon="['fas', props.icon]" :size="props.size" /></span>
        </div>
        <input type="text" class="form-control" :placeholder="props.placeholder">
    </div>
</template>
<script setup lang="ts">
type propsShape = {
    icon: string,
    size: 'xl' | 'sm' | 'lg' | 'xs',
    placeholder: string,
}
const props = defineProps<propsShape>()
</script>
<style></style>