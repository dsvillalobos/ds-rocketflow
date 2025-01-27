<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Alert from "@/components/Alert.vue";
import Icon from "@/components/Icon.vue";
import LinkAccordionItem from "@/components/LinkAccordionItem.vue";

const router = useRouter();
const user = JSON.parse(sessionStorage.getItem("user"));

const links = ref([]);

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
        `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/links/all-links/${
          user.id
        }`
      );

      links.value = response.data;
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
        title="Links"
        description="Browse your saved links with ease. Access your collection of URLs quickly and conveniently."
        icon="link"
      ></ViewTitle>
      <div class="d-grid gap-2 mb-3 mx-3">
        <RouterLink class="btn btn-secondary text-light" to="/add-link"
          ><Icon name="plus"></Icon> Add Link</RouterLink
        >
      </div>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <div v-if="links.length > 0" class="accordion" id="accordionExample">
        <LinkAccordionItem
          v-for="(link, index) in links"
          :key="index"
          :accordion-item="index"
          :link-id="link.link_id"
          :title="link.title"
          :address="link.address"
          :owner="link.owner"
          :date-time="link.link_datetime"
        ></LinkAccordionItem>
      </div>
      <div v-else>
        <ViewTitle
          title="No Links Yet"
          description="Add your first link to get started."
          icon=""
        ></ViewTitle>
      </div>
    </div>
  </main>
</template>
