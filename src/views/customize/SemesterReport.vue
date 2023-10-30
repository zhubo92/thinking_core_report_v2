<script setup lang="ts">
import { getImageUrl, imagePreview, returnAppPage } from "@/utils";
import { useRoute } from "vue-router";
import { useCustomizeStore } from "@/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { formatClassLevelCode, formatSemesterType } from "@/utils/filter.ts";

const {
  b: babyId,
  c: classId,
  l: classLevelCode,
  // g: gameType,
  s: semesterType,
  // r: recordType,
  p: isParent,
} = useRoute().query;
const customizeStore = useCustomizeStore();

const { semesterReport } = storeToRefs(customizeStore);
const { getSemesterRecord, sendSemesterRecord } = customizeStore;

function getFieldLogo(title: string) {
  const arr = ["通用", "科学", "艺术", "语言", "社会"];
  let index = arr.findIndex((item) => title.includes(item));
  index = index === -1 ? 0 : index;
  return getImageUrl(`field_logo_0${index}`);
}

function isHas(content: string[]) {
  return Array.isArray(content) && content.length > 0;
}

function formatFamily(name: string) {
  let arr = name.split("\n");
  return arr[arr.length - 1] === "" ? arr.slice(0, arr.length - 1) : arr;
}

function send() {
  if (semesterReport.value.sendReport) return;
  if (
    typeof babyId === "string" &&
    typeof classId === "string" &&
    typeof classLevelCode === "string" &&
    typeof semesterType === "string"
  )
    sendSemesterRecord({
      babyId,
      classId,
      classLevelCode,
      semesterType,
      recordType: "1",
    });
}

onMounted(async () => {
  if (
    typeof babyId === "string" &&
    typeof classId === "string" &&
    typeof classLevelCode === "string" &&
    typeof semesterType === "string"
  )
    await getSemesterRecord({ babyId, classId, classLevelCode, semesterType });
});
</script>

