"use client";

import { useEffect, useState } from "react";
import { useTrip } from "@/contexts/tripStore";
import { getImagesWithoutMetadata } from "@/api/travelogue";
import type { ImageMetadataItem } from "@/types/travelogueResponse";
import EXIFCard from "@/components/cards/EXIFCard";

export default function EXIFCardList() {
  const { travelogueId } = useTrip();
  const [items, setItems] = useState<ImageMetadataItem[]>([]);

  useEffect(() => {
    if (!travelogueId) return;

    getImagesWithoutMetadata(travelogueId)
      .then((res) => setItems(res.image_metadata_list))
      .catch((err) => {
        console.error("메타데이터 조회 실패", err);
        alert("데이터를 불러오는 데 실패했습니다");
      });
  }, [travelogueId]);

  return (
    <div className="flex flex-col items-center gap-[30px]">
      {items.map((item) => (
        <EXIFCard
          key={item.image_id}
          imageUrl={`https://storage.googleapis.com/trip_to_travel_bucket/${item.image_id}.jpg`}
          timeMeta={{
            value: new Date(item.created_at).toLocaleString(),
            state: "default",
          }}
          locationMeta={{
            value: item.location || "없음",
            state: "default",
          }}
        />
      ))}
    </div>
  );
}
