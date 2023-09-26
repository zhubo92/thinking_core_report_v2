<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits(["start"]);

const moveDistance = ref<number>(0);

function startAnimation() {
  const ele = document.querySelector(".cover");
  if (ele) {
    moveDistance.value = window.innerHeight;
    ele.className += " ani";
  }
  setTimeout(() => {
    emit("start");
  }, 300);
}
function resetAnimation() {
  const ele = document.querySelector(".cover");
  if (ele) {
    moveDistance.value = 0;
    ele.className += " ani";
    setTimeout(() => {
      ele.className = "cover";
    }, 300);
  }
}

onMounted(() => {
  const ele = document.querySelector(".cover");
  if (ele) {
    let startLocation = 0;
    ele.addEventListener("touchstart", (e) => {
      startLocation = e.touches[0].clientY;
    });
    ele.addEventListener("touchmove", (e) => {
      const distance = startLocation - e.touches[0].clientY;
      if (distance > 0) moveDistance.value = distance;
    });
    ele.addEventListener("touchend", () => {
      console.log(moveDistance.value, "moveDistance");
      if (moveDistance.value > 50) {
        startAnimation();
      } else {
        resetAnimation();
      }
    });
  }
});
</script>

<template>
  <div class="cover" :style="{ bottom: moveDistance + 'px' }">CoverPage</div>
</template>

<style scoped lang="scss">
.cover {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}

.ani {
  transition: bottom 0.3s;
}
</style>
