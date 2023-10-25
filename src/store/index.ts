import { createPinia } from "pinia";
import useReportStore from "./modules/report";
import useCustomizeStore from "./modules/customize";

export { useReportStore, useCustomizeStore };
export default createPinia();
