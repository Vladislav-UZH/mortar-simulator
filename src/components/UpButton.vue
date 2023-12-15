<template>
  <button class="button" type="button">
    <b class="label">UP</b>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="71"
      viewBox="0 0 72 71"
      fill="inherit"
    >
      <path
        d="M34.3258 3.84753C35.0694 2.39843 37.1408 2.39842 37.8845 3.84754L69.4408 65.3368C70.1238 66.6678 69.1574 68.25 67.6614 68.25H4.5488C3.05284 68.25 2.08641 66.6678 2.76944 65.3368L34.3258 3.84753Z"
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
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
