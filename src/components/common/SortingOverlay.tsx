"use client";

export default function SortingOverlay() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4 mb-20">
        <div className="w-40 h-40">
          <video
            key="sortimage"
            src="/videos/sort.webm"
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-black items-center text-xl font-pretendard font-semibold">
          이미지를 선별하는 중입니다!
        </p>
      </div>
    </div>
  );
}
