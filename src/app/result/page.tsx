"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import DraftCardList from "@/components/cards/DraftCardList";
import CTAButton from "@/components/buttons/CTAButton";
import { getDraftList, patchImageCorrection } from "@/api/travelogue";
import { useTrip } from "@/contexts/tripStore";
import type { ConfirmedImage, FinalLogue } from "@/contexts/types";
import LoadingOverlay from "@/components/common/LoadingOverlay";

type DraftItem = {
  image_id: number;
  draft: string;
};

export default function ResultPage() {
  const router = useRouter();
  const { travelogueId, confirmedImages, setFinalLogue } = useTrip();
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (!travelogueId) return;
      try {
        const res = await getDraftList(travelogueId);
        setDrafts(res.draft_list);
      } catch (err) {
        router.push("/fail?stage=여행기 초안 조회");
      }
    };

    fetchDrafts();
  }, [travelogueId]);

  const handleDraftChange = (imageId: number, newDraft: string) => {
    setDrafts((prev) =>
      prev.map((item) =>
        item.image_id === imageId ? { ...item, draft: newDraft } : item
      )
    );
  };

  const handleSaveAll = async () => {
    setIsLoading(true);
    try {
      await Promise.all(
        drafts.map((item) => patchImageCorrection(item.image_id, item.draft))
      );
      const finalLogue: FinalLogue = drafts.map((item) => ({
        image_id: item.image_id,
        image_logue: item.draft,
      }));
      setFinalLogue(finalLogue);
      router.push("/share");
    } catch (err) {
      router.push("/fail?stage=여행기 최종본 저장");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {isLoading && <LoadingOverlay />}

      <Header variation="type" />

      <main className="flex flex-col items-center justify-start mt-[60px] mb-auto gap-[60px] animate-fade-slide-up">
        <TextField
          type="instruction"
          text={`여행기 생성이 완료되었습니다!\n내용을 확인하고 자유롭게 수정하세요.`}
          annotation="none"
        />
        <section className="w-full flex flex-col gap-[30px] items-center">
          <DraftCardList
            drafts={drafts}
            confirmedImages={confirmedImages as ConfirmedImage[]}
            onChange={handleDraftChange}
          />
        </section>
      </main>
      <div className="flex justify-center mb-[60px] animate-fade-slide-up">
        <CTAButton variation="black" label="저장하기" onClick={handleSaveAll} />
      </div>
      <Footer />
    </div>
  );
}
