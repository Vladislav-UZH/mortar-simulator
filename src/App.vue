<script setup>
import StyledView from "./components/StyledView.vue";
import ScenePage from "./pages/ScenePage.vue";
import HomePage from "./pages/HomePage.vue";

import { useGlobalStore } from "./store/global";
const store = useGlobalStore();
</script>

<template>
  <main>
    <!-- <StyledView /> -->
    <section v-if="store.isRedirectedToScene" class="scene">
      <ScenePage />
    </section>
    <section class="home" v-else>
      <HomePage />
    </section>
  </main>
</template>

<style scoped>
.scene {
  display: flex;
  padding: 30px;
  border-radius: 10px;
  border: 10px solid #393924;
}
.home {
  margin-top: calc(50vh - 50%);
}
</style>
