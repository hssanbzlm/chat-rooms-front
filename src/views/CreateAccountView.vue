<script setup lang="ts">
import router from '@/router';
import SharedView from './SharedView.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup'
import { useAxios } from '@vueuse/integrations/useAxios'
import { postMethod, createAccountUrl } from '@/api/requests'

const { data, isLoading, error, execute } = useAxios()

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        username: yup.string().required('Username is a required field').min(5),
        fullName: yup.string().required('Fullname is a required field'),
    }),
});
const [username] = defineField('username');
const [fullName] = defineField('fullName');

const onSubmit = handleSubmit(async () => {
    await execute(createAccountUrl,
        {
            method: postMethod,
            data: { userName: username.value, fullName: fullName.value }
        })
})

const redirect = (name: string) => {
    router.push({ name })
}
</script>
<template>
    <SharedView imgUrl="./assets/img/logo-img-1.webp" pageName="Create account">
        <template v-slot:content>
            <form @submit="onSubmit">
                <div class="row gy-3 overflow-hidden">
                    <div class="col-12">
                        <div class="form-floating mb-3">
                            <input class="form-control" placeholder="Username" v-model="username" :disabled="isLoading" />
                            <p v-if="errors.username" class="text-warning">{{ errors.username }}</p>
                            <label for="Username" class="form-label">Username</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-floating mb-3">
                            <input class="form-control" placeholder="Full name" v-model="fullName" :disabled="isLoading" />
                            <p v-if="errors.fullName" class="text-warning">{{ errors.fullName }}</p>
                            <label for="Full-name" class="form-label">Full name</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-grid">
                            <button class="btn btn-dark btn-lg" type="submit" :disabled="isLoading">Create</button>
                        </div>
                    </div>
                </div>
            </form>
            <div v-if="isLoading">
                LOADING
            </div>
            <div v-if="error">
                <p class="text-danger">Error creating an account</p>
            </div>
            <div v-if="data">
                <p class="text-primary"> {{ data }}</p>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="d-flex gap-1 flex-column justify-content-start mt-3">
                        <div role="button" class="link-secondary" @click="redirect('room')">Create room</div>
                        <div role="button" class="link-secondary" @click="redirect('join')">Join room</div>
                    </div>
                </div>
            </div>
        </template>
    </SharedView>
</template>
<style></style>