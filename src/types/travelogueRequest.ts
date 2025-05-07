// POST, PATCH 요청으로 들어갈 타입

export type createTravelogueRequest = {
  style_category: number;
};

export type UploadWhoWhyRequest = {
  who: number[];
  purpose_category: number[];
};
