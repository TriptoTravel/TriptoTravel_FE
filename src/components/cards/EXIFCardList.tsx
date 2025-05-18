"use client";

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useTrip } from "@/contexts/tripStore";
import { getImagesWithoutMetadata } from "@/api/travelogue";
import type { ImageMetadataItem } from "@/types/travelogueResponse";
import EXIFCard from "@/components/cards/EXIFCard";
import { formatDateKorean } from "@/utils/dateFormatter";

export type ImageMetaMap = {
  [image_id: number]: {
    created_at: string;
    location: string;
    created_at_state: "default" | "error" | "edit";
    location_state: "default" | "error" | "edit";
  };
};

export type EXIFCardListHandle = {
  getAllMetadata: () => {
    [image_id: number]: { created_at: string; location: string };
  };
};

type EXIFCardListProps = {
  onMetaChange: (metaMap: ImageMetaMap) => void;
};

const EXIFCardList = forwardRef<EXIFCardListHandle, EXIFCardListProps>(
  ({ onMetaChange }, ref) => {
    const { travelogueId, confirmedImages } = useTrip();
    const [items, setItems] = useState<ImageMetadataItem[]>([]);
    const [metaMap, setMetaMap] = useState<ImageMetaMap>({});

    useImperativeHandle(ref, () => ({
      getAllMetadata: () => {
        const result: {
          [image_id: number]: { created_at: string; location: string };
        } = {};
        Object.entries(metaMap).forEach(([id, meta]) => {
          result[Number(id)] = {
            created_at: meta.created_at,
            location: meta.location,
          };
        });
        return result;
      },
    }));

    useEffect(() => {
      onMetaChange(metaMap); // metaMap 바뀔 때마다 부모에게 전달
    }, [metaMap, onMetaChange]);

    useEffect(() => {
      if (!travelogueId) return;
      getImagesWithoutMetadata(travelogueId)
        .then((res) => {
          setItems(res.image_metadata_list);
          const initialMap: ImageMetaMap = {};
          res.image_metadata_list.forEach((item) => {
            initialMap[item.image_id] = {
              created_at: item.created_at ?? "",
              location: item.location ?? "",
              created_at_state: item.created_at ? "default" : "error",
              location_state: item.location ? "default" : "error",
            };
          });
          setMetaMap(initialMap);
        })
        .catch((err) => {
          console.error("메타데이터 조회 실패", err);
          alert("데이터를 불러오는 데 실패했습니다");
        });
    }, [travelogueId]);

    const handleEdit = (imageId: number, field: "created_at" | "location") => {
      setMetaMap((prev) => ({
        ...prev,
        [imageId]: {
          ...prev[imageId],
          [`${field}_state`]: "edit",
        },
      }));
    };

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
          [`${field}_state`]: value ? "default" : "error",
        },
      }));
    };

    return (
      <div className="flex flex-col items-center gap-[30px]">
        {items.map((item) => {
          const meta = metaMap[item.image_id];
          const matched = confirmedImages.find(
            (img) => img.image_id === item.image_id
          );

          const imageUrl = matched
            ? matched.image_url
            : "/images/loadingimage.png";

          return (
            <EXIFCard
              key={item.image_id}
              imageUrl={imageUrl}
              timeMeta={{
                value: formatDateKorean(meta?.created_at ?? ""),
                state: meta?.created_at_state ?? "error",
                onEdit: () => handleEdit(item.image_id, "created_at"),
                onSave: (value) =>
                  handleUpdate(item.image_id, "created_at", value),
              }}
              locationMeta={{
                value: meta?.location ?? "",
                state: meta?.location_state ?? "error",
                onEdit: () => handleEdit(item.image_id, "location"),
                onSave: (value) =>
                  handleUpdate(item.image_id, "location", value),
              }}
            />
          );
        })}
      </div>
    );
  }
);

export default EXIFCardList;
