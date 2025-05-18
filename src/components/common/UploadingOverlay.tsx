"use client";

import { useEffect, useState } from "react";

const steps = [
  { type: "video", src: "/videos/uploadimage1.webm", key: "video1" },
  { type: "image", src: "/images/imageicon.svg", key: "imageicon" },
  { type: "video", src: "/videos/uploadimage2.webm", key: "video2" },
];

export default function UploadingOverlay() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

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
        <p className="text-black items-center text-xl font-pretendard font-semibold">
          이미지를 업로드하는 중입니다!
        </p>
      </div>
    </div>
  );
}
