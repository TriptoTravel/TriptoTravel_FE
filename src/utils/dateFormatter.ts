export function formatDateKorean(dateString: string): string {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // 0시는 12시로 표시

    return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}시 ${minutes}분`;
  } catch {
    return dateString;
  }
}
