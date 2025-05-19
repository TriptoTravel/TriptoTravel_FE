// POST, PATCH 요청으로 들어갈 타입

export type createTravelogueRequest = {
  style_category: number;
};

export type PostWhoWhyRequest = {
  who_category: number[];
  purpose_category: number[];
};

export type PatchImageSelectionRequest = {
  image_num: number;
};

export type PostImageSelectionSecondRequest = {
  image_ids: number[];
};

export type PatchImageMetadataRequest = {
  created_at: string;
  location: string;
};

export type PatchImageQnaRequest = {
  how: string;
  emotion: number[];
};