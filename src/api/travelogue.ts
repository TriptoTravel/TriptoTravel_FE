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
  