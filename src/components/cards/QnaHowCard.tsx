import Image from "next/image";
import { useState } from "react";
import ImageModal from "../common/ImageModal";
import ActionButton from "../buttons/ActionButton";

type QnaHowCardProps = {
  imageUrl: string;
  question: string;
  answer: string;
  onSave?: (newAnswer: string) => void;
};

export default function QnaHowCard({
  imageUrl,
  question,
  answer,
  onSave,
}: QnaHowCardProps) {
  const [draft, setDraft] = useState(answer);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-[360px] h-[360px] rounded-[40px] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.25)] p-5 flex flex-col gap-4">
      {/* 이미지 */}
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

      {/* 질문 */}
      <p className="text-[16px] font-semibold text-black">{question}</p>

      {/* 답변 */}
      {isEditing ? (
        <div className="relative">
          <textarea
            className="w-full h-20 p-4 resize-none rounded-[20px] bg-zinc-300 text-black text-[16px] font-medium focus:outline-none"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="예시 답안 제공할건가요?"
          />
          <div className="relative flex justify-end">
            <ActionButton
              variation="save"
              onClick={() => {
                onSave?.(draft);
                setIsEditing(false);
              }}
            />
          </div>
        </div>
      ) : answer ? (
        <p
          className="w-full text-black text-[16px] font-medium"
          onClick={() => setIsEditing(true)}
        >
          {answer}
        </p>
      ) : (
        <div
          className="w-full h-20 p-4 rounded-[20px] bg-zinc-300 flex px-4 text-black text-[16px] font-medium cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          여기에 답변을 작성해 주세요.
        </div>
      )}
      
      {/* 이미지 모달 */}
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
