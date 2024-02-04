<template>
    <div class="container mt-2">
        <div class="btn-group dropend">
            <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Settings
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item">Profile</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" @click="onLeave">Leave</a></li>

            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import router from '@/router';
import { useAxios } from '@vueuse/integrations/useAxios';
import { leaveRoomUrl, postMethod } from "@/api/requests"
import socket from '@/listeners/socket';
const { execute } = useAxios()

const onLeave = async () => {
    const { data } = await execute(leaveRoomUrl, { withCredentials: true, method: postMethod })
    if (data) {
        socket.disconnect()
        router.push({ name: 'join' })
    }
}



</script>
