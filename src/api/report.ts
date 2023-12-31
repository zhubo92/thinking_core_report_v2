import request from "@/utils/request";
import { IReport } from "@/types/report";

/**
 * 获取单次测评报告
 */
export function getSingleReportRequest(params: any) {
  return request<IReport>({
    url: `/teach/thought/valuation/report/single`,
    method: "GET",
    params,
  });
}

/**
 * 获取综合测评报告
 */
export function getSemesterReportRequest(params: any) {
  return request<IReport>({
    url: `/teach/thought/valuation/report/semester`,
    method: "GET",
    params,
  });
}

/**
 * 发送给家长-单次测评报告
 */
export function sendToParentSingleRequest(data: any) {
  return request({
    url: `/teach/thought/valuation/record/send/single`,
    method: `POST`,
    data,
  });
}

/**
 * 发送给家长-学期综合报告
 */
export function sendToParentSemesterRequest(data: any) {
  return request({
    url: `/teach/thought/valuation/record/send/semester`,
    method: `POST`,
    data,
  });
}
