import { STORAGE_BUCKET } from "@/lib/constants/app";

export function buildStoragePath(
  kind: "avatar" | "space-cover" | "record" | "bakery-item",
  userId: string,
  fileName: string
) {
  return `${kind}/${userId}/${Date.now()}-${fileName}`;
}

export { STORAGE_BUCKET };
