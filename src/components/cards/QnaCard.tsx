import QnaHowCard from "./QnaHowCard";
import QnaEmotionCard from "./QnaEmotionCard";

type QnaCardProps = {
  imageUrl: string;
  howAnswer: string;
  onSaveHow: (newAnswer: string) => void;
  emotionAnswer: string[];
  onSaveEmotion: (newEmotions: string[]) => void;
};

export default function QnaCard({
  imageUrl,
  howAnswer,
  onSaveHow,
  emotionAnswer,
  onSaveEmotion,
}: QnaCardProps) {
  return (
    <div className="flex flex-col items-center gap-[30px]">
      <QnaHowCard
        imageUrl={imageUrl}
        question="이 사진에서 가장 기억에 남는 활동은 무엇인가요?"
        answer={howAnswer}
        onSave={onSaveHow}
      />
      <QnaEmotionCard
        imageUrl={imageUrl}
        selectedEmotions={emotionAnswer}
        onChange={onSaveEmotion}
      />
    </div>
  );
}
