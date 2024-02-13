<template>
    <li v-for="user in connectedUsersStore.connectedUsers" :key="user._id" class="list-group-item p-2 float-start">
        <img :src="user.avatar" alt="avatar" class="rounded float-start w-25">
        <div class="about float-start ps-2">
            <div>{{ user.fullName }}</div>
            <div class="text-secondary"> connected </div>
        </div>
    </li>
</template>
<script setup lang="ts">
import { useConnectedUsers } from '@/store/ConnectedUsers';
const connectedUsersStore = useConnectedUsers()

</script>
<style scoped></style>