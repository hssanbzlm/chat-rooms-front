<script setup lang="ts">
import router from '@/router';
import SharedView from './SharedView.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup'
import { useUser } from '@/composables/User';

const { joinRoom, isLoading, error, user } = useUser()

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        username: yup.string().required('Username is a required field').min(5),
        roomCode: yup.string().required('Room code is a required field'),
    }),
});
const [username] = defineField('username');
const [roomCode] = defineField('roomCode');

const onSubmit = handleSubmit(async () => {
    await joinRoom({ username: username.value, roomCode: roomCode.value })
    if (user.value)
        router.push({ name: 'chat' })
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
                            <input class="form-control" placeholder="Username" v-model="username" :disabled="isLoading">
                            <p v-if="errors.username" class="text-warning">{{ errors.username }}</p>
                            <label for="Username" class="form-label">Username</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-floating mb-3">
                            <input class="form-control" placeholder="room" v-model="roomCode" :disabled="isLoading">
                            <p v-if="errors.roomCode" class="text-warning">{{ errors.roomCode }}</p>
                            <label for="room-id" class="form-label">Room</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-grid">
                            <button class="btn btn-dark btn-lg" type="submit" :disabled="isLoading">Join</button>
                        </div>
                    </div>
                </div>
            </form>
            <div v-if="isLoading">
                LOADING
            </div>
            <div v-else-if="error">
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