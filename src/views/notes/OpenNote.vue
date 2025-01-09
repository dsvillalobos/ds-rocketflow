<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Alert from "@/components/Alert.vue";

const router = useRouter();
const route = useRoute();
const user = JSON.parse(sessionStorage.getItem("user"));

const noteId = ref(route.params.noteId);

const title = ref("");
const body = ref("");

const alertType = ref("");
const alertHighlight = ref("");
const alertMessage = ref("");
const displayAlert = ref(false);

onMounted(async function () {
  if (!user) {
    router.push("/");
  } else {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/notes/note/${
          noteId.value
        }`
      );

      title.value = response.data.title;
      body.value = response.data.body;
    } catch (err) {
      alertType.value = "danger";
      alertHighlight.value = "Oops!";
      alertMessage.value = "Something went wrong. Please try again.";
      displayAlert.value = true;
    }
  }
});
</script>

<template>
  <Header></Header>
  <main class="container">
    <div class="col-md-8 mx-auto">
      <ViewTitle :title="title"></ViewTitle>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <div class="ds-rocketflow-text small mx-3">
        <pre>{{ body }}</pre>
      </div>
    </div>
  </main>
</template>

<style scoped>
pre {
  font-family: inherit !important;
  white-space: pre-wrap !important;
}
</style>
