"use client";

import { useTrip } from "@/contexts/tripStore";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import MultiSelectButton from "@/components/buttons/MultiSelectButton";
import CTAButton from "@/components/buttons/CTAButton";
import type { TripCompanion, TripPurpose } from "@/contexts/types";

const companionOptions: TripCompanion[] = [
  "혼자",
  "친구와",
  "연인과",
  "배우자와",
  "아이와",
  "부모님과",
];

const purposeOptions: TripPurpose[] = ["음식", "자연", "역사", "액티비티"];

export default function InfoPage() {
  const { who, setWho, why, setWhy } = useTrip();
  const router = useRouter();

  const handleWhoClick = (option: TripCompanion) => {
    setWho((prev) => (prev === option ? null : option));
  };

  const handleWhyClick = (option: TripPurpose) => {
    setWhy((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleNext = () => {
    router.push("/upload");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <section className="flex flex-col items-start gap-[30px]">
          <TextField type="question" text="누구와 함께 한 여행인가요?" />
          <div className="flex flex-wrap gap-[10px] max-w-[300px]">
            {companionOptions.map((option) => (
              <MultiSelectButton
                key={option}
                label={option}
                variation={who === option ? "selected" : "default"}
                onClick={() => handleWhoClick(option)}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start gap-[30px]">
          <TextField type="question" text="왜 이 여행을 떠나게 되었나요?" />
          <div className="flex flex-wrap gap-[10px] max-w-[360px]">
            {purposeOptions.map((option) => (
              <MultiSelectButton
                key={option}
                label={option}
                variation={why.includes(option) ? "selected" : "default"}
                onClick={() => handleWhyClick(option)}
              />
            ))}
          </div>
        </section>

        <CTAButton
          variation={who && why.length > 0 ? "black" : "disabled"}
          label="다음 단계"
          onClick={handleNext}
        />
      </main>

      <Footer />
    </div>
  );
}
