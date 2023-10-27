import report from "@/store/modules/report.ts";

interface IStory {
  images: string[];
  videos: string[];
  content: string;
}

interface IDescription {
  growth: string;
  behave: string;
  example: string;
  tactics: string;
  education: string;
}

export interface IAbility {
  abilityName: string;
  description: IDescription;
}

interface IDomain {
  domainName: string;
  abilityList: IAbility[];
}

export interface ISingleRecord {
  recordId: string;
  babyId: string;
  sendReport: 0 | 1;
  recordDate: string;
  teacherName: string;
  babyNames: string[];
  joinSemester: number;
  story: IStory | null;
  domainList: IDomain[];
}

export function defaultSingleRecord(): ISingleRecord {
  return {
    recordId: "",
    babyId: "",
    sendReport: 0,
    recordDate: "",
    teacherName: "",
    babyNames: [],
    joinSemester: 1,
    story: {
      images: [],
      videos: [],
      content: "",
    },
    domainList: [],
  };
}

export interface IRecordData {
  className: string;
  totalBaby: number;
  startDate: string;
  endDate: string;
  teacherNames: string[];
}
export interface IBabies {
  babyId: string;
  classId: string;
  babyName: string;
  babyHeadImg: string;
  totalRecord: number;
  linkUrl: null | string;
}

export interface IBabyDetail {
  id: string;
  sex: 1 | 2;
  babyName: string;
  babyBirthday: string;
  createTime: string;
  updateTime: string;
  headImg: string;
  hasScan: 0 | 1;
  state: number;
  relationName: null | string;
}

export function defaultBabyDetail(): IBabyDetail {
  return {
    id: "",
    sex: 2,
    babyName: "",
    babyBirthday: "",
    createTime: "",
    updateTime: "",
    headImg: "",
    hasScan: 1,
    state: 1,
    relationName: null,
  };
}

interface IBabyRecordAbility {
  domainName: string;
  abilityName: string;
  abilityIconUrl: string;
  behave: string;
}
export interface IBabyRecord {
  id: string;
  joinSemester: 1 | 0;
  recordDate: string;
  teacherName: string;
  teacherHeadImg: string;
  story: IStory;
  abilityList: IBabyRecordAbility[];
  isExpand?: boolean;
}

export interface IDomainDetail {
  dataStatus: 1 | 0;
  createTime: string;
  updateTime: string;
  id: string;
  parentId: string;
  domainAbilityName: string;
  iconUrl: string;
}

interface IDomainAbilityName {
  domainName: string;
  abilityNameList: string[];
}

interface IDomainData {
  domainName: string;
  recordList: {
    recordDate: string;
    abilityName: string;
    abilityIconUrl: string;
    story: IStory;
    education: string;
  }[];
}
export interface ISemesterReport {
  classId: string;
  classLevelCode: -1 | 0 | 1 | 2;
  semesterType: 0 | 1;
  babyId: string;
  sendReport: 0 | 1;
  schoolName: string;
  className: string;
  babyName: string;
  babyHeadImg: string;
  startDate: string;
  endDate: string;
  domainAbilityNameList: IDomainAbilityName[];
  domainDataList: IDomainData[];
}

export function defaultSemesterReport(): ISemesterReport {
  return {
    classId: "",
    classLevelCode: -1,
    semesterType: 0,
    babyId: "",
    sendReport: 0,
    schoolName: "",
    className: "",
    babyName: "",
    babyHeadImg: "",
    startDate: "",
    endDate: "",
    domainAbilityNameList: [],
    domainDataList: [],
  };
}
