import { cn } from '@/utils/cn'

type ActionButtonProps = {
  variation: 'edit' | 'delete' | 'save'
  onClick?: () => void
}

export default function ActionButton({ variation, onClick }: ActionButtonProps) {
  const configMap = {
    edit: {
      bg: 'bg-white',
      text: 'text-blue-600',
      label: '수정'
    },
    delete: {
      bg: 'bg-white',
      text: 'text-red-500',
      label: '삭제'
    },
    save: {
      bg: 'bg-blue-600',
      text: 'text-white',
      label: '저장'
    }
  }

  const { bg, text, label } = configMap[variation]

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-14 h-7 rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] flex items-center justify-center text-base font-semibold font-pretendard leading-[9.6px]',
        bg,
        text
      )}
    >
      {label}
    </button>
  )
}
