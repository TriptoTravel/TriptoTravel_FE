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
import type { ConfirmedImage } from "@/contexts/types";

type DraftItem = {
  image_id: number;
  draft: string;
};

export default function ResultPage() {
  const router = useRouter();
  // 원래
  // const { travelogueId } = useTrip();

  // 테스트용으로 임시 고정
  const travelogueId = 30;
  const { confirmedImages } = useTrip();
  const [drafts, setDrafts] = useState<DraftItem[]>([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (!travelogueId) return;
      try {
        const res = await getDraftList(travelogueId);
        setDrafts(res.draft_list);
      } catch (err) {
        console.error("초안 불러오기 실패", err);
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
    try {
      await Promise.all(
        drafts.map((item) => patchImageCorrection(item.image_id, item.draft))
      );
      alert("모든 여행기 초안이 저장되었습니다");
      router.push("/share");
    } catch (err) {
      console.error("전체 저장 실패", err);
      alert("저장에 실패했습니다");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <TextField
          type="instruction"
          text="여행기 생성이 완료되었습니다! 내용을 확인하고 자유롭게 수정하세요."
        />
        <section className="w-full flex flex-col gap-[30px] items-center">
          <DraftCardList
            drafts={drafts}
            confirmedImages={confirmedImages as ConfirmedImage[]}
            onChange={handleDraftChange}
          />
        </section>
        <CTAButton variation="black" label="다음 단계" onClick={handleSaveAll} />
      </main>

      <Footer />
    </div>
  );
}
