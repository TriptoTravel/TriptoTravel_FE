import { cn } from "@/utils/cn";

type MultiSelectButtonProps = {
  variation: "default" | "unselected" | "selected";
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
    unselected: {
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
      onClick={onClick}
      className={cn(
        "h-7 px-4 rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] flex items-center justify-center text-xxs font-semibold font-pretendard leading-[7.2px]",
        current.bg,
        current.text
      )}
    >
      {label}
    </button>
  );
}
