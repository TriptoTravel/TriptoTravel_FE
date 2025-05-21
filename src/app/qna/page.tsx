"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import QnaCardList, { QnaCardListHandle } from "@/components/cards/QnaCardList";
import CTAButton from "@/components/buttons/CTAButton";
import GeneratingOverlay from "@/components/common/GeneratingOverlay";
import { EMOTION_MAP } from "@/constants/emotion";
import { postImageQna, patchTravelogueGeneration } from "@/api/travelogue";
import { useTrip } from "@/contexts/tripStore";

export default function QnaPage() {
  const router = useRouter();
  const cardListRef = useRef<QnaCardListHandle>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { travelogueId } = useTrip();
  const [progress, setProgress] = useState(0);

  const handleNext = async () => {
    const qnaData = cardListRef.current?.getQnaData();
    if (!qnaData || !travelogueId) return;

    setIsLoading(true);
    try {
      await Promise.all(
        qnaData.map((item) =>
          postImageQna(item.image_id, {
            how: item.how,
            emotion: item.emotion.map((e) => EMOTION_MAP[e]),
          })
        )
      );
      await patchTravelogueGeneration(travelogueId, (percent) =>
        setProgress(percent)
      );
      router.push("/result");
    } catch (err) {
      router.push("/fail?stage=여행기 생성");
    } finally {
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {isLoading && <GeneratingOverlay progress={progress} />}

      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-start mt-[60px] gap-[60px] animate-fade-slide-up">
        <TextField
          type="instruction"
          text="여행기 생성을 위한 질문에 답변해주세요! 답변은 정확한 여행기 생성에 도움이 됩니다."
        />
        <section className="w-full flex flex-col gap-[30px] items-center">
          <QnaCardList
            ref={cardListRef}
            onChange={(completed) => setIsComplete(completed)}
          />
        </section>
      </main>
      <div className="flex justify-center mb-[60px] animate-fade-slide-up">
        <CTAButton
          variation={isComplete ? "black" : "disabled"}
          label="다음 단계"
          onClick={handleNext}
        />
      </div>
      <Footer />
    </div>
  );
}
