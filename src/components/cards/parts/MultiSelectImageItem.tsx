"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";

type MultiSelectImageItemProps = {
  index: number;
  image?: string;
  isSelected: boolean;
  onClick: () => void;
  totalCount: number;
};

export default function MultiSelectImageItem({
  index,
  image,
  isSelected,
  onClick,
  totalCount,
}: MultiSelectImageItemProps) {
  const [loaded, setLoaded] = useState(false);

  // radius 계산
  const rowCount = Math.ceil(totalCount / 3);
  const row = Math.floor(index / 3);
  const col = index % 3;

  const isTop = row === 0;
  const isBottom = row === rowCount - 1;
  const isLeft = col === 0;
  const isRight = col === 2;

  const radiusClass = cn(
    isTop && isLeft && "rounded-tl-[20px]",
    isTop && isRight && "rounded-tr-[20px]",
    isBottom && isLeft && "rounded-bl-[20px]",
    isBottom && isRight && "rounded-br-[20px]"
  );

  return (
    <div
      className={cn(
        "relative w-[100px] h-[100px] overflow-hidden",
        radiusClass,
        isSelected && "border border-black brightness-200 shadow-lg"
      )}
      onClick={() => image && onClick()}
    >
      {/* 스켈레톤 */}
      <img
        src="/images/skeleton.svg"
        alt="skeleton"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 실제 이미지 */}
      {image && (
        <img
          src={image}
          alt={`photo-${index}`}
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover brightness-50 cursor-pointer transition-opacity duration-500 z-10",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
