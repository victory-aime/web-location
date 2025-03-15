import { STORAGE_CURRENT_USER } from "_/store/src/modules/auth/constants";

export function getTokenOrThrow(): string {
  const token = localStorage.getItem(STORAGE_CURRENT_USER);
  if (!token) {
    console.log("No token provided");
  }
  return token || "";
}
