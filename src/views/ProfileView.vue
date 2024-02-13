<script setup lang="ts">
import { useUser } from "@/store/User"
import { computed, ref } from "vue"
import { useProfileUpdate } from "@/composables/ProfileUpdate"
const userStore = useUser()
const { onUpdate, onUpdateFullName, onUpdateAvatar, newFullName, newAvatar, previewAvatar } = useProfileUpdate()
const fullNameRef = ref<HTMLElement>()
const isUpdatingFullName = ref(false)

const onFullNameChange = () => {
    isUpdatingFullName.value = false
    onUpdateFullName(fullNameRef.value?.textContent!)
}
const onAvatarChange = (e: any) => {
    const file = e.target.files[0]
    onUpdateAvatar(file)
}
const canUpdate = computed(() => {
    return (newFullName.value && newFullName.value != '' && newFullName.value !== userStore.user?.fullName || newAvatar.value != undefined)
})

const onSave = async () => {
    onUpdate()
}
const onFullNameFocus = () => {
    isUpdatingFullName.value = true
}

</script>
<template>
    <div class="row g-0 justify-content-center mt-5">
        <div class="col-12 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                        <label for="image">
                            <input v-if="!userStore.isLoading" type="file" name="image" id="image" class="d-none"
                                accept="image/*" @change="onAvatarChange" />
                            <div class="position-relative">
                                <img :src="previewAvatar"
                                    class="profile-avatar position-absolute rounded-circle bg-light p-1" role="button">
                                <img src="https://placehold.co/120x120/png?text=Insert+avatar" class="rounded-circle  p-1 ">
                            </div>
                        </label>
                        <div class="mt-3">
                            <div class="fullName-container d-flex">
                                <h4 class="p-1 fullName-content" :contenteditable="!userStore.isLoading"
                                    @blur="onFullNameChange" @focus="onFullNameFocus" v-text="userStore.user?.fullName"
                                    ref="fullNameRef">
                                </h4>
                                <font-awesome-icon class="update-fa" :icon="['fas', 'pencil']" :size="'sm'" />
                            </div>
                            <p class="text-secondary mb-1">{{ userStore.user?.userName }}</p>
                            <button v-if="canUpdate && !userStore.isLoading" :disabled="isUpdatingFullName"
                                class="btn btn-outline-primary mt-2" @click="onSave">Save</button>
                            <button v-if="userStore.isLoading" class="btn btn-outline-primary" type="button">
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

.fullName-content:focus&&button {
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