<script setup lang="ts">
import router from '@/router';
import SharedView from './SharedView.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup'

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        username: yup.string().required('Username is a required field').min(5),
        roomName: yup.string().required('Room name is a required field'),
    }),
});
const [username] = defineField('username');
const [roomName] = defineField('roomName');

const onSubmit = handleSubmit(values => {

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
                        <div class="form-floating mb-3">
                            <input class="form-control" placeholder="Username" v-model="username">
                            <p v-if="errors.username" class="text-warning">{{ errors.username }}</p>
                            <label for="Username" class="form-label">Username</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-floating mb-3">
                            <input class="form-control" placeholder="Room name" v-model="roomName">
                            <p v-if="errors.roomName" class="text-warning">{{ errors.roomName }}</p>
                            <label for="Room-name" class="form-label">Room name</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-grid">
                            <button class="btn btn-dark btn-lg" type="submit">Create</button>
                        </div>
                    </div>
                </div>
            </form>
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