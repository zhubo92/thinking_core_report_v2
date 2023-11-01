<script setup lang="ts">
import {
  returnAppPage,
  getAppToken,
  getImageUrl,
  imagePreview,
  limitLength,
} from "@/utils";
import { onMounted, onUnmounted, ref } from "vue";
import { showToast } from "vant";
import AddReport from "@/views/customize/components/AddReport.vue";
import ConfirmJoin from "@/views/customize/components/ConfirmJoin.vue";
import { useRoute, useRouter } from "vue-router";
import { useCustomizeStore } from "@/store";
import { storeToRefs } from "pinia";
import { formatClassLevelCode, formatSemesterType } from "@/utils/filter.ts";
import { IBabyRecord } from "@/types/customize";

interface IType {
  id: number;
  name: string;
  isHas: boolean;
}

const TYPE_LIST: IType[] = [
  { id: 1, name: "behavior_class", isHas: true },
  { id: 2, name: "question_class", isHas: false },
];
const router = useRouter();
const {
  b: babyId,
  c: classId,
  l: classLevelCode,
  g: gameType,
  s: semesterType,
  o: isMyRoute,
} = useRoute().query;

const customizeStore = useCustomizeStore();

const { babyRecordList, babyDetail, domainList, babyRecordTotal } =
  storeToRefs(customizeStore);
const { getBabyRecord, getBabyDetail, getDomainList, joinSemesterReport } =
  customizeStore;

const page = ref<number>(1);
const pageSize = ref<number>(20);
const currentId = ref<string>("");

const currentType = ref(1);
const show = ref(false);
const showConfirm = ref(false);
const temporaryId = ref<string>("");
const temporaryState = ref<0 | 1>(0);

function isHas(content: string[]) {
  return Array.isArray(content) && content.length > 0;
}

function switchType(type: IType) {
  if (type.isHas) currentType.value = type.id;
  else showToast("问题记录暂未开通 \n" + "敬请期待");
}

async function confirm() {
  console.log("confirm");
  await joinSemesterReport(temporaryId.value, temporaryState.value);
  showConfirm.value = false;
}

function sliceAbility(item: IBabyRecord) {
  if (item.isExpand) {
    return item.abilityList;
  } else {
    return item.abilityList.slice(0, 3);
  }
}

function lookReport() {
  if (
    babyRecordList.value.findIndex((item) => item.joinSemester === 1) !== -1
  ) {
    router.push({
      path: "/customize/SemesterReport",
      query: {
        b: babyId,
        c: classId,
        l: classLevelCode,
        // g: gameType,
        s: semesterType,
        // r: 1,
        o: 1,
      },
    });
  } else {
    show.value = true;
  }
}

function openConfirm(id: string, state: 0 | 1) {
  temporaryId.value = id;
  temporaryState.value = state;
  showConfirm.value = true;
}

async function switchClass(id: string) {
  babyRecordList.value = [];
  currentId.value = id;
  page.value = 1;
  await getMore();
}

async function getMore() {
  if (
    typeof babyId === "string" &&
    typeof classId === "string" &&
    typeof classLevelCode === "string" &&
    typeof semesterType === "string" &&
    typeof gameType === "string"
  ) {
    await getBabyRecord({
      babyId,
      classId,
      classLevelCode,
      gameType,
      semesterType,
      page: page.value,
      pageSize: pageSize.value,
      domainId: currentId.value,
    });
  }
}

function scrollBottom() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let clientHeight = document.documentElement.clientHeight;
  let scrollHeight = document.documentElement.scrollHeight;
  if (scrollTop + clientHeight + 10 >= scrollHeight) {
    console.log("滚动到底部了");

    if (babyRecordTotal.value <= babyRecordList.value.length) {
      showToast("没有更多了");
    } else {
      getMore();
    }
  }
}

function goSingle(item: IBabyRecord) {
  router.push({
    path: "/customize/SingleReport",
    query: {
      b: babyId,
      i: item.id,
      o: 1,
    },
  });
}

function back() {
  isMyRoute === "1" ? router.go(-1) : returnAppPage();
}

