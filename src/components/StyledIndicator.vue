<script setup>
defineProps({
  name: { type: String, default: "Indicator" },
  status: { type: Boolean, default: false },
});
</script>

<template>
  <div>
    <span class="indicator" :class="{ positive: status }"></span>
    <title></title>
    <p>{{ status ? "ON" : "OFF" }}</p>
  </div>
</template>
<style scoped>
.indicator {
  display: flex;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 4px solid #b4b4b2;
  background-color: #d70000;
  /* transition: background-color 300ms; */
}
.positive {
  animation: changeColors 2000ms cubic-bezier(0, 0.5, 1, 0.14) forwards;
}

@keyframes changeColors {
  0%,
  20% {
    background-color: #d70000;
  }
  30% {
    background-color: #b6b906;
  }
  31%,
  80% {
    background-color: #cacc3b;
  }
  100% {
    background-color: #128e08;
  }
}
</style>
