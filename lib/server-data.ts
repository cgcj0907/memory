import type { User } from "@supabase/supabase-js";
import { mockRecords, mockSpace } from "@/lib/constants/mock-data";
import { createClient } from "@/lib/supabase/server";
import { getSpaceGateState } from "@/lib/utils/space-gate";
import type { RecordItem, SpaceSummary } from "@/types/app";

export async function getHomeData(): Promise<{
  gate: "preview" | "login" | "onboarding" | "home";
  space: SpaceSummary;
  records: RecordItem[];
  authUser?: User;
}> {
  const supabase = await createClient();

  if (!supabase) {
    return { gate: "preview", space: mockSpace, records: mockRecords };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { gate: "login", space: mockSpace, records: mockRecords };
  }

  const { data: membership } = await supabase
    .from("space_members")
    .select("space_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) {
    return {
      gate: getSpaceGateState({ hasMembership: false, hasSupabase: true, hasUser: true }),
      space: mockSpace,
      records: [],
      authUser: user
    };
  }

  const [{ data: space }, { data: members }, { data: records }] = await Promise.all([
    supabase.from("spaces").select("id, name, cover_image_path, pair_code").eq("id", membership.space_id).maybeSingle(),
    supabase.from("space_members").select("user_id, users_profile(email, nickname, avatar_path)").eq("space_id", membership.space_id),
    supabase
      .from("records")
      .select(`
        id, title, event_time, location_text, description, tags, cover_image_path, created_at, updated_at, 
        categories(slug),
        bakery_records(shop_name, shop_image_path, bakery_items(id, name, image_path, taste_level, note))
      `)
      .eq("space_id", membership.space_id)
      .order("event_time", { ascending: false })
  ]);

  return {
    gate: getSpaceGateState({ hasMembership: true, hasSupabase: true, hasUser: true }),
    authUser: user,
    space: {
      id: space?.id ?? mockSpace.id,
      name: space?.name ?? mockSpace.name,
      coverImagePath: space?.cover_image_path ?? mockSpace.coverImagePath,
      pairCode: space?.pair_code ?? mockSpace.pairCode,
      members:
        members?.map((member) => {
          const profile = Array.isArray(member.users_profile) ? member.users_profile[0] : member.users_profile;

          return {
            id: member.user_id,
            email: profile?.email,
            nickname: profile?.nickname,
            avatarPath: profile?.avatar_path
          };
        }) ?? mockSpace.members
    },
    records:
      records?.map((record) => {
        const category = Array.isArray(record.categories) ? record.categories[0] : record.categories;
        const bakeryRecord = Array.isArray(record.bakery_records) ? record.bakery_records[0] : record.bakery_records;
        
        return {
          id: record.id,
          title: record.title,
          categorySlug: (category?.slug as any) || "moment",
          eventTime: record.event_time,
          locationText: record.location_text,
          description: record.description,
          tags: record.tags ?? [],
          coverImagePath: record.cover_image_path,
          createdAt: record.created_at,
          updatedAt: record.updated_at,
          bakeryShopName: bakeryRecord?.shop_name,
          bakeryShopImagePath: bakeryRecord?.shop_image_path,
          bakeryItems: bakeryRecord?.bakery_items?.map((item: any) => ({
            id: item.id,
            name: item.name,
            imagePath: item.image_path,
            tasteLevel: item.taste_level,
            note: item.note
          }))
        };
      }) ?? mockRecords
  };
}

export async function getRecordById(recordId: string): Promise<RecordItem> {
  const supabase = await createClient();
  
  if (!supabase) {
    return mockRecords.find((r) => r.id === recordId) ?? mockRecords[0];
  }

  const { data: record } = await supabase
    .from("records")
    .select(`
      id, title, event_time, location_text, description, tags, cover_image_path, created_at, updated_at,
      categories(slug),
      bakery_records(shop_name, shop_image_path, bakery_items(id, name, image_path, taste_level, note))
    `)
    .eq("id", recordId)
    .maybeSingle();

  if (!record) {
    return mockRecords.find((r) => r.id === recordId) ?? mockRecords[0];
  }

  const category = Array.isArray(record.categories) ? record.categories[0] : record.categories;
  const bakeryRecord = Array.isArray(record.bakery_records) ? record.bakery_records[0] : record.bakery_records;
  
  return {
    id: record.id,
    title: record.title,
    categorySlug: (category?.slug as any) || "moment",
    eventTime: record.event_time,
    locationText: record.location_text,
    description: record.description,
    tags: record.tags ?? [],
    coverImagePath: record.cover_image_path,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
    bakeryShopName: bakeryRecord?.shop_name,
    bakeryShopImagePath: bakeryRecord?.shop_image_path,
    bakeryItems: bakeryRecord?.bakery_items?.map((item: any) => ({
      id: item.id,
      name: item.name,
      imagePath: item.image_path,
      tasteLevel: item.taste_level,
      note: item.note
    }))
  };
}