onMounted(async () => {
  babyRecordList.value = [];

  // setToken(
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjM0MDI3NDA1MTcxNTYwNDQ5IiwiZXhwIjoxNjk4NjU0MTM4fQ.UJTOrAyQ2gSAxAm1oSNAqJLfrkNjOroqTHY4zCnq8Vc",
  // );

  await getAppToken();

  if (
    typeof babyId === "string" &&
    typeof classId === "string" &&
    typeof classLevelCode === "string" &&
    typeof semesterType === "string" &&
    typeof gameType === "string"
  ) {
    await getBabyDetail(babyId);
    await getDomainList();
    await getBabyRecord({
      babyId,
      classId,
      classLevelCode,
      gameType,
      semesterType,
      page: page.value,
      pageSize: pageSize.value,
      domainId: currentId.value,
    });
  }

  window.addEventListener("scroll", scrollBottom);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollBottom);
});

/**
 * b: babyId,
 * c: classId,
 * l: classLevelCode,
 * g: gameType,
 * s: semesterType,
 * http://192.168.1.17:8989/#/customize/GrowthRecord?c=1304705777133330433&l=0&g=2&r=1&s=0&b=1304672468777553921
 */
</script>

<template>
  <div class="back" @click="back">
    <img :src="getImageUrl('back_solid')" alt="" class="back-img" />
  </div>
  <div class="growth-record gr">
    <div
      class="gr-info"
      :style="{
        backgroundImage: `url(${getImageUrl('complex_list_bgi_top')})`,
      }"
    >
      <div class="gr-info-title">{{ babyDetail.babyName }}成长记录</div>
      <img :src="babyDetail.headImg" alt="" class="gr-info-ava" />
      <div
        class="gr-info-name"
        :style="{ backgroundImage: `url(${getImageUrl('detail_name')})` }"
      >
        {{ limitLength(babyDetail.babyName) }}
      </div>
      <div class="gr-info-level">
        {{ formatClassLevelCode(classLevelCode)
        }}{{ formatSemesterType(semesterType) }}
      </div>
      <div class="gr-info-class">
        <img
          v-for="type in TYPE_LIST"
          :key="type.id"
          :src="getImageUrl(type.name)"
          alt=""
          :class="[currentType === type.id && 'selected-type']"
          @click="switchType(type)"
        />
      </div>
    </div>

    <!--<img :src="getImageUrl('class_logo')" alt="" class="gr-logo" />-->
    <div
      class="gr-logo"
      :style="{ backgroundImage: `url(${getImageUrl('class_logo')})` }"
    ></div>

    <div class="gr-class">
      <div
        :class="['gr-class-item', currentId === '' && 'selected']"
        @click="switchClass('')"
      >
        全部
      </div>
      <div
        v-for="item in domainList"
        :key="item.id"
        :class="['gr-class-item', item.id === currentId && 'selected']"
        @click="switchClass(item.id)"
      >
        {{ item.domainAbilityName }}
      </div>
    </div>

    <div
      v-for="item in babyRecordList"
      :key="item.id"
      class="gr-item"
      @click="goSingle(item)"
    >
      <div class="gr-item-time">
        <img :src="getImageUrl('time_logo')" alt="" />
        <div>{{ item.recordDate }}</div>
      </div>
      <div class="gr-item-detail">
        <div class="info">
          <div class="info-left">
            <img :src="item.teacherHeadImg" alt="" />
            <div>{{ item.teacherName }}老师</div>
          </div>
          <div
            v-if="item.joinSemester"
            class="info-right flex-center joined"
            @click.stop="openConfirm(item.id, 0)"
          >
            <img :src="getImageUrl('joined_report')" alt="" />
            <div>已加入报告</div>
          </div>
          <div
            v-else
            class="info-right flex-center"
            @click.stop="joinSemesterReport(item.id, 1)"
          >
            <img :src="getImageUrl('add_report')" alt="" />
            <div>加入报告</div>
          </div>
        </div>

        <div
          v-for="(ability, abilityIndex) in sliceAbility(item)"
          :key="abilityIndex"
          class="dialogue"
        >
          <img :src="ability.abilityIconUrl" alt="" class="dialogue-ava" />
          <div class="dialogue-desc">
            <div class="dialogue-desc-title">
              {{ ability.domainName }}-{{ ability.abilityName }}
            </div>
            <div class="dialogue-desc-text">
              {{ ability.behave }}
            </div>
          </div>
        </div>

        <img
          v-if="!item.isExpand"
          :src="getImageUrl('dialogue_all')"
          alt=""
          class="all"
          @click.stop="item.isExpand = true"
        />

        <div
          v-if="isHas(item.story.images)"
          :class="['images', item.isExpand && 'mt40']"
        >
          <div
            v-for="(img, imgIndex) in item.story.images.slice(0, 3)"
            :key="imgIndex"
            :style="{
              backgroundImage: `url(${img})`,
            }"
            @click.stop="imagePreview(item.story.images, imgIndex)"
          >
            <div
              v-if="imgIndex === 2 && item.story.images.length > 3"
              class="flex-center"
            >
              +{{ item.story.images.length - 3 }}
            </div>
          </div>
        </div>

        <video
          v-else-if="isHas(item.story.videos)"
          :src="item.story.videos[0]"
          controls
          :poster="item.story.videos[0] + '?vframe/jpg/offset/1'"
          class="video"
          @click.stop
        ></video>
      </div>
    </div>

    <div class="gr-look flex-center" @click="lookReport">
      <div class="gr-look-text">查看综合报告</div>
      <img :src="getImageUrl('back_solid')" alt="" class="gr-look-logo" />
    </div>
  </div>

  <AddReport :show="show" :is-know="true" @close="show = false" />

  <ConfirmJoin
    :show="showConfirm"
    @close="showConfirm = false"
    @confirm="confirm"
  />
