import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getToken } from "@/utils/storage";
import { showToast } from "vant";
import "vant/es/toast/style";

interface CustomAxiosInstance extends AxiosInstance {
  <T>(config: AxiosRequestConfig): Promise<{
    status: number;
    msg: string;
    data: T;
    headers: any;
  }>;
}

const service: CustomAxiosInstance = axios.create({
  baseURL: "/zd-api",
  timeout: 5000,
});

/**
 * 请求拦截
 */
service.interceptors.request.use(
  (config) => {
    // 统一的请求头设置
    config.headers["token"] = getToken();
    config.headers["Content-Type"] = "application/json;charset=utf-8";

    return config;
  },
  (error) => {
    // 请求错误统一处理
    console.log(error, "service.interceptors.request.error");

    showToast(error || "Error");

    return Promise.reject(error);
  },
);

/**
 *  响应拦截
 */
service.interceptors.response.use(
  async (response) => {
    const { status, msg } = response.data;

    if (status !== 200) {
      showToast(msg || "Error");
    }

    return { ...response.data };
  },
  (error: { msg: string }) => {
    console.log("service.interceptors.response.error" + error);

    showToast(error?.msg || "Error");

    return Promise.reject(error);
  },
);

export default service;
