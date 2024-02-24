<script setup lang="ts">
import router from '@/router';
import SharedView from './SharedView.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup'
import { useUser } from '@/store/User';
import { useRoom } from "@/composables/RoomManager"
import socket from "@/listeners/socket"

const userStore = useUser()
const { joinRoom, error, isLoading } = useRoom()

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        username: yup.string().required('Username is required').min(5),
        roomCode: yup.string().required('Room code is required'),
    }),
});
const [username] = defineField('username');
const [roomCode] = defineField('roomCode');

const onSubmit = handleSubmit(async () => {
    await joinRoom({ username: username.value, roomCode: roomCode.value })
    if (userStore.user) {
        await router.push({ path: 'chat' })
        socket.connect()
    }
})

const redirect = (name: string) => {
    router.push({ name })
}
</script>
<template>
    <SharedView imgUrl="./assets/img/logo-img-1.webp" pageName="Join room">
        <template v-slot:content>
            <form @submit="onSubmit">
                <div class="row gy-3 overflow-hidden">
                    <div class="col-12">
                        <div class="form-floating">
                            <input class="form-control" placeholder="Username" v-model="username" :disabled="isLoading">
                            <label for="Username" class="form-label">Username</label>
                        </div>
                    </div>
                    <p v-show="errors.username" class="text-warning warn-msg d-block mt-0 mb-0">{{
                        errors.username }}</p>
                    <div class="col-12">
                        <div class="form-floating">
                            <input class="form-control" placeholder="room" v-model="roomCode" :disabled="isLoading">
                            <label for="room-id" class="form-label">Room</label>
                        </div>
                    </div>
                    <p v-show="errors.roomCode" class="text-warning warn-msg d-block mt-0 mb-0">{{
                        errors.roomCode }}</p>
                    <div class="col-12">
                        <div class="d-grid">
                            <button class="btn btn-dark btn-lg" type="submit" :disabled="isLoading">Join</button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="d-inline-block result-state">
                <p v-if="isLoading" class="text-danger"> Loading</p>
                <p v-else-if="error" class="text-danger">You need to enter a valid username/room</p>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="d-flex gap-1 flex-column justify-content-start mt-2">
                        <div role="button" class="link-secondary" @click="redirect('room')">Create room</div>
                        <div role="button" class="link-secondary" @click="redirect('account')">Create account</div>
                    </div>
                </div>
            </div>
        </template>
    </SharedView>
</template>

<style></style>