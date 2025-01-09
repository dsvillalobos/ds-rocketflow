<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Qrcode from "qrcode.vue";

const router = useRouter();
const route = useRoute();
const user = JSON.parse(sessionStorage.getItem("user"));

const url = ref(route.params.url);

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
        title="QR Code"
        description="Share easily with this QR code, just scan for quick and seamless sharing."
        icon="qrcode"
      ></ViewTitle>
      <div class="text-center mx-3">
        <Qrcode :value="url" :size="225"></Qrcode>
      </div>
    </div>
  </main>
</template>
