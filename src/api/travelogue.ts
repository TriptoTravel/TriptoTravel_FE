import type { UploadImageResponse } from "@/types/travelogue";

// 여행기 생성 POST /api/travelogue
export async function createTravelogue() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travelogue`, {
      method: "POST",
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(`API Error: ${JSON.stringify(errorBody)}`);
    }

    const data = await res.json();
    return data as {
      travelogue_id: number;
      style_category: number | null;
      created_at: string;
    };
  } catch (error) {
    console.error("여행기 생성 실패:", error);
    throw error;
  }
}

// 여행기 수정 PATCH /api/travelogue/{travelogue_id}
export async function updateTravelogueStyle(
  travelogueId: number,
  styleCategoryId: number
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/travelogue/${travelogueId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          style_category: styleCategoryId,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`수정 실패: ${JSON.stringify(errorData)}`);
    }

    // 반환값 없음
    return true;
  } catch (error) {
    console.error("여행기 스타일 수정 오류:", error);
    throw error;
  }
}

// 전체 여행기 조회 GET /api/travelogue/all
export async function getAllTravelogues() {
  try {
    const response = await fetch("/api/travelogue/all");
    if (!response.ok) throw new Error("Failed to fetch all travelogues");
    return await response.json();
  } catch (error) {
    console.error("Error fetching travelogues:", error);
    throw error;
  }
}

// 특정 여행기 조회 GET /api/travelogue/{travelogue_id}
export async function getTravelogueById(travelogue_id: number) {
  try {
    const response = await fetch(`/api/travelogue/${travelogue_id}`);
    if (!response.ok) throw new Error("Failed to fetch travelogue");
    return await response.json();
  } catch (error) {
    console.error("Error fetching travelogue:", error);
    throw error;
  }
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
