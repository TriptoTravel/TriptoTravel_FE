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

type QnaCardListProps = {
  onChange?: (completed: boolean) => void;
};

// 테스트용 mock 데이터 (172~188)
const testImages = Array.from({ length: 2 }, (_, i) => ({
  image_id: i + 1,
  image_url: '/images/loadingimage.png',
}));

const QnaCardList = forwardRef<QnaCardListHandle, QnaCardListProps>(
  ({ onChange }, ref) => {
    // 원래 context
    const { confirmedImages } = useTrip();

    // 테스트용으로 confirmedImages 대신 testImages 사용
    const images = testImages;
    // const images = confirmedImages;   // 테스트 끝나면 이 줄로 원복

    const [qnaMap, setQnaMap] = useState<
      Record<number, { how: string; emotion: string[] }>
    >({});

    // 초기 상태 설정
    useEffect(() => {
      const initial: Record<number, { how: string; emotion: string[] }> = {};
      images.forEach((img) => {
        initial[img.image_id] = { how: "", emotion: [] };
      });
      setQnaMap(initial);
    }, [images]);

    useEffect(() => {
      if (Object.keys(qnaMap).length === 0) return;
      const completed = images.every(
        (img) =>
          qnaMap[img.image_id]?.how.trim() &&
          qnaMap[img.image_id]?.emotion.length > 0
      );
      onChange?.(completed);
    }, [qnaMap, images, onChange]);

    useImperativeHandle(ref, () => ({
      getQnaData: () =>
        images.map((img) => ({
          image_id: img.image_id,
          how: qnaMap[img.image_id]?.how ?? "",
          emotion: qnaMap[img.image_id]?.emotion ?? [],
        })),
    }));

    const checkCompletion = (map: typeof qnaMap) => {
      const completed = images.every(
        (img) =>
          map[img.image_id]?.how.trim() && map[img.image_id]?.emotion.length > 0
      );
      onChange?.(completed);
    };

    const updateHow = (imageId: number, answer: string) => {
      setQnaMap((prev) => {
        const updated = {
          ...prev,
          [imageId]: {
            ...prev[imageId],
            how: answer,
          },
        };
        checkCompletion(updated);
        return updated;
      });
    };

    const updateEmotion = (imageId: number, emotions: string[]) => {
      setQnaMap((prev) => {
        const updated = {
          ...prev,
          [imageId]: {
            ...prev[imageId],
            emotion: emotions,
          },
        };
        checkCompletion(updated);
        return updated;
      });
    };

    return (
      <div className="flex flex-col items-center gap-[60px]">
        {images.map((img) => (
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
  }
);

export default QnaCardList;
