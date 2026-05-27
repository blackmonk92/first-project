export type RecommendInput = {
  region: string;
  regionDetail?: string;
  tripType?: string;
  travelTime?: string;
  tripDuration?: string;
  visitDay?: string;
  companion?: string;
  ageGroups?: string[];
  moods?: string[];
  cafePreferences?: string[];
  indoorOutdoor?: string;
  planB?: string;
  wishPlace?: string;
  email?: string;
  emailOptIn?: boolean;
};

export type RecommendPlanStop = {
  time: string;
  place: string;
  reason: string;
  travelTime?: string;
  notes?: string;
};

export type RecommendPlan = {
  title: string;
  summary: string;
  stops: RecommendPlanStop[];
};

export type RecommendResult = {
  planA: RecommendPlan;
  planB: RecommendPlan;
};

export type RecommendationRecord = {
  id: string;
  createdAt: string;
  input: RecommendInput;
  result: RecommendResult | null;
  model: string | null;
  userId: string | null;
};
