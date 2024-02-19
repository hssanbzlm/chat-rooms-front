<template>
    <li v-for="user in connectedUsersStore.connectedUsers" :key="user.userId"
        :class="['list-group-item p-2 float-start', { 'link': user.userId != userStore.user?.userId }]"
        @click="toPrivate(user.userId)">
        <img :src="user.avatar ? user.avatar : 'https://ui-avatars.com/api/?name=' + `${user.fullName}`" alt="avatar"
            class="rounded-circle float-start avatar">
        <div class="about float-start ps-2 pt-1">
            <div class="user-fullName">{{ user.fullName }}</div>
            <div class="text-secondary user-status"> connected </div>
        </div>
    </li>
</template>
<script setup lang="ts">
import { useConnectedUsers } from '@/store/ConnectedUsers';
import { useUser } from "@/store/User"
const connectedUsersStore = useConnectedUsers()
const userStore = useUser()

const toPrivate = (idUser: string) => {
    if (userStore.user?.userId !== idUser) {
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