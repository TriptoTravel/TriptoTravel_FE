"use client";

import DraftCard from "@/components/cards/DraftCard";
import { getImageUrlById } from "@/utils/imageMapping";
import { useTrip } from "@/contexts/tripStore";

type DraftItem = {
  image_id: number;
  draft: string;
};

type DraftCardListProps = {
  drafts: DraftItem[];
};

export default function DraftCardList({ drafts }: DraftCardListProps) {
  const { confirmedImages } = useTrip();
  return (
    <div className="flex flex-col gap-6 items-center">
      {drafts.map((item) => {
        const imageUrl = getImageUrlById(confirmedImages, item.image_id);

        return (
          <DraftCard
            key={item.image_id}
            imageUrl={imageUrl ?? ""}
            content={item.draft}
          />
        );
      })}
    </div>
  );
}
