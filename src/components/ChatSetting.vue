<template>
    <div class="container mt-2">
        <div class="btn-group dropend">
            <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Settings
            </button>
            <ul class="dropdown-menu">
                <li role="button" class="dropdown-item">
                    Profile
                </li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li class="dropdown-item" @click="onLeave" role="button">Leave</li>
                <li v-if="props.isAdmin" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#appModal"
                    role="button">
                    Destroy
                </li>
            </ul>
        </div>
        <AppModal title="Destroy room" body="Are you sure about destroying this room?" @confirm="onDestroy" />
    </div>
</template>
<script setup lang="ts">
import router from '@/router';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useUser } from "@/store/User"
import { deleteMethod, destroyRoomUrl, leaveRoomUrl, postMethod } from "@/api/requests"
import socket from '@/listeners/socket';
import AppModal from './AppModal.vue';

const props = defineProps<{ isAdmin: boolean }>()
const { execute } = useAxios()
const userStore = useUser()

const onLeave = async () => {
    const { data } = await execute(leaveRoomUrl, { withCredentials: true, method: postMethod })
    if (data) {
        socket.disconnect()
        userStore.setUser(undefined)
        router.push({ name: 'join' })
    }
}

const onDestroy = async () => {
    const { data } = await execute(destroyRoomUrl, { withCredentials: true, method: deleteMethod })
    if (data) {
        socket.disconnect()
        userStore.setUser(undefined)
        router.push({ name: 'join' })
    }
}



</script>
