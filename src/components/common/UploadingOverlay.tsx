"use client";

import { useEffect, useState } from "react";

const steps = [
  { type: "video", src: "/videos/uploadin.webm", key: "video1" },
  { type: "image", src: "/images/imageicon.svg", key: "imageicon" },
  { type: "video", src: "/videos/uploadout.webm", key: "video2" },
];

type UploadingOverlayProps = {
  progress: number;
};

export default function UploadingOverlay({ progress }: UploadingOverlayProps) {
  const [index, setIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsSaving(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const currentStep = steps[index];

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4 mb-20">
        <div className="w-40 h-40">
          {currentStep.type === "video" ? (
            <video
              key={currentStep.key}
              src={currentStep.src}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              key={currentStep.key}
              src={currentStep.src}
              alt="로딩 아이콘"
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <p className="text-black text-xl font-pretendard font-semibold">
          {isSaving
            ? "이미지를 저장하는 중입니다!"
            : "이미지를 업로드하는 중입니다!"}
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
