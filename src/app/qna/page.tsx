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
    setProgress(0);

    try {
      // 1. 감정/상황 업로드: progress 0~70%
      const total = qnaData.length;
      let completed = 0;

      for (const item of qnaData) {
        await postImageQna(item.image_id, {
          how: item.how,
          emotion: item.emotion.map((e) => EMOTION_MAP[e]),
        });
        completed++;
        const percent = Math.floor((completed / total) * 70); // 0~70%
        setProgress(percent);
      }

      // 2. 여행기 생성 요청 (남은 30%는 fake progress)
      setProgress(75);
      let fake = 75;
      const interval = setInterval(() => {
        fake += 2;
        setProgress(Math.min(fake, 99));
      }, 300);

      await patchTravelogueGeneration(travelogueId);
      clearInterval(interval);
      setProgress(100);

      router.push("/result");
    } catch (err) {
      router.push("/fail?stage=여행기 생성");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {isLoading && <GeneratingOverlay progress={progress} />}

      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-start mt-[60px] mb-auto gap-[60px] animate-fade-slide-up">
        <TextField
          type="instruction"
          text={`여행의 분위기와 감정을 더 잘 담기 위해\n추가 질문에 답해주세요!`}
          annotation="none"
        />
        <section className="w-full flex flex-col gap-[30px] mb-[60px] items-center">
          <QnaCardList
            ref={cardListRef}
            onChange={(completed) => setIsComplete(completed)}
          />
        </section>
      </main>
      <div className="flex flex-col items-center justify-center mb-[60px] animate-fade-slide-up">
        <p className="flex text-sm font-pretendard justify-start text-gray-400">
          입력한 답변은 여행기 생성의 정확도에 영향을 줍니다.
        </p>
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
