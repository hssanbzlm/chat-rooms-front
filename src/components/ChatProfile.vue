<template>
    <li class="list-group-item p-2 float-start">
        <img :src="props.img" alt="avatar" class="rounded float-start w-25">
        <div class="about float-start ps-2">
            <div>{{ props.name }}</div>
            <div class="text-secondary"> {{ props.status }} </div>
        </div>
    </li>
</template>
<script setup lang="ts">
type propsShape = {
    img: string,
    name: string,
    status: string
}
const props = defineProps<propsShape>()
</script>
<style scoped></style>