<script setup>
import Icon from "./Icon.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="ds-rocketflow-text text-center mx-4 mb-4">
    <Icon :name="props.icon" class="view-icon my-2"></Icon>
    <h3 class="view-title fw-bold mb-2">{{ props.title }}</h3>
    <p class="small mb-0">{{ props.description }}</p>
  </div>
</template>

<style scoped>
.view-icon {
  font-size: 75px !important;
  color: var(--ds-rocketflow-secondary) !important;
}

.view-title {
  font-size: 30px !important;
}
</style>
