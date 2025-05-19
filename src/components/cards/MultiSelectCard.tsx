"use client";

import React from "react";
import MultiSelectImageItem from "./parts/MultiSelectImageItem";

type MultiSelectCardProps = {
  images: string[];
  selectedIndices: number[];
  onToggle: (index: number) => void;
  skeletonCount?: number;
};

export default function MultiSelectCard({
  images,
  selectedIndices,
  onToggle,
  skeletonCount = 0,
}: MultiSelectCardProps) {
  return (
    <div className="w-[360px] inline-block bg-white rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] mb-[30px] p-5">
      <div className="grid grid-cols-3 gap-[10px] justify-center">
        {Array(skeletonCount)
          .fill(0)
          .map((_, idx) => (
            <MultiSelectImageItem
              key={idx}
              index={idx}
              image={images[idx]}
              isSelected={selectedIndices.includes(idx)}
              onClick={() => onToggle(idx)}
              totalCount={skeletonCount}
            />
          ))}
      </div>
    </div>
  );
}
