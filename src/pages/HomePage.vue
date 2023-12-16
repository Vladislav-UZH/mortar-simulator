<script setup>
import { useGlobalStore } from "../store/global";
const store = useGlobalStore();

function handleClick(e) {
  e.target.disabled = true;
  store.toggleRedirectToScene();
}
</script>
<template>
  <section class="">
    <h1>MORTAR Simulator</h1>
    <p>
      To start use the button below. Created by
      <a href="https://github.com/Vladislav-UZH">Vlad-UZH</a>
    </p>
    <button class="button" @click="handleClick" type="button">PRESS ME</button>
  </section>
</template>
<style scoped>
.container {
  display: flex;
}
.button {
  padding: 10px 30px;
  border: 1px solid #646cff;
  border-radius: 4px;

  &:hover {
    background-color: #5861ff;
  }
}
</style>
