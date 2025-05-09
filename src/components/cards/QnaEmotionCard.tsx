import { useState } from "react";
import ImageModal from "./parts/ImageModal";
import MultiSelectButton from "../buttons/MultiSelectButton";

const EMOTIONS = [
  "설렘",
  "기대감",
  "두려움",
  "호기심",
  "해방감",
  "감동",
  "재미",
  "평온함",
  "외로움",
  "고마움",
  "불안함",
  "당황한",
  "피로한",
  "자신감",
  "낯섦",
  "반가움",
  "아쉬움",
  "흥분",
  "배고픔",
  "짜증난",
];

type QnaEmotionCardProps = {
  imageUrl: string;
  selectedEmotions: string[];
  onChange: (newEmotions: string[]) => void;
};

export default function QnaEmotionCard({
  imageUrl,
  selectedEmotions,
  onChange,
}: QnaEmotionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      onChange(selectedEmotions.filter((e) => e !== emotion));
    } else if (selectedEmotions.length < 5) {
      onChange([...selectedEmotions, emotion]);
    }
  };

  return (
    <div className="w-[360px] rounded-[40px] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.25)] p-5 flex flex-col gap-4">
      <div
        className="w-[320px] h-[160px] bg-zinc-300 rounded-[20px] overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="photo"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <p className="text-base font-semibold text-black">
        이 사진을 찍었을 때 느낀 감정은 무엇인가요?
      </p>

      <div className="grid grid-cols-5 gap-2">
        {EMOTIONS.map((label, i) => {
          const isSelected = selectedEmotions.includes(label);
          const isDisabled = !isSelected && selectedEmotions.length >= 5;
          return (
            <MultiSelectButton
              key={i}
              label={label}
              variation={
                isSelected ? "selected" : isDisabled ? "unable" : "default"
              }
              onClick={() => toggleEmotion(label)}
            />
          );
        })}
      </div>

      {imageUrl && (
        <ImageModal
          imageUrl={imageUrl}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
