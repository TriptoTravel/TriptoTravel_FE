import { cn } from "@/utils/cn";

type TextFieldProps = {
  type: "instruction" | "question" | "answer";
  text: string;
  annotation: "single" | "multiple" | "none";
};

export default function TextField({ type, text, annotation }: TextFieldProps) {
  const isWithPrefix = type === "question" || type === "answer";
  const prefix = type === "question" ? "Q" : type === "answer" ? "A" : null;
  const annotationText =
    annotation === "single"
      ? "단일 선택"
      : annotation === "multiple"
        ? "복수 선택"
        : null;
  return (
    <div
      className={cn(
        "w-[360px] min-h-14 rounded-[40px] border shadow-[0px_1px_4px_rgba(0,0,0,0.25)]",
        "flex items-center px-5 py-3 gap-3 bg-cover bg-center bg-no-repeat"
      )}
      style={{ backgroundImage: "url('/images/buttonbackground.svg')" }}
    >
      {isWithPrefix && (
        <div className="text-black text-3xl font-normal font-serif leading-none mt-[2px]">
          {prefix}
        </div>
      )}
      <p className="text-black text-lg font-semibold font-pretendard leading-snug break-words whitespace-pre-line">
        {text}
      </p>
      {annotationText && (
        <p className="flex text-[10px] mt-1 text-gray-500">{annotationText}</p>
      )}
    </div>
  );
}
