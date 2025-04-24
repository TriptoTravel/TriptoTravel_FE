import { cn } from "@/utils/cn";

type MultiSelectButtonProps = {
  variation: "default" | "unable" | "selected";
  label: string;
  onClick?: () => void;
};

export default function MultiSelectButton({
  variation,
  label,
  onClick,
}: MultiSelectButtonProps) {
  const colorMap = {
    default: {
      bg: "bg-white",
      text: "text-black",
    },
    unable: {
      bg: "bg-gray-100",
      text: "text-neutral-400",
    },
    selected: {
      bg: "bg-black",
      text: "text-white",
    },
  };

  const current = colorMap[variation];

  return (
    <button
      onClick={variation === "unable" ? undefined : onClick}
      className={cn(
        "h-7 px-4 rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] flex items-center justify-center text-[12px] font-semibold font-pretendard",
        current.bg,
        current.text,
        variation === "unable" && "cursor-not-allowed opacity-50"
      )}
    >
      {label}
    </button>
  );
}
