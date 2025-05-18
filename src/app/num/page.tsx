"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTrip } from "@/contexts/tripStore";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import SingleSelectButton from "@/components/buttons/SingleSelectButton";
import CTAButton from "@/components/buttons/CTAButton";
import {
  patchTravelogueStyle,
  postWhoWhy,
  patchImageSelectionFirst,
} from "@/api/travelogue";
import SortingOverlay from "@/components/common/SortingOverlay";
import type { TripStyle } from "@/contexts/types";
import { companionMap, purposeMap } from "@/constants/whowhy";

const numOptions = [5, 10, 15, 20];

const styleIndexMap: Record<Exclude<TripStyle, "default">, number> = {
  감성형: 3,
  정보형: 1,
  요약형: 2,
};

export default function NumPage() {
  const router = useRouter();
  const { travelogueId, style, who, why, photoCount, setPhotoCount } =
    useTrip();
  const [selected, setSelected] = useState<number | null>(photoCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (
      selected === null ||
      !travelogueId ||
      style === "default" ||
      !who ||
      why.length === 0
    )
      return;
    setIsLoading(true);
    try {
      try {
        await patchTravelogueStyle(travelogueId, styleIndexMap[style]);
      } catch (err) {
        router.push("/fail?stage=문체 선택 전송");
        return;
      }

      try {
        const body = {
          who_category: [companionMap[who]],
          purpose_category: why.map((p) => purposeMap[p]),
        };
        await postWhoWhy(travelogueId, body);
      } catch (err) {
        router.push("/fail?stage=여행 정보 전송");
        return;
      }

      try {
        setPhotoCount(selected);
        await patchImageSelectionFirst(travelogueId, selected + 4);
      } catch (err) {
        router.push("/fail?stage=사진 개수 선택 전송");
        return;
      }

      router.push("/sort");
    } catch (err) {
      router.push("/fail?stage=사진 선별");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white">
      {isLoading && <SortingOverlay />}
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px]">
        <div className="animate-fade-slide-up">
          <TextField
            type="question"
            text="여행기를 몇 장의 사진으로 구성할까요?"
          />

          <div className="flex gap-2 w-full items-start mt-[60px] mb-[314px]">
            {numOptions.map((num) => (
              <SingleSelectButton
                key={num}
                label={`${num - 4} ~ ${num}`}
                isSelected={selected === num}
                onClick={() =>
                  setSelected((prev) => (prev === num ? null : num))
                }
              />
            ))}
          </div>

          <CTAButton
            variation={selected ? "black" : "disabled"}
            label="다음 단계"
            onClick={handleNext}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
