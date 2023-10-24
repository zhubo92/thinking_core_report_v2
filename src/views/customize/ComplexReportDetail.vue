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

const imageList = ref<string[]>([
  getImageUrl("field_logo_00"),
  getImageUrl("field_logo_01"),
  getImageUrl("field_logo_02"),
  getImageUrl("field_logo_03"),
]);

const textList = ref<string[]>([
  "家长可以和幼儿一起发现生活中有简单模式的事物。（如：蛋糕和规律是水果-蛋糕-水果-蛋糕相间的、衣服的条纹颜色规律是白-黑-白-黑）；",
  "家长可以和幼儿一起发现生活中有简单模式的事物。（如：蛋糕和规律是水果-蛋糕-水果-蛋糕相间的、衣服的条纹颜色规律是白-黑-白-黑）；",
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
    <div class="rd-field grid_bgi">
      <div
        class="rd-field-title"
        :style="{ backgroundImage: `url(${getImageUrl('field_title')})` }"
      >
        <p>中班幼儿分领域评估概括</p>
        <div></div>
      </div>
      <div v-for="item in list" :key="item.id" class="rd-field-item">
        <img :src="getFieldLogo(item.title)" alt="" class="logo" />
        <div class="info">
          <div class="info-title">{{ item.title }}</div>
          <div class="info-desc">
            评估了<span>观察</span>、
            <span>好奇和探索</span>、<span>模仿力与创造力</span>等9个能力
          </div>
        </div>
      </div>
    </div>
    <div class="rd-other grid_bgi">
      <div class="rd-other-title">
        <img :src="getImageUrl('other_title')" alt="" />
        <div class="time">记录时间：2023-01-23</div>
      </div>
      <div class="rd-other-name">
        <div>逻辑思维通用领域-观察领域</div>
        <img :src="getImageUrl('other_logo')" alt="" />
      </div>
      <div class="rd-other-remark">
        <div class="images">
          <img
            v-for="(img, imgIndex) in imageList"
            :key="imgIndex"
            :src="img"
            alt=""
          />
        </div>
        <div class="desc">
          评估了
          <span>观察</span>、 <span>好奇和探索</span>、
          <span>模仿力与创造力</span>
          等9个能力，其中3个是新晋观察技能
        </div>
      </div>
      <img :src="getImageUrl('other_family')" alt="" class="rd-other-family" />
      <div class="rd-other-text">
        <div
          v-for="(text, textIndex) in textList"
          :key="textIndex"
          class="text"
        >
          <div></div>
          <p>{{ text }}</p>
        </div>
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
  padding-bottom: 46px;
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

  &-field {
    padding: 24px 0 24px 16px;
    margin: 17px auto 0;
    width: 343px;
    box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
    border-radius: 17px 17px 17px 17px;

    &-title {
      position: relative;
      padding-left: 35px;
      width: fit-content;
      height: 30px;
      background-size: auto 100%;
      background-position: left center;
      background-repeat: no-repeat;
      font-size: 16px;
      font-family:
        PingFang SC-Medium,
        PingFang SC;
      font-weight: 600;
      color: #1a2c5e;
      line-height: 30px;

      p {
        position: relative;
        z-index: 2;
        max-width: 280px;
        white-space: nowrap;
        @include single-hide();
      }

      div {
        position: absolute;
        bottom: 8px;
        right: 0;
        z-index: 1;
        width: calc(100% - 35px);
        height: 5px;
        background-color: #b6dcff;
      }
    }

    &-item {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .logo {
        position: relative;
        z-index: 2;
        width: 40px;
        height: 40px;
        object-fit: cover;
      }

      .info {
        margin-left: -16px;
        padding: 8px 0 8px 32px;
        width: 287px;
        background: #eaf5ff;
        box-shadow: 0 1px 0 0 #a9cbff;
        border-radius: 10px;

        &-title {
          width: 250px;
          height: 16px;
          font-size: 14px;
          font-family: YouSheBiaoTiYuan-Regular, YouSheBiaoTiYuan;
          font-weight: 400;
          color: #2a69fd;
          line-height: 16px;
          @include single-hide();
        }

        &-desc {
          margin-top: 4px;
          width: 239px;
          font-size: 12px;
          font-family:
            PingFang SC-Regular,
            PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 16px;

          span {
            color: #2a69fd;
          }
        }
      }
    }
  }

  &-other {
    padding: 24px 16px;
    margin: 21px auto 0;
    width: 343px;
    box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
    border-radius: 17px;

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 130px;
        height: 30px;
      }

      .time {
        height: 16px;
        font-size: 12px;
        font-family:
          PingFang SC-Regular,
          PingFang SC;
        font-weight: 400;
        color: #2a69fd;
        line-height: 16px;
      }
    }

    &-name {
      display: flex;
      align-items: center;
      padding-left: 17px;
      margin: 20px auto 0;
      position: relative;
      width: 311px;
      height: 35px;
      background: #b6dcff;
      border-radius: 7px 7px 0 0;

      div {
        height: 16px;
        font-size: 14px;
        font-family:
          PingFang SC-Semibold,
          PingFang SC;
        font-weight: 600;
        color: #2a69fd;
        line-height: 16px;
      }

      img {
        position: absolute;
        top: -16px;
        right: 7px;
        width: 32px;
        height: 44px;
      }
    }

    &-remark {
      padding-bottom: 16px;
      width: 311px;
      background: #ecf9ff;
      border-radius: 0 0 9px 9px;

      .images {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-left: 8px;
        padding-top: 8px;

        img {
          margin-top: 8px;
          margin-left: 8px;
          width: 88px;
          height: 88px;
          object-fit: cover;
        }
      }

      .desc {
        margin-left: 16px;
        margin-top: 16px;
        width: 279px;
        font-size: 14px;
        font-family:
          PingFang SC-Regular,
          PingFang SC;
        font-weight: 400;
        color: #1a2c5e;
        line-height: 20px;
      }
    }

    &-family {
      margin: 24px auto 0;
      width: 313px;
      height: 68px;
    }

    &-text {
      padding: 16px;
      margin: 0 auto;
      width: 311px;
      background: #fff5f6;
      border-radius: 10px 10px 10px 10px;

      .text {
        display: flex;
        justify-content: space-between;

        div {
          margin-top: 7px;
          width: 6px;
          height: 6px;
          background: #e42f37;
          border-radius: 50%;
        }

        p {
          width: 265px;
          font-size: 14px;
          font-family:
            PingFang SC-Regular,
            PingFang SC;
          font-weight: 400;
          color: #1a2c5e;
          line-height: 20px;
        }
      }

      .text + .text {
        margin-top: 10px;
      }
    }
  }
}
</style>
