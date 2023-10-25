import { defineStore } from "pinia";
import { ref } from "vue";
import { defaultSingleRecord, ISingleRecord } from "@/types/customize.d";
import { getCustomizeSingleRecord } from "@/api/customize.ts";

export default defineStore("customize", () => {
  const singleRecord = ref<ISingleRecord>(defaultSingleRecord());
  const isSendToParent = ref<boolean>(false);

  async function getSingleRecord(babyId: string, id: string) {
    const { status, data } = await getCustomizeSingleRecord(babyId, id);
    if (status === 200) {
      singleRecord.value = data;
    }
  }
  function sendToParent() {
    console.log("sendToParent");
  }
  return {
    singleRecord,
    isSendToParent,

    getSingleRecord,
    sendToParent,
  };
});
