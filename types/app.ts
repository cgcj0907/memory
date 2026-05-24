import type { BreadLevel } from "@/lib/constants/bread-levels";
import type { CategorySlug } from "@/lib/constants/categories";

export type MemberProfile = {
  id: string;
  email?: string | null;
  nickname?: string | null;
  avatarPath?: string | null;
};

export type SpaceSummary = {
  id: string;
  name: string;
  coverImagePath?: string | null;
  pairCode: string;
  members: MemberProfile[];
};

export type BakeryItem = {
  id?: string;
  name: string;
  imagePath?: string | null;
  tasteLevel: BreadLevel;
  note?: string | null;
};

export type RecordItem = {
  id: string;
  title: string;
  categorySlug: CategorySlug;
  eventTime: string;
  locationText?: string | null;
  description?: string | null;
  tags: string[];
  coverImagePath?: string | null;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string | null;
  bakeryShopName?: string | null;
  bakeryShopImagePath?: string | null;
  bakeryItems?: BakeryItem[];
};
