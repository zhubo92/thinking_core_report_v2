<script setup lang="ts">
import { IBabyInfo } from "@/types/report.d";
import { ref } from "vue";
import { getImageUrl } from "@/utils";

const props = defineProps<{
  value: IBabyInfo;
}>();

const babyInfo = ref<IBabyInfo>(props.value);
</script>

<template>
  <div
    class="baby-info bi"
    :style="{ backgroundImage: `url(${getImageUrl('baby_info_bgi')})` }"
  >
    <div
      class="bi-ava"
      :style="{ backgroundImage: `url(${babyInfo.headImg})` }"
    ></div>
    <div class="bi-info">
      <div class="bi-info-name">{{ babyInfo.babyName }}</div>
      <div class="bi-info-class">
        {{ babyInfo.schoolName }}-{{ babyInfo.className }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bi {
  display: flex;
  padding-top: 127px;
  margin: 31px auto 0;
  width: 343px;
  height: 208px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  overflow: hidden;

  &-ava {
    margin-left: 20px;
    margin-right: 16px;
    width: 55px;
    height: 55px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 50%;
  }

  &-info {
    &-name {
      margin: 5px 0;
      width: 150px;
      height: 25px;
      font-size: 18px;
      font-family:
        PingFang SC-Regular,
        PingFang SC;
      font-weight: 600;
      color: #2c1717;
      line-height: 25px;
      @include single-hide();
    }

    &-class {
      width: 245px;
      height: 20px;
      font-size: 14px;
      font-family:
        PingFang SC-Regular,
        PingFang SC;
      font-weight: 400;
      color: #2c1717;
      line-height: 20px;
      opacity: 0.3962;
      @include single-hide();
    }
  }
}
</style>
