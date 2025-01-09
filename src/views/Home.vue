<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";

const router = useRouter();
const user = JSON.parse(sessionStorage.getItem("user"));

onMounted(async function () {
  if (!user) {
    router.push("/");
  } else {
    // load the user's storage info (in order to make the dashboard)
  }
});
</script>

<template>
  <Header></Header>
  <main class="container">
    <div class="col-md-8 mx-auto">
      <div class="ds-rocketflow-text text-center mx-4 mb-4">
        <div class="fs-6">
          Welcome <span v-if="user">{{ user.name }}</span>
        </div>
        <div class="small fst-italic">Storage at Rocket Speed.</div>
      </div>
    </div>
  </main>
</template>
