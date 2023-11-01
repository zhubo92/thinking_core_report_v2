<script setup lang="ts">
import { getAppToken, getImageUrl, returnAppPage } from "@/utils";
import AddReport from "@/views/customize/components/AddReport.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCustomizeStore } from "@/store";
import { storeToRefs } from "pinia";
import { IBabies } from "@/types/customize";

const router = useRouter();

const {
  c: classId,
  l: classLevelCode,
  g: gameType,
  r: recordType,
  s: semesterType,
  o: isMyRoute,
} = useRoute().query;
const customizeStore = useCustomizeStore();

const { recordData, babyList } = storeToRefs(customizeStore);
const { getSemesterBabies } = customizeStore;

const show = ref<boolean>(false);
const temporaryBabyId = ref<string>("");

function goAdd() {
  show.value = false;
  console.log("goAdd");
  router.push({
    path: "/customize/GrowthRecord",
    query: {
      b: temporaryBabyId.value,
      c: classId,
      l: classLevelCode,
      g: gameType,
      s: semesterType,
      o: 1,
    },
  });
}

function goDetail(item: IBabies) {
  temporaryBabyId.value = item.babyId;

  if (item.totalRecord === 0) {
    show.value = true;
  } else {
    router.push({
      path: "/customize/SemesterReport",
      query: {
        b: temporaryBabyId.value,
        c: classId,
        l: classLevelCode,
        // g: gameType,
        s: semesterType,
        // r: 1,
        o: 1,
      },
    });
  }
}

function formatTeacherNames(names: string[]) {
  console.log("names", names);
  let str = "";
  names.map((name, nameIndex) => {
    if (nameIndex !== 0) {
      str += "、";
    }
    str += `${name}`;
  });
  return str;
}

function back() {
  isMyRoute === "1" ? router.go(-1) : returnAppPage();
}

onMounted(async () => {
  await getAppToken();
  if (
    typeof classId === "string" &&
    typeof classLevelCode === "string" &&
    typeof gameType === "string" &&
    typeof recordType === "string" &&
    typeof semesterType === "string"
  )
    await getSemesterBabies({
      classId,
      classLevelCode,
      gameType,
      recordType,
      semesterType,
    });
});

/**
 * c: classId
 * l: classLevelCode
 * g: gameType
 * r: recordType
 * s: semesterType
 * http://192.168.1.17:8989/#/customize/ComplexReportList?c=1304705777133330433&l=2&g=2&r=1&s=0
 */
</script>

<template>
  <div class="back" @click="back">
    <img :src="getImageUrl('back_button')" alt="" class="back-img" />
  </div>
  <div
    class="report-list rl"
    :style="{
      backgroundImage: `url(${getImageUrl('complex_list_bgi_bottom')})`,
    }"
  >
    <img :src="getImageUrl('complex_list_bgi_top')" alt="" class="rl-bgi" />
    <div
      class="rl-info"
      :style="{ backgroundImage: `url(${getImageUrl('complex_info')})` }"
    >
      <div class="rl-info-item">
        <div class="label">评估对象</div>
        <div class="value">
          {{ recordData.className }}{{ recordData.totalBaby }}名幼儿
        </div>
      </div>
      <div class="rl-info-item">
        <div class="label">评估时段</div>
        <div class="value">
          {{ recordData.startDate }}-{{ recordData.endDate }}
        </div>
      </div>
      <div class="rl-info-item" v-if="recordData.teacherNames.length !== 0">
        <div class="label">参与评估老师</div>
        <div class="value">
          {{ formatTeacherNames(recordData.teacherNames) }}
        </div>
      </div>
    </div>
    <div class="rl-content">
      <img
        :src="getImageUrl('complex_list_title')"
        alt=""
        class="rl-content-title"
      />
      <div class="rl-content-list">
        <div
          v-for="item in babyList"
          :key="item.babyId"
          class="item flex-center"
          @click="goDetail(item)"
        >
          <div
            class="item-avatar"
            :style="{ backgroundImage: `url(${item.babyHeadImg})` }"
          >
            <img
              v-if="item.totalRecord !== 0"
              :src="getImageUrl('check_mark')"
              alt=""
              class="item-avatar-logo"
            />
          </div>
          <div :class="['item-name', item.totalRecord === 0 && 'grey']">
            {{ item.babyName }}
          </div>
          <div class="item-num">{{ item.totalRecord }}条</div>
        </div>
      </div>
    </div>
  </div>
  <AddReport :show="show" @close="show = false" @goAdd="goAdd" />
</template>

<style scoped lang="scss">
.back {
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 3;
  padding: 15px 12px;

  &-img {
    width: 13px;
    height: 20px;
    object-fit: contain;
  }
}

.rl {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding-top: 88px;
  width: 100vw;
  min-height: 100vh;
  background-repeat: repeat-y;
  background-size: 100%;
  overflow: hidden;

  &-bgi {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 255px;
  }

  > div {
    position: relative;
    z-index: 2;
  }

  &-info {
    padding-top: 59px;
    padding-left: 40px;
    width: 100%;
    height: 227px;
    background-size: 100% 100%;

    &-item {
      display: flex;

      .label {
        width: 82px;
        height: 24px;
        font-size: 12px;
        font-family:
          PingFang SC-Regular,
          PingFang SC,
          serif;
        font-weight: 400;
        color: #f4f8ff;
        line-height: 24px;
        opacity: 0.5;
      }

      .value {
        width: 195px;
        font-size: 14px;
        font-family:
          PingFang SC-Medium,
          PingFang SC,
          serif;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        @include multi-hide(2);
      }
    }

    &-item + &-item {
      margin-top: 5px;
    }
  }

  &-content {
    flex: 1;
    margin: 5px auto 0;
    padding: 20px 0 0 16px;
    width: 343px;
    background-color: #f4faff;
    border-radius: 10px 10px 0 0;

    &-title {
      width: 130px;
      height: 30px;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;

      .item {
        margin-right: 24px;
        margin-bottom: 20px;
        flex-direction: column;

        &-avatar {
          position: relative;
          width: 60px;
          height: 60px;
          background-size: cover;
          border-radius: 20px;
          overflow: hidden;

          &-logo {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 19px;
            height: 19px;
          }
        }

        &-name {
          margin-top: 4px;
          margin-bottom: 4px;
          width: 60px;
          height: 18px;
          font-size: 14px;
          font-family:
            PingFang SC-Medium,
            PingFang SC,
            serif;
          font-weight: 500;
          color: #333333;
          line-height: 18px;
          text-align: center;
          @include single-hide();
        }

        .grey {
          color: #999999;
        }

        &-num {
          height: 18px;
          font-size: 12px;
          font-family:
            PingFang SC-Regular,
            PingFang SC,
            serif;
          font-weight: 400;
          color: #999999;
          line-height: 18px;
        }
      }

      .item:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
