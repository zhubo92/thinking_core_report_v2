import { defineStore } from "pinia";
import { computed, defineAsyncComponent, markRaw, ref } from "vue";
import {
  IBabyInfo,
  IComponent,
  IDistrict,
  IDistrictData,
  IDomain,
  IPage,
  IRadarMap,
  IStory,
} from "@/types/report.d";
import {
  getSemesterReportRequest,
  getSingleReportRequest,
  sendToParentSemesterRequest,
  sendToParentSingleRequest,
} from "@/api/report";
import { noticeApp } from "@/utils";
import { showToast } from "vant";

const BabyInfo = markRaw(
  defineAsyncComponent(() => import("@/views/report/district/BabyInfo.vue")),
);
const DistrictName = markRaw(
  defineAsyncComponent(
    () => import("@/views/report/district/DistrictName.vue"),
  ),
);
const ActivityInfo = markRaw(
  defineAsyncComponent(
    () => import("@/views/report/district/ActivityInfo.vue"),
  ),
);
const ChildrenBehavior = markRaw(
  defineAsyncComponent(
    () => import("@/views/report/district/ChildrenBehavior.vue"),
  ),
);
const QuestionPart = markRaw(
  defineAsyncComponent(
    () => import("@/views/report/district/QuestionPart.vue"),
  ),
);
const FamilyStrategy = markRaw(
  defineAsyncComponent(
    () => import("@/views/report/district/FamilyStrategy.vue"),
  ),
);
const ComplexTitle = markRaw(
  defineAsyncComponent(() => import("@/views/report/complex/ComplexTitle.vue")),
);
const ComplexItem = markRaw(
  defineAsyncComponent(() => import("@/views/report/complex/ComplexItem.vue")),
);
const RadarChart = markRaw(
  defineAsyncComponent(() => import("@/views/report/complex/RadarChart.vue")),
);
const AssessmentSkills = markRaw(
  defineAsyncComponent(
    () => import("@/views/report/complex/AssessmentSkills.vue"),
  ),
);
export default defineStore("report", () => {
  const isSendToParent = ref<boolean>(false);
  const isSingle = ref<boolean>(true);
  const isTeacher = ref<boolean>(true);
  const babyId = ref<string>("");
  const recordId = ref<string>("");
  const babyInfo = ref<IBabyInfo>({
    babyName: "",
    className: "",
    headImg: "",
    parentId: "",
    schoolName: "",
    sendNumber: 0,
    valuationType: "",
  });
  const districtList = ref<IDistrict[]>([]);
  const domainList = ref<IDomain[]>([]);
  const radarMapList = ref<IRadarMap[]>([]);
  const pageList = ref<IPage[]>([]);
  const componentList = ref<IComponent[]>([]);

  const totalPage = computed(() => {
    return pageList.value.length;
  });

  function getId() {
    return Math.random().toString(16).substring(2, 10);
  }

  function formatDomainAbilityName(name: string) {
    if (name) {
      let str = "";
      if (name.endsWith("能力")) {
        str = name.replace(/能力/, "”能力");
        str = "“" + str;
      } else {
        str = name;
      }
      return str;
    }
    return "";
  }

  // function createDomain(item: IDistrictData) {
  //   const {
  //     abilityLevelDes,
  //     domainName,
  //     domainAbilityName,
  //     abilityName,
  //     abilityLevelName,
  //   } = item as IDistrictData;
  //
  //   if (!item.story) {
  //     item.story = {
  //       content: null,
  //       description: null,
  //       images: null,
  //       questions: null,
  //       videos: null,
  //     };
  //   }
  //
  //   const { content, videos, images } = item.story;
  //   const { behave } = abilityLevelDes;
  //
  //   interface Domain {
  //     isEmpty: boolean;
  //     behave: null | string;
  //     domainName: null | string;
  //     domainAbilityName: null | string;
  //     content: null | string;
  //     abilityName: null | string;
  //     abilityLevelName: null | string;
  //     videos: null | string[];
  //     images: null | string[];
  //   }
  //
  //   const domain: Domain = {
  //     isEmpty: true,
  //     behave: null,
  //     domainName: null,
  //     domainAbilityName: null,
  //     content: null,
  //     abilityName: null,
  //     abilityLevelName: null,
  //     videos: null,
  //     images: null,
  //   };
  //
  //   if (domainName) {
  //     domain.domainName = domainName;
  //     domain.isEmpty = false;
  //   }
  //
  //   if (domainAbilityName) {
  //     domain.domainAbilityName = formatDomainAbilityName(domainAbilityName);
  //     domain.isEmpty = false;
  //   }
  //
  //   if (behave) {
  //     domain.behave = behave;
  //     domain.isEmpty = false;
  //   }
  //
  //   if (content) {
  //     domain.content = content;
  //     domain.isEmpty = false;
  //   }
  //
  //   if (abilityName) {
  //     domain.abilityName = abilityName;
  //     domain.isEmpty = false;
  //   }
  //
  //   if (abilityLevelName) {
  //     domain.abilityLevelName = abilityLevelName;
  //     domain.isEmpty = false;
  //   }
  //
  //   if (videos) {
  //     domain.videos = videos;
  //     domain.isEmpty = false;
  //   }
  //
  //   if (images) {
  //     domain.images = images;
  //     domain.isEmpty = false;
  //   }
  //
  //   if (!domain.isEmpty) {
  //     addComponentIfExist(DomainAbility, domain);
  //     // console.log(domain, 'domain')
  //   }
  // }

  function createQuestion(item: IDistrictData) {
    const { questionCardUrl, questionCardUrlList } = item;
    if (!item.question) {
      item.question = {
        content: null,
        description: null,
        images: null,
        questions: null,
        videos: null,
      };
    }
    const { content, images, videos } = item.question;

    interface IQuestion {
      isEmpty: boolean;
      questionCardUrl: null | string;
      questionCardUrlList: null | string[];
      content: null | string;
      images: null | string[];
      videos: null | string[];
    }

    const question: IQuestion = {
      isEmpty: true,
      questionCardUrl: null,
      questionCardUrlList: null,
      content: null,
      images: null,
      videos: null,
    };
    if (questionCardUrl) {
      question.questionCardUrl = questionCardUrl;
      question.isEmpty = false;
    }

    if (questionCardUrlList) {
      question.questionCardUrlList = questionCardUrlList;
      question.isEmpty = false;
    }
    if (content) {
      question.content = content;
      question.isEmpty = false;
    }

    if (images) {
      question.images = images;
      question.isEmpty = false;
    }
    if (videos) {
      question.videos = videos;
      question.isEmpty = false;
    }

    if (!question.isEmpty) {
      addComponentIfExist(QuestionPart, question);
      // console.log(question, 'question')
    }
  }

  function pushComponents() {
    pageList.value.push({
      id: getId(),
      componentList: componentList.value,
    });
    componentList.value = [];
  }

  function addComponentIfExist(component: any, value: any) {
    if (value) {
      componentList.value.push({
        id: getId(),
        view: component,
        value,
      });
    }
  }

  function createComponent() {
    // 综合发展情况
    if (!isSingle.value) {
      componentList.value.push({
        id: getId(),
        view: ComplexTitle,
      });
      addComponentIfExist(RadarChart, radarMapList);
      addComponentIfExist(AssessmentSkills, domainList);

      pushComponents();
    } else {
      addComponentIfExist(BabyInfo, babyInfo);
    }

    // 区域分页
    districtList.value?.map((district) => {
      district.dataList.map((item) => {
        const {
          subtitle,
          districtName,
          slogan,
          activityName,
          activityDescription,
          abilityLevelDes,
          domainName,
          domainAbilityName,
          // abilityName,
          abilityLevelName,
          story,
        } = item;
        const { education, behave } = abilityLevelDes;
        const { images, videos } = story as IStory;

        addComponentIfExist(DistrictName, { districtName, subtitle, slogan });

        addComponentIfExist(ActivityInfo, {
          activityName,
          activityDescription,
          domainName,
          domainAbilityName: formatDomainAbilityName(domainAbilityName),
          districtName,
        });

        addComponentIfExist(ChildrenBehavior, {
          behave,
          images,
          videos,
          // abilityName,
          abilityLevelName,
        });

        createQuestion(item);

        addComponentIfExist(FamilyStrategy, education);

        pushComponents();
      });
    });

    // 综合发展评估
    if (!isSingle.value) {
      componentList.value.push({
        id: getId(),
        view: ComplexTitle,
      });
      domainList.value?.map((item) => {
        addComponentIfExist(ComplexItem, item);
      });

      pushComponents();
    }
  }

  async function getReport() {
    const request = isSingle.value
      ? getSingleReportRequest
      : getSemesterReportRequest;

    const { data, status } = await request({
      babyId: babyId.value,
      recordId: recordId.value,
    });

    if (status === 200) {
      babyInfo.value = data?.babyInfo;
      districtList.value = data?.districtList;
      domainList.value = data?.domainList;
      radarMapList.value = data?.radarMapList;

      createComponent();

      console.log(JSON.parse(JSON.stringify(pageList.value)), "pageList");
      console.log(JSON.parse(JSON.stringify(babyInfo.value)), "babyInfo");
    }
  }

  async function sendToParent() {
    if (isSendToParent.value) return;
    isSendToParent.value = true;
    const params = [
      {
        babyId: babyId.value,
        recordId: recordId.value,
        parentId: babyInfo.value.parentId,
        valuationType: babyInfo.value.valuationType,
      },
    ];
    const request = isSingle.value
      ? sendToParentSingleRequest
      : sendToParentSemesterRequest;
    const { status } = await request(params);
    if (status === 200) {
      noticeApp(babyId.value, recordId.value);
      showToast("发送成功");
    }
  }

  return {
    isSingle,
    isTeacher,
    babyId,
    recordId,
    babyInfo,
    pageList,

    totalPage,

    getReport,
    sendToParent,
  };
});
