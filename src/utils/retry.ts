export async function retry<T>(
    fn: () => Promise<T>,
    retries = 3, // 기본 재시도 횟수 3회
    delay = 500 // 기본 대기 시간 500ms
  ): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      const status = error?.response?.status;
  
      // 재시도 대상 status 코드
      const retriableStatusCodes = [500, 502, 503, 504];
  
      if (
        retries > 0 &&
        retriableStatusCodes.includes(status)
      ) {
        console.warn(
          `HTTP ${status} 에러 → ${retries}회 재시도 남음...`
        );
  
        await new Promise((res) => setTimeout(res, delay));
  
        return retry(fn, retries - 1, delay);
      }
  
      // 재시도 불가능 또는 재시도 다 소진 → 그대로 throw
      throw error;
    }
  }
  