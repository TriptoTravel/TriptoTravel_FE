"use client";

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useTrip } from "@/contexts/tripStore";
import { getImagesWithoutMetadata } from "@/api/travelogue";
import type { ImageMetadataItem } from "@/types/travelogueResponse";
import EXIFCard from "@/components/cards/EXIFCard";

export type ImageMetaMap = {
  [image_id: number]: {
    created_at: string;
    location: string;
  };
};

export type EXIFCardListHandle = {
  getAllMetadata: () => ImageMetaMap;
};

const EXIFCardList = forwardRef<EXIFCardListHandle>((_, ref) => {
  const { travelogueId } = useTrip();
  const [items, setItems] = useState<ImageMetadataItem[]>([]);
  const [metaMap, setMetaMap] = useState<ImageMetaMap>({});

  useImperativeHandle(ref, () => ({
    getAllMetadata: () => metaMap,
  }));

  useEffect(() => {
    if (!travelogueId) return;
    getImagesWithoutMetadata(travelogueId)
      .then((res) => {
        setItems(res.image_metadata_list);
        const initialMap: ImageMetaMap = {};
        res.image_metadata_list.forEach((item) => {
          initialMap[item.image_id] = {
            created_at: item.created_at,
            location: item.location || "",
          };
        });
        setMetaMap(initialMap);
      })
      .catch((err) => {
        console.error("메타데이터 조회 실패", err);
        alert("데이터를 불러오는 데 실패했습니다");
      });
  }, [travelogueId]);

  const handleUpdate = (
    imageId: number,
    field: "created_at" | "location",
    value: string
  ) => {
    setMetaMap((prev) => ({
      ...prev,
      [imageId]: {
        ...prev[imageId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col items-center gap-[30px]">
      {items.map((item) => (
        <EXIFCard
          key={item.image_id}
          imageUrl={`https://storage.googleapis.com/trip_to_travel_bucket/${item.image_id}.jpg`}
          timeMeta={{
            value: metaMap[item.image_id]?.created_at || "",
            state: "edit",
            onSave: (value) => handleUpdate(item.image_id, "created_at", value),
          }}
          locationMeta={{
            value: metaMap[item.image_id]?.location || "",
            state: "edit",
            onSave: (value) => handleUpdate(item.image_id, "location", value),
          }}
        />
      ))}
    </div>
  );
});

export default EXIFCardList;
