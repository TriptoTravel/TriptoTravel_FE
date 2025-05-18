"use client";

import { useTrip } from "@/contexts/tripStore";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TextField from "@/components/common/TextField";
import MultiSelectButton from "@/components/buttons/MultiSelectButton";
import CTAButton from "@/components/buttons/CTAButton";
import {
  companionOptions,
  purposeOptions,
  TripCompanion,
  TripPurpose,
} from "@/constants/whowhy";

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

  const handleNext = async () => {
    if (!who || why.length === 0) return;
    router.push("/upload");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <div className="animate-fade-slide-up">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
