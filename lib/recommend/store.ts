import { createClient } from "@/lib/supabase/server";
import type {
  RecommendInput,
  RecommendResult,
  RecommendationRecord,
} from "./types";

export async function saveRecommendationRequest(
  input: RecommendInput,
  userId: string | null
): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recommendation_requests")
    .insert({
      region: input.region,
      region_detail: input.regionDetail ?? null,
      trip_type: input.tripType ?? null,
      travel_time: input.travelTime ?? null,
      trip_duration: input.tripDuration ?? null,
      visit_day: input.visitDay ?? null,
      companion: input.companion ?? null,
      age_groups: input.ageGroups ?? null,
      moods: input.moods ?? null,
      cafe_preferences: input.cafePreferences ?? null,
      indoor_outdoor: input.indoorOutdoor ?? null,
      plan_b: input.planB ?? null,
      // DB 컬럼명은 historical 이유로 `place` 유지. TS는 wishPlace로 명확화.
      place: input.wishPlace ?? null,
      email: input.email ?? null,
      email_opt_in: input.emailOptIn ?? false,
      user_id: userId,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to save recommendation request: ${error.message}`);
  }
  return data.id;
}

export async function updateRecommendationResult(
  id: string,
  result: RecommendResult,
  model: string
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("recommendation_requests")
    .update({ result, model })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update recommendation result: ${error.message}`);
  }
}

export async function getRecommendationById(
  id: string
): Promise<RecommendationRecord | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recommendation_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch recommendation: ${error.message}`);
  }
  if (!data) return null;

  return {
    id: data.id,
    createdAt: data.created_at,
    input: {
      region: data.region,
      regionDetail: data.region_detail ?? undefined,
      tripType: data.trip_type ?? undefined,
      travelTime: data.travel_time ?? undefined,
      tripDuration: data.trip_duration ?? undefined,
      visitDay: data.visit_day ?? undefined,
      companion: data.companion ?? undefined,
      ageGroups: data.age_groups ?? undefined,
      moods: data.moods ?? undefined,
      cafePreferences: data.cafe_preferences ?? undefined,
      indoorOutdoor: data.indoor_outdoor ?? undefined,
      planB: data.plan_b ?? undefined,
      wishPlace: data.place ?? undefined,
      email: data.email ?? undefined,
      emailOptIn: data.email_opt_in,
    },
    result: (data.result as RecommendResult | null) ?? null,
    model: data.model,
    userId: data.user_id,
  };
}
