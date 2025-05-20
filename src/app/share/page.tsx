"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import LogThumbnail from "@/components/common/LogThumbnail";
import CTAButton from "@/components/buttons/CTAButton";
import Footer from "@/components/common/Footer";
import { useTrip } from "@/contexts/tripStore";
import { downloadPdf, getExportUrl } from "@/api/travelogue";

export default function SharePage() {
  const router = useRouter();
  // const { travelogueId, confirmedImages } = useTrip()
  const { confirmedImages } = useTrip();
  const travelogueId = 30;
  
  const firstImageUrl =
    confirmedImages.length > 0
      ? confirmedImages[0].image_url
      : "/images/imageicon.svg";

  const handleSave = async () => {
    if (!travelogueId) return;
    try {
      await downloadPdf(travelogueId);
    } catch (err) {
      router.push("/fail?stage=여행기 저장");
    }
  };

  const handleShare = async () => {
    if (!travelogueId) return;
    try {
      const res = await getExportUrl(travelogueId);
      window.open(res.export_url, "_blank");
    } catch (err) {
      router.push("/fail?stage=여행기 공유");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[url('/images/background.svg')] bg-cover bg-center">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <LogThumbnail imageUrl={firstImageUrl} />
        <div className="flex flex-col gap-4">
          <CTAButton
            variation="default"
            label="저장하기"
            onClick={handleSave}
          />
          <CTAButton
            variation="default"
            label="공유하기"
            onClick={handleShare}
          />
        </div>
        <CTAButton
          variation="black"
          label="처음부터 다시하기"
          onClick={() => router.push("/")}
        />
      </main>

      <Footer />
    </div>
  );
}
