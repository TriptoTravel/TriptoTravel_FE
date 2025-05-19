"use client";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
      <img
        src="/images/loadingspinner.svg"
        alt="로딩 중"
        className="w-20 h-20 object-contain"
      />
    </div>
  );
}
