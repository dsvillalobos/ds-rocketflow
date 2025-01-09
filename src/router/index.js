import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@/views/auth/SignIn.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "SignIn",
      component: SignIn,
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: () => import("../views/auth/SignUp.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/files",
      name: "Files",
      component: () => import("../views/files/Files.vue"),
    },
    {
      path: "/add-file",
      name: "AddFile",
      component: () => import("../views/files/AddFile.vue"),
    },
    {
      path: "/links",
      name: "Links",
      component: () => import("../views/links/Links.vue"),
    },
    {
      path: "/add-link",
      name: "AddLink",
      component: () => import("../views/links/AddLink.vue"),
    },
    {
      path: "/edit-link/:linkId",
      name: "EditLink",
      component: () => import("../views/links/EditLink.vue"),
    },
    {
      path: "/notes",
      name: "Notes",
      component: () => import("../views/notes/Notes.vue"),
    },
    {
      path: "/add-note",
      name: "AddNote",
      component: () => import("../views/notes/AddNote.vue"),
    },
    {
      path: "/edit-note/:noteId",
      name: "EditNote",
      component: () => import("../views/notes/EditNote.vue"),
    },
    {
      path: "/open-note/:noteId",
      name: "OpenNote",
      component: () => import("../views/notes/OpenNote.vue"),
    },
    {
      path: "/rocketflow-ai",
      name: "RocketFlowAI",
      component: () => import("../views/RocketFlowAI.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/About.vue"),
    },
    {
      path: "/qr/:url",
      name: "QR",
      component: () => import("../views/QR.vue"),
    },
  ],
});

export default router;
