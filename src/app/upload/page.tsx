"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import UploadIconButton from "@/components/buttons/UploadIconButton";
import MultiPhotoCard from "@/components/cards/MultiPhotoCard";
import CTAButton from "@/components/buttons/CTAButton";

export default function UploadPage() {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  const handleNext = () => {
    router.push("/num");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        {images.length === 0 && <UploadIconButton
          onUpload={(files) => {
            const fileArray = Array.from(files);
            const imageUrls = fileArray.map((file) =>
              URL.createObjectURL(file)
            );
            setImages((prev) => [...prev, ...imageUrls]);
          }}
        />}

        {images.length > 0 && <MultiPhotoCard images={images} />}

        {images.length > 0 && (
          <CTAButton variation="black" label="다음 단계" onClick={handleNext} />
        )}
      </main>

      <Footer />
    </div>
  );
}
