<script setup>
import { RouterLink } from "vue-router";
import Icon from "./Icon.vue";
</script>

<template>
  <header class="sticky-top mb-4">
    <nav class="navbar navbar-expand-lg navbar-primary navbar-dark">
      <div class="container-fluid">
        <RouterLink class="navbar-brand fs-2 fw-bold" to="/home">
          <Icon name="rocket"></Icon> DS RocketFlow
        </RouterLink>
        <button
          class="navbar-toggler text-light border-0 fs-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <Icon name="bars"></Icon>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item mx-1">
              <RouterLink class="nav-link text-light" to="/home"
                ><Icon name="home"></Icon> Home</RouterLink
              >
            </li>
            <li class="nav-item mx-1">
              <RouterLink class="nav-link text-light" to="/files"
                ><Icon name="file"></Icon> Files</RouterLink
              >
            </li>
            <li class="nav-item mx-1">
              <RouterLink class="nav-link text-light" to="/links"
                ><Icon name="link"></Icon> Links</RouterLink
              >
            </li>
            <li class="nav-item mx-1">
              <RouterLink class="nav-link text-light" to="/notes"
                ><Icon name="note-sticky"></Icon> Notes</RouterLink
              >
            </li>
            <li class="nav-item mx-1">
              <RouterLink class="nav-link text-light" to="/rocketflow-ai"
                ><Icon name="hexagon-nodes"></Icon> RocketFlow AI</RouterLink
              >
            </li>
            <li class="nav-item mx-1">
              <RouterLink class="nav-link text-light" to="/about"
                ><Icon name="circle-info"></Icon> About</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar-primary {
  background-color: var(--ds-rocketflow-primary) !important;
}

.navbar-toggler {
  outline: none !important;
  box-shadow: none !important;
}
</style>
