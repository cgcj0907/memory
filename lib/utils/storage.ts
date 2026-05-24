import { STORAGE_BUCKET } from "@/lib/constants/app";

export function buildStoragePath(
  kind: "avatar" | "space-cover" | "record" | "bakery-item" | "bakery-shop",
  userId: string,
  fileName: string
) {
  const extension = fileName.includes(".") ? fileName.slice(fileName.lastIndexOf(".")) : "";
  return `${kind}/${userId}/${crypto.randomUUID()}${extension}`;
}

export { STORAGE_BUCKET };
