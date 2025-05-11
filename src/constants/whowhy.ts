export const companionMap = {
  혼자: 1,
  친구와: 2,
  연인과: 3,
  배우자와: 4,
  아이와: 5,
  부모님과: 6,
} as const;

export const purposeMap = {
  음식: 1,
  자연: 2,
  역사: 3,
  액티비티: 4,
} as const;

export type TripCompanion = keyof typeof companionMap;
export type TripPurpose = keyof typeof purposeMap;

export const companionOptions = Object.keys(companionMap) as TripCompanion[];
export const purposeOptions = Object.keys(purposeMap) as TripPurpose[];
