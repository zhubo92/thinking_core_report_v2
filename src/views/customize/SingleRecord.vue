<script setup lang="ts">
import { getAppToken, getImageUrl, imagePreview } from "@/utils";
import { useCustomizeStore } from "@/store";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import HeaderPart from "@/views/customize/components/HeaderPart.vue";
import { storeToRefs } from "pinia";
import { IAbility } from "@/types/customize.d";

const { babyId, id } = useRoute().query;
const customizeStore = useCustomizeStore();

const { singleRecord } = storeToRefs(customizeStore);
const { getSingleRecord } = customizeStore;

function formatNames(names: string[]) {
  let str = "";
  names.map((name, nameIndex) => {
    if (nameIndex !== 0) {
      str += "、";
    }
    str += name;
  });
  return str;
}

onMounted(async () => {
  // todo await
  getAppToken();
  if (typeof babyId === "string" && typeof id === "string")
    await getSingleRecord(babyId, id);
});

/**
 * http://192.168.1.17:8989/#/customize/SingleRecord?babyId=1304672468777553921&id=1716737882201264130
 */
</script>

<template>
  <div class="single-record">
    <HeaderPart />
    <div class="sr">
      <div class="sr-top">
        <img :src="getImageUrl('single_title')" alt="" class="sr-top-title" />
        <img :src="getImageUrl('single_logo')" alt="" class="sr-top-logo" />
      </div>

      <div class="sr-info grid_bgi">
        <div class="sr-info-line">
          <div class="label">
            <div class="label-triangle"></div>
            <div class="label-text">记录日期：</div>
          </div>
          <div class="value">{{ singleRecord.recordDate }}</div>
        </div>
        <div class="sr-info-line">
          <div class="label">
            <div class="label-triangle"></div>
            <div class="label-text">记录教师：</div>
          </div>
          <div class="value">{{ singleRecord.teacherName }}</div>
        </div>
        <div class="sr-info-line">
          <div class="label">
            <div class="label-triangle"></div>
            <div class="label-text">记录对象：</div>
          </div>
          <div class="value">{{ formatNames(singleRecord.babyNames) }}</div>
        </div>
        <div class="sr-info-line">
          <div class="label">
            <div class="label-triangle"></div>
            <div class="label-text">加入综合报告：</div>
          </div>
          <div class="value">
            {{ singleRecord.joinSemester === 1 ? "已加入" : "未加入" }}
          </div>
        </div>
      </div>

      <div class="sr-behavior">
        <img
          :src="getImageUrl('behavior_title')"
          alt=""
          class="sr-behavior-title"
        />
        <div class="sr-behavior-content">
          <div class="images">
            <img
              v-for="(item, index) in singleRecord.story.images"
              :key="index"
              :src="item"
              alt=""
              class="images-img"
              @click="imagePreview(singleRecord.story.images, index)"
            />
          </div>
          <div
            v-if="
              singleRecord.story.content &&
              singleRecord.story.content.length !== 0
            "
            class="content"
          >
            {{ singleRecord.story.content }}
          </div>
        </div>
      </div>

      <div
        v-for="(item, index) in singleRecord.domainList"
        :key="index"
        class="sr-domain"
      >
        <div class="sr-domain-title">{{ item.domainName }}</div>
        <div
          v-for="(ability, abilityIndex) in item.abilityList as IAbility[]"
          :key="abilityIndex"
          class="sr-domain-ability"
          :style="{
            borderRadius: `${
              item.abilityList.length === 1
                ? '17px'
                : abilityIndex === 0
                ? '17px 17px 0 0'
                : abilityIndex === item.abilityList.length - 1
                ? '0 0 17px 17px'
                : 'none'
            }`,
            borderTop: `${abilityIndex === 0 ? '4px solid #b6dcff' : 'none'}`,
            borderBottom: `${
              abilityIndex === item.abilityList.length - 1
                ? '4px solid #b6dcff'
                : 'none'
            }`,
            boxShadow: `${
              abilityIndex === 0
                ? '0 1px 6px 0 rgba(42, 105, 253, 0.16)'
                : 'none'
            }`,
          }"
        >
          <img
            v-if="abilityIndex !== 0"
            :src="getImageUrl('ability_gap')"
            alt=""
            class="gap"
          />
          <div class="title">能力名称：{{ ability.abilityName }}</div>
          <img :src="getImageUrl('desc_name_01')" alt="" class="name" />
          <div class="desc">{{ ability.description.growth }}</div>
          <img :src="getImageUrl('desc_name_02')" alt="" class="name" />
          <div class="desc green">{{ ability.description.behave }}</div>
          <img :src="getImageUrl('desc_name_03')" alt="" class="name" />
          <div class="strategy">
            <div class="strategy-title">一日活动</div>
            <div class="strategy-content">
              {{ ability.description.tactics }}
            </div>
            <div class="strategy-title">家园共育</div>
            <div class="strategy-content">
              {{ ability.description.education }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.single-record {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;

  .sr {
    padding-bottom: 30px;
    width: 100vw;
    height: calc(100vh - 90px);
    overflow-y: auto;

    &-top {
      display: flex;
      justify-content: space-between;
      position: relative;
      z-index: 2;
      margin: 0 auto;
      width: 343px;
      height: 107px;

      &-title {
        margin-top: 24px;
        width: 200px;
        height: 54px;
        object-fit: contain;
      }

      &-logo {
        margin-top: -1px;
        margin-right: -14px;
        width: 97px;
        height: 123px;
      }
    }

    &-info {
      padding: 20px 12px;
      margin: 0 auto;
      width: 343px;
      box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
      border-radius: 17px 17px 17px 17px;
      border: 4px solid #b6dcff;

      &-line {
        display: flex;
        align-items: center;

        .label {
          display: flex;
          align-items: center;

          &-triangle {
            margin-top: -3px;
            margin-right: 8px;
            width: 0;
            height: 0;
            border-left: 8px solid #2a69fd;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-radius: 2px;
          }

          &-text {
            line-height: 20px;
            height: 20px;
            color: #2a69fd;
            font-weight: 600;
            font-size: 14px;
          }
        }

        .value {
          color: #333;
          font-weight: 500;
          font-size: 14px;
        }
      }

      .sr-info-line + .sr-info-line {
        margin-top: 16px;
      }
    }

    &-behavior {
      padding: 10px 13px 20px 11px;
      margin: 16px auto 0;
      width: 343px;
      background: #ffffff;
      box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
      border-radius: 17px 17px 17px 17px;
      border: 4px solid #b6dcff;
      box-sizing: border-box;

      &-title {
        width: 311px;
        height: 68px;
      }

      &-content {
        padding: 14px 0 0 8px;
        width: 311px;
        background: #ecf9ff;
        border-radius: 9px 9px 9px 9px;
        overflow: hidden;

        .images {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 8px;

          &-img {
            margin-left: 8px;
            margin-bottom: 8px;
            width: 88px;
            height: 88px;
            object-fit: cover;
            border-radius: 9px 9px 9px 9px;
          }
        }

        .content {
          margin-left: 8px;
          margin-right: 16px;
          margin-bottom: 16px;
          font-size: 14px;
          font-family:
            PingFang SC-Regular,
            PingFang SC;
          font-weight: 400;
          color: #1a2c5e;
          line-height: 20px;
        }
      }
    }

    &-domain {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 32px auto 0;

      &-title {
        padding: 7px 28px;
        background: #89c6ff;
        font-size: 18px;
        font-family:
          PingFang SC-Semibold,
          PingFang SC;
        font-weight: 600;
        color: #ffffff;
        border-radius: 16px 16px 0 0;
      }

      &-ability {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 343px;
        background: #ffffff;
        box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
        border: 4px solid #b6dcff;
        box-sizing: border-box;
        border-radius: 17px;

        .gap {
          width: 100%;
        }

        .title {
          margin-top: 31px;
          width: 311px;
          height: 20px;
          font-size: 18px;
          font-family:
            PingFang SC-Medium,
            PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 20px;
          @include single-hide();
        }

        .name {
          margin-top: 24px;
          width: 311px;
          height: 68px;
        }

        .desc {
          padding: 14px 16px;
          width: 311px;
          background: #ecf9ff;
          border-radius: 0 0 9px 9px;
          font-size: 14px;
          font-family:
            PingFang SC-Regular,
            PingFang SC;
          font-weight: 400;
          color: #1a2c5e;
        }

        .green {
          background: #f6faef;
        }

        .strategy {
          margin-bottom: 20px;
          padding: 16px 16px 16px 30px;
          width: 311px;
          background: #fff5f6;
          border-radius: 10px 10px 10px 10px;

          &-title {
            position: relative;
            width: 265px;
            height: 20px;
            font-size: 14px;
            font-family:
              PingFang SC-Semibold,
              PingFang SC;
            font-weight: 600;
            color: #1a2c5e;
            line-height: 20px;

            &::before {
              content: "";
              position: absolute;
              left: -13px;
              top: 50%;
              transform: translateY(-50%);
              width: 6px;
              height: 6px;
              background: #e42f37;
              border-radius: 50%;
            }
          }

          &-content {
            margin-top: 8px;
            width: 265px;
            font-size: 14px;
            font-family:
              PingFang SC-Regular,
              PingFang SC;
            font-weight: 400;
            color: #1a2c5e;
            line-height: 20px;
          }

          .strategy-content + .strategy-title {
            margin-top: 27px;
          }
        }
      }
    }
  }
}
</style>
