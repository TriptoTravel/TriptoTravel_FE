"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useTrip } from "@/contexts/tripStore";
import QnaCard from "@/components/cards/QnaCard";

type QnaData = {
  image_id: number;
  how: string;
  emotion: string[];
};

export type QnaCardListHandle = {
  getQnaData: () => QnaData[];
};

const QnaCardList = forwardRef<QnaCardListHandle>((_, ref) => {
  const { confirmedImages } = useTrip();
  const [qnaMap, setQnaMap] = useState<
    Record<number, { how: string; emotion: string[] }>
  >({});

  // 초기 상태 설정
  useEffect(() => {
    const initial: Record<number, { how: string; emotion: string[] }> = {};
    confirmedImages.forEach((img) => {
      initial[img.image_id] = { how: "", emotion: [] };
    });
    setQnaMap(initial);
  }, [confirmedImages]);

  useImperativeHandle(ref, () => ({
    getQnaData: () =>
      confirmedImages.map((img) => ({
        image_id: img.image_id,
        how: qnaMap[img.image_id]?.how ?? "",
        emotion: qnaMap[img.image_id]?.emotion ?? [],
      })),
  }));

  const updateHow = (imageId: number, answer: string) => {
    setQnaMap((prev) => ({
      ...prev,
      [imageId]: {
        ...prev[imageId],
        how: answer,
      },
    }));
  };

  const updateEmotion = (imageId: number, emotions: string[]) => {
    setQnaMap((prev) => ({
      ...prev,
      [imageId]: {
        ...prev[imageId],
        emotion: emotions,
      },
    }));
  };

  return (
    <div className="flex flex-col items-center gap-[60px]">
      {confirmedImages.map((img) => (
        <QnaCard
          key={img.image_id}
          imageUrl={img.image_url}
          howAnswer={qnaMap[img.image_id]?.how ?? ""}
          onSaveHow={(answer) => updateHow(img.image_id, answer)}
          emotionAnswer={qnaMap[img.image_id]?.emotion ?? []}
          onSaveEmotion={(emotions) => updateEmotion(img.image_id, emotions)}
        />
      ))}
    </div>
  );
});

export default QnaCardList;
