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
      <Header variation="type" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <div className="flex flex-col items-center justify-center gap-[20px]">
          <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
            <video
              key="failimage"
              src="/images/failimage.webm"
              autoPlay
              muted
              playsInline
              loop
              className="w-full h-full object-contain"
            />
          </div>
          <p className="font-pretendard text-[18px] font-semibold">
            {stage}에 실패했습니다!
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
