"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTrip } from "@/contexts/tripStore";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import MultiSelectCard from "@/components/cards/MultiSelectCard";
import CTAButton from "@/components/buttons/CTAButton";
import { getActivatedImages, postImageSelectionSecond } from "@/api/travelogue";

export default function SortPage() {
  const router = useRouter();
  const {
    travelogueId,
    photoCount,
    selectedImages,
    setSelectedImages,
    setConfirmedImages,
  } = useTrip();
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    const fetchActivatedImages = async () => {
      if (!travelogueId) return;
      try {
        const imageList = await getActivatedImages(travelogueId);
        setSelectedImages(imageList);
      } catch (err) {
        console.error("1차 선별 이미지 조회 실패", err);
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

    try {
      // 3. 확정하지 않은 이미지 전송
      await postImageSelectionSecond(travelogueId, {
        image_ids: unconfirmedImageIds,
      });
      // 4. context에 confirmedImages 저장
      setConfirmedImages(confirmedImages);
      router.push("/exif");
    } catch (err) {
      console.error("2차 선별 실패", err);
      alert("이미지 확정에 실패했습니다");
    }
  };

  const imageUrls = selectedImages.map((img) => img.image_url);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[30px]">
        <TextField
          type="instruction"
          text="여행기에 어울리는 사진을 선별했어요! 마음에 드는 사진을 선택해 주세요"
        />
        <MultiSelectCard
          images={imageUrls}
          selectedIndices={selectedIndices}
          onToggle={toggleSelection}
        />
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
      </main>
      <Footer />
    </div>
  );
}
