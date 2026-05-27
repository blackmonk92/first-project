export type CuratedPlace = {
  id: string;
  name: string;
  region: string;
  subRegion?: string;
  category: string;
  moodTags: string[];
  myRating: number;
  parkingInfo?: string;
  myNote?: string;
  companionFit: string[];
  naverUrl?: string;
};

export type CuratedPlaceFilter = {
  regions?: string[];
  categories?: string[];
};
