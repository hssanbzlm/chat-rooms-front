<script setup lang="ts">
type propsShape = {
    imgUrl: string
    pageName: string
}
const props = defineProps<propsShape>()
</script>
<template>
    <section class="bg-light p-3 p-md-4 p-xl-5 d-flex align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-xxl-11">
                    <div class="card border-light-subtle shadow-sm">
                        <div class="row g-0">
                            <div class="col-12 col-md-6 img-container p-1">
                                <img class="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy"
                                    src='https://res.cloudinary.com/dodm50cbx/image/upload/v1708598850/csbruxey86yl6bgqpjdl.png'>
                            </div>
                            <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                <div class="col-12 col-lg-11 col-xl-10">
                                    <div class="card-body p-3 p-md-4 p-xl-5">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="mb-5">
                                                    <h4 class="text-center">{{ props.pageName }}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <slot name="content"></slot>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
section {
    min-height: 100vh;
}

.img-container {
    max-height: 80vh;
}

@media (max-width: 768px) {
    .img-container {
        display: none;
    }
}
</style>