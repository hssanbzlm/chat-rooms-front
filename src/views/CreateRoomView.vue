<script setup lang="ts">
import router from '@/router';
import SharedView from './SharedView.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup'
import { useAxios } from '@vueuse/integrations/useAxios'
import { postMethod, createRoomUrl } from '@/api/requests'

const { data, isLoading, error, execute } = useAxios()

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        username: yup.string().required('Username is required').min(5),
        roomName: yup.string().required('Room name is required'),
    }),
});
const [username] = defineField('username');
const [roomName] = defineField('roomName');

const onSubmit = handleSubmit(async () => {
    await execute(createRoomUrl,
        {
            method: postMethod,
            data: { userName: username.value, roomName: roomName.value }
        })
})

const redirect = (name: string) => {
    router.push({ name })
}
</script>
<template>
    <SharedView imgUrl="./assets/img/logo-img-1.webp" pageName="Create room">
        <template v-slot:content>
            <form @submit="onSubmit">
                <div class="row gy-3 overflow-hidden">
                    <div class="col-12">
                        <div class="form-floating">
                            <input class="form-control" placeholder="Username" v-model="username">
                            <label for="Username" class="form-label">Username</label>
                        </div>
                    </div>
                    <p v-show="errors.username" class="text-warning warn-msg d-block mt-0 mb-0">{{ errors.username }}</p>
                    <div class="col-12">
                        <div class="form-floating">
                            <input class="form-control" placeholder="Room name" v-model="roomName">
                            <label for="Room-name" class="form-label">Room name</label>
                        </div>
                    </div>
                    <p v-show="errors.roomName" class="text-warning warn-msg d-block mt-0 mb-0">{{ errors.roomName }}</p>
                    <div class="col-12">
                        <div class="d-grid">
                            <button class="btn btn-dark btn-lg" type="submit">Create</button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="d-inline-block result-state">
                <p v-if="isLoading" class="text-danger "> Loading</p>
                <p v-else-if="error" class="text-danger">Error creating a room</p>
                <p v-else-if="data" class="text-primary">{{ data }}</p>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="d-flex gap-1 flex-column justify-content-start mt-3">
                        <div role="button" class="link-secondary" @click="redirect('join')">Join room</div>
                        <div role="button" class="link-secondary" @click="redirect('account')">Create account</div>
                    </div>
                </div>
            </div>
        </template>
    </SharedView>
</template>
<style></style>