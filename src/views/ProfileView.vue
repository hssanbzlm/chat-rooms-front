<script setup lang="ts">
import { useUser } from "@/store/User"
import { computed, ref } from "vue"
const userStore = useUser()
const newUserFullName = ref<HTMLElement>()
const imgSrc = ref("https://bootdey.com/img/Content/avatar/avatar6.png")
const error = ref(false)
const onUpdateFullName = () => {
    if (newUserFullName.value?.textContent == '') {
        error.value = true
    }
}
const onUploadImg = (e: any) => {
    const file = e.target.files[0]
    if (file) {
        imgSrc.value = URL.createObjectURL(file)
    }

}
const canUpdate = computed(() => {
    return !error.value && newUserFullName.value?.textContent !== userStore.user?.fullName
})

const onUpdate = () => {
    const formData = new FormData();
    formData.append("file", imgSrc.value);
    formData.append('fullName', newUserFullName.value?.textContent as string)
    //use user store method to call backend api
}

</script>
<template>
    <div class="row g-0 justify-content-center mt-5">
        <div class="col-12 col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                        <label for="image">
                            <input type="file" name="image" id="image" class="d-none" @change="onUploadImg" />
                            <div class="position-relative">
                                <img :src="imgSrc" class="profile-avatar position-absolute rounded-circle bg-primary p-1 "
                                    role="button">
                                <img src="https://placehold.co/120x120/png?text=Insert+avatar" class="rounded-circle  p-1 ">
                            </div>
                        </label>
                        <div class="mt-3">
                            <div class="fullName-container d-flex">
                                <h4 class="p-1 fullName-content" contenteditable @blur="onUpdateFullName"
                                    v-text="userStore.user?.fullName" ref="newUserFullName">
                                </h4>
                                <font-awesome-icon class="update-fa" :icon="['fas', 'pencil']" :size="'sm'" />
                            </div>
                            <p class="text-secondary mb-1">{{ userStore.user?.userName }}</p>
                            <button v-if="canUpdate" class="btn btn-outline-primary mt-2" @click="onUpdate">Save</button>

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