"use client";

import { useState } from "react";
import ImageModal from "./parts/ImageModal";

type DraftCardProps = {
  imageId: number;
  imageUrl: string;
  content: string;
  onChange: (imageId: number, newText: string) => void;
};

export default function DraftCard({
  imageId,
  imageUrl,
  content,
  onChange,
}: DraftCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    onChange(imageId, text); // 저장 시에만 부모로 전달
    setIsEditing(false);
  };

  return (
    <div className="w-[360px] bg-white rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] p-5 flex flex-col gap-4 items-start">
      {/* 이미지 */}
      <div
        className="w-[320px] h-[160px] bg-zinc-300 rounded-[20px] overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={imageUrl}
          alt="photo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 or 인풋 */}
      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 text-sm font-medium font-pretendard text-black rounded-[20px] border border-gray-300 resize-none"
        />
      ) : (
        <p className="text-base font-medium font-pretendard text-black leading-relaxed">
          {text}
        </p>
      )}

      {/* 버튼 */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            if (isEditing) {
              // 저장 시
              handleSave(); // ✅ 저장 시에만 부모로 전달
            } else {
              // 수정 시작
              setIsEditing(true);
            }
          }}
          className={`h-7 px-4 rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] text-sm font-semibold font-pretendard leading-[9.6px] ${
            isEditing ? "bg-blue-600 text-white" : "bg-white text-blue-600"
          }`}
        >
          {isEditing ? "저장" : "수정"}
        </button>
      </div>

      {/* 이미지 모달 */}
      <ImageModal
        imageUrl={imageUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
