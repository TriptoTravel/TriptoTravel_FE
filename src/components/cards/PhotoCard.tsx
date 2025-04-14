import React from "react";
import { cn } from "@/utils/cn";

type PhotoCardProps = {
  num: number;
};

export default function PhotoCard({ num }: PhotoCardProps) {
  const photos = Array.from({ length: num });

  const getRadiusClass = (index: number) => {
    const rowCount = Math.ceil(num / 3);
    const row = Math.floor(index / 3);
    const col = index % 3;

    const isTop = row === 0;
    const isBottom = row === rowCount - 1;
    const isLeft = col === 0;
    const isRight = col === 2;

    return cn(
      isTop && isLeft && "rounded-tl-[20px]",
      isTop && isRight && "rounded-tr-[20px]",
      isBottom && isLeft && "rounded-bl-[20px]",
      isBottom && isRight && "rounded-br-[20px]"
    );
  };

  return (
    <div className="inline-block bg-white rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] p-5">
      <div className="grid grid-cols-3 gap-[10px] justify-center">
        {photos.map((_, idx) => (
          <div
            key={idx}
            className={cn("w-24 h-24 bg-zinc-300", getRadiusClass(idx))}
          />
        ))}
      </div>
    </div>
  );
}
