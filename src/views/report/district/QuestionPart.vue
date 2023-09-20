<script setup lang="ts">
import { computed, ref } from "vue";
import { getImageUrl, imagePreview } from "@/utils";

const props = defineProps<{
  value: {
    isEmpty: boolean;
    questionCardUrl: string;
    questionCardUrlList: string[];
    content: string;
    images: string[];
    videos: string[];
  };
}>();

const questionCardUrl = ref(props.value.questionCardUrl);
const questionCardUrlList = ref(props.value.questionCardUrlList);
const content = ref(props.value.content);
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
  return images.value && images.value.length > 1;
});
const isVideo = computed(() => {
  return videos.value && videos.value.length !== 0;
});
</script>

<template>
  <div class="question grid_bgi">
    <img :src="getImageUrl('question_title')" alt="" class="question-title" />
    <div v-if="isMultiple" class="question-multiple">
      <div
        v-for="(item, index) in questionCardUrlList"
        :key="index"
        class="question-multiple-img"
        @click="imagePreview(questionCardUrlList, index)"
      >
        <img :src="item" alt="" />
        <div v-if="index === 8 && questionCardUrlList.length > 9" class="more">
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
      v-if="isMultipleRecord || isSingleRecord || isVideo"
      :src="getImageUrl('record_title')"
      alt=""
      class="question-header"
    />
    <div class="question-record">
      <div
        v-for="(item, index) in content"
        :key="index"
        class="question-record-item"
      >
        <img :src="getImageUrl('record_logo')" alt="" />
        <div>{{ item }}</div>
      </div>
      <div v-if="isMultipleRecord" class="question-record-multiple">
        <div v-for="(item, index) in images" :key="index" class="images">
          <img :src="item" alt="" />
          <div v-if="index === 8 && images.length > 9" class="images-more">
            +{{ images.length - 9 }}
          </div>
        </div>
      </div>
      <img
        v-else-if="isSingleRecord"
        :src="images[0]"
        alt=""
        class="question-record-single"
      />
      <video
        v-else-if="isVideo"
        :src="videos[0]"
        class="question-record-video"
        controls
        autoplay
        :poster="videos[0] + '?vframe/jpg/offset/1'"
      ></video>
    </div>
  </div>
</template>

<style scoped lang="scss">
.question {
  margin: 30px auto 0;
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
      display: flex;
      position: relative;
      width: 33.33%;

      img {
        width: 95px;
        height: 95px;
        object-fit: cover;
        border-radius: 15px;
      }
    }

    &-img:nth-child(2) {
      justify-content: center;
    }

    &-img:nth-child(3) {
      justify-content: flex-end;
    }
  }

  &-header {
    margin: 30px auto 0;
    width: 311px;
    height: 68px;
  }
}
</style>
