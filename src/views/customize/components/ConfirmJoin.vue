<script setup lang="ts">
import { getImageUrl } from "@/utils";
import { Overlay } from "vant";

const props = defineProps(["show"]);
const emit = defineEmits(["close", "confirm"]);
</script>

<template>
  <Overlay :show="props.show" z-index="20" @click="emit('close')">
    <div class="confirm-join cj" @click.stop>
      <img
        :src="getImageUrl('report_close')"
        alt=""
        class="cj-close"
        @click="emit('close')"
      />
      <div class="cj-title">确定要取消加入吗？</div>
      <div class="cj-button flex-center">
        <div class="cj-button-cancel flex-center" @click="emit('close')">
          取消
        </div>
        <div class="cj-button-confirm flex-center" @click="emit('confirm')">
          确认
        </div>
      </div>
    </div>
  </Overlay>
</template>

<style scoped lang="scss">
.cj {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 295px;
  height: 193px;
  background: #ffffff;
  border-radius: 20px 20px 20px 20px;

  &-close {
    position: absolute;
    right: 18px;
    top: 18px;
    width: 13px;
    height: 13px;
  }

  &-title {
    margin: 63px auto 50px;
    font-size: 18px;
    font-family:
      PingFang SC-Medium,
      PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 24px;
    text-align: center;
    span {
      color: #1228b9;
    }
  }

  &-button {
    &-cancel,
    &-confirm {
      width: 113px;
      height: 42px;
      border-radius: 21px 21px 21px 21px;
      font-size: 16px;
      font-family:
        PingFang SC-Medium,
        PingFang SC,
        serif;
      font-weight: 500;
      border: 1px solid rgba(153, 153, 153, 0.6);
      background-color: #fff;
      color: #666666;
    }

    &-confirm {
      margin-left: 11px;
      color: #ffffff;
      background: #1228b9;
      border: none;
    }
  }
}
</style>
