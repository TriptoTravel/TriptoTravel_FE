"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import LogThumbnail from "@/components/common/LogThumbnail";
import CTAButton from "@/components/buttons/CTAButton";
import Footer from "@/components/common/Footer";
import { useTrip } from "@/contexts/tripStore";
import { downloadPdf, getShareUrl } from "@/api/travelogue";
import { cn } from "@/utils/cn";
import LoadingOverlay from "@/components/common/LoadingOverlay";

export default function SharePage() {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  const { travelogueId, confirmedImages } = useTrip();
  const [isLoading, setIsLoading] = useState(false);

  const backgroundImage = isHovering
    ? "bg-[url('/images/background2.svg')]"
    : "bg-[url('/images/background.svg')]";

  const firstImageUrl =
    confirmedImages.length > 0
      ? confirmedImages[0].image_url
      : "/images/imageicon.svg";

  const handleSave = async () => {
    if (!travelogueId) return;
    setIsLoading(true);
    try {
      await downloadPdf(travelogueId);
    } catch (err) {
      router.push("/fail?stage=여행기 저장");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!travelogueId) return;
    setIsLoading(true);
    try {
      const res = await getShareUrl(travelogueId);
      const shareUrl = res.share_url;

      if (navigator.share) {
        await navigator.share({
          title: "내 여행기",
          text: "Trip to Travel에서 만든 내 여행기를 확인해보세요",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("링크가 복사되었습니다");
      }
    } catch (err) {
      router.push("/fail?stage=여행기 공유");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col justify-between items-center bg-cover bg-center transition-[background-image] duration-700 ease-in-out",
        backgroundImage
      )}
    >
      <Header variation="type-back" />
      {isLoading && <LoadingOverlay />}

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => router.push("/logue")}
          className="cursor-pointer"
        >
          <LogThumbnail imageUrl={firstImageUrl} />
        </div>
        <div className="flex flex-col gap-4">
          <CTAButton
            variation="default"
            label="PDF로 저장하기"
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
          label="여행기 다시 만들기"
          onClick={() => router.push("/")}
        />
      </main>
      <Footer />
    </div>
  );
}
