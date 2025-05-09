"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import QnaCardList, { QnaCardListHandle } from "@/components/cards/QnaCardList";
import CTAButton from "@/components/buttons/CTAButton";

export default function QnaPage() {
  const router = useRouter();
  const cardListRef = useRef<QnaCardListHandle>(null);

  const handleNext = () => {
    const qnaData = cardListRef.current?.getQnaData();
    console.log("QnA 결과:", qnaData); // TODO: POST로 전송 예정
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
          <QnaCardList ref={cardListRef} />
        </section>
        <CTAButton variation="black" label="다음 단계" onClick={handleNext} />
      </main>

      <Footer />
    </div>
  );
}
