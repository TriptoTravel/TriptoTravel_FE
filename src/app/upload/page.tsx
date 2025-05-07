"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import UploadIconButton from "@/components/buttons/UploadIconButton";
import MultiPhotoCard from "@/components/cards/MultiPhotoCard";
import CTAButton from "@/components/buttons/CTAButton";
import { postImages } from "@/api/travelogue";
import { useTrip } from "@/contexts/tripStore";

export default function UploadPage() {
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();
  const { travelogueId } = useTrip();

  const handleNext = async () => {
    if (!travelogueId) return alert("여행기가 없습니다");

    try {
      await postImages(travelogueId, images);
      router.push("/num");
    } catch (err) {
      alert("이미지 업로드에 실패했습니다");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
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
              label="다음 단계"
              onClick={handleNext}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
