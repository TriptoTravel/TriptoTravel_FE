"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/common/Footer";
import CTAButton from "@/components/buttons/CTAButton";
import { useRouter } from "next/navigation";
import { postTravelogue } from "@/api/travelogue";
import { useTrip } from "@/contexts/tripStore";
import LandingAnimation from "@/components/common/LandingAnimation";

export default function HomePage() {
  const router = useRouter();
  const { setTravelogueId } = useTrip();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = async () => {
    try {
      const response = await postTravelogue();
      setTravelogueId(response.id);
      router.push("/style");
    } catch (error) {
      router.push("/fail?stage=여행기 생성");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[url('/images/background.svg')] bg-cover bg-center">
      <main className="flex flex-col items-center justify-center flex-1 gap-[140px] mt-20">
        <LandingAnimation />

        {showButton ? (
          <div className="animate-fade-slide-up">
            <CTAButton
              variation="black"
              label="여행기 만들기"
              onClick={handleStart}
            />
          </div>
        ) : (
          <div className="h-14 w-20" />
        )}
      </main>
      <Footer />
    </div>
  );
}
