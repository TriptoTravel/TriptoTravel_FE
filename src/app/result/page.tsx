"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import DraftCardList from "@/components/cards/DraftCardList";
import CTAButton from "@/components/buttons/CTAButton";
import { useTrip } from "@/contexts/tripStore";
import { getDraftList } from "@/api/travelogue";

type DraftItem = {
  image_id: number;
  draft: string;
};

export default function ResultPage() {
  const router = useRouter();
  const { travelogueId } = useTrip();
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
  const handleNext = () => {
    router.push("/result");
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
          <DraftCardList drafts={drafts} />
        </section>
        <CTAButton variation="black" label="다음 단계" onClick={handleNext} />
      </main>

      <Footer />
    </div>
  );
}
