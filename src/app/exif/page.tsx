"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import EXIFCardList, {
  EXIFCardListHandle,
  ImageMetaMap,
} from "@/components/cards/EXIFCardList";
import CTAButton from "@/components/buttons/CTAButton";
import { patchImageMetadata, getTimeOrderedImageIds } from "@/api/travelogue";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import { useTrip } from "@/contexts/tripStore";
import { ConfirmedImage } from "@/contexts/types";

export default function EXIFPage() {
  const router = useRouter();
  const cardListRef = useRef<EXIFCardListHandle>(null);
  const { confirmedImages, setConfirmedImages } = useTrip();
  const [metaMap, setMetaMap] = useState<ImageMetaMap>({});
  const [isLoading, setIsLoading] = useState(false);
  const [autoSkip, setAutoSkip] = useState(false);

  // 실시간 상태 검사
  const allComplete =
    Object.values(metaMap).length > 0 &&
    Object.values(metaMap).every(
      (meta) =>
        meta.created_at_state === "default" && meta.location_state === "default"
    );

  const handleNext = async () => {
    const dataMap = cardListRef.current?.getAllMetadata();
    if (!dataMap) return;
    if (!allComplete) {
      alert("모든 시간과 위치를 입력해주세요");
      return;
    }
    setIsLoading(true);

    try {
      await Promise.all(
        Object.entries(dataMap).map(([imageId, data]) =>
          patchImageMetadata(Number(imageId), data)
        )
      );
      const imageIds = confirmedImages.map((img) => img.image_id);
      const orderedIds = await getTimeOrderedImageIds(imageIds);

      const imageMap = new Map(
        confirmedImages.map((img) => [img.image_id, img])
      );
      const sortedImages = orderedIds
        .map((id) => imageMap.get(id))
        .filter((img): img is ConfirmedImage => img !== undefined);
      setConfirmedImages(sortedImages);

      router.push("/qna");
    } catch (err) {
      router.push("/fail?stage=사진 정보 수정");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {autoSkip && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-white">
          <p className="text-xl font-pretendard font-semibold text-center text-black">
            모든 사진의 시간과 장소를 분석했어요!
            <br />
            다음 단계로 이동합니다.
          </p>
        </div>
      )}
      {isLoading && <LoadingOverlay />}

      <Header variation="type" />

      <main className="flex flex-col items-center justify-start mt-[60px] mb-auto gap-[60px] animate-fade-slide-up">
        <TextField
          type="instruction"
          text={`사진의 시간과 장소를 분석했어요!\n빠진 시간과 장소를 확인하고 입력해 주세요.`}
          annotation="none"
        />
        <EXIFCardList
          ref={cardListRef}
          onMetaChange={setMetaMap}
          onAutoSkipTrigger={async () => {
            setAutoSkip(true);

            const imageIds = confirmedImages.map((img) => img.image_id);
            const orderedIds = await getTimeOrderedImageIds(imageIds);
            const imageMap = new Map(
              confirmedImages.map((img) => [img.image_id, img])
            );
            const sortedImages = orderedIds
              .map((id) => imageMap.get(id))
              .filter((img): img is ConfirmedImage => img !== undefined);
            setConfirmedImages(sortedImages);
            setConfirmedImages(sortedImages);
            setTimeout(() => router.push("/qna"), 1500);
          }}
        />
      </main>
      <div className="flex flex-col items-center justify-center my-[60px] animate-fade-slide-up">
        <p className="flex text-sm font-pretendard justify-start text-gray-400">
          입력한 시간과 장소가 여행기 생성의 정확도에 영향을 줍니다.
        </p>
        <CTAButton
          variation={allComplete ? "black" : "disabled"}
          label="다음 단계"
          onClick={handleNext}
        />
      </div>
      <Footer />
    </div>
  );
}
