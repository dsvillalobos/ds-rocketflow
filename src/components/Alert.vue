<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  hightlight: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    :class="`alert alert-${props.type} text-light small border-0 mx-3`"
    role="alert"
  >
    <strong>{{ props.hightlight }}</strong> {{ props.message }}
  </div>
</template>

<style scoped>
.alert-success {
  background-color: rgba(136, 121, 195, 0.6) !important;
}

.alert-danger {
  background-color: rgba(191, 67, 66, 0.6) !important;
}
</style>
