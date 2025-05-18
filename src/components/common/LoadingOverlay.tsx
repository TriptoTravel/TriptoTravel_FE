"use client";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-[url('/images/background.svg')] bg-cover bg-center flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/images/trip.gif"
          alt="로딩 중"
          className="w-40 object-contain"
        />
        <img
          src="/images/to.gif"
          alt="로딩 중"
          className="w-40 object-contain"
        />
        <img
          src="/images/travel.gif"
          alt="로딩 중"
          className="w-40 object-contain"
        />
        {/* 로딩 텍스트 */}
        <p className="text-black items-center text-xl font-pretendard font-semibold">
          잠시만 기다려주세요!
        </p>
      </div>
    </div>
  );
}
