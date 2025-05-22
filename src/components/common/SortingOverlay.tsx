"use client";

type SortingOverlayProps = {
  progress: number;
};

export default function SortingOverlay({ progress }: SortingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4 mb-20">
        <div className="w-40 h-40">
          <img
            src="/images/sort.svg"
            alt="이미지 선별 중"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-black items-center text-xl font-pretendard font-semibold">
          선택한 여행 정보를 기반으로 AI가 사진을 선별하는 중입니다!
        </p>
        <div className="w-64 h-2 relative rounded-full overflow-hidden mt-2">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffc907, #2e9df7, #231f20)",
            }}
          />
          <div
            className="absolute top-0 right-0 h-full bg-gray-200 transition-all duration-300"
            style={{
              width: `${100 - progress}%`,
            }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">{progress}%</p>
      </div>
    </div>
  );
}
