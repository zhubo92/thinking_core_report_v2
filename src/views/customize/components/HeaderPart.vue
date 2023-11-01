<script setup lang="ts">
import { getImageUrl, returnAppPage } from "@/utils/index.js";
import { useCustomizeStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const customizeStore = useCustomizeStore();
const { singleRecord } = storeToRefs(customizeStore);

const props = defineProps(["isParent", "isMyRoute"]);
const emit = defineEmits(["send"]);

const router = useRouter();

function back() {
  props.isMyRoute === "1" ? router.go(-1) : returnAppPage();
}
</script>

<template>
  <div class="top-safety-distance"></div>
  <div class="header flex-center">
    <div class="header-back" @click="back">
      <img :src="getImageUrl('return_button')" alt="" class="header-back-img" />
    </div>
    <div v-if="!props.isParent" class="header-send" @click="emit('send')">
      <div class="header-send-btn flex-center">
        {{ singleRecord.sendReport ? "已发送" : "发送家长" }}
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
