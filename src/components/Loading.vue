<script setup lang="ts">
import { Loading as VanLoading } from "vant";
</script>

<template>
  <div class="loading flex-center" @touchstart.prevent>
    <VanLoading size="36" color="#1228B9" vertical>加载中...</VanLoading>
  </div>
</template>

<style scoped lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
