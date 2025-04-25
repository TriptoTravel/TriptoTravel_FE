"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import SingleSelectButton from "@/components/buttons/SingleSelectButton";
import CTAButton from "@/components/buttons/CTAButton";

export default function NumPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const options = ["1 ~ 5", "6 ~ 10", "11 ~ 15", "16 ~ 20"];

  const handleNext = () => {
    router.push("/sort");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px]">
        <TextField
          type="question"
          text="여행기를 몇 장의 사진으로 구성할까요?"
        />

        <div className="flex gap-2 w-full items-start mt-[60px] mb-[314px]">
          {options.map((option) => (
            <SingleSelectButton
              key={option}
              label={option}
              isSelected={selected === option}
              onClick={() => setSelected(option === selected ? null : option)}
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
