import axiosInstance from "./axiosInstance";
import type { UploadImageResponse } from "@/types/travelogueResponse";
import type { UploadWhoWhyRequest } from "@/types/travelogueRequest";
import type { UploadWhoWhyResponse } from "@/types/travelogueResponse";

// 여행기 생성 POST /api/travelogue
export async function createTravelogue() {
  const response = await axiosInstance.post("/api/travelogue");
  return response.data;
}

// 여행기 수정 PATCH /api/travelogue/{travelogue_id}
export async function updateTravelogueStyle(
  travelogueId: number,
  styleCategory: number
) {
  await axiosInstance.patch(`/api/travelogue/${travelogueId}`, {
    style_category: styleCategory,
  });
}

// 전체 여행기 조회 GET /api/travelogue/all
export async function getAllTravelogues() {
  const response = await axiosInstance.get("/api/travelogue/all");
  return response.data;
}

// 특정 여행기 조회 GET /api/travelogue/{travelogue_id}
export async function getTravelogueById(travelogueId: number) {
  const response = await axiosInstance.get(`/api/travelogue/${travelogueId}`);
  return response.data;
}

// 이미지 업로드 POST /api/image/upload
export async function uploadImages(
  travelogueId: number,
  files: File[]
): Promise<UploadImageResponse[]> {
  const formData = new FormData();
  formData.append("travelogue_id", travelogueId.toString());
  files.forEach((file) => formData.append("files", file));

  const res = await fetch("/api/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("이미지 업로드 실패");
  }

  return res.json();
}

export const uploadWhoWhy = async (
  travelogueId: number,
  data: UploadWhoWhyRequest
): Promise<UploadWhoWhyResponse> => {
  const response = await axiosInstance.post<UploadWhoWhyResponse>(
    `/api/travelogue/${travelogueId}/question`,
    data
  );
  return response.data;
};
