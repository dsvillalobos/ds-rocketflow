<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import axios from "axios";
import Header from "@/components/Header.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Alert from "@/components/Alert.vue";
import Icon from "@/components/Icon.vue";

const router = useRouter();
const user = JSON.parse(sessionStorage.getItem("user"));
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const files = ref(0);
const links = ref(0);
const notes = ref(0);
const latestFile = ref(null);
const latestLink = ref(null);
const latestNote = ref(null);

const alertType = ref("");
const alertHighlight = ref("");
const alertMessage = ref("");
const displayAlert = ref(false);

const chartData = computed(function () {
  return {
    labels: ["Files", "Links", "Notes"],
    datasets: [
      {
        data: [files.value, links.value, notes.value],
        backgroundColor: ["#392d69", "#8879c3", "#ac9aca"],
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        boxWidth: 35,
        padding: 25,
      },
    },
  },
};

onMounted(async function () {
  if (!user) {
    router.push("/");
  } else {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DS_ROCKETFLOW_API_URL
        }/dashboard/storage-trends/${user.id}`
      );

      files.value = response.data[0].files;
      links.value = response.data[0].links;
      notes.value = response.data[0].notes;

      const responseLatestFile = await axios.get(
        `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/dashboard/latest-file/${
          user.id
        }`
      );

      const responseLatestLink = await axios.get(
        `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/dashboard/latest-link/${
          user.id
        }`
      );

      const responseLatestNote = await axios.get(
        `${import.meta.env.VITE_DS_ROCKETFLOW_API_URL}/dashboard/latest-note/${
          user.id
        }`
      );

      latestFile.value = responseLatestFile.data[0];
      latestLink.value = responseLatestLink.data[0];
      latestNote.value = responseLatestNote.data[0];
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
      <div class="ds-rocketflow-text text-center mx-3 mb-4">
        <div class="fs-6">
          Welcome <span class="h6" v-if="user">{{ user.name }}</span>
        </div>
        <div class="small fst-italic">Storage at Rocket Speed.</div>
      </div>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <div class="row storage-trends ds-rocketflow-text mx-3 mb-4">
        <div class="col text-center border-start">
          <h6 class="mb-1">Files</h6>
          <div class="small">{{ files }}</div>
        </div>
        <div class="col text-center border-start">
          <h6 class="mb-1">Links</h6>
          <div class="small">{{ links }}</div>
        </div>
        <div class="col text-center border-start border-end">
          <h6 class="mb-1">Notes</h6>
          <div class="small">{{ notes }}</div>
        </div>
      </div>
      <div v-if="files > 0 || links > 0 || notes > 0">
        <div class="chart-container mx-3 mb-4">
          <Doughnut :data="chartData" :options="chartOptions"></Doughnut>
        </div>
        <div class="mx-3">
          <h6 class="ds-rocketflow-text text-center mb-3">Recent Activity</h6>
          <div v-if="latestFile != undefined" class="col mb-3">
            <div class="card py-0 ds-rocketflow-text">
              <div class="card-body d-flex align-items-center">
                <Icon class="recent-activity-icon fs-2 mx-3" name="file"></Icon>
                <div>
                  <h6 class="card-title m-0">{{ latestFile.name }}</h6>
                  <div class="card-text">
                    <div class="small">
                      Added on:
                      {{ new Date(latestFile.file_datetime).toLocaleString() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="latestLink != undefined" class="col mb-3">
            <div class="card py-0 ds-rocketflow-text">
              <div class="card-body d-flex align-items-center">
                <Icon class="recent-activity-icon fs-2 mx-2" name="link"></Icon>
                <div>
                  <h6 class="card-title m-0">{{ latestLink.title }}</h6>
                  <div class="card-text">
                    <div class="small">
                      Added on:
                      {{ new Date(latestLink.link_datetime).toLocaleString() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="latestNote != undefined" class="col mb-3">
            <div class="card py-0 ds-rocketflow-text">
              <div class="card-body d-flex align-items-center">
                <Icon
                  class="recent-activity-icon fs-2 mx-3"
                  name="sticky-note"
                ></Icon>
                <div>
                  <h6 class="card-title m-0">{{ latestNote.title }}</h6>
                  <div class="card-text">
                    <div class="small">
                      Added on:
                      {{ new Date(latestNote.note_datetime).toLocaleString() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <ViewTitle
          title="Nothing to Show Yet"
          description="Get started by adding your files, links, and notes."
          icon=""
        ></ViewTitle>
      </div>
    </div>
  </main>
</template>

<style scoped>
.col {
  border-width: 1px !important;
  border-color: var(--ds-rocketflow-secondary) !important;
}

.chart-container {
  width: auto !important;
  height: 325px !important;
}

.card {
  background-color: transparent !important;
  border-width: 1px !important;
  border-color: var(--ds-rocketflow-secondary) !important;
}

.recent-activity-icon {
  color: var(--ds-rocketflow-tertiary) !important;
}
</style>
