<script setup>
import { RouterLink } from "vue-router";
import Icon from "./Icon.vue";
</script>

<template>
  <header class="sticky-top mb-4">
    <nav class="navbar navbar-primary navbar-dark">
      <div class="container-fluid">
        <RouterLink class="navbar-brand fs-2 fw-bold" to="/">
          <Icon name="rocket"></Icon> DS RocketFlow
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar-primary {
  background-color: var(--ds-rocketflow-primary) !important;
}
</style>
