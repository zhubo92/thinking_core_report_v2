import request from "@/utils/request";
import {
  IRecordData,
  ISingleRecord,
  IBabies,
  IBabyDetail,
  IBabyRecord,
  IDomainDetail,
} from "@/types/customize.d";

/**
 * 报告-行为记录单次测评报告数据查询
 */
export function getCustomizeSingleRecord(
  babyId: string | number,
  id: string | number,
) {
  return request<ISingleRecord>({
    url: `/teach/thought/customize/valuation/report/single/record?babyId=${babyId}&id=${id}`,
    method: "GET",
  });
}

/**
 * 综合报告-测评学生列表查询
 */
export function getCustomizeSemesterBabies(data: {
  classId: string;
  classLevelCode: string;
  gameType: string;
  recordType: string;
  semesterType: string;
}) {
  return request<{ recordData: IRecordData; babyList: IBabies[] }>({
    url: `/teach/thought/customize/valuation/semester/babies`,
    method: "POST",
    data,
  });
}
/**
 * 获取宝宝信息
 */
export function getBabyDetailRequest(babyId: string) {
  return request<IBabyDetail>({
    url: `/teach/baby/detail?id=${babyId}`,
    method: "GET",
  });
}
/**
 * 幼儿档案-学生行为记录测评分页查询
 */
export function getCustomizeBabyRecord(data: {
  babyId: string;
  classId: string;
  classLevelCode: string;
  domainId?: string;
  gameType: string;
  page: number;
  pageSize: number;
  semesterType: string;
}) {
  return request<{ entityList: IBabyRecord[]; total: number }>({
    url: `/teach/thought/customize/valuation/baby/record`,
    method: "POST",
    data,
  });
}
/**
 * 领域列表
 */
export function getDomainListRequest() {
  return request<IDomainDetail[]>({
    url: `/adminTeach/thought/domain/list`,
    method: "GET",
  });
}
/**
 * 加入/取消加入综合报告
 */
export function joinSemesterReportRequest(data: { id: string; state: 0 | 1 }) {
  return request<string>({
    url: `/teach/thought/customize/valuation/join/semester`,
    method: "PUT",
    data,
  });
}
