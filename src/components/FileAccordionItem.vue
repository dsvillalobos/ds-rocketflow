<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
import Icon from "./Icon.vue";

const props = defineProps({
  accordionItem: {
    type: Number,
    required: true,
  },
  fileId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
});

async function deleteFile() {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/files/${props.fileId}`
    );

    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div class="accordion-item m-3">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed my-1"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapse${props.accordionItem}`"
        aria-expanded="true"
        :aria-controls="`collapse${props.accordionItem}`"
      >
        <span class="ds-rocketflow-text h6 m-0">{{ props.name }}</span>
      </button>
    </h2>
    <div
      :id="`collapse${props.accordionItem}`"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body py-0 ds-rocketflow-text">
        <div class="row mb-3">
          <div class="col text-center">
            <div class="h6 my-1">Type:</div>
            <span class="small">{{ props.type }}</span>
          </div>
          <div class="col text-center">
            <div class="h6 my-1">Owner:</div>
            <span class="small">{{ props.owner }}</span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col text-center">
            <div class="h6 my-1">Date:</div>
            <span class="small">{{
              new Date(props.dateTime).toLocaleDateString()
            }}</span>
          </div>
          <div class="col text-center">
            <div class="h6 my-1">Time:</div>
            <span class="small">{{
              new Date(props.dateTime).toLocaleTimeString()
            }}</span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col d-grid gap-2">
            <a
              class="btn btn-tertiary text-light btn-sm"
              :href="props.file"
              target="_blank"
              ><Icon name="arrow-up-right-from-square"></Icon> Open File</a
            >
          </div>
          <div class="col d-grid gap-2">
            <RouterLink
              class="btn btn-tertiary text-light btn-sm"
              :to="`/qr/${encodeURIComponent(props.file)}`"
              ><Icon name="qrcode"></Icon> Get QR Code</RouterLink
            >
          </div>
        </div>
        <div class="row mb-3">
          <div class="col d-grid gap-2">
            <button
              class="btn btn-danger text-light btn-sm"
              @click="deleteFile"
            >
              <Icon name="trash-can"></Icon> Delete File
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
