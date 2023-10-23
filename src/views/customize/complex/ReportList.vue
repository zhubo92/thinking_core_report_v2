<script setup lang="ts">
import { getImageUrl, returnAppPage } from "@/utils";
import { ref } from "vue";

const list = ref<{ id: number; ava: string }[]>([
  { id: 1, ava: getImageUrl("activity_bgi_04") },
]);
</script>

<template>
  <div class="back" @click="returnAppPage">
    <img :src="getImageUrl('back_button')" alt="" class="back-img" />
  </div>
  <div class="report-list rl">
    <div class="rl-info">
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
    <div class="rl-list">
      <div v-for="item in list" :key="item.id" class="rl-list-item">
        <div class="avatar" :style="{ backgroundImage: `url(${item.ava})` }">
          <img :src="getImageUrl('check_mark')" alt="" class="avatar-logo" />
        </div>
        <div class="name">李晓明</div>
        <div class="num">5条</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.back {
  position: fixed;
  top: 44px;
  left: 0;
  padding: 15px 12px;

  &-img {
    width: 13px;
    height: 20px;
    object-fit: contain;
  }
}

.rl {
  padding-top: 88px;
  width: 100vw;
  min-height: 100vh;
  background: #a9cbff;
  overflow: hidden;
}
</style>
