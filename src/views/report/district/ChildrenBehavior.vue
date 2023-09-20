<script setup lang="ts">
import { computed, ref } from "vue";
import { getImageUrl, imagePreview } from "@/utils";

const props = defineProps<{
  value: {
    behave: string;
    images: any;
    videos: any;
    // abilityName: string;
    abilityLevelName: string;
  };
}>();

const behave = ref(props.value.behave);
const images = ref(props.value.images);
const videos = ref(props.value.videos);
// const abilityName = ref(props.value.abilityName);
const abilityLevelName = ref(props.value.abilityLevelName);

const isVideo = computed(() => {
  return Array.isArray(videos.value) && videos.value.length !== 0;
});
const isSingle = computed(() => {
  return Array.isArray(images.value) && images.value.length === 1;
});
const isMultiple = computed(() => {
  return Array.isArray(images.value) && images.value.length > 1;
});

function lightImg(index: number) {
  console.log(index, "index");
  return getImageUrl("light");
}
</script>

<template>
  <div class="children-behavior cb grid_bgi">
    <img :src="getImageUrl('child_title')" alt="" class="cb-title" />
    <div class="cb-content">
      <div class="cb-content-behave">{{ behave }}</div>
      <video v-if="isVideo" :src="videos[0]" class="cb-content-video"></video>
      <img
        v-else-if="isSingle"
        :src="images[0]"
        alt=""
        class="cb-content-single"
        @click="imagePreview(images)"
      />
      <div class="cb-content-multiple" v-else-if="isMultiple">
        <div
          v-for="(img, index) in images.slice(0, 9)"
          :key="index"
          class="imgs"
          @click="imagePreview(images, index)"
        >
          <img :src="img" alt="" class="imgs-img" />
          <div v-if="index === 8 && images.length > 9" class="imgs-more">
            +{{ images.length - 9 }}
          </div>
        </div>
      </div>
    </div>
    <div class="cb-domain">
      <div class="cb-domain-text">探索程度：{{ abilityLevelName }}</div>
      <img
        v-for="index in 3"
        :key="index"
        :src="lightImg(index)"
        alt=""
        class="cb-domain-light"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cb {
  margin: 30px auto 0;
  padding-bottom: 24px;
  width: 343px;
  box-shadow: 0 1px 6px 0 rgba(42, 105, 253, 0.16);
  border-radius: 17px 17px 17px 17px;
  overflow: hidden;

  &-title {
    margin: 26px auto 0;
    width: 311px;
    height: 68px;
  }

  &-content {
    margin: 0 auto;
    padding: 14px 16px 18px;
    width: 311px;
    background: #ecf9ff;
    border-radius: 0 0 9px 9px;

    &-behave {
      font-size: 14px;
      font-family:
        PingFang SC-Regular,
        PingFang SC,
        serif;
      font-weight: 400;
      color: #1a2c5e;
      line-height: 20px;
    }

    &-multiple {
      display: flex;
      flex-wrap: wrap;

      .imgs {
        display: flex;
        position: relative;
        width: 33.33%;

        &-img {
          width: 88px;
          height: 88px;
          object-fit: cover;
          border-radius: 15px;
        }
      }

      .imgs:nth-child(2) {
        justify-content: center;
      }

      .imgs:nth-child(3) {
        justify-content: flex-end;
      }
    }

    &-behave + &-multiple {
      margin-top: 16px;
    }
  }

  &-domain {
    display: flex;
    align-items: center;
    padding: 14px 16px 13px;
    margin: 0 auto;
    width: 311px;
    background: #ecf9ff;
    border-radius: 9px 9px 9px 9px;

    &-text {
      margin-right: 20px;
      height: 20px;
      font-size: 14px;
      font-family:
        Source Han Sans CN-Regular,
        Source Han Sans CN,
        serif;
      font-weight: 400;
      color: #1a2c5e;
      line-height: 20px;
    }

    &-light {
      margin-right: 12px;
      width: 17px;
      height: 22.5px;
    }
  }

  &-content + &-domain {
    margin-top: 20px;
  }
}
</style>
