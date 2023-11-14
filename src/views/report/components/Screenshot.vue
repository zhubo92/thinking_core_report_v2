<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useReportStore } from "@/store";
import { onMounted } from "vue";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import { downloadScreenshotFn } from "@/utils";

const reportStore = useReportStore();
const { pageList } = storeToRefs(reportStore);

function drawPDF(dom: HTMLElement) {
  html2canvas(dom, {
    scale: 4,
    width: dom.offsetWidth,
    height: dom.offsetHeight,
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#fff",
  })
    .then((canvas) => {
      let contentWidth = canvas.width;
      let contentHeight = canvas.height;
      let pageHeight = (contentWidth / 592.28) * 841.89;
      let leftHeight = contentHeight;
      let position = 0;
      let imgWidth = 595.28;
      let imgHeight = (592.28 / contentWidth) * contentHeight;
      let pageData = canvas.toDataURL("image/jpeg", 1.0);
      let PDF = new JsPDF("portrait", "pt", "a4");
      if (leftHeight < pageHeight) {
        PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          if (leftHeight > 0) {
            PDF.addPage();
          }
        }
      }
      // todo pdf数据已经准备好了，就差给app，让app处理了
      let arraybuffer = PDF.output("arraybuffer");
      let blob = PDF.output("blob");
      let bloburl = PDF.output("bloburl");
      let datauristring = PDF.output("datauristring");

      console.log(arraybuffer, "arraybuffer");
      console.log(blob, "blob");
      console.log(bloburl);
      console.log(datauristring, "datauristring");

      // 下载
      PDF.save("测试" + ".pdf");
    })
    .catch((e) => {
      console.log(e);
    });
}

onMounted(() => {
  setTimeout(() => {
    const dom = document.querySelector("#screenshot") as HTMLElement | null;

    if (!dom) return;

    // drawPDF(dom);

    // downloadScreenshotFn("screenshot");
  }, 1000);
});
</script>

<template>
  <div id="screenshot">
    <div v-for="page in pageList" :key="page.id" class="item">
      <Component
        :is="cpt.view"
        v-for="cpt in page.componentList"
        :key="cpt.id"
        :value="cpt.value"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
#screenshot {
  position: fixed;
  top: -200vw;
  left: -200vh;
  //top: 0;
  //left: 0;
  width: 100vw;

  .item {
    overflow: hidden;
  }
}
</style>
