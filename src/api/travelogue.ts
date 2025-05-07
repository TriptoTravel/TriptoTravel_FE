// 여행기 생성
export async function createTravelogue() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/travelogue`, {
        method: 'POST',
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
      console.error('여행기 생성 실패:', error);
      throw error;
    }
  }
  
// 여행기 수정 (스타일 선택)
export async function updateTravelogueStyle(
    travelogueId: number,
    styleCategoryId: number
  ) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/travelogue/${travelogueId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
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
      console.error('여행기 스타일 수정 오류:', error);
      throw error;
    }
  }