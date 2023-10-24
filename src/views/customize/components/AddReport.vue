<script setup lang="ts">
import { getImageUrl, imagePreview } from "@/utils";
import { Overlay } from "vant";

const props = defineProps(["show", "isKnow"]);
const emit = defineEmits(["close", "goAdd"]);
</script>

<template>
  <Overlay :show="props.show" z-index="20" @click="emit('close')">
    <div class="add-report ar" @click.stop>
      <img
        :src="getImageUrl('report_close')"
        alt=""
        class="ar-close"
        @click="emit('close')"
      />
      <img
        :src="getImageUrl('close_remark')"
        alt=""
        class="ar-remark"
        @click="imagePreview(getImageUrl('close_remark'))"
      />
      <div class="ar-title">
        暂无记录，选择要加入幼儿综合报告的记录点击“<span>加入报告</span>”
      </div>
      <div
        v-if="props.isKnow"
        class="ar-button flex-center"
        @click="emit('close')"
      >
        知道了
      </div>
      <div v-else class="ar-button flex-center" @click="emit('goAdd')">
        去添加
      </div>
    </div>
  </Overlay>
</template>

<style scoped lang="scss">
.ar {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 295px;
  height: 306px;
  background: #ffffff;
  border-radius: 20px 20px 20px 20px;

  &-close {
    position: absolute;
    right: 18px;
    top: 18px;
    width: 13px;
    height: 13px;
  }

  &-remark {
    margin: 41px auto 10px;
    width: 259px;
    height: 125px;
  }

  &-title {
    margin: 0 auto;
    width: 259px;
    height: 48px;
    font-size: 14px;
    font-family:
      PingFang SC-Medium,
      PingFang SC,
      serif;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
    text-align: center;
    span {
      color: #1228b9;
    }
  }

  &-button {
    margin: 20px auto 0;
    width: 237px;
    height: 42px;
    background: #1228b9;
    border-radius: 21px 21px 21px 21px;
    font-size: 16px;
    font-family:
      PingFang SC-Medium,
      PingFang SC,
      serif;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
