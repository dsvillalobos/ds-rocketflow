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

async function editNote() {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/notes/${noteId.value}`,
      {
        title: title.value,
        body: body.value,
      }
    );

    alertType.value = "success";
    alertHighlight.value = "Success!";
    alertMessage.value = "The note has been edited successfully.";
    displayAlert.value = true;
  } catch (err) {
    alertType.value = "danger";
    alertHighlight.value = "Oops!";
    alertMessage.value = "Something went wrong. Please try again.";
    displayAlert.value = true;
  }
}
</script>

<template>
  <Header></Header>
  <main class="container">
    <div class="col-md-8 mx-auto">
      <ViewTitle
        title="Edit Note"
        description="Edit your notes effortlessly to keep your thoughts organized and refined."
        icon="pen-to-square"
      ></ViewTitle>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <form class="mx-3" autocomplete="off" @submit.prevent="editNote">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="title"
            id="title"
            class="form-control"
            required
            placeholder="Title:"
            v-model="title"
          />
          <label for="title" class="form-label">Title:</label>
        </div>
        <div class="form-floating mb-3">
          <textarea
            name="body"
            id="body"
            class="form-control"
            required
            placeholder="Body:"
            v-model="body"
          ></textarea>
          <label for="body" class="form-label">Body:</label>
        </div>
        <div class="d-grid gap-2 mb-3">
          <button class="btn btn-secondary text-light">Edit Note</button>
        </div>
      </form>
    </div>
  </main>
</template>
