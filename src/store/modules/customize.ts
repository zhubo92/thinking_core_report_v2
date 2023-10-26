import { defineStore } from "pinia";
import { ref } from "vue";
import {
  defaultBabyDetail,
  defaultSingleRecord,
  IBabies,
  IBabyDetail,
  IBabyRecord,
  IDomainDetail,
  IRecordData,
  ISingleRecord,
} from "@/types/customize.d";
import {
  getBabyDetailRequest,
  getCustomizeBabyRecord,
  getCustomizeSemesterBabies,
  getCustomizeSingleRecord,
  getDomainListRequest,
  joinSemesterReportRequest,
} from "@/api/customize.ts";
import { showToast } from "vant";

export default defineStore("customize", () => {
  const singleRecord = ref<ISingleRecord>(defaultSingleRecord());
  const isSendToParent = ref<boolean>(false);
  const recordData = ref<IRecordData>({
    className: "",
    totalBaby: 0,
    startDate: "",
    endDate: "",
    teacherNames: [],
  });
  const babyList = ref<IBabies[]>([]);
  const babyRecordList = ref<IBabyRecord[]>([]);
  const babyRecordTotal = ref<number>(-1);
  const babyDetail = ref<IBabyDetail>(defaultBabyDetail());
  const domainList = ref<IDomainDetail[]>([]);

  async function getSingleRecord(babyId: string, id: string) {
    const { status, data } = await getCustomizeSingleRecord(babyId, id);
    if (status === 200) {
      singleRecord.value = data;
    }
  }
  function sendToParent() {
    console.log("sendToParent");
  }

  async function getSemesterBabies(params: {
    classId: string;
    classLevelCode: string;
    gameType: string;
    recordType: string;
    semesterType: string;
  }) {
    const { status, data } = await getCustomizeSemesterBabies(params);
    if (status === 200) {
      recordData.value = data.recordData;
      babyList.value = data.babyList;
    }
  }

  async function getBabyDetail(babyId: string) {
    const { status, data } = await getBabyDetailRequest(babyId);
    if (status === 200) {
      babyDetail.value = data;
    }
  }
  async function getBabyRecord(params: {
    babyId: string;
    classId: string;
    classLevelCode: string;
    domainId?: string;
    gameType: string;
    page: number;
    pageSize: number;
    semesterType: string;
  }) {
    const { status, data } = await getCustomizeBabyRecord(params);
    if (status === 200) {
      babyRecordList.value.push(
        ...data.entityList.map((item) => {
          return {
            ...item,
            isExpand: item.abilityList.length < 4,
          };
        }),
      );

      babyRecordTotal.value = data.total;
    }
  }

  async function getDomainList() {
    const { status, data } = await getDomainListRequest();
    if (status === 200) {
      domainList.value = data;
    }
  }
  async function joinSemesterReport(id: string, state: 0 | 1) {
    const { status } = await joinSemesterReportRequest({ id, state });
    if (status === 200) {
      showToast(state === 1 ? "已加入报告" : "已取消加入");
      babyRecordList.value.forEach((item) => {
        if (item.id === id) {
          item.joinSemester = state;
        }
      });
    }
  }
  return {
    singleRecord,
    isSendToParent,
    recordData,
    babyList,
    babyRecordTotal,
    babyRecordList,
    babyDetail,
    domainList,

    getSingleRecord,
    sendToParent,
    getSemesterBabies,
    getBabyDetail,
    getBabyRecord,
    getDomainList,
    joinSemesterReport,
  };
});
