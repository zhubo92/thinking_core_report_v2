<script setup lang="ts">
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
import CoverPage from "@/views/report/cover/CoverPage.vue";
import { useRoute } from "vue-router";
import { useReportStore } from "@/store";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { SwipeInstance } from "vant";

const { babyId: _babyId, recordId: _recordId, type: _type } = useRoute().query;

const reportStore = useReportStore();
const { isSingle, isTeacher, babyId, recordId, babyInfo, totalPage, pageList } =
  storeToRefs(reportStore);
const { getReport } = reportStore;

const showCover = ref(false);
const currentPage = ref<number>(1);
const swipeRef = ref<SwipeInstance>();

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

onMounted(() => {
  init();
  getReport();
});
</script>

<template>
  <CoverPage v-if="showCover" :info="babyInfo" @start="start" />
  <div v-else class="report">
    <Swipe ref="swipeRef" vertical class="sp" :loop="false" :touchable="false">
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
      <template v-if="totalPage > 0" #indicator>
        <div class="sp-indicator">{{ currentPage }}/{{ totalPage }}</div>
      </template>
    </Swipe>

    <TurnPage :show-down="showDown" :show-up="showUp" @turn="changeSwipe" />
  </div>
</template>

<style lang="scss" scoped></style>
