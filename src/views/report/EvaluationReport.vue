<script setup lang="ts">
import { useRoute } from "vue-router";
import { useReportStore } from "@/store";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { SwipeInstance, Swipe, SwipeItem } from "vant";
import TurnPage from "@/views/report/components/TurnPage.vue";
import CoverPage from "@/views/report/components/CoverPage.vue";
import HeaderPart from "@/views/report/components/HeaderPart.vue";
import Screenshot from "@/views/report/components/Screenshot.vue";

const { babyId: _babyId, recordId: _recordId, type: _type } = useRoute().query;

const reportStore = useReportStore();

const { isSingle, isTeacher, babyId, recordId, babyInfo, totalPage, pageList } =
  storeToRefs(reportStore);
const { getReport } = reportStore;

const showCover = ref(false);
const currentPage = ref<number>(1);
const swipeRef = ref<SwipeInstance | null>(null);

const showDown = computed(() => currentPage.value < totalPage.value);
const showUp = computed(() => currentPage.value > 1);

watch(isSingle, (val) => {
  if (!val) {
    showCover.value = true;
  }
});

const changeSwipe = (direction: string) => {
  if (direction === "bottom") {
    swipeRef.value?.next();
    currentPage.value++;
  } else {
    swipeRef.value?.prev();
    currentPage.value--;
  }
};
const start = () => {
  showCover.value = false;
};
function init() {
  if (typeof _babyId === "string") babyId.value = _babyId;
  if (typeof _recordId === "string") recordId.value = _recordId;
  isSingle.value = _type === "1" || _type === "2";
  isTeacher.value = _type === "1" || _type === "3";
}

init();
getReport();

/**
 * 封面页：CoverPage
 * 报告页：{
 *   综合发展情况：{
 *      标题：ComplexTitle
 *      雷达图：RadarChart
 *      评估技能：AssessmentSkills
 *   }
 *   各个区域：{
 *      孩子信息：BabyInfo
 *      区域名称：DistrictName
 *      活动信息：ActivityInfo （活动名称、活动目的、核心观察能力）
 *      幼儿行为表现：ChildrenBehavior
 *      高阶问题情境卡：QuestionPart （高阶问题情境、幼儿问题记录）
 *      家园共育策略：FamilyStrategy
 *   }
 *   综合发展评估：{
 *     标题：ComplexTitle
 *     领域：ComplexItem
 *   }
 * }
 */

/**
 * 测试环境
 *
 * 单次：http://192.168.1.17:8989/#/report?recordId=1704673396997074946&babyId=1304672468777553921&type=1
 *
 * 综合：http://192.168.1.17:8989/#/report?recordId=1529650322799325186&babyId=1304672468777553921&type=3
 */
</script>

<template>
  <CoverPage v-if="showCover" :info="babyInfo" @start="start" />

  <div class="report">
    <HeaderPart />

    <Swipe
      ref="swipeRef"
      class="sp"
      vertical
      :loop="false"
      :touchable="false"
      :show-indicators="false"
    >
      <SwipeItem v-for="page in pageList" :key="page.id" class="sp-item">
        <div class="report-item">
          <Component
            :is="cpt.view"
            v-for="cpt in page.componentList"
            :key="cpt.id"
            :value="cpt.value"
          />
        </div>
      </SwipeItem>
    </Swipe>

    <TurnPage :show-down="showDown" :show-up="showUp" @turn="changeSwipe" />

    <div v-if="totalPage > 0" class="indicator">
      {{ currentPage }}/{{ totalPage }}
    </div>
  </div>

  <Screenshot />
</template>

<style lang="scss" scoped>
.report {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;

  &-item {
    overflow: hidden;
  }
}

.sp {
  width: 100vw;
  height: calc(100vh - 90px);

  &-item {
    padding-bottom: 32px;
    width: 100vw;
    min-height: calc(100vh - 90px);
    overflow-y: auto;
    box-sizing: border-box;
  }
}

.indicator {
  position: fixed;
  right: 17px;
  bottom: 10px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
