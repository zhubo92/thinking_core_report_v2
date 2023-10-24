<script setup lang="ts">
import { computed, ref } from "vue";
import { getImageUrl } from "@/utils";

const props = defineProps<{
  value: {
    activityName: string;
    activityDescription: string;
    domainName: string;
    domainAbilityName: string;
    districtName: string;
  };
}>();

const activityName = ref(props.value.activityName);
const activityDescription = ref(props.value.activityDescription);
const domainName = ref(props.value.domainName);
const domainAbilityName = ref(props.value.domainAbilityName);
const districtName = ref(props.value.districtName);

const bgi = computed(() => {
  switch (districtName.value) {
    case "思维探索区":
      return getImageUrl("activity_bgi_01");
    case "科学探索区":
      return getImageUrl("activity_bgi_02");
    case "自由探索区":
      return getImageUrl("activity_bgi_03");
    case "中华文化区":
      return getImageUrl("activity_bgi_04");
    default:
      return getImageUrl("activity_bgi_05");
  }
});
</script>

<template>
  <div class="activity-bgi" :style="{ backgroundImage: `url(${bgi})` }"></div>
  <div class="activity-info ai grid_bgi">
    <img :src="getImageUrl('activity_logo')" alt="" class="ai-logo" />

    <div class="ai-line" v-if="activityName">
      <div class="ai-line-label"><span class="triangle"></span>活动名称：</div>
      <div class="ai-line-value">{{ activityName }}</div>
    </div>
    <div class="ai-line" v-if="activityDescription">
      <div class="ai-line-label"><span class="triangle"></span>活动目的：</div>
      <div class="ai-line-value">{{ activityDescription }}</div>
    </div>
    <div class="ai-line" v-if="domainName && domainAbilityName">
      <div class="ai-line-label">
        <span class="triangle"></span>
        核心观察能力：
      </div>
      <div class="ai-line-value w150">
        {{ domainName }}-{{ domainAbilityName }}
      </div>
    </div>

    <img :src="getImageUrl('activity_teacher')" alt="" class="ai-teacher" />
  </div>
</template>

<style scoped lang="scss">
.activity-bgi {
  width: 100%;
  height: 141px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center bottom;
}

.ai {
  position: relative;
  margin: -19px auto 0;
  padding: 30px 0;
  width: 343px;
  box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
  border-radius: 17px;
  border: 4px solid #b6dcff;
  box-sizing: border-box;

  &-logo {
    position: absolute;
    right: -13px;
    top: -26px;
    width: 52px;
    height: 52px;
  }

  &-line {
    display: flex;
    margin: 0 12px;

    &-label {
      display: flex;
      font-size: 14px;
      font-family:
        PingFang SC-Medium,
        PingFang SC;
      font-weight: 600;
      color: #2a69fd;
      white-space: nowrap;

      .triangle {
        margin-top: 4px;
        margin-right: 8px;
        width: 0;
        height: 0;
        border-left: 8px solid #2a69fd;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-radius: 2px;
      }
    }

    &-value {
      flex: 1;
      font-size: 14px;
      font-family:
        PingFang SC-Regular,
        PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
    }

    .w150 {
      flex: none;
      width: 150px;
    }
  }

  &-line + &-line {
    margin-top: 14px;
  }

  &-teacher {
    position: absolute;
    bottom: -27px;
    right: -8px;
    height: 96px;
    width: 56px;
  }
}
</style>
