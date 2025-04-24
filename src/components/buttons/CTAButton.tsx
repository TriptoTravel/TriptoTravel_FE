import { cn } from '@/utils/cn'

type CTAButtonProps = {
  variation?: 'default' | 'disabled' | 'black'
  label?: string
  onClick?: () => void
}

export default function CTAButton({
  variation = 'default',
  label = '다음 단계',
  onClick
}: CTAButtonProps) {
  const isDisabled = variation === 'disabled'

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'w-[360px] h-14 rounded-[40px] p-4 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-center text-xl font-semibold font-pretendard',
        variation === 'default' && 'bg-white text-black',
        variation === 'disabled' && 'bg-gray-100 text-neutral-400 cursor-not-allowed',
        variation === 'black' && 'bg-black text-white'
      )}
    >
      {label}
    </button>
  )
}
