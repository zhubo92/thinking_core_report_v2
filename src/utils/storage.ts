import { TOKEN } from "@/utils/constants.ts";

export function getToken() {
  return sessionStorage.getItem(TOKEN);
}
