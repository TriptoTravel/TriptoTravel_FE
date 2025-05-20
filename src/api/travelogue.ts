import axios from "axios";
import axiosInstance from "./axiosInstance";
import { retry } from "@/utils/retry";
import type {
  PostWhoWhyRequest,
  PostImageSelectionSecondRequest,
  PatchImageMetadataRequest,
  PatchImageQnaRequest,
} from "@/types/travelogueRequest";
import type {
  PostImageResponse,
  PostWhoWhyResponse,
  PostImageSelectionSecondResponse,
  GetImageMetadataNoneResponse,
  PatchImageQnaResponse,
  GetDraftListResponse,
  GetExportResponse,
} from "@/types/travelogueResponse";

// 여행기 생성 POST /api/travelogue
export async function postTravelogue() {
  return retry(() =>
    axiosInstance.post("/api/travelogue").then((res) => res.data)
  );
}

// 여행기 스타일 수정 PATCH /api/travelogue/{travelogue_id}
export async function patchTravelogueStyle(
  travelogueId: number,
  styleCategory: number
) {
  return retry(() =>
    axiosInstance.patch(`/api/travelogue/${travelogueId}`, {
      style_category: styleCategory,
    })
  );
}

// 전체 여행기 조회 GET /api/travelogue/all
export async function getAllTravelogues() {
  return retry(() =>
    axiosInstance.get("/api/travelogue/all").then((res) => res.data)
  );
}

// 특정 여행기 조회 GET /api/travelogue/{travelogue_id}
export async function getTravelogueById(travelogueId: number) {
  return retry(() =>
    axiosInstance.get(`/api/travelogue/${travelogueId}`).then((res) => res.data)
  );
}

// 이미지 업로드 POST /api/image/upload
export async function postImages(
  travelogueId: number,
  files: File[],
  onProgress?: (percent: number) => void
): Promise<PostImageResponse[]> {
  const formData = new FormData();
  formData.append("travelogue_id", String(travelogueId));
  files.forEach((file) => formData.append("images", file));

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}api/image/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        if (!event.total) return;
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress?.(percent); // 퍼센트 상태 업데이트
      },
    }
  );
  return response.data;
}

// WHO WHY 업로드 POST /api/travelogue/${travelogueId}/question
export const postWhoWhy = async (
  travelogueId: number,
  data: PostWhoWhyRequest
): Promise<PostWhoWhyResponse> => {
  return retry(() =>
    axiosInstance
      .post(`/api/travelogue/${travelogueId}/question/total`, data)
      .then((res) => res.data)
  );
};

// 이미지 1차 선별 개수 PATCH /api/image/{travelogue_id}/selection/first
export async function patchImageSelectionFirst(
  travelogueId: number,
  imageNum: number
): Promise<void> {
  const res = await axiosInstance.patch(
    `/api/image/${travelogueId}/selection/first?image_num=${imageNum}`
  );
}

// 이미지 1차 선별 조회 GET /api/image/{travelogue_id}/activated
export async function getActivatedImages(travelogueId: number) {
  return retry(() =>
    axiosInstance
      .get(`/api/image/${travelogueId}/activated`)
      .then((res) => res.data.image_list)
  );
}

// 이미지 2차 선별 POST /api/image/${travelogueId}/selection/second
export async function postImageSelectionSecond(
  travelogueId: number,
  data: PostImageSelectionSecondRequest
): Promise<PostImageSelectionSecondResponse> {
  return retry(() =>
    axiosInstance
      .post(`/api/image/${travelogueId}/selection/second`, data)
      .then((res) => res.data)
  );
}

// 메타데이터가 없는 이미지 조회 GET /api/image/${travelogueId}/none/metadata
export async function getImagesWithoutMetadata(
  travelogueId: number
): Promise<GetImageMetadataNoneResponse> {
  return retry(() =>
    axiosInstance
      .get(`/api/image/${travelogueId}/none/metadata`)
      .then((res) => res.data)
  );
}

// 이미지 메타데이터 수정 PATCH /api/image/${imageId}/metadata
export async function patchImageMetadata(
  imageId: number,
  data: PatchImageMetadataRequest
): Promise<void> {
  return retry(() =>
    axiosInstance.patch(`/api/image/${imageId}/metadata`, data)
  );
}

// 감정, 상황 데이터 업로드 POST /api/image/${imageId}/question
export async function postImageQna(
  imageId: number,
  data: PatchImageQnaRequest
): Promise<PatchImageQnaResponse> {
  return retry(() =>
    axiosInstance
      .post(`/api/image/${imageId}/question`, data)
      .then((res) => res.data)
  );
}

// 여행기 초안 생성 PATCH /api/travelogue/{travelogue_id}/generation
export async function patchTravelogueGeneration(
  travelogueId: number
): Promise<void> {
  await axiosInstance.patch(`/api/travelogue/${travelogueId}/generation`);
}

// 여행기 초안 조회 GET /api/travelogue/{travelogue_id}/draft
export async function getDraftList(
  travelogueId: number
): Promise<GetDraftListResponse> {
  return retry(() =>
    axiosInstance
      .get(`/api/travelogue/${travelogueId}/draft`)
      .then((res) => res.data)
  );
}

// 여행기 초안 수정 PATCH /api/image/${imageId}/correction
export async function patchImageCorrection(
  imageId: number,
  finalText: string
): Promise<void> {
  return retry(() =>
    axiosInstance.patch(`/api/image/${imageId}/correction`, {
      final: finalText,
    })
  );
}

// 여행기 최종 URL GET /api/travelogue/${travelogueId}/share
export async function getShareUrl(
  travelogueId: number
): Promise<GetExportResponse> {
  return retry(() =>
    axiosInstance
      .get(`/api/travelogue/${travelogueId}/export`)
      .then((res) => res.data)
  );
}

// 여행기 최종 PDF 저장 GET /api/pdf
export async function downloadPdf(travelogueId: number) {
  try {
    const response = await axiosInstance.get(
      `/api/travelogue/${travelogueId}/export`,
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `travelogue_${travelogueId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log("여행기 저장 실패");
  }
}
