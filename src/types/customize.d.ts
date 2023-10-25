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
  story: IStory;
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
