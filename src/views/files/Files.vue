<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Alert from "@/components/Alert.vue";
import Icon from "@/components/Icon.vue";
import FileAccordionItem from "@/components/FileAccordionItem.vue";

const router = useRouter();
const user = JSON.parse(sessionStorage.getItem("user"));

const files = ref([]);

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
        `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/files/all-files/${
          user.id
        }`
      );

      files.value = response.data;
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
      <ViewTitle
        title="Files"
        description="Easily access and organize all your uploaded files in one convenient location."
        icon="file"
      ></ViewTitle>
      <div class="d-grid gap-2 mb-3 mx-3">
        <RouterLink class="btn btn-secondary text-light" to="/add-file"
          ><Icon name="plus"></Icon> Add File</RouterLink
        >
      </div>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <div v-if="files.length > 0" class="accordion" id="accordionExample">
        <FileAccordionItem
          v-for="(file, index) in files"
          :key="index"
          :accordion-item="index"
          :file-id="file.file_id"
          :name="file.name"
          :file="file.file"
          :type="file.type"
          :owner="file.owner"
          :date-time="file.file_datetime"
        ></FileAccordionItem>
      </div>
      <div v-else>
        <ViewTitle
          title="No Files Yet"
          description="Add your first file to get started."
          icon=""
        ></ViewTitle>
      </div>
    </div>
  </main>
</template>
