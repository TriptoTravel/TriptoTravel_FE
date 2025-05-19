"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import LogThumbnail from "@/components/common/LogThumbnail";
import CTAButton from "@/components/buttons/CTAButton";
import Footer from "@/components/common/Footer";
import { useTrip } from "@/contexts/tripStore";
import { getExportUrl } from "@/api/travelogue";

export default function SharePage() {
  const router = useRouter();
  // 원래
  // const { travelogueId } = useTrip();

  // 테스트용으로 임시 고정
  const travelogueId = 30;
  const { confirmedImages } = useTrip();
  const firstImageUrl = confirmedImages.length > 0 ? confirmedImages[0].image_url : "/images/loadingImage.png";

  const handleSave = async () => {
    if (!travelogueId) return;
    try {
      const res = await getExportUrl(travelogueId);
      window.open(res.file_path, "_blank"); // 저장하기: file_path 새 창
    } catch (err) {
      console.error("여행기 저장 실패", err);
      alert("여행기 저장에 실패했습니다");
    }
  };

  const handleShare = async () => {
    if (!travelogueId) return;
    try {
      const res = await getExportUrl(travelogueId);
      window.open(res.export_url, "_blank"); // 공유하기: export_url 새 창
    } catch (err) {
      console.error("여행기 공유 실패", err);
      alert("여행기 공유에 실패했습니다");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
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
