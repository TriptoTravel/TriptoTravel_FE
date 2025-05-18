"use client";

import React from "react";
import { cn } from "@/utils/cn";

type MultiSelectCardProps = {
  images: string[];
  selectedIndices: number[];
  onToggle: (index: number) => void;
};

export default function MultiSelectCard({ images, selectedIndices, onToggle }: MultiSelectCardProps) {

  const getRadiusClass = (index: number) => {
    const rowCount = Math.ceil(images.length / 3);
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
    <div className="w-[360px] inline-block bg-white rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] mb-[30px] p-5">
      <div className="grid grid-cols-3 gap-[10px] justify-center">
        {images.map((src, idx) => {
          const isSelected = selectedIndices.includes(idx);
          return (
            <div
              key={idx}
              className={cn(
                'w-[100px] h-[100px] overflow-hidden',
                getRadiusClass(idx),
                isSelected && 'border border-black shadow-sm'
              )}
              onClick={() => onToggle(idx)}
            >
              <img
                src={src}
                alt={`photo-${idx}`}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
