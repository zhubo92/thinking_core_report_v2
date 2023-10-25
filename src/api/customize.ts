import request from "@/utils/request";
import { ISingleRecord } from "@/types/customize";

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
