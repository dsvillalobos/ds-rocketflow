<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import AuthHeader from "@/components/AuthHeader.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Alert from "@/components/Alert.vue";

const name = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const alertType = ref("");
const alertHighlight = ref("");
const alertMessage = ref("");
const displayAlert = ref(false);

async function signUp() {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/auth/sign-up`,
      {
        name: name.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      }
    );

    alertType.value = "success";
    alertHighlight.value = "Success!";
    alertMessage.value = "Please proceed to Sign In.";
    displayAlert.value = true;
  } catch (err) {
    alertType.value = "danger";
    alertHighlight.value = "Oops!";
    alertMessage.value = "Something went wrong. Please try again.";
    displayAlert.value = true;
  }

  name.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
}
</script>

<template>
  <AuthHeader></AuthHeader>
  <main class="container">
    <div class="col-md-8 mx-auto">
      <ViewTitle
        title="Sign Up"
        description="Join DS RocketFlow and start managing your files, links, and notes."
        icon="rocket"
      ></ViewTitle>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <form class="mx-3" autocomplete="off" @submit.prevent="signUp">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="name"
            id="name"
            class="form-control"
            required
            placeholder="Name:"
            v-model="name"
          />
          <label for="name" class="form-label">Name:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="lastName"
            id="lastName"
            class="form-control"
            required
            placeholder="Last Name:"
            v-model="lastName"
          />
          <label for="lastName" class="form-label">Last Name:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            required
            placeholder="Email:"
            v-model="email"
          />
          <label for="email" class="form-label">Email:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            required
            placeholder="Password:"
            v-model="password"
          />
          <label for="password" class="form-label">Password:</label>
        </div>
        <div class="d-grid gap-2 mb-3">
          <button class="btn btn-secondary text-light">Sign Up</button>
        </div>
        <div class="small ds-rocketflow-text text-center mb-3">
          Already have an account?
          <RouterLink class="ds-rocketflow-text" to="/">Sign In</RouterLink>.
        </div>
      </form>
    </div>
  </main>
</template>
