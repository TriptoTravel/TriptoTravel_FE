/**
 * 사용자가 선택한 여행기 사진 수와 업로드 수를 기반으로
 * 1차 선별 대상이 될 사진 수를 계산한다
 *
 * @param selected 여행기로 구성하고 싶은 사진 수
 * @param uploadnum 업로드한 전체 사진 수
 * @returns 1차 선별 대상 사진 수
 */
export function getActivatedImageCount(selected: number, uploadnum: number): number {
  return Math.min(uploadnum, selected + 4);
}
