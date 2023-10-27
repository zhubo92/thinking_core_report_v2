import { defineStore } from "pinia";
import { ref } from "vue";
import {
  defaultBabyDetail,
  defaultSemesterReport,
  defaultSingleRecord,
  IBabies,
  IBabyDetail,
  IBabyRecord,
  IDomainDetail,
  IRecordData,
  ISemesterReport,
  ISingleRecord,
} from "@/types/customize.d";
import {
  getBabyDetailRequest,
  getCustomizeBabyRecord,
  getCustomizeSemesterBabies,
  getCustomizeSingleRecord,
  getDomainListRequest,
  getSemesterRecordRequest,
  joinSemesterReportRequest,
  sendSemesterRecordRequest,
  sendSingleRecordRequest,
} from "@/api/customize.ts";
import { showToast } from "vant";

export default defineStore("customize", () => {
  const singleRecord = ref<ISingleRecord>(defaultSingleRecord());
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
  const semesterReport = ref<ISemesterReport>(defaultSemesterReport());

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
  async function getSemesterRecord(params: {
    babyId: string;
    classId: string;
    classLevelCode: string;
    semesterType: string;
  }) {
    const { status, data } = await getSemesterRecordRequest(params);
    if (status === 200) {
      semesterReport.value = data;
    }
  }
  async function sendSingleRecord(params: {
    babyId: string;
    id: string;
    recordType: string;
  }) {
    const { status } = await sendSingleRecordRequest(params);
    if (status === 200) {
      showToast("发送成功");
      singleRecord.value.sendReport = 1;
    }
  }
  async function sendSemesterRecord(params: {
    babyId: string;
    classId: string;
    classLevelCode: string;
    semesterType: string;
    recordType: string;
  }) {
    const { status } = await sendSemesterRecordRequest(params);
    if (status === 200) {
      showToast("发送成功");
      semesterReport.value.sendReport = 1;
    }
  }
  return {
    singleRecord,
    recordData,
    babyList,
    babyRecordTotal,
    babyRecordList,
    babyDetail,
    domainList,
    semesterReport,

    getSingleRecord,
    sendToParent,
    getSemesterBabies,
    getBabyDetail,
    getBabyRecord,
    getDomainList,
    joinSemesterReport,
    getSemesterRecord,
    sendSingleRecord,
    sendSemesterRecord,
  };
});
