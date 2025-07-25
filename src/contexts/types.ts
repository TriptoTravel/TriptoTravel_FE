/**
 * 여행기 문체, 동행자, 목적, EXIF, 질문답변 등의 타입 정의
 * 필요한 enum이나 유틸 타입도 여기 포함
 */

// 여행기 튜플 아이디 타입
export type TravelogueId = number | null;

// 여행기 문체 스타일 타입
export type TripStyle = "default" | "감성형" | "정보형" | "요약형";

// 여행 동행자 타입
export type TripCompanion =
  | "혼자"
  | "친구와"
  | "연인과"
  | "배우자와"
  | "아이와"
  | "부모님과";

// 여행 목적 타입
export type TripPurpose = "음식" | "역사" | "자연" | "액티비티";

// 선별된 사진 1장에 대한 데이터
export type SelectedImage = {
  image_id: number;
  image_url: string;
};

// 확정된 사진 1장에 대한 데이터
export type ConfirmedImage = {
  image_id: number;
  image_url: string;
};

// 사진별 EXIF 정보
export type ExifData = {
  [imageId: string]: {
    time: string;
    location: string;
  };
};

// 사진별 질문 응답 정보
export type QnaData = {
  [imageId: string]: {
    how: string;
    emotion: string[];
  };
};

// 최종 여행기 문단 타입
export type FinalLogue = {
  image_id: number;
  image_logue: string;
}[];
