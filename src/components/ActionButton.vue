<script setup>
defineProps({ action: { type: String, default: "SHOOT" } });

const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
}
</script>
<template>
  <button
    class="button"
    :class="{ load: action !== 'shoot' }"
    @click="handleClick"
    type="button"
  >
    {{ action.toUpperCase() }}
  </button>
</template>
<style scoped>
.button {
  /* display: flex; */
  padding: 25px 20px;
  border-radius: 10px;
  border: 4px solid #780000;
  background-color: #371010;
  &:active {
    background-color: #780000;
  }
}

.load {
  border: 4px solid #9d9f17;
  background-color: #9d9f17;
}
</style>
