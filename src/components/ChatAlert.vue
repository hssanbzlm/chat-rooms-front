<template>
    <div class="alert" :class="props.type" role="alert">
        {{ props.msg }}
    </div>
</template>
<script setup lang="ts">
type alertType = 'alert-danger' | 'alert-warning'
type propsShape = {
    type: alertType,
    msg: string
}
const props = defineProps<propsShape>()
</script>