"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CTAButton from "@/components/buttons/CTAButton";

export default function FailPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stage = searchParams.get("stage") ?? "사진 선별";

  const handleNext = async () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <div className="flex flex-col items-center justify-center gap-[20px]">
          <div className="w-[120px] h-[120px] rounded-[14px] bg-zinc-300 flex items-center justify-center shadow-md" />
          <p className="font-pretendard text-[18px] font-semibold">
            {stage}에 실패했습니다.
          </p>
        </div>
        <CTAButton
          variation="black"
          label="처음부터 다시하기"
          onClick={handleNext}
        />
      </main>

      <Footer />
    </div>
  );
}
