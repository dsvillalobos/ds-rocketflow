<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <i :class="`fa-solid fa-${props.name} px-1`"></i>
</template>
