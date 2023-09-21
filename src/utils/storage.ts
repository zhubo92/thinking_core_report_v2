import { TOKEN } from "@/utils/constants.ts";

export function getToken() {
  return sessionStorage.getItem(TOKEN);
}

export function setToken(token: string) {
  return sessionStorage.setItem(TOKEN, token);
}
