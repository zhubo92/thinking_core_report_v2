<script setup lang="ts">
import { getImageUrl, returnAppPage } from "@/utils/index.js";
import { useCustomizeStore } from "@/store";
import { storeToRefs } from "pinia";
const customizeStore = useCustomizeStore();
const { isSendToParent } = storeToRefs(customizeStore);
const { sendToParent } = customizeStore;
</script>

<template>
  <div class="top-safety-distance"></div>
  <div class="header flex-center">
    <div class="header-back" @click="returnAppPage">
      <img :src="getImageUrl('return_button')" alt="" class="header-back-img" />
    </div>
    <div v-if="true" class="header-send" @click="sendToParent">
      <div class="header-send-btn flex-center">
        {{ isSendToParent ? "已发送" : "发送家长" }}
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<style scoped lang="scss">
.top-safety-distance {
  width: 100%;
  height: 44px;
}
.header {
  justify-content: space-between;
  width: 100%;

  &-back {
    padding: 14px 28px;

    &-img {
      width: 15.17px;
      height: 15.17px;
      object-fit: contain;
    }
  }

  &-send {
    padding: 6px 19px;

    &-btn {
      width: 78px;
      height: 34px;
      background: #e9f8ff;
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2026);
      border-radius: 17px 17px 17px 17px;
      font-size: 14px;
      font-family:
        PingFang SC-Medium,
        PingFang SC;
      font-weight: 600;
      color: #233cd5;
    }
  }
}
</style>
