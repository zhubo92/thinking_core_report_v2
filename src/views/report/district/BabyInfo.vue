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
    <img
      v-if="babyInfo.headImg"
      :src="babyInfo.headImg as string"
      alt=""
      class="bi-ava"
    />
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
    object-fit: cover;
    border-radius: 50%;
  }

  &-info {
    &-name {
      margin: 5px 0;
      width: 150px;
      height: 25px;
      font-size: 18px;
      font-family:
        PingFang SC-Semibold,
        PingFang SC,
        serif;
      font-weight: 600;
      color: #2c1717;
      line-height: 22px;
      @include single-hide();
    }

    &-class {
      width: 245px;
      height: 20px;
      font-size: 14px;
      font-family:
        PingFang SC-Regular,
        PingFang SC,
        serif;
      font-weight: 400;
      color: #2c1717;
      line-height: 17px;
      opacity: 0.3962;
      @include single-hide();
    }
  }
}
</style>
