<script setup lang="ts">
import { getImageUrl, returnAppPage } from "@/utils";
import { ref } from "vue";
import { showToast } from "vant";
import AddReport from "@/views/customize/components/AddReport.vue";
import ConfirmJoin from "@/views/customize/components/ConfirmJoin.vue";

interface IClass {
  id: number;
  title: string;
}
interface IType {
  id: number;
  name: string;
  isHas: boolean;
}

const TYPE_LIST: IType[] = [
  { id: 1, name: "behavior_class", isHas: true },
  { id: 2, name: "question_class", isHas: false },
];

const classList = ref<IClass[]>([
  {
    id: 0,
    title: "全部",
  },
  {
    id: 46,
    title: "逻辑思维通用领域",
  },
  {
    id: 1,
    title: "艺术领域",
  },
  {
    id: 2,
    title: "艺术领域",
  },
  {
    id: 3,
    title: "艺术领域",
  },
  {
    id: 4,
    title: "艺术领域",
  },
]);

const currentId = ref(0);
const currentType = ref(1);
const show = ref(false);
const showConfirm = ref(false);

function switchType(type: IType) {
  if (type.isHas) currentType.value = type.id;
  else showToast("问题记录暂未开通 \n" + "敬请期待");
}

function confirm() {
  console.log("confirm");
  showConfirm.value = false;
}
</script>

<template>
  <div class="back" @click="returnAppPage">
    <img :src="getImageUrl('back_solid')" alt="" class="back-img" />
  </div>
  <div class="growth-record gr">
    <div
      class="gr-info"
      :style="{
        backgroundImage: `url(${getImageUrl('complex_list_bgi_top')})`,
      }"
    >
      <div class="gr-info-title">陈安好成长记录</div>
      <img :src="getImageUrl('activity_bgi_05')" alt="" class="gr-info-ava" />
      <div
        class="gr-info-name"
        :style="{ backgroundImage: `url(${getImageUrl('detail_name')})` }"
      >
        张星星
      </div>
      <div class="gr-info-level">中班下学期</div>
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

    <img :src="getImageUrl('class_logo')" alt="" class="gr-logo" />

    <div class="gr-class">
      <div
        v-for="item in classList"
        :key="item.id"
        :class="['gr-class-item', item.id === currentId && 'selected']"
        @click="currentId = item.id"
      >
        {{ item.title }}
      </div>
    </div>

    <div class="gr-item">
      <div class="gr-item-time">
        <img :src="getImageUrl('time_logo')" alt="" />
        <div>2023年3月20日</div>
      </div>
      <div class="gr-item-detail">
        <div class="info">
          <div class="info-left">
            <img :src="getImageUrl('class_logo')" alt="" />
            <div>张老师</div>
          </div>
          <div
            v-if="true"
            class="info-right flex-center"
            @click="showConfirm = true"
          >
            <img :src="getImageUrl('add_report')" alt="" />
            <div>加入报告</div>
          </div>
          <div v-else class="info-right flex-center joined">
            <img :src="getImageUrl('joined_report')" alt="" />
            <div>已加入报告</div>
          </div>
        </div>
        <div class="dialogue">
          <img
            src="https://img.luojigou.vip/FnXKF9KCxHWvcJEZFD8LpetRMNuA"
            alt=""
            class="dialogue-ava"
          />
          <div class="dialogue-desc">
            <div class="dialogue-desc-title">逻辑思维通用领域-观察</div>
            <div class="dialogue-desc-text">
              行为描述行为描述行为描述行为描述行为描述行为描述行为描述行为描述行为行为描述行为描述行为描述行为描述行为描述行为描述行为描述行为描述行为
            </div>
          </div>
        </div>

        <img :src="getImageUrl('dialogue_all')" alt="" class="all" />
        <div class="images">
          <div
            v-for="img in 3"
            :key="img"
            :style="{
              backgroundImage: `url(${getImageUrl('class_logo')})`,
            }"
          >
            <div v-if="img === 3" class="flex-center">+5</div>
          </div>
        </div>
      </div>
    </div>

    <div class="gr-look flex-center" @click="show = true">
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
    right: -2px;
    z-index: 2;
    width: 58px;
    height: 72px;
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
        margin-top: 16px;

        &-left {
          display: flex;
          align-items: center;

          img {
            margin-left: 16px;
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
          margin-right: 10px;
          padding: 9px 10px;
          background: #eef3fd;
          border-radius: 15px;

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
          width: 299px;
          background: #eef3fd;
          border-radius: 10px 10px 10px 10px;

          &-title {
            height: 20px;
            font-size: 16px;
            font-family:
              PingFang SC-Medium,
              PingFang SC;
            font-weight: 600;
            color: #333333;
            line-height: 20px;
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
        margin-top: 6px;

        > div {
          margin-left: 8px;
          margin-top: 8px;
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
