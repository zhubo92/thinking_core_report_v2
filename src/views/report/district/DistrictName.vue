<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  value: {
    districtName: string;
    subtitle: string;
    slogan: string;
  };
}>();

const districtName = ref(props.value.districtName);
// const subtitle = ref(props.value.subtitle);
const slogan = ref(props.value.slogan);
</script>

<template>
  <!--  <div v-if="subtitle" class="sub-title">{{ subtitle }}</div>-->
  <div v-if="districtName" class="district-name">{{ districtName }}</div>
  <div v-if="slogan" class="slogan">{{ slogan }}</div>
</template>

<style scoped lang="scss">
.district-name {
  margin-top: 40px;
  height: 30px;
  font-size: 30px;
  font-family: YouSheBiaoTiYuan-Regular, YouSheBiaoTiYuan, serif;
  font-weight: 400;
  color: #1a2c5e;
  line-height: 30px;
  text-align: center;
}

.slogan {
  margin-top: 8px;
  height: 12px;
  font-size: 12px;
  font-family:
    PingFang SC-Regular,
    PingFang SC,
    serif;
  font-weight: 400;
  color: #1a2c5e;
  line-height: 12px;
  text-align: center;
}
</style>
