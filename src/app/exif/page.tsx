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
import { patchImageMetadata } from "@/api/travelogue";

export default function EXIFPage() {
  const router = useRouter();
  const cardListRef = useRef<EXIFCardListHandle>(null);
  const [metaMap, setMetaMap] = useState<ImageMetaMap>({});

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

    try {
      await Promise.all(
        Object.entries(dataMap).map(([imageId, data]) =>
          patchImageMetadata(Number(imageId), data)
        )
      );
      router.push("/qna");
    } catch (err) {
      console.error("메타데이터 수정 실패", err);
      alert("사진 정보를 수정하는 데 실패했습니다");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <TextField
          type="instruction"
          text="사진이 찍힌 시간과 장소를 분석했어요! 비어 있는 시간과 장소를 추가해 주세요"
        />
        <EXIFCardList ref={cardListRef} onMetaChange={setMetaMap} />
        <CTAButton
          variation={allComplete ? "black" : "disabled"}
          label="다음 단계"
          onClick={handleNext}
        />
      </main>

      <Footer />
    </div>
  );
}
