import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    isRedirectedToScene: false,
    errorMessage: "",
    system: { power: false, display: false, screen: false },
  }),

  actions: {
    toggleRedirectToScene() {
      this.isRedirectedToScene = !this.isRedirectedToScene;
    },

    setErrorMessage(msg) {
      this.errorMessage = msg;
    },
  },
});
