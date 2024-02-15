<template>
    <div class="chat-header p-3 border-bottom">
        <div class="row">
            <div class="col-lg-6">
                <div class="chat-about">
                    <h6 class="mb-0">{{ userStore.user?.roomName }}</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUser } from '@/store/User'
const userStore = useUser()

</script>

<style scoped></style>