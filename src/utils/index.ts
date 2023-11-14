import html2canvas from "html2canvas";
import { showImagePreview } from "vant";
import { getToken, setToken } from "@/utils/storage.ts";
import router from "@/router";
import JsPDF from "jspdf";
export function getImageUrl(name: string) {
  return new URL(`../assets/images/${name}.png`, import.meta.url).href;
}
/**
 * 调用app方法
 */
export function callAppFc(event: any, params = {}) {
  console.log(event, params, "callAppFc");
  try {
    window[event].postMessage(JSON.stringify(params));
  } catch (err) {
    console.log(err, event);
  }
}

/**
 * 在APP中跳转APP页面的方法
 */
export function navAppPage(route: string, callback = "", replace = false) {
  callAppFc("navAppPage", { route, callback, replace });
}

/**
 * c端在APP中返回上一页
 */
export function popPage() {
  callAppFc("popPage");
}

/**
 * 家园共育返回上一页
 */
export function returnAppPage() {
  try {
    (window as any).returnAppPage.postMessage(JSON.stringify({}));
  } catch (err) {
    router.go(-1);
  }
}

/**
 * 通知 app
 */
export function noticeApp(babyId: string, recordId: string) {
  callAppFc("sendToParent", {
    title: "发送给家长",
    babyId,
    recordId,
  });
}

/**
 * 字符串限制长度
 */
export function limitLength(val: any, limitLength = 3) {
  if (typeof val === "string" && val.length > limitLength) {
    return val.substr(0, limitLength) + "...";
  }
  return val;
}

/**
 * 图片全屏预览
 */
export function imagePreview(
  imgArr: string[] | string,
  startPosition?: number,
) {
  if (Array.isArray(imgArr)) {
    showImagePreview({
      images: imgArr,
      startPosition,
      loop: false,
    });
  } else {
    showImagePreview({
      images: [imgArr],
      startPosition: 0,
      loop: false,
    });
  }
}

/**
 * 向 app 请求 token
 */
export function getAppToken() {
  // setToken(
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDI4MTg4Nzc3NDQ0MjA0NTQ1IiwiZXhwIjoxNjk3NDUzNTU5fQ.oSNEq2Y2hnnsSCanVur-ZsrP6OZPcnQg4Em9TwClN00",
  // );

  const token = getToken();
  if (token?.length) {
    return token;
  }

  return new Promise<string>((resolve) => {
    (window as any).getToken = (token: string) => {
      if (token) {
        setToken(token);
        resolve(token);
      }
    };
  });
}

export async function convertToImage(element: HTMLElement) {
  return html2canvas(element, {
    scale: 4,
    width: element.offsetWidth,
    height: element.offsetHeight,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#fff",
  }).then((canvas: any) => {
    return canvas.toDataURL("image/png");
  });
}
/**
 * 下载 dom 截图
 */
export async function downloadScreenshotFn(id = "poster") {
  const element = document.getElementById(id);
  console.log(element, "element");
  if (element) {
    const imgBlobData = await convertToImage(element);
    const el = document.createElement("a");
    el.href = imgBlobData;
    el.download = "poster.png";
    const event = new MouseEvent("click");
    el.dispatchEvent(event);
  }
}
