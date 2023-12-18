<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import Knob from "primevue/knob";

import Indicator from "../components/StyledIndicator.vue";
import UpButton from "../components/UpButton.vue";
import DownButton from "../components/DownButton.vue";
import StyledButton from "../components/StyledButton.vue";
import StyledBox from "../components/StyledBox.vue";
import ActionButton from "../components/ActionButton.vue";
import { Physics } from "../helpers/physics";

const system = reactive({ power: false, display: false, screen: false });

//
const canvas = ref(null);
const ctx = ref(null);
const intervalId = ref(null);
//

const DEFAULT_MORTAR = {
  story: [],
  angle: 60,
  startSpeed: 10,
  time: 0,
  flightLength: 0,
  flightHeight: 0,
  velocity: 0,
};
const mortar = reactive({
  ...DEFAULT_MORTAR,
  coordinates: { x: 0, y: 0 },
  state: { isReady: false, isLoaded: false },
});
onMounted(() => {
  ctx.value = canvas.value.getContext("2d");
});

function saveLastImpactPosition(x) {
  mortar.story.push([x, 0]);
}

function shoot() {
  mortar.state.isReady = true;
  console.log(mortar);
}
function reload() {
  mortar.state.isReady = false;
  mortar.coordinates.x = 0;
  mortar.coordinates.y = 0;
  Object.assign(mortar, DEFAULT_MORTAR);
  ctx.value.reset();
  return;
}
function stopDrawing() {
  clearInterval(intervalId.value);
  intervalId.value = null;
}

function switchOYHigh({ isUp = false, step = 20 }) {
  if (!isUp && mortar.coordinates.y) {
    mortar.coordinates.y -= step - 10;
    return;
  }

  if (isUp) {
    mortar.coordinates.y += step;
  }
  return;
}
const INTERVAL_TIME = 15;

function updateCoordinates(newX, nexY) {
  mortar.coordinates.x += newX;
  mortar.coordinates.y += nexY;

  return [mortar.coordinates.x, mortar.coordinates.y];
}

watch(mortar.state, () => {
  const physics = new Physics({
    startSpeed: mortar.startSpeed,
    angle: mortar.angle,
  });
  ctx.value.beginPath();
  ctx.value.moveTo(mortar.coordinates.x, mortar.coordinates.y);

  if (!mortar.state.isReady) {
    return;
  }

  intervalId.value = setInterval(() => {
    mortar.time += INTERVAL_TIME;
    const newX = physics.getCoordinate({
      axis: "OX",
      timeInSec: mortar.time,
    });
    const newY = physics.getCoordinate({
      axis: "OY",
      timeInSec: mortar.time,
    });
    const [x, y] = updateCoordinates(newX, newY);

    mortar.flightLength = Math.abs(mortar.coordinates.x / 100).toFixed(1);
    mortar.flightHeight = Math.abs(mortar.coordinates.y / 100).toFixed(1);

    mortar.velocity = physics.getVelocity(mortar.time);

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
  <div class="base">
    <!-- LEFT PANEL -->
    <div class="left-panel">
      <!-- SYSTEM -->
      <div class="system">
        <StyledBox label="System">
          <template #body>
            <div class="indicators">
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
                :key="opt.type"
              />
            </div>
          </template>
        </StyledBox>
      </div>
      <!-- BRIGHTNESS -->
      <div>
        <StyledBox label="BRIGHTNESS">
          <template #body>
            <div class="brightness">
              <StyledButton
                :label="text"
                v-for="text in ['mode', 'prtl', 'port', 'actg']"
                :key="text"
              /></div></template
        ></StyledBox>
      </div>

      <!-- MENU -->
      <div>
        <StyledBox label="Menu">
          <template #body>
            <div class="menu">
              <div class="action-buttons">
                <ActionButton @click="reload" action="reload" />
                <ActionButton @click="shoot" action="shoot" />
              </div>
              <div class="directions">
                <!-- OY POSITION -->
                <div class="controller-oy">
                  <UpButton @click="() => switchOYHigh({ isUp: true })" />
                  <DownButton @click="() => switchOYHigh({ isUp: false })" />
                </div>
                <!-- ANGLE -->
                <Knob
                  v-model="mortar.angle"
                  text-color="#FFF"
                  range-color="#1A1A19"
                  value-color="#0E77B2"
                  value-template="{value}&deg;"
                  :min="20"
                  :max="85"
                />
              </div></div></template
        ></StyledBox>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="right-panel">
      <!-- SCENE -->
      <canvas width="1270" height="560" class="scene" ref="canvas"></canvas>

      <div class="information">
        <StyledBox label="Area"
          ><template #body>
            <div class="area-box">
              <div class="info-distance">
                <div>
                  <p>LENGTH</p>
                  <span class="info-distance-value"
                    >{{ mortar.flightLength }} m</span
                  >
                </div>
                <div>
                  <p>HEIGHT</p>
                  <span class="info-distance-value"
                    >{{ mortar.flightHeight }} m</span
                  >
                </div>
              </div>
              <div>
                <p>COORDINATES</p>
                <div class="info-coordinates">
                  <div>
                    <span class="info-coordinates-ox">OX: </span
                    ><span>{{ mortar.coordinates.x.toFixed(4) }}</span>
                  </div>
                  <div>
                    <span class="info-coordinates-oy">OY: </span
                    ><span>{{ mortar.coordinates.y.toFixed(4) }}</span>
                  </div>
                </div>
              </div>
            </div></template
          ></StyledBox
        >
        <StyledBox label="Display"
          ><template #body>
            <div style="min-width: 400px">
              <div>
                <span>VELOCITY: </span
                ><span class="info-distance-value"
                  >{{ mortar.velocity }} m/s</span
                >
              </div>
              <div>
                <span>TIME: </span
                ><span class="info-distance-value"
                  >{{ mortar.time / 1000 }} s</span
                >
              </div>
            </div>
          </template></StyledBox
        >
      </div>
    </div>
  </div>
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
  flex-wrap: wrap;
  gap: 20px;
}
.indicators {
  display: flex;
  flex-direction: row;
  gap: 72px;
}
.controllers {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 40px;
}
.brightness {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.menu {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.action-buttons {
  display: flex;
  /* justify-content: space-between; */
  gap: 20px;
}
.directions {
  display: flex;
}
.information {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
.area-box {
  display: flex;
  gap: 10px;
}
.scene {
  border-radius: 20px;
  border: 8px solid #767671;
  transform: rotateX(180deg);
}
.closed-scene {
  background-color: #131313;
}

.controller-oy {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-right: 50px;
}

.info-distance {
  margin-right: 30px;
}
.info-distance-value {
  color: #0e77b2;
}
.info-coordinates {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.info-coordinates-ox {
  color: #c92929;
}
.info-coordinates-oy {
  color: #0e7605;
}
</style>
