<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import supabase from "@/supabase/supabaseClient";
import Header from "@/components/Header.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Alert from "@/components/Alert.vue";

const router = useRouter();
const user = JSON.parse(sessionStorage.getItem("user"));

const name = ref("");
const file = ref(null);
const type = ref("");
const fileInput = ref(null);

const alertType = ref("");
const alertHighlight = ref("");
const alertMessage = ref("");
const displayAlert = ref(false);

onMounted(async function () {
  if (!user) {
    router.push("/");
  }
});

function handleFileChange(event) {
  file.value = event.target.files[0];
}

async function addFile() {
  try {
    type.value = file.value.name.split(".").pop().toUpperCase();

    const uniqueFileName = uuidv4() + "." + type.value.toLowerCase();

    const { err } = await supabase.storage
      .from("ds-rocketflow-files")
      .upload(uniqueFileName, file.value);

    if (err) {
      throw err;
    }

    const { data } = supabase.storage
      .from("ds-rocketflow-files")
      .getPublicUrl(uniqueFileName);

    const response = await axios.post(
      `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/files/`,
      {
        name: name.value,
        file: data.publicUrl,
        type: type.value,
        userId: user.id,
      }
    );

    alertType.value = "success";
    alertHighlight.value = "Success!";
    alertMessage.value = "The file has been added successfully.";
    displayAlert.value = true;
  } catch (err) {
    alertType.value = "danger";
    alertHighlight.value = "Oops!";
    alertMessage.value = "Something went wrong. Please try again.";
    displayAlert.value = true;
  }

  name.value = "";
  file.value = null;
  fileInput.value.value = "";
}
</script>

<template>
  <Header></Header>
  <main class="container">
    <div class="col-md-8 mx-auto">
      <ViewTitle
        title="Add File"
        description="Easily upload and organize your files hassle-free. Add files to your cloud with a breeze!"
        icon="plus"
      ></ViewTitle>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <form class="mx-3" autocomplete="off" @submit.prevent="addFile">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="name"
            id="name"
            class="form-control"
            required
            maxlength="255"
            placeholder="Name:"
            v-model="name"
          />
          <label for="name" class="form-label">Name:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="file"
            name="file"
            id="file"
            class="form-control"
            required
            placeholder="File:"
            @change="handleFileChange"
            ref="fileInput"
          />
          <label for="file" class="form-label">File:</label>
        </div>
        <div class="d-grid gap-2 mb-3">
          <button class="btn btn-secondary text-light">Add File</button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
input[type="file"]::-webkit-file-upload-button {
  background-color: var(--ds-rocketflow-tertiary) !important;
  font-size: 15px !important;
  color: var(--ds-rocketflow-text) !important;
  margin-top: 1.25px !important;
  margin-left: 1.25px !important;
  margin-right: 7px !important;
  padding: 1px 7px 1px 7px !important;
  border-radius: 2.5px !important;
}

input[type="file"]::file-selector-button {
  background-color: var(--ds-rocketflow-tertiary) !important;
  font-size: 15px !important;
  color: var(--ds-rocketflow-text) !important;
  margin-top: 1.25px !important;
  margin-left: 1.25px !important;
  margin-right: 7px !important;
  padding: 1px 7px 1px 7px !important;
  border-radius: 2.5px !important;
}
</style>
