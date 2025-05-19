"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/common/Footer";
import CTAButton from "@/components/buttons/CTAButton";
import { useRouter } from "next/navigation";
import { postTravelogue } from "@/api/travelogue";
import { useTrip } from "@/contexts/tripStore";
import LandingAnimation from "@/components/common/LandingAnimation";
import { cn } from "@/utils/cn";

export default function HomePage() {
  const router = useRouter();
  const { setTravelogueId } = useTrip();
  const [showButton, setShowButton] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const backgroundImage = isHovering
    ? "bg-[url('/images/background2.svg')]"
    : "bg-[url('/images/background.svg')]";

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
    <div
      className={cn(
        "min-h-screen flex flex-col justify-between items-center bg-cover bg-center transition-[background-image] duration-700 ease-in-out",
        backgroundImage
      )}
    >
      <main className="flex flex-col items-center justify-center flex-1 gap-[140px] mt-20">
        <LandingAnimation />

        {showButton ? (
          <div
            className="animate-fade-slide-up"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <CTAButton
              variation="black"
              label="나만의 여행기 만들기"
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
