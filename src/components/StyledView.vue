<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import Knob from "primevue/knob";

import Indicator from "./StyledIndicator.vue";
import UpButton from "./UpButton.vue";
import DownButton from "./DownButton.vue";
import StyledButton from "./StyledButton.vue";
import StyledBox from "./StyledBox.vue";

const system = reactive({ power: false, display: false, screen: false });

//
const canvas = ref(null);
const ctx = ref(null);
const intervalId = ref(null);
//
const mortar = reactive({
  coordinates: { x: 0, y: 20 },
  story: [],
  angle: 60,
  startSpeed: 9.9,
  time: 0,
  flightLength: 0,
  flightHeight: 0,
});
onMounted(() => {
  ctx.value = canvas.value.getContext("2d");
});

function msToSec(ms) {
  return +(ms / 1000).toFixed(3);
}

function getValueOfAngleInRadians({ type = "cos", angle = 45 }) {
  const radians = (angle * Math.PI) / 180;

  return +Math[type](radians).toFixed(80);
}

function getOX() {
  const Vs = mortar.startSpeed;
  const cos = getValueOfAngleInRadians({ type: "cos", angle: mortar.angle });
  const t = msToSec(mortar.time);

  return Vs * cos * t;
}

function getOY() {
  const Vs = mortar.startSpeed;
  const sin = getValueOfAngleInRadians({ type: "sin", angle: mortar.angle });
  const t = msToSec(mortar.time);
  const g = 9.8;

  return Vs * sin * t - (g * Math.pow(t, 2)) / 2;
}

function saveLastImpactPosition(x) {
  mortar.story.push([x, 0]);
}

function stopDrawing() {
  clearInterval(intervalId.value);
  intervalId.value = null;
}
const INTERVAL_TIME = 15;

watch(ctx, () => {
  ctx.value.beginPath();
  ctx.value.moveTo(mortar.coordinates.x, mortar.coordinates.y);

  intervalId.value = setInterval(() => {
    mortar.time += INTERVAL_TIME;

    mortar.coordinates.x += getOX();
    mortar.coordinates.y += getOY();

    const x = mortar.coordinates.x;
    const y = mortar.coordinates.y;

    if (y < 0) {
      stopDrawing();
      mortar.coordinates.y = 0;
      saveLastImpactPosition(x);

      return;
    }

    ctx.value.lineTo(x, y);
    ctx.value.strokeStyle = "#0E77B2";
    ctx.value.stroke();
  }, INTERVAL_TIME);
});

function handleSystem(type) {
  if (system.power && type === "power") {
    system.display = false;
    system.screen = false;
  }
  if (!system.power && type !== "power") {
    return;
  }

  system[type] = !system[type];
}
</script>

<template>
  <section class="base">
    <!-- LEFT PANEL -->
    <div class="left-panel">
      <!-- SYSTEM -->
      <div class="system">
        <StyledBox label="System">
          <template #body>
            <div>
              <StyledButton label="prtl" v-for="text in []" :key="text" />

              <!-- INDICATORS -->
              <Indicator :status="system.power" />
              <Indicator :status="system.display" />
              <Indicator :status="system.screen" /></div></template
        ></StyledBox>
        <!-- CONTROLLERS -->
        <StyledBox label="Control">
          <template #body>
            <div class="controllers">
              <StyledButton
                @click="() => handleSystem(opt.type)"
                :label="opt.name"
                v-for="opt in [
                  { name: 'Power', type: 'power' },
                  { name: 'DISPL', type: 'display' },
                  { name: 'SCRN', type: 'screen' },
                ]"
                :key="type"
              />
            </div>
          </template>
        </StyledBox>
      </div>
      <!-- BRIGHTNESS -->
      <div>
        <StyledBox label="BRIGHTNESS">
          <template #body>
            <div>
              <StyledButton
                label="prtl"
                v-for="text in []"
                :key="text"
              /></div></template
        ></StyledBox>
      </div>

      <!-- MENU -->
      <div>
        <StyledBox label="menu">
          <template #body>
            <!-- OY POSITION -->
            <div><UpButton /> <DownButton /></div>
            <!-- ANGLE -->
            <Knob
              v-model="mortar.angle"
              text-color="#FFF"
              range-color="#1A1A19"
              value-color="#0E77B2"
              value-template="{value}&deg;"
              :min="20"
              :max="85"
            /> </template
        ></StyledBox>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="right-panel">
      <!-- SCENE -->
      <canvas width="1270" height="640" class="scene" ref="canvas"></canvas>

      <div class="information">
        <StyledBox
          ><template #body> <div></div> </template
        ></StyledBox>
        <StyledBox
          ><template #body> <div></div> </template
        ></StyledBox>
      </div>
    </div>
  </section>
</template>
<style scoped>
.base {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.left-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.system {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.information {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
.scene {
  border-radius: 20px;
  border: 8px solid #767671;
  transform: rotateX(180deg);
}
.closed-scene {
  background-color: #131313;
}
</style>
