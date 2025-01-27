<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Alert from "@/components/Alert.vue";
import Icon from "@/components/Icon.vue";
import NoteAccordionItem from "@/components/NoteAccordionItem.vue";

const router = useRouter();
const user = JSON.parse(sessionStorage.getItem("user"));

const notes = ref([]);

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
        `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/notes/all-notes/${
          user.id
        }`
      );

      notes.value = response.data;
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
        title="Notes"
        description="Your digital notepad awaits! Access and manage all your saved notes effortlessly in one central hub."
        icon="sticky-note"
      ></ViewTitle>
      <div class="d-grid gap-2 mb-3 mx-3">
        <RouterLink class="btn btn-secondary text-light" to="/add-note"
          ><Icon name="plus"></Icon> Add Note</RouterLink
        >
      </div>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <div v-if="notes.length > 0" class="accordion" id="accordionExample">
        <NoteAccordionItem
          v-for="(note, index) in notes"
          :key="index"
          :accordion-item="index"
          :note-id="note.note_id"
          :title="note.title"
          :body="note.body"
          :owner="note.owner"
          :date-time="note.note_datetime"
        ></NoteAccordionItem>
      </div>
      <div v-else>
        <ViewTitle
          title="No Notes Yet"
          description="Add your first note to get started."
          icon=""
        ></ViewTitle>
      </div>
    </div>
  </main>
</template>
