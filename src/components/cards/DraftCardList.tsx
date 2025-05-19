"use client";

import DraftCard from "@/components/cards/DraftCard";
import { getImageUrlById } from "@/utils/imageMapping";
import type { ConfirmedImage } from "@/contexts/types";

type DraftItem = {
  image_id: number;
  draft: string;
};

type DraftCardListProps = {
  drafts: DraftItem[];
  confirmedImages: ConfirmedImage[];
  onChange: (imageId: number, newText: string) => void;
};

export default function DraftCardList({
  drafts,
  confirmedImages,
  onChange,
}: DraftCardListProps) {
  return (
    <div className="flex flex-col gap-6 items-center">
      {drafts.map((item) => (
        <DraftCard
          key={item.image_id}
          imageId={item.image_id}
          imageUrl={getImageUrlById(confirmedImages, item.image_id)}
          content={item.draft}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
