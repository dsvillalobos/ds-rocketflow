<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import ViewTitle from "@/components/ViewTitle.vue";

const router = useRouter();
const user = JSON.parse(sessionStorage.getItem("user"));
const year = new Date().getFullYear();

onMounted(async function () {
  if (!user) {
    router.push("/");
  }
});
</script>

<template>
  <Header></Header>
  <main class="container">
    <div class="col-md-8 mx-auto">
      <ViewTitle
        title="About"
        description="Discover the essence of DS RocketFlow."
        icon="circle-info"
      ></ViewTitle>
      <ul class="list-group small mx-3">
        <li class="list-group-item py-3 ds-rocketflow-text">
          <h6 class="my-0 d-inline">Created by</h6>
          @dsvillalobos
        </li>
        <li class="list-group-item py-3 ds-rocketflow-text">
          <h6 class="my-0 d-inline">Version</h6>
          1.1.4
        </li>
        <li class="list-group-item py-3 ds-rocketflow-text">
          <h6 class="my-0 d-inline">Help & Privacy</h6>
          <ul>
            <li><a href="" class="ds-rocketflow-text">Help Center</a></li>
            <li><a href="" class="ds-rocketflow-text">Privacy Policy</a></li>
          </ul>
        </li>
        <li class="list-group-item py-3 ds-rocketflow-text">
          <h6 class="my-0 d-inline">Follow Me</h6>
          <a
            class="ds-rocketflow-text mx-2 fs-5"
            href="https://www.instagram.com/dsvillalobosss/"
            target="_blank"
            ><i class="fa-brands fa-instagram px-1"></i
          ></a>
          <a
            class="ds-rocketflow-text mx-2 fs-5"
            href="https://x.com/dsvillalobosss"
            target="_blank"
            ><i class="fa-brands fa-x-twitter px-1"></i
          ></a>
          <a
            class="ds-rocketflow-text mx-2 fs-5"
            href="https://www.threads.net/@dsvillalobosss"
            target="_blank"
            ><i class="fa-brands fa-threads px-1"></i
          ></a>
          <a
            class="ds-rocketflow-text mx-2 fs-5"
            href="https://github.com/dsvillalobos"
            target="_blank"
            ><i class="fa-brands fa-github px-1"></i
          ></a>
        </li>
        <li class="list-group-item py-3 ds-rocketflow-text">
          <h6 class="my-0 d-inline">Copyright</h6>
          © {{ year }} dsvillalobos. All rights reserved.
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.list-group-item {
  background-color: transparent !important;
}

.list-group-item {
  border-width: 1px !important;
  border-color: var(--ds-rocketflow-secondary) !important;
}
</style>
