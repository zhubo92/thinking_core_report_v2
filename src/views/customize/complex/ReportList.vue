<script setup lang="ts">
import { getImageUrl, returnAppPage } from "@/utils";
import AddReport from "@/views/customize/complex/components/AddReport.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

interface IItem {
  id: number;
  ava: string;
}

const router = useRouter();

const list = ref<IItem[]>([
  { id: 1, ava: getImageUrl("activity_bgi_04") },
  { id: 2, ava: getImageUrl("activity_bgi_03") },
  { id: 3, ava: getImageUrl("activity_bgi_02") },
  { id: 4, ava: getImageUrl("activity_bgi_01") },
  { id: 5, ava: getImageUrl("activity_bgi_01") },
  { id: 6, ava: getImageUrl("activity_bgi_01") },
]);

const show = ref<boolean>(false);

function goAdd() {
  show.value = false;
  console.log("goAdd");
}

function goDetail(item: IItem) {
  if (item.id === 2) {
    show.value = true;
  } else {
    router.push("/customize/complex/ReportDetail");
  }
}
</script>

<template>
  <div class="back" @click="returnAppPage">
    <img :src="getImageUrl('back_button')" alt="" class="back-img" />
  </div>
  <img :src="getImageUrl('complex_list_bgi_top')" alt="" class="bgi" />
  <div
    class="report-list rl"
    :style="{
      backgroundImage: `url(${getImageUrl('complex_list_bgi_bottom')})`,
    }"
  >
    <div
      class="rl-info"
      :style="{ backgroundImage: `url(${getImageUrl('complex_info')})` }"
    >
      <div class="rl-info-item">
        <div class="label">评估对象</div>
        <div class="value">逻辑狗中班23名幼儿</div>
      </div>
      <div class="rl-info-item">
        <div class="label">评估时段</div>
        <div class="value">2023.2.1-2023.3.1</div>
      </div>
      <div class="rl-info-item">
        <div class="label">参与评估老师</div>
        <div class="value">逻小熊老师、逻辑狗老师</div>
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
          v-for="item in list"
          :key="item.id"
          class="item flex-center"
          @click="goDetail(item)"
        >
          <div
            class="item-avatar"
            :style="{ backgroundImage: `url(${item.ava})` }"
          >
            <img
              v-if="item.id !== 2"
              :src="getImageUrl('check_mark')"
              alt=""
              class="item-avatar-logo"
            />
          </div>
          <div :class="['item-name', item.id === 2 && 'grey']">李晓明</div>
          <div class="item-num">5条</div>
        </div>
      </div>
    </div>

    <AddReport :show="show" @close="show = false" @goAdd="goAdd" />
  </div>
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

.bgi {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 255px;
}

.rl {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  padding-top: 88px;
  width: 100vw;
  min-height: 100vh;
  background-repeat: repeat-y;
  background-size: 100%;
  overflow: hidden;

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
        height: 24px;
        font-size: 14px;
        font-family:
          PingFang SC-Medium,
          PingFang SC,
          serif;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
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
          height: 18px;
          font-size: 14px;
          font-family:
            PingFang SC-Medium,
            PingFang SC,
            serif;
          font-weight: 500;
          color: #333333;
          line-height: 18px;
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
