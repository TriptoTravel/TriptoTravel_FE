/**
 * 여행기 문체, 동행자, 목적, EXIF, 질문답변 등의 타입 정의
 * 필요한 enum이나 유틸 타입도 여기 포함
 */

// 여행기 문체 스타일 타입
export type TripStyle = 'default' | "감성형" | "정보형" | "요약형";

// 여행 동행자 타입
export type TripCompanion =
  | "혼자"
  | "친구와"
  | "연인과"
  | "배우자와"
  | "아이와"
  | "부모님과"
  | "기타";

// 여행 목적 타입
export type TripPurpose =
  | "체험 액티비티"
  | "SNS 핫플레이스"
  | "자연과 함께"
  | "유명 관광지 필수"
  | "여유롭게 힐링"
  | "문화 예술 역사"
  | "여행지 느낌 물씬"
  | "쇼핑은 열정적으로"
  | "관광보다 먹방"
  | "기타";

// 사진 1장에 대한 데이터
export type SelectedImage = {
  imageId: string;
  uri: string;
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
