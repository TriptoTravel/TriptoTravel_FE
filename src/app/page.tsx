"use client";

import Footer from "@/components/common/Footer";
import CTAButton from "@/components/buttons/CTAButton";
import { useRouter } from "next/navigation";
import { postTravelogue } from "@/api/travelogue";
import { useTrip } from "@/contexts/tripStore";
import LandingAnimation from "@/components/common/LandingAnimation";

export default function HomePage() {
  const router = useRouter();
  const { setTravelogueId } = useTrip();

  const handleStart = async () => {
    try {
      const response = await postTravelogue();
      setTravelogueId(response.id);
      router.push("/style");
    } catch (error) {
      alert("여행기 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[url('/images/background.svg')] bg-cover bg-center">
      <main className="flex flex-col items-center justify-center flex-1 gap-[140px] mt-20">
        <LandingAnimation />
        <CTAButton
          variation="black"
          label="여행기 만들기"
          onClick={handleStart}
        />
      </main>
      <Footer />
    </div>
  );
}
