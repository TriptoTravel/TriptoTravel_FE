"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import DraftCard from "@/components/cards/DraftCard";
import CTAButton from "@/components/buttons/CTAButton";

export default function ResultPage() {
  const router = useRouter();

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
          <DraftCard
            imageUrl="/images/testimage.jpg"
            content="친한 친구들과 함께 다녀왔어요. 일정도 같이 짜고 되게 신났어요."
          />
        </section>
        <CTAButton variation="black" label="다음 단계" onClick={handleNext} />
      </main>

      <Footer />
    </div>
  );
}
