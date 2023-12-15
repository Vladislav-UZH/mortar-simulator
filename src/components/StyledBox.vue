<script setup>
defineProps({ label: { type: String, default: "menu" } });
</script>
<template>
  <div class="box">
    <span class="label">{{ label.toUpperCase() }}</span>
    <slot name="body"></slot>
  </div>
</template>
<style scoped>
.box {
  position: relative;
  display: flex;
  /* gap: 10px; */
  padding: 27px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 4px solid #c7c5c2;
}
.label {
  position: absolute;
  padding: 4px 2px;
  background-color: #10100e;

  top: -16px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
