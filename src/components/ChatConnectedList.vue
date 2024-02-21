<template>
    <li v-for="connectedUser in props.connectedUsers" :key="connectedUser.userId"
        :class="['list-group-item p-2 float-start', { 'link': connectedUser.userId != user?.userId }]"
        @click="toPrivate(connectedUser.userId)">
        <img :src="connectedUser.avatar ? connectedUser.avatar : 'https://ui-avatars.com/api/?name=' + `${connectedUser.fullName}`"
            alt="avatar" class="rounded-circle float-start avatar">
        <div class="about float-start ps-2 pt-1">
            <div class="user-fullName">{{ connectedUser.fullName }}</div>
            <div class="text-secondary user-status"> connected </div>
        </div>
    </li>
</template>
<script setup lang="ts">
import type { User } from '@/interfaces/user';
import { useUser } from "@/store/User"
import { storeToRefs } from 'pinia'
const userStore = useUser()
const { user } = storeToRefs(userStore)
const props = defineProps<{ connectedUsers: User[] }>()
const toPrivate = (idUser: string) => {
    if (user.value?.userId !== idUser) {
        window.open(`chat/private/${idUser}`, '_blank')
    }
}

</script>
<style scoped>
.avatar {
    width: 50px;
    height: 50px;
}

.user-fullName {
    font-size: 0.9em;
}

.user-status {
    font-size: 0.7em;
}

.link {
    cursor: pointer;
}
</style>