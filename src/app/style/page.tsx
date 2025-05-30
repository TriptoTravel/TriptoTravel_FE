"use client";

import { useTrip } from "@/contexts/tripStore";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import StyleCard from "@/components/cards/StyleCard";
import SingleSelectButton from "@/components/buttons/SingleSelectButton";
import CTAButton from "@/components/buttons/CTAButton";
import type { TripStyle } from "@/contexts/types";

const styleOptions: Exclude<TripStyle, "default">[] = [
  "정보형",
  "요약형",
  "감성형",
];

export default function StylePage() {
  const { travelogueId, style, setStyle } = useTrip();
  const router = useRouter();
  console.log(travelogueId);
  const handleSelect = (option: TripStyle) => {
    setStyle(style === option ? "default" : option);
  };

  const handleNext = async () => {
    if (style === "default") return;
    router.push("/info");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header variation="type" />

      <main className="flex flex-col items-center justify-center mt-[60px] mb-auto animate-fade-slide-up">
        <TextField
          type="question"
          text="여행기의 문장 스타일을 선택해주세요."
          annotation="none"
        />
        <div className="flex flex-col items-center justify-center mt-[30px] mb-[60px] gap-[30px]">
          <StyleCard style={style ?? "default"} />
          <div className="flex w-full justify-start gap-[10px]">
            {styleOptions.map((option) => (
              <SingleSelectButton
                key={option}
                label={option}
                isSelected={style === option}
                onClick={() => handleSelect(option)}
              />
            ))}
          </div>
        </div>
      </main>
      <div className="flex flex-col items-center justify-center mb-[60px] animate-fade-slide-up">
        <p className="flex text-sm font-pretendard justify-start text-gray-400">
          선택한 항목은 AI 여행기 생성에 반영됩니다.
        </p>
        <CTAButton
          variation={style !== "default" ? "black" : "disabled"}
          label="다음 단계"
          onClick={handleNext}
        />
      </div>
      <Footer />
    </div>
  );
}