</template>

<style scoped lang="scss">
.back {
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 3;
  padding: 8px 19px;

  &-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
}

.gr {
  position: relative;
  z-index: 2;
  width: 100vw;
  min-height: 100vh;
  background: #f5f8ff;
  overflow: hidden;

  &-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 59px;
    padding-bottom: 40px;
    //height: 263px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-color: rgb(203, 224, 255);

    &-title {
      height: 16px;
      font-size: 18px;
      font-family:
        PingFang SC-Semibold,
        PingFang SC;
      font-weight: 600;
      color: #161616;
      line-height: 16px;
    }

    &-ava {
      margin-top: 16px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 4px solid rgba(255, 255, 255, 0.3);
      object-fit: cover;
    }

    &-name {
      position: relative;
      z-index: 3;
      margin-top: -11px;
      width: 101px;
      height: 30px;
      line-height: 26px;
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: center center;
      text-align: center;
      font-size: 14px;
      font-family:
        PingFang SC-Regular,
        PingFang SC,
        serif;
      font-weight: 600;
      color: #ffffff;
      @include single-hide();
    }

    &-level {
      margin-top: 8px;
      padding: 7px 10px;
      font-size: 12px;
      font-family:
        PingFang SC-Semibold,
        PingFang SC;
      font-weight: 600;
      color: #191563;
      background: rgba(255, 255, 255, 0.35);
      border-radius: 20px 20px 20px 20px;
    }

    &-class {
      display: flex;
      justify-content: center;
      margin-top: 26px;

      img {
        width: 100px;
        height: 38px;
      }

      img + img {
        margin-left: 10px;
      }

      .selected-type {
        position: relative;
        top: -8px;
      }
    }
  }

  &-logo {
    position: absolute;
    top: 207px;
    right: 0;
    z-index: 2;
    width: 58px;
    height: 72px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: auto 100%;
  }

  &-class {
    display: flex;
    position: relative;
    padding-left: 16px;
    padding-top: 28px;
    margin-top: -48px;
    height: 84px;
    background: #f5f8ff;
    border-radius: 20px;
    overflow-x: auto;
    /* Firefox */
    scrollbar-width: none;
    /* IE 10+, edge */
    -ms-overflow-style: none;
    /* Chrome Safari */
    &::-webkit-scrollbar {
      display: none;
    }

    &-item {
      margin-right: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      font-family:
        PingFang SC-Regular,
        PingFang SC;
      font-weight: 400;
      color: #7f889a;
      white-space: nowrap;
    }

    .selected {
      position: relative;
      top: -2px;
      color: #1228b9;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 12px);
        height: 4px;
        background: #1228b9;
        border-radius: 4px;
      }
    }
  }

  &-item {
    margin: 0 auto 37px;
    width: 343px;

    &-time {
      display: flex;
      align-items: center;

      img {
        margin-right: 3px;
        width: 16px;
        height: 16px;
      }

      div {
        height: 12px;
        font-size: 14px;
        font-family:
          PingFang SC-Regular,
          PingFang SC;
        font-weight: 400;
        color: #293957;
        line-height: 12px;
      }
    }

    &-detail {
      padding-bottom: 16px;
      margin-top: 15px;
      width: 343px;
      background: #ffffff;
      box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
      border-radius: 17px 17px 17px 17px;
      overflow: hidden;

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0 0 13px;
        width: 315px;

        &-left {
          display: flex;
          align-items: center;

          img {
            //margin-left: 16px;
            margin-right: 6px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            object-fit: cover;
          }

          div {
            height: 14px;
            font-size: 14px;
            font-family:
              PingFang SC-Regular,
              PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 14px;
          }
        }

        &-right {
          //margin-right: 10px;
          padding: 9px 10px;
          background: #eef3fd;
          border-radius: 20px;

          img {
            margin-right: 4px;
            width: 12px;
            height: 12px;
          }

          div {
            font-size: 12px;
            font-family:
              PingFang SC-Medium,
              PingFang SC;
            font-weight: 500;
            color: #5f87f0;
          }
        }

        .joined {
          background: rgba(197, 242, 225, 0.2);

          div {
            color: #84d1b4;
          }
        }
      }

      .dialogue {
        margin-left: 13px;
        margin-top: 10px;

        &-ava {
          position: relative;
          z-index: 2;
          width: 42px;
          height: 42px;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid #fff;
          background-color: #fff;
        }

        &-desc {
          padding-top: 12px;
          padding-left: 32px;
          padding-bottom: 12px;
          position: relative;
          z-index: 1;
          margin-top: -21px;
          margin-left: 21px;
          width: 294px;
          background: #eef3fd;
          border-radius: 10px 10px 10px 10px;

          &-title {
            width: 255px;
            height: 20px;
            font-size: 16px;
            font-family:
              PingFang SC-Medium,
              PingFang SC;
            font-weight: 600;
            color: #333333;
            line-height: 20px;
            @include single-hide();
          }

          &-text {
            margin-top: 6px;
            width: 255px;
            height: 42px;
            font-size: 14px;
            font-family:
              PingFang SC-Regular,
              PingFang SC;
            font-weight: 400;
            color: #7ba2ca;
            @include multi-hide(2);
          }
        }
      }

      .all {
        margin: 10px auto 0;
        width: 62px;
        height: 16px;
      }

      .images {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-left: 8px;
        margin-top: 14px;

        > div {
          margin-left: 8px;
          width: 98px;
          height: 98px;
          border-radius: 8px 8px 8px 8px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          overflow: hidden;

          > div {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            font-size: 24px;
            font-family:
              PingFang SC-Semibold,
              PingFang SC;
            font-weight: 600;
            color: #ffffff;
          }
        }
      }

      .mt40 {
        margin-top: 20px;
      }

      .video {
        margin: 14px auto 0;
        width: 311px;
        border-radius: 15px;
      }
    }
  }

  &-look {
    position: fixed;
    right: 0;
    bottom: 126px;
    z-index: 20;
    display: flex;
    align-items: center;
    width: 128px;
    height: 40px;
    background: #1228b9;
    border-radius: 40px 0px 0px 40px;

    &-text {
      margin-right: 2px;
      font-size: 14px;
      font-family:
        PingFang SC-Regular,
        PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }

    &-logo {
      width: 16px;
      height: 16px;
      transform: rotate(180deg);
    }
  }
}
</style>
