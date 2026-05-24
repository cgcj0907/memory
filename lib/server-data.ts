import { mockRecords, mockSpace } from "@/lib/constants/mock-data";
import { createClient } from "@/lib/supabase/server";
import { getSpaceGateState } from "@/lib/utils/space-gate";
import type { RecordItem, SpaceSummary } from "@/types/app";

export async function getHomeData(): Promise<{
  gate: "preview" | "login" | "onboarding" | "home";
  space: SpaceSummary;
  records: RecordItem[];
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
      records: []
    };
  }

  const [{ data: space }, { data: members }, { data: records }] = await Promise.all([
    supabase.from("spaces").select("id, name, cover_image_path, pair_code").eq("id", membership.space_id).single(),
    supabase.from("space_members").select("user_id, users_profile(email, nickname, avatar_path)").eq("space_id", membership.space_id),
    supabase
      .from("records")
      .select("id, title, event_time, location_text, description, tags, cover_image_path, created_at, updated_at")
      .eq("space_id", membership.space_id)
      .order("event_time", { ascending: false })
  ]);

  return {
    gate: getSpaceGateState({ hasMembership: true, hasSupabase: true, hasUser: true }),
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
      records?.map((record) => ({
        id: record.id,
        title: record.title,
        categorySlug: "moment",
        eventTime: record.event_time,
        locationText: record.location_text,
        description: record.description,
        tags: record.tags ?? [],
        coverImagePath: record.cover_image_path,
        createdAt: record.created_at,
        updatedAt: record.updated_at
      })) ?? mockRecords
  };
}

export async function getRecordById(recordId: string) {
  const { records } = await getHomeData();
  return records.find((record) => record.id === recordId) ?? mockRecords[0];
}
