<script setup>
defineProps({ action: { type: String, default: "SHOOT" } });

const emit = defineEmits(["action"]);

function handleClick() {
  emit("action");
}
</script>
<template>
  <button @click="handleClick" type="button">
    {{ action.toUpperCase() }}
  </button>
</template>
<style scoped></style>
