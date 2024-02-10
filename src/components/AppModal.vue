<template>
    <Teleport to='body'>
        <div class="modal fade" id="appModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ props.title }}</h5>
                        <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        {{ props.body }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="onConfirm">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<script setup lang="ts">
type propsShape = { title: string, body: string }
const props = defineProps<propsShape>()
const emits = defineEmits(['confirm'])

const onConfirm = () => {
    emits('confirm')
}

</script>