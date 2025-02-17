<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import OpenAI from "openai";
import Header from "@/components/Header.vue";
import ViewTitle from "@/components/ViewTitle.vue";
import Alert from "@/components/Alert.vue";
import Icon from "@/components/Icon.vue";

const router = useRouter();
const user = JSON.parse(sessionStorage.getItem("user"));

const message = ref("");
const conversation = ref([]);
const conversationBox = ref(null);

const alertType = ref("");
const alertHighlight = ref("");
const alertMessage = ref("");
const displayAlert = ref(false);

onMounted(async function () {
  if (!user) {
    router.push("/");
  }
});

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function sendMessage() {
  try {
    conversation.value.push({
      role: "user",
      content: message.value,
    });

    message.value = "";

    await nextTick();
    conversationBox.value.scrollTo({
      top: conversationBox.value.scrollHeight,
      behavior: "smooth",
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation.value,
    });

    conversation.value.push({
      role: "assistant",
      content: completion.choices[0].message.content,
    });

    await nextTick();
    conversationBox.value.scrollTo({
      top: conversationBox.value.scrollHeight,
      behavior: "smooth",
    });
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
        title="RocketFlow AI"
        description="Hello, how can I assist you today?"
        icon="hexagon-nodes"
      ></ViewTitle>
      <Alert
        v-if="displayAlert"
        :type="alertType"
        :hightlight="alertHighlight"
        :message="alertMessage"
      ></Alert>
      <div
        ref="conversationBox"
        class="rocketflow-ai-box ds-rocketflow-text mx-3 mb-3"
        v-if="conversation.length > 0"
      >
        <div v-for="(response, index) in conversation" :key="index">
          <h6 class="text-end mb-2" v-if="response.role == 'user'">
            {{ response.content }}
          </h6>
          <div class="small mb-4" v-if="response.role == 'assistant'">
            <span class="rocketflow-ai-response fw-bold"
              ><Icon class="fs-5" name="hexagon-nodes"></Icon> RocketFlow AI:
            </span>
            <pre>{{ response.content }}</pre>
          </div>
        </div>
      </div>
      <form class="mx-3" autocomplete="off" @submit.prevent="sendMessage">
        <div class="form-floating mb-3">
          <textarea
            name="message"
            id="message"
            class="form-control"
            required
            placeholder="Message:"
            v-model="message"
          ></textarea>
          <label for="message" class="form-label">Message:</label>
        </div>
        <div class="d-grid gap-2 mb-3">
          <button class="btn btn-secondary text-light">Send</button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
.rocketflow-ai-box {
  max-height: 350px !important;
  overflow-y: auto !important;
  scrollbar-width: none !important;
}

.rocketflow-ai-box::-webkit-scrollbar {
  display: none !important;
}

.rocketflow-ai-response {
  color: var(--ds-rocketflow-tertiary) !important;
}

.rocketflow-ai-box pre {
  font-family: inherit !important;
  white-space: pre-wrap !important;
  user-select: text !important;
  -moz-user-select: text !important;
  -webkit-user-select: text !important;
}
</style>
