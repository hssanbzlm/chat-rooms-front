<template>
    <div class="chat-header p-3 border-bottom">
        <div class="row">
            <div class="col-lg-6">
                <div class="chat-about">
                    <h6>{{ props.chatName }}</h6>
                    <small>{{ props.created }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
type propsShape = {
    chatName: string;
    created: string;
}
const props = defineProps<propsShape>()

</script>

<style scoped></style>