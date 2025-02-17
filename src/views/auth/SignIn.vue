<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import AuthHeader from "@/components/AuthHeader.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Alert from "@/components/Alert.vue";

const router = useRouter();

const email = ref("");
const password = ref("");

const alertType = ref("");
const alertHighlight = ref("");
const alertMessage = ref("");
const displayAlert = ref(false);

async function signIn() {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/auth/sign-in`,
      {
        email: email.value,
        password: password.value,
      }
    );

    const user = {
      id: response.data.user_id,
      name: response.data.name + " " + response.data.last_name,
      email: response.data.email,
    };
    sessionStorage.setItem("user", JSON.stringify(user));

    router.push("/home");
  } catch (err) {
    alertType.value = "danger";
    alertHighlight.value = "Oops!";
    alertMessage.value = "Wrong email or password. Please try again.";
    displayAlert.value = true;
  }

  email.value = "";
  password.value = "";
}
</script>

<template>
  <AuthHeader></AuthHeader>
  <main class="container">
    <div class="col-md-8 mx-auto">
      <ViewTitle
        title="Sign In"
        description="Get started on DS RocketFlow. Sign in to access your files, links, and notes."
        icon="rocket"
      ></ViewTitle>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <form class="mx-3" autocomplete="off" @submit.prevent="signIn">
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
          <button class="btn btn-secondary text-light">Sign In</button>
        </div>
        <div class="small ds-rocketflow-text text-center mb-3">
          Don't have an account yet?
          <RouterLink class="ds-rocketflow-text" to="/sign-up"
            >Sign Up</RouterLink
          >.
        </div>
      </form>
    </div>
  </main>
</template>
