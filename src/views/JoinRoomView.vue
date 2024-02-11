<script setup lang="ts">
import router from '@/router';
import SharedView from './SharedView.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup'
import { useUser } from '@/store/User';
import socket from "@/listeners/socket"

const userStore = useUser()
const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        username: yup.string().required('Username is a required field').min(5),
        roomCode: yup.string().required('Room code is a required field'),
    }),
});
const [username] = defineField('username');
const [roomCode] = defineField('roomCode');

const onSubmit = handleSubmit(async () => {
    await userStore.joinRoom({ username: username.value, roomCode: roomCode.value })
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
                        <div class="form-floating mb-3">
                            <input class="form-control" placeholder="Username" v-model="username"
                                :disabled="userStore.isLoading">
                            <p v-if="errors.username" class="text-warning">{{ errors.username }}</p>
                            <label for="Username" class="form-label">Username</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-floating mb-3">
                            <input class="form-control" placeholder="room" v-model="roomCode"
                                :disabled="userStore.isLoading">
                            <p v-if="errors.roomCode" class="text-warning">{{ errors.roomCode }}</p>
                            <label for="room-id" class="form-label">Room</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-grid">
                            <button class="btn btn-dark btn-lg" type="submit" :disabled="userStore.isLoading">Join</button>
                        </div>
                    </div>
                </div>
            </form>
            <div v-if="userStore.isLoading">
                LOADING
            </div>
            <div v-else-if="userStore.error">
                <p class="text-danger"> Error joining a room</p>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="d-flex gap-1 flex-column justify-content-start mt-3">
                        <div role="button" class="link-secondary" @click="redirect('room')">Create room</div>
                        <div role="button" class="link-secondary" @click="redirect('account')">Create account</div>
                    </div>
                </div>
            </div>
        </template>
    </SharedView>
</template>

<style></style>