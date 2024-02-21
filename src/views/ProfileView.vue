<script setup lang="ts">
import { useUser } from "@/store/User"
import { computed, ref } from "vue"
import { useProfileUpdate } from "@/composables/ProfileUpdate"
import router from "@/router";
import { storeToRefs } from 'pinia'

const userStore = useUser()
const { user, isLoading } = storeToRefs(userStore)
const { onUpdate, onUpdateFullName, onUpdateAvatar, newFullName, newAvatar, previewAvatar } = useProfileUpdate()
const fullNameRef = ref<HTMLElement>()
const isUpdatingFullName = ref(false)

const onFullNameChange = () => {
    isUpdatingFullName.value = false
    onUpdateFullName(fullNameRef.value?.textContent!)
}
const onAvatarChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = (target.files as FileList)[0]
    onUpdateAvatar(file)
}
const canUpdate = computed(() => {
    return (newFullName.value && newFullName.value != '' && newFullName.value !== user.value?.fullName || newAvatar.value != undefined)
})

const onSave = async () => {
    onUpdate()
}
const onFullNameFocus = () => {
    isUpdatingFullName.value = true
}
const onBack = () => {
    router.push({ path: '/chat' })
}
</script>
<template>
    <div class="row g-0 justify-content-center mt-5">

        <div class="col-12 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <span role="button" @click="onBack()">
                        <font-awesome-icon :icon="['fas', 'arrow-alt-circle-left']" size="xl" color="grey" />
                    </span>
                    <div class="d-flex flex-column align-items-center text-center">
                        <label for="image">
                            <input v-if="!isLoading" type="file" name="image" id="image" class="d-none" accept="image/*"
                                @change="onAvatarChange" />
                            <div class="position-relative">
                                <img :src="previewAvatar"
                                    class="profile-avatar position-absolute rounded-circle bg-light p-1" role="button">
                                <img src="https://placehold.co/120x120/png?text=Insert+avatar" class="rounded-circle  p-1 ">
                            </div>
                        </label>
                        <div class="mt-3">
                            <div class="fullName-container d-flex">
                                <h4 class="p-1 fullName-content" :contenteditable="!isLoading" @blur="onFullNameChange"
                                    @focus="onFullNameFocus" v-text="user?.fullName" ref="fullNameRef">
                                </h4>
                                <font-awesome-icon class="update-fa" :icon="['fas', 'pencil']" :size="'sm'" />
                            </div>
                            <p class="text-secondary mb-1">{{ user?.userName }}</p>
                            <button v-if="canUpdate && !isLoading" :disabled="isUpdatingFullName"
                                class="btn btn-outline-primary mt-2" @click="onSave">Save</button>
                            <button v-if="isLoading" class="btn btn-outline-primary" type="button">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card {
    box-shadow: 0 1px 2px 1px rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}

.fullName-container:hover>.update-fa {
    display: flex;
}

.fullName-content:focus~.update-fa,
.update-fa {
    display: none;
}


.profile-avatar:hover {
    opacity: 0.2;
}

img {
    height: 110px;
    width: 110px;
}
</style>