<template>
    <li v-for="user in connectedUsersStore.connectedUsers" :key="user._id" class="list-group-item p-2 float-start"
        @click="toPrivate(user._id)">
        <img :src="user.avatar ? user.avatar : 'https://ui-avatars.com/api/?name=' + `${user.fullName}`" alt="avatar"
            class="rounded-circle float-start avatar">
        <div class="about float-start ps-2 pt-1">
            <div class="user-fullName">{{ user.fullName }}</div>
            <div class="text-secondary user-status"> connected </div>
        </div>
    </li>
</template>
<script setup lang="ts">
import router from '@/router';
import { useConnectedUsers } from '@/store/ConnectedUsers';
const connectedUsersStore = useConnectedUsers()
const toPrivate = (idUser: string) => {
    router.push({ path: `chat/private/${idUser}` })

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
</style>