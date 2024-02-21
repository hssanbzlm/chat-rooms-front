<template>
    <div class="container mt-2">
        <div class="btn-group dropend">
            <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Settings
            </button>
            <ul class="dropdown-menu">
                <li role="button" class="dropdown-item" @click="redirectToProfile">
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
import AppModal from './AppModal.vue';
import { useRoom } from '@/composables/RoomManager'
const { leaveRoom, destroyRoom } = useRoom()
const props = defineProps<{ isAdmin: boolean }>()

const onLeave = async () => {
    await leaveRoom()
}

const onDestroy = async () => {
    await destroyRoom()
}

const redirectToProfile = () => {
    router.push({ name: 'profile' })
}



</script>
