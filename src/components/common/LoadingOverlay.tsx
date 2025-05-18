"use client";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* 로딩 스피너 */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
        {/* 로딩 텍스트 */}
        <p className="text-black items-center text-xl font-pretendard font-semibold">
          AI 작업 중입니다
          <br /> 잠시만 기다려주세요!
        </p>
      </div>
    </div>
  );
}
