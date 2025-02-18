<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Alert from "@/components/Alert.vue";

const router = useRouter();
const user = JSON.parse(sessionStorage.getItem("user"));

const title = ref("");
const body = ref("");

const alertType = ref("");
const alertHighlight = ref("");
const alertMessage = ref("");
const displayAlert = ref(false);

onMounted(async function () {
  if (!user) {
    router.push("/");
  }
});

async function addNote() {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/notes/`,
      {
        title: title.value,
        body: body.value,
        userId: user.id,
      }
    );

    alertType.value = "success";
    alertHighlight.value = "Success!";
    alertMessage.value = "The note has been added successfully.";
    displayAlert.value = true;
  } catch (err) {
    alertType.value = "danger";
    alertHighlight.value = "Oops!";
    alertMessage.value = "Something went wrong. Please try again.";
    displayAlert.value = true;
  }

  title.value = "";
  body.value = "";
}
</script>

<template>
  <Header></Header>
  <main class="container">
    <div class="col-md-8 mx-auto">
      <ViewTitle
        title="Add Note"
        description="Add notes seamlessly to your cloud repository for quick reference and organization."
        icon="sticky-note"
      ></ViewTitle>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <form class="mx-3" autocomplete="off" @submit.prevent="addNote">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="title"
            id="title"
            class="form-control"
            required
            maxlength="255"
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
          <button class="btn btn-secondary text-light">Add Note</button>
        </div>
      </form>
    </div>
  </main>
</template>
