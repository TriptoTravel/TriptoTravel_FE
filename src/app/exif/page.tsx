"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import EXIFCardTest from "@/test/EXIFCardTest";
import CTAButton from "@/components/buttons/CTAButton";

export default function EXIFPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/qna");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <TextField
          type="instruction"
          text="사진이 찍힌 시간과 장소를 분석했어요! 비어 있는 시간과 장소를 추가해 주세요"
        />
        <EXIFCardTest />
        <CTAButton variation="black" label="다음 단계" onClick={handleNext} />
      </main>

      <Footer />
    </div>
  );
}
