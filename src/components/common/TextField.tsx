import { cn } from '@/utils/cn'

type TextFieldProps = {
  type: 'instruction' | 'question' | 'answer'
  text: string
}

export default function TextField({ type, text }: TextFieldProps) {
  const isWithPrefix = type === 'question' || type === 'answer'
  const prefix = type === 'question' ? 'Q' : type === 'answer' ? 'A' : null

  return (
    <div
      className={cn(
        'w-[360px] min-h-14 bg-gray-100 rounded-[40px] border shadow-[0px_1px_4px_rgba(0,0,0,0.25)]',
        'flex items-center px-5 py-3 gap-3'
      )}
    >
      {isWithPrefix && (
        <div className="text-black text-3xl font-normal font-serif leading-none mt-[2px]">
          {prefix}
        </div>
      )}
      <p className="text-black text-lg font-semibold font-pretendard leading-snug break-words whitespace-pre-line">
        {text}
      </p>
    </div>
  )
}
