"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import QnaHowCard from "@/components/cards/QnaHowCard";
import { qnaHowCardMock } from "@/test/QnaHowCardMock";
import QnaEmotionCard from "@/components/cards/QnaEmotionCard";
import CTAButton from "@/components/buttons/CTAButton";

export default function QnaPage() {
  const router = useRouter();
  const [answer, setAnswer] = useState<string>(qnaHowCardMock.answer);

  const handleNext = () => {
    router.push("/result");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <TextField
          type="instruction"
          text="여행기 생성을 위한 질문에 답변해주세요! 답변은 정확한 여행기 생성에 도움이 됩니다."
        />
        <section className="w-full flex flex-col gap-[30px] items-center">
          <QnaHowCard
            imageUrl={qnaHowCardMock.imageUrl}
            question={qnaHowCardMock.question}
            answer={answer}
            onSave={(newAnswer) => {
              setAnswer(newAnswer);
              qnaHowCardMock.onSave(newAnswer);
            }}
          />
          <QnaEmotionCard imageUrl="/images/testimage.jpg" />
        </section>
        <CTAButton variation="black" label="다음 단계" onClick={handleNext} />
      </main>

      <Footer />
    </div>
  );
}
