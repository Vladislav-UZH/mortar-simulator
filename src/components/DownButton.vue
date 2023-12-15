<template>
  <button class="button" type="button">
    <b class="label">DOWN</b>
    <svg width="72" height="70" viewBox="0 0 72 70" fill="inherit">
      <path
        d="M34.3258 66.6525C35.0694 68.1016 37.1408 68.1016 37.8845 66.6525L69.4408 5.16316C70.1238 3.83224 69.1574 2.25 67.6614 2.25H4.5488C3.05284 2.25 2.08641 3.83224 2.76944 5.16317L34.3258 66.6525Z"
        stroke="#C7C5C2"
        stroke-width="4"
      />
    </svg>
  </button>
</template>
<style scoped>
.button {
  position: relative;
  fill: none;
  &:active {
    fill: rgba(128, 128, 128, 0.49);
  }
}
.label {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
