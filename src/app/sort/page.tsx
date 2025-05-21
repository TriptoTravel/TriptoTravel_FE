"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTrip } from "@/contexts/tripStore";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import MultiSelectCard from "@/components/cards/MultiSelectCard";
import CTAButton from "@/components/buttons/CTAButton";
import AnalyzingOverlay from "@/components/common/AnalyzingOverlay";
import { getActivatedImages, postImageSelectionSecond } from "@/api/travelogue";
import { getActivatedImageCount } from "@/utils/selection";

export default function SortPage() {
  const router = useRouter();
  const {
    travelogueId,
    uploadnum,
    photoCount,
    selectedImages,
    setSelectedImages,
    setConfirmedImages,
  } = useTrip();
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const skeletonCount =
    photoCount !== null ? getActivatedImageCount(photoCount, uploadnum) : 0;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchActivatedImages = async () => {
      if (!travelogueId) return;
      try {
        const imageList = await getActivatedImages(travelogueId);
        setSelectedImages(imageList);
      } catch (err) {
        router.push("/fail?stage=사진 분석");
      }
    };

    fetchActivatedImages();
  }, [travelogueId, setSelectedImages]);

  const toggleSelection = (index: number) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleNext = async () => {
    if (!travelogueId) return;

    // 1. 확정하지 않은 이미지 ID 추출
    const unconfirmedImageIds = selectedImages
      .filter((_, index) => !selectedIndices.includes(index))
      .map((img) => img.image_id);

    // 2. 확정한 이미지 리스트 생성
    const confirmedImages = selectedImages.filter((_, index) =>
      selectedIndices.includes(index)
    );

    setIsLoading(true);
    try {
      // 3. 확정하지 않은 이미지 전송
      await postImageSelectionSecond(
        travelogueId,
        {
          image_ids: unconfirmedImageIds,
        },
        (percent) => setProgress(Math.min(percent, 99))
      );
      // 4. context에 confirmedImages 저장
      setConfirmedImages(confirmedImages);
      router.push("/exif");
    } catch (err) {
      router.push("/fail?stage=사진 분석");
    } finally {
    }
  };

  const imageUrls = selectedImages.map((img) => img.image_url);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {isLoading && <AnalyzingOverlay progress={progress} />}
      <Header variation="type" />

      <main className="flex flex-col items-center justify-start mt-[60px] mb-auto gap-[30px] animate-fade-slide-up">
        <TextField
          type="instruction"
          text="여행기에 어울리는 사진을 선별했어요! 마음에 드는 사진을 선택해 주세요"
          annotation="none"
        />
        <MultiSelectCard
          images={imageUrls}
          selectedIndices={selectedIndices}
          onToggle={toggleSelection}
          skeletonCount={skeletonCount}
        />
      </main>
      <div className="flex flex-col items-center justify-center mb-[60px] animate-fade-slide-up">
        <p className="flex text-sm font-pretendard justify-start text-gray-400">
          선택한 개수보다 4장 더 많은 사진을 제공합니다. 
        </p>
        <CTAButton
          variation={
            photoCount !== null &&
            selectedIndices.length >= photoCount - 4 &&
            selectedIndices.length <= photoCount
              ? "black"
              : "disabled"
          }
          label="다음 단계"
          onClick={handleNext}
        />
      </div>
      <Footer />
    </div>
  );
}
