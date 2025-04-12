import { cn } from '@/utils/cn'

type ActionButtonProps = {
  variation: 'edit' | 'delete' | 'save'
  label?: string
  onClick?: () => void
}

export default function ActionButton({
  variation,
  label,
  onClick
}: ActionButtonProps) {
  const colorMap = {
    edit: {
      bg: 'bg-white',
      text: 'text-blue-600'
    },
    delete: {
      bg: 'bg-white',
      text: 'text-red-500'
    },
    save: {
      bg: 'bg-blue-600',
      text: 'text-white'
    }
  }

  const current = colorMap[variation]

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-14 h-7 rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] flex items-center justify-center text-base font-semibold font-pretendard leading-[9.6px]',
        current.bg,
        current.text
      )}
    >
      {label}
    </button>
  )
}
