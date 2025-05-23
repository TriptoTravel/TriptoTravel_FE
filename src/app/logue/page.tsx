"use client";

import { useTrip } from "@/contexts/tripStore";
import Header from "@/components/common/Header";
import LogResultCard from "@/components/cards/LogResultCard";
import Footer from "@/components/common/Footer";
import ScrollToTopButton from "@/components/buttons/ScrollToTopButton";

export default function LoguePage() {
  const { confirmedImages, finalLogue } = useTrip();

  const cards = confirmedImages.map((img) => {
    const draft = finalLogue.find((d) => d.image_id === img.image_id);

    return {
      photoCardProps: {
        imageUrl: img.image_url,
      },
      textCardProps: {
        content: draft ? draft.image_logue : "",
      },
      key: img.image_id,
    };
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="combine-back" />
      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        {cards.map((card) => (
          <LogResultCard
            key={card.key}
            photoCardProps={card.photoCardProps}
            textCardProps={card.textCardProps}
          />
        ))}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
