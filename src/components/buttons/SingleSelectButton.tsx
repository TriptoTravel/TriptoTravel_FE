import { cn } from '@/utils/cn'

type SingleSelectButtonProps = {
  label: string
  isSelected: boolean
  onClick: () => void
}

export default function SingleSelectButton({
  label,
  isSelected,
  onClick,
}: SingleSelectButtonProps) {
  const variation = isSelected ? 'selected' : 'default'

  const colorMap = {
    default: {
      bg: 'bg-white',
      text: 'text-black',
    },
    selected: {
      bg: 'bg-black',
      text: 'text-white',
    },
  }

  const current = colorMap[variation]

  return (
    <button
      onClick={onClick}
      className={cn(
        'h-[30px] px-4 rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] flex items-center justify-center text-[12px] font-semibold font-pretendard',
        current.bg,
        current.text
      )}
    >
      {label}
    </button>
  )
}
