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

const linkId = ref(route.params.linkId);

const title = ref("");
const address = ref("");

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
        `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/links/link/${
          linkId.value
        }`
      );

      title.value = response.data.title;
      address.value = response.data.address;
    } catch (err) {
      alertType.value = "danger";
      alertHighlight.value = "Oops!";
      alertMessage.value = "Something went wrong. Please try again.";
      displayAlert.value = true;
    }
  }
});

async function editLink() {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/links/${linkId.value}`,
      {
        title: title.value,
        address: address.value,
      }
    );

    alertType.value = "success";
    alertHighlight.value = "Success!";
    alertMessage.value = "The link has been edited successfully.";
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
        title="Edit Link"
        description="Edit links with precision and ease, tailoring your collection to perfection."
        icon="pen-to-square"
      ></ViewTitle>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <form class="mx-3" autocomplete="off" @submit.prevent="editLink">
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
          <input
            type="url"
            name="address"
            id="address"
            class="form-control"
            required
            placeholder="Link Address:"
            v-model="address"
          />
          <label for="address" class="form-label">Link Address:</label>
        </div>
        <div class="d-grid gap-2 mb-3">
          <button class="btn btn-secondary text-light">Edit Link</button>
        </div>
      </form>
    </div>
  </main>
</template>
