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
import { updateTravelogueStyle } from "@/api/travelogue";

const styleOptions: Exclude<TripStyle, "default">[] = [
  "정보형",
  "요약형",
  "감성형",
];

const styleIndexMap: Record<Exclude<TripStyle, "default">, number> = {
  정보형: 1,
  요약형: 2,
  감성형: 3,
};

export default function StylePage() {
  const { style, setStyle, travelogueId } = useTrip();
  const router = useRouter();

  const handleSelect = (option: TripStyle) => {
    setStyle(style === option ? "default" : option);
  };

  const handleNext = async () => {
    if (style === "default" || !travelogueId) return;

    try {
      await updateTravelogueStyle(travelogueId, styleIndexMap[style]);
      router.push("/info");
    } catch (err) {
      console.error("여행기 스타일 업데이트 실패:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px]">
        <TextField
          type="question"
          text="선호하는 여행기 문체를 선택해주세요."
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

        <CTAButton
          variation={style !== "default" ? "black" : "disabled"}
          label="다음 단계"
          onClick={handleNext}
        />
      </main>

      <Footer />
    </div>
  );
}
