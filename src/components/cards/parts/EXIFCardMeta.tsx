// 시간·위치 정보가 있을 때/없을 때/수정할 때 모든 시나리오를 커버하기 위해
// 시간 필드와 위치 필드를 분리해서 사용합니다.

import { useState } from 'react'
import ActionButton from '@/components/buttons/ActionButton'

type MetaState = 'default' | 'error' | 'edit'

interface EXIFCardMetaProps {
  label: string
  value?: string
  state?: MetaState
  onEdit?: () => void
  onSave?: (newValue: string) => void
}

export default function EXIFCardMeta({
  label,
  value,
  state = value ? 'default' : 'error',
  onEdit,
  onSave
}: EXIFCardMetaProps) {
  const [inputValue, setInputValue] = useState(value || '')

  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="text-[16px] font-semibold text-black">{label}</p>

      {state === 'default' && (
        <p className="text-[16px] font-medium text-black">{value}</p>
      )}

      {state === 'error' && (
        <div className="flex justify-between items-center">
          <p className="text-[16px] font-medium text-red-500">정보를 찾을 수 없습니다</p>
          <ActionButton variation="edit" onClick={onEdit} />
        </div>
      )}

      {state === 'edit' && (
        <div className="flex justify-between items-center gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='정확한 정보를 입력해주세요.'
            className="w-64 h-7 bg-zinc-300 rounded-[10px] px-2 text-sm"
          />
          <ActionButton variation="save" onClick={() => onSave?.(inputValue)} />
        </div>
      )}
    </div>
  )
}
