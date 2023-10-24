<script setup lang="ts">
import { getImageUrl, returnAppPage } from "@/utils";
import { ref } from "vue";

interface IItem {
  id: number;
  title: string;
  desc: string;
}

const list = ref<IItem[]>([
  {
    id: 0,
    title: "科学领域",
    desc: "评估了观察、好奇和探索、模仿力与创造力等9个能力",
  },
  {
    id: 1,
    title: "语言领域",
    desc: "评估了观察、好奇和探索、模仿力与创造力等9个能力",
  },
  {
    id: 2,
    title: "其他领域",
    desc: "评估了观察、好奇和探索、模仿力与创造力等9个能力",
  },
  {
    id: 3,
    title: "逻辑思维通用领域",
    desc: "评估了观察、好奇和探索、模仿力与创造力等9个能力",
  },
  {
    id: 4,
    title: "艺术领域",
    desc: "评估了观察、好奇和探索、模仿力与创造力等9个能力",
  },
  {
    id: 5,
    title: "社会领域",
    desc: "评估了观察、好奇和探索、模仿力与创造力等9个能力",
  },
]);
function getFieldLogo(title: string) {
  const arr = ["通用", "科学", "艺术", "语言", "社会"];
  let index = arr.findIndex((item) => title.includes(item));
  index = index === -1 ? 0 : index;
  return getImageUrl(`field_logo_0${index}`);
}
</script>

<template>
  <div class="back" @click="returnAppPage">
    <img :src="getImageUrl('back_solid')" alt="" class="back-img" />
  </div>
  <div class="report-detail rd">
    <div class="rd-bgc"></div>
    <div
      class="rd-info"
      :style="{ backgroundImage: `url(${getImageUrl('detail_info')})` }"
    >
      <div class="rd-info-top">
        <div class="avatar">
          <img
            :src="getImageUrl('activity_bgi_05')"
            alt=""
            class="avatar-img"
          />
          <img
            :src="getImageUrl('detail_ava')"
            alt=""
            class="avatar-decorate"
          />
        </div>
        <div
          class="name"
          :style="{ backgroundImage: `url(${getImageUrl('detail_name')})` }"
        >
          张星星
        </div>
      </div>
      <div class="rd-info-garden">北京思维魔法逻辑狗幼儿园</div>
      <div class="rd-info-class">逻辑狗中二班</div>
      <div class="rd-info-time">
        <span>评估时段</span>
        <span>2023.2.1-2023.3.1</span>
      </div>
    </div>
    <div class="rd-field">
      <div
        class="rd-field-title"
        :style="{ backgroundImage: `url(${getImageUrl('field_title')})` }"
      >
        中班幼儿分领域评估概括
      </div>
      <div v-for="item in list" :key="item.id" class="rd-field-item">
        <img :src="getFieldLogo(item.title)" alt="" class="logo" />
        <div class="info">
          <div class="info-title">{{ item.title }}</div>
          <div class="info-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
    <div class="rd-other">
      <div class="rd-other-title">
        <img :src="getImageUrl('other_title')" alt="" />
        <div class="time">记录时间：2023-01-23</div>
      </div>
      <div class="rd-other-name">
        <img :src="getImageUrl('')" alt="" />
      </div>
    </div>
  </div>
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

.rd {
  padding-top: 104px;
  width: 100vw;
  min-height: 100vh;
  background-color: #a9cbff;

  > div {
    position: relative;
    z-index: 2;
  }

  &-bgc {
    position: absolute !important;
    top: 0;
    left: 0;
    z-index: 1 !important;
    width: 100%;
    height: 287px;
    background: #cbe0ff;
  }

  &-info {
    padding-top: 98px;
    position: relative;
    width: 100%;
    height: 210px;
    background-size: contain;

    &-top {
      position: absolute;
      top: -43px;
      left: 50%;
      transform: translateX(-50%);

      .avatar {
        margin: 0 auto;
        position: relative;
        width: 76px;
        height: 76px;

        &-img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          width: 63px;
          height: 63px;
          border-radius: 50%;
        }

        &-decorate {
          position: relative;
          z-index: 3;
          width: 76px;
          height: 76px;
          object-fit: cover;
        }
      }

      .name {
        position: relative;
        z-index: 3;
        margin-top: -17px;
        width: 101px;
        height: 30px;
        line-height: 30px;
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
    }

    &-garden,
    &-class {
      height: 20px;
      font-size: 12px;
      font-family:
        PingFang SC-Regular,
        PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 20px;
      text-align: center;
      white-space: nowrap;
    }

    &-time {
      margin-top: 12px;
      text-align: center;

      span {
        height: 24px;
        font-size: 12px;
        font-family:
          PingFang SC-Regular,
          PingFang SC,
          serif;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
      }

      span:nth-child(2) {
        margin-left: 14px;
      }
    }
  }
}
</style>
