<script setup>
defineProps({ label: { type: String, default: "BUTTON" } });
</script>

<template>
  <button class="button" type="button">{{ label.toUpperCase() }}</button>
</template>
<style scoped>
.button {
  display: flex;
  width: 53px;
  height: 53px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border-radius: 4px;
  border: 4px solid #c7c5c2;
  &:active {
    background-color: rgba(128, 128, 128, 0.49);
  }
}
</style>