<template>
  <div class="report-detail rd">
    <div class="rd-back" @click="returnAppPage">
      <img :src="getImageUrl('back_solid')" alt="" class="rd-back-img" />
    </div>
    <div v-if="!isParent" class="rd-send" @click="send">
      <div class="rd-send-btn flex-center">
        {{ semesterReport.sendReport ? "已发送" : "发送家长" }}
      </div>
    </div>
    <div class="rd-bgc"></div>
    <div
      class="rd-info"
      :style="{ backgroundImage: `url(${getImageUrl('detail_info')})` }"
    >
      <img :src="semesterReport.babyHeadImg" alt="" class="rd-info-avatar" />
      <div
        class="rd-info-name"
        :style="{ backgroundImage: `url(${getImageUrl('detail_name')})` }"
      >
        {{ semesterReport.babyName }}
      </div>
      <div class="rd-info-garden">{{ semesterReport.schoolName }}</div>
      <div class="rd-info-class">
        {{ formatClassLevelCode(classLevelCode)
        }}{{ formatSemesterType(semesterType) }}
      </div>
      <div class="rd-info-time">
        <span>评估时段</span>
        <span>
          {{ semesterReport.startDate }}-{{ semesterReport.endDate }}
        </span>
      </div>
    </div>
    <div class="rd-field grid_bgi">
      <div
        class="rd-field-title"
        :style="{ backgroundImage: `url(${getImageUrl('field_title')})` }"
      >
        <p>{{ formatClassLevelCode(classLevelCode) }}幼儿分领域评估概括</p>
        <div></div>
      </div>
      <div
        v-for="(item, index) in semesterReport.domainAbilityNameList"
        :key="index"
        class="rd-field-item"
      >
        <img :src="getFieldLogo(item.domainName)" alt="" class="logo" />
        <div class="info">
          <div class="info-title">{{ item.domainName }}</div>
          <div class="info-desc">
            评估了
            <div
              v-for="(a, aIndex) in item.abilityNameList.slice(0, 3)"
              :key="aIndex"
            >
              <span>{{ a }}</span>
              <i
                v-if="
                  aIndex !== item.abilityNameList.length - 1 && aIndex !== 2
                "
              >
                、
              </i>
            </div>
            <span v-if="item.abilityNameList.length > 3">
              等{{ item.abilityNameList.length }}个能力
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="(item, index) in semesterReport.domainDataList"
      :key="index"
      class="rd-part"
    >
      <div class="domain">{{ item.domainName }}</div>
      <div
        v-for="(ability, abilityIndex) in item.recordList"
        :key="abilityIndex"
        class="ability grid_bgi"
        :style="{
          borderRadius: `${
            item.recordList.length === 1
              ? '17px'
              : abilityIndex === item.recordList.length - 1
              ? '0 0 17px 17px'
              : abilityIndex === 0
              ? '17px 17px 0 0'
              : '0'
          }`,
          borderTop: `${abilityIndex === 0 ? '4px solid #b6dcff' : 'none'}`,
          borderBottom: `${
            abilityIndex === item.recordList.length - 1
              ? '4px solid #b6dcff'
              : 'none'
          }`,
          boxShadow: `${
            abilityIndex === 0 ? '0 1px 6px 0 rgba(42, 105, 253, 0.16)' : 'none'
          }`,
        }"
      >
        <img
          v-if="abilityIndex !== 0"
          :src="getImageUrl('ability_gap')"
          alt=""
          class="ability-gap"
        />
        <div class="ability-title flex-center">
          <img
            :src="ability.abilityIconUrl"
            alt=""
            class="ability-title-logo"
          />
          <div class="ability-title-text">{{ ability.abilityName }}</div>
        </div>
        <div class="container">
          <div class="ability-time">
            <img
              :src="getImageUrl('clock_logo')"
              alt=""
              class="ability-time-logo"
            />
            <div class="ability-time-text">
              记录时间：{{ ability.recordDate }}
            </div>
          </div>
          <img
            :src="getImageUrl('observation_records')"
            alt=""
            class="ability-name"
          />
          <div class="ability-content">
            <div
              v-if="isHas(ability.story.images)"
              class="ability-content-images"
            >
              <img
                v-for="(img, imgIndex) in ability.story.images"
                :key="imgIndex"
                :src="img"
                alt=""
                @click="imagePreview(ability.story.images, imgIndex)"
              />
            </div>
            <video
              v-if="isHas(ability.story.videos)"
              :src="ability.story.videos[0]"
              controls
              :poster="ability.story.videos[0] + '?vframe/jpg/offset/1'"
              class="ability-content-video"
            ></video>
            <div class="ability-content-text">
              {{ ability.story.content }}
            </div>
          </div>
          <img :src="getImageUrl('family_title')" alt="" class="ability-name" />
          <div class="ability-family">
            <div
              v-for="(f, fIndex) in formatFamily(ability.education)"
              :key="fIndex"
              class="ability-family-item"
            >
              {{ f }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rd {
  padding-top: 104px;
  padding-bottom: 46px;
  width: 100vw;
  min-height: 100vh;
  background-color: #a9cbff;

  &-back {
    position: fixed !important;
    top: 44px;
    left: 0;
    z-index: 10 !important;
    padding: 8px 19px;

    &-img {
      width: 28px;
      height: 28px;
      object-fit: contain;
    }
  }

  &-send {
    position: fixed !important;
    top: 45px;
    right: 0;
    z-index: 10 !important;
    padding: 6px 19px;

    &-btn {
      width: 78px;
      height: 34px;
      background: #e9f8ff;
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2026);
      border-radius: 17px 17px 17px 17px;
      font-size: 14px;
      font-family:
        PingFang SC-Medium,
        PingFang SC;
      font-weight: 600;
      color: #233cd5;
    }
  }

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
    //padding-top: 98px;
    position: relative;
    width: 100%;
    height: 210px;
    background-size: contain;

    &-avatar {
      position: relative;
      top: -51px;
      margin: 0 auto 0;
      width: 60px;
      height: 60px;
      border: 8px solid #ffe082;
      background-color: #fff;
      border-radius: 50%;
      box-sizing: content-box;
      object-fit: cover;
    }

    &-name {
      position: relative;
      z-index: 2;
      margin: -62px auto 54px;
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
      margin-top: 2px;
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
        margin-right: 40px;
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

          > div {
            display: inline-block;

            span {
              color: #2a69fd;
            }
          }
        }
      }
    }
  }

  &-part {
    .domain {
      margin: 23px auto 0;
      padding: 7px 28px;
      width: fit-content;
      background: #70a8ff;
      border-radius: 16px 16px 0 0;
      font-size: 18px;
      font-family:
        PingFang SC-Semibold,
        PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }

    .ability {
      margin: 0 auto;
      width: 343px;
      border: 4px solid #b6dcff;
      box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
      border-radius: 17px 17px 17px 17px;
      box-sizing: border-box;
      overflow: hidden;

      &-title {
        margin-top: 20px;

        &-logo {
          width: 40px;
          height: 40px;
          object-fit: cover;
        }

        &-text {
          margin-left: 7px;
          height: 16px;
          font-size: 18px;
          font-family:
            PingFang SC-Medium,
            PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 16px;
        }
      }

      .container {
        overflow: hidden;
      }

      &-time {
        display: flex;
        align-items: center;
        margin: 20px auto 0;
        width: 311px;

        &-logo {
          margin: 3px;
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        &-text {
          height: 16px;
          font-size: 16px;
          font-family:
            PingFang SC-Regular,
            PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 16px;
          white-space: nowrap;
        }
      }

      &-name {
        margin: 20px auto 0;
        width: 311px;
        height: 68px;
        object-fit: contain;
      }

      &-content {
        padding: 16px 0 16px 8px;
        margin: 0 auto;
        width: 311px;
        background: #ecf9ff;
        border-radius: 0 0 9px 9px;

        &-images {
          display: flex;
          flex-wrap: wrap;

          img {
            margin-left: 8px;
            margin-bottom: 8px;
            width: 88px;
            height: 88px;
            object-fit: cover;
            border-radius: 9px;
          }

          img:nth-last-child(-n + 3) {
            margin-bottom: 0;
          }
        }

        &-text {
          margin-left: 8px;
          width: 279px;
          font-size: 14px;
          font-family:
            PingFang SC-Regular,
            PingFang SC;
          font-weight: 400;
          color: #1a2c5e;
          line-height: 20px;
        }

        &-video {
          display: block;
          margin-left: 8px;
          width: 279px;
          border-radius: 10px;
        }

        .ability-content-video + .ability-content-text {
          margin-top: 16px;
        }

        .ability-content-images + .ability-content-text {
          margin-top: 16px;
        }
      }

      &-family {
        margin: 0 auto 20px;
        padding: 16px 16px 16px 30px;
        width: 311px;
        background: #fff5f6;
        border-radius: 0 0 10px 10px;

        &-item {
          position: relative;
          width: 265px;
          font-size: 14px;
          font-family:
            PingFang SC-Regular,
            PingFang SC;
          font-weight: 400;
          color: #1a2c5e;
          line-height: 20px;

          &::before {
            content: "";
            position: absolute;
            left: -14px;
            top: 7px;
            width: 6px;
            height: 6px;
            background: #e42f37;
            border-radius: 50%;
          }
        }

        .ability-family-item + .ability-family-item {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
