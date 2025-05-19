"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import UploadIconButton from "@/components/buttons/UploadIconButton";
import MultiPhotoCard from "@/components/cards/MultiPhotoCard";
import CTAButton from "@/components/buttons/CTAButton";
import UploadingOverlay from "@/components/common/UploadingOverlay";
import { postImages } from "@/api/travelogue";
import { useTrip } from "@/contexts/tripStore";

export default function UploadPage() {
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { travelogueId, setUploadnum } = useTrip();

  const handleNext = async () => {
    if (!travelogueId) return router.push("fail?stage=여행기 ID 조회");

    setIsLoading(true);
    try {
      await postImages(travelogueId, images);
      setUploadnum(images.length);
      router.push("/num");
    } catch (err) {
      router.push("/fail?stage=이미지 업로드");
    } finally {
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {isLoading && <UploadingOverlay />}
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px] animate-fade-slide-up">
        {images.length === 0 && (
          <UploadIconButton
            onUpload={(files) => {
              const fileArray = Array.from(files);
              setImages((prev) => [...prev, ...fileArray]);
            }}
          />
        )}

        {images.length > 0 && (
          <>
            <MultiPhotoCard
              images={images.map((file) => URL.createObjectURL(file))}
            />
            <CTAButton
              variation="black"
              label="업로드하기"
              onClick={handleNext}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
