<template>
    <div class="container mt-2">
        <div class="btn-group dropend">
            <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Settings
            </button>
            <ul class="dropdown-menu">
                <li role="button"><a class="dropdown-item">Profile</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" @click="onLeave" role="button">Leave</a></li>
                <li v-if="props.isAdmin"><a class="dropdown-item" @click="onDestroy" role="button">Destroy</a></li>


            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import router from '@/router';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useUser } from "@/store/User"
import { deleteMethod, destroyRoomUrl, leaveRoomUrl, postMethod } from "@/api/requests"
import socket from '@/listeners/socket';

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
        userStore.setUser(undefined)
        router.push({ name: 'join' })
    }
}



</script>
