"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTrip } from "@/contexts/tripStore";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import SingleSelectButton from "@/components/buttons/SingleSelectButton";
import CTAButton from "@/components/buttons/CTAButton";
import { patchImageSelectionFirst } from "@/api/travelogue";
import LoadingOverlay from "@/components/common/LoadingOverlay";

const numOptions = [5, 10, 15, 20];

export default function NumPage() {
  const router = useRouter();
  const { travelogueId, photoCount, setPhotoCount } = useTrip();
  const [selected, setSelected] = useState<number | null>(photoCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (selected === null || !travelogueId) return;

    setIsLoading(true);
    try {
      setPhotoCount(selected);
      await patchImageSelectionFirst(travelogueId, {
        image_num: selected,
      });
      router.push("/sort");
    } catch (err) {
      alert("사진 1차 선별에 실패했습니다");
      router.push("/fail");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white">
      {isLoading && <LoadingOverlay />}
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px]">
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
              onClick={() => setSelected((prev) => (prev === num ? null : num))}
            />
          ))}
        </div>

        <CTAButton
          variation={selected ? "black" : "disabled"}
          label="다음 단계"
          onClick={handleNext}
        />
      </main>
      <Footer />
    </div>
  );
}
