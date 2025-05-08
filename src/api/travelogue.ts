import axiosInstance from "./axiosInstance";
import type { PostImageResponse } from "@/types/travelogueResponse";
import type { PostWhoWhyRequest } from "@/types/travelogueRequest";
import type { PostWhoWhyResponse } from "@/types/travelogueResponse";

// 여행기 생성 POST /api/travelogue
export async function postTravelogue() {
  const response = await axiosInstance.post("/api/travelogue");
  return response.data;
}

// 여행기 수정 PATCH /api/travelogue/{travelogue_id}
export async function patchTravelogueStyle(
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
export async function postImages(
  travelogueId: number,
  files: File[]
): Promise<PostImageResponse[]> {
  const formData = new FormData();
  formData.append("travelogue_id", String(travelogueId));
  files.forEach((file) => {
    console.log("uploading file: ", file.name, file.type);
    formData.append("images", file);
  });

  for (const [key, value] of formData.entries()) {
    console.log("FormData:", key, value);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}api/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Upload failed:", errorBody);
    throw new Error("이미지 업로드 실패");
  }

  return res.json();
}

// WHO WHY 업로드 POST /api/travelogue/${travelogueId}/question
export const postWhoWhy = async (
  travelogueId: number,
  data: PostWhoWhyRequest
): Promise<PostWhoWhyResponse> => {
  const response = await axiosInstance.post<PostWhoWhyResponse>(
    `/api/travelogue/${travelogueId}/question/total`,
    data
  );
  return response.data;
};
