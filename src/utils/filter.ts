export function formatClassLevelCode(classLevelCode: any) {
  switch (Number(classLevelCode)) {
    case -1:
      return "托班";
    case 0:
      return "小班";
    case 1:
      return "中班";
    case 2:
      return "大班";
    default:
      return "";
  }
}
export function formatSemesterType(semesterType: any) {
  switch (Number(semesterType)) {
    case 1:
      return "下学期";
    case 0:
      return "上学期";
    default:
      return "";
  }
}
