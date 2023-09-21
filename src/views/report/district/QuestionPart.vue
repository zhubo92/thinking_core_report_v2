<script setup lang="ts">
import { computed, ref } from "vue";
import { getImageUrl, imagePreview } from "@/utils";

const props = defineProps<{
  value: {
    isEmpty: boolean;
    questionCardUrlList: string[];
    content: string;
    questions: { question: string; categoryId: string }[];
    images: string[];
    videos: string[];
  };
}>();

const questionCardUrlList = ref(props.value.questionCardUrlList);
const content = ref(splitString(props.value.content));
const questions = ref(props.value.questions);
const images = ref(props.value.images);
const videos = ref(props.value.videos);

const isMultiple = computed(() => {
  return questionCardUrlList.value && questionCardUrlList.value.length > 1;
});
const isSingle = computed(() => {
  return questionCardUrlList.value && questionCardUrlList.value.length === 1;
});
const isMultipleRecord = computed(() => {
  return images.value && images.value.length > 1;
});
const isSingleRecord = computed(() => {
  return images.value && images.value.length === 1;
});
const isVideo = computed(() => {
  return videos.value && videos.value.length !== 0;
});

const recordIsNull = computed(() => {
  return (
    isMultipleRecord.value ||
    isSingleRecord.value ||
    isVideo.value ||
    content.value?.length > 0 ||
    questions.value?.length > 0
  );
});

function splitString(str: string | null): string[] {
  if (str) {
    const arr = str.split("_%split_tag%_");
    if (arr.length !== 1) arr.length = arr.length - 1;
    return arr;
  } else {
    return [];
  }
}
</script>

<template>
  <div class="question grid_bgi">
    <img
      v-if="isMultiple || isSingle"
      :src="getImageUrl('question_title')"
      alt=""
      class="question-title"
    />
    <div v-if="isMultiple" class="question-multiple">
      <div
        v-for="(item, index) in questionCardUrlList.slice(0, 9)"
        :key="index"
        class="question-multiple-img"
        @click="imagePreview(questionCardUrlList, index)"
      >
        <img :src="item" alt="" />
        <div
          v-if="index === 8 && questionCardUrlList.length > 9"
          class="more flex-center"
        >
          +{{ questionCardUrlList.length - 9 }}
        </div>
      </div>
    </div>
    <img
      v-else-if="isSingle"
      :src="questionCardUrlList[0]"
      alt=""
      class="question-single"
      @click="imagePreview(questionCardUrlList)"
    />
    <img
      v-if="recordIsNull"
      :src="getImageUrl('record_title')"
      alt=""
      class="question-header"
    />
    <div class="question-record" v-if="recordIsNull">
      <div v-if="isMultipleRecord" class="question-record-multiple img-box">
        <div
          v-for="(item, index) in images.slice(0, 9)"
          :key="index"
          class="images"
          @click="imagePreview(images, index)"
        >
          <img :src="item" alt="" />
          <div
            v-if="index === 8 && images.length > 9"
            class="images-more flex-center"
          >
            +{{ images.length - 9 }}
          </div>
        </div>
      </div>
      <img
        v-else-if="isSingleRecord"
        :src="images[0]"
        alt=""
        class="question-record-single img-box"
        @click="imagePreview(images)"
      />
      <video
        v-else-if="isVideo"
        :src="videos[0]"
        class="question-record-video img-box"
        controls
        autoplay
        :poster="videos[0] + '?vframe/jpg/offset/1'"
      ></video>
      <div
        v-for="(item, index) in questions"
        :key="index"
        class="question-record-item"
      >
        <img :src="getImageUrl('record_logo')" alt="" />
        <div>{{ item.question }}</div>
      </div>
      <div
        v-for="(item, index) in content"
        :key="index"
        class="question-record-item"
      >
        <img :src="getImageUrl('record_logo')" alt="" />
        <div>{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.question {
  margin: 16px auto 0;
  padding: 26px 16px 20px;
  width: 343px;
  box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
  border-radius: 17px 17px 17px 17px;
  box-sizing: border-box;

  &-title {
    margin-bottom: 20px;
    width: 134px;
    height: 30px;
    object-fit: contain;
  }

  &-multiple {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &-img {
      margin-right: 13px;
      margin-bottom: 13px;
      position: relative;

      img {
        width: 95px;
        height: 95px;
        object-fit: cover;
        border-radius: 15px;
      }

      .more {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        background-color: rgba(0, 0, 0, 0.5);
        font-size: 26px;
        font-family:
          PingFang SC-Semibold,
          PingFang SC,
          serif;
        font-weight: 600;
        color: #ffffff;
      }
    }

    &-img:nth-child(3n) {
      margin-right: 0;
    }

    &-img:nth-last-child(-n + 3) {
      margin-bottom: 0;
    }
  }

  &-single {
    border-radius: 15px;
  }

  &-header {
    margin: 30px auto 0;
    width: 311px;
    height: 68px;
  }

  &-record {
    margin: 0 auto;
    padding: 15px 16px 18px;
    width: 312px;
    background: #fff8f3;
    border-radius: 0 0 9px 9px;

    &-item {
      display: flex;

      img {
        margin-top: 3px;
        margin-right: 8px;
        width: 14px;
        height: 14px;
        object-fit: contain;
      }

      div {
        font-size: 14px;
        font-family:
          PingFang SC-Regular,
          PingFang SC,
          serif;
        font-weight: 400;
        color: #1a2c5e;
        line-height: 20px;
      }
    }

    &-multiple {
      display: flex;
      flex-wrap: wrap;

      .images {
        margin-right: 8px;
        margin-bottom: 8px;
        position: relative;

        img {
          width: 88px;
          height: 88px;
          object-fit: cover;
          border-radius: 15px;
        }

        &-more {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          background-color: rgba(0, 0, 0, 0.5);
          font-size: 24px;
          font-family:
            PingFang SC-Semibold,
            PingFang SC,
            serif;
          font-weight: 600;
          color: #ffffff;
        }
      }

      .images:nth-child(3n) {
        margin-right: 0;
      }

      .images:nth-last-child(-n + 3) {
        margin-bottom: 0;
      }
    }

    &-single,
    &-video {
      border-radius: 15px;
    }

    &-item + &-item {
      margin-top: 10px;
    }

    .img-box + &-item {
      margin-top: 16px;
    }
  }
}
</style>
