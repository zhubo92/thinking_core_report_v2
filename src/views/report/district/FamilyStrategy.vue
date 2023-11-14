<script setup lang="ts">
import { ref } from "vue";
import { getImageUrl } from "@/utils";

const props = defineProps<{
  value: string;
}>();

const education = ref(props.value);
</script>

<template>
  <div class="family-strategy fs grid_bgi">
    <img :src="getImageUrl('family_title')" alt="" class="fs-title" />
    <div class="fs-content">
      <div class="fs-content-dots"></div>
      <div class="fs-content-text">{{ education }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fs {
  padding: 20px 0 17px;
  margin: 16px auto;
  width: 343px;
  box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
  border-radius: 17px 17px 17px 17px;

  &-title {
    margin: 0 auto;
    width: 311px;
    height: 68px;
    object-fit: contain;
  }

  &-content {
    display: flex;
    padding-top: 14px;
    padding-bottom: 21px;
    margin: 0 auto 0;
    width: 311px;
    background: #fff5f6;
    border-radius: 10px 10px 10px 10px;

    &-dots {
      margin-left: 16px;
      margin-top: 7px;
      margin-right: 8px;
      width: 6px;
      height: 6px;
      background: #e42f37;
      border-radius: 50%;
    }

    &-text {
      width: 265px;
      font-size: 14px;
      font-family:
        PingFang SC-Regular,
        PingFang SC;
      font-weight: 400;
      color: #1a2c5e;
      line-height: 20px;
    }
  }
}
</style>
