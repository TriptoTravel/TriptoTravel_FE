// src/components/card/TextCard.tsx

import React from 'react'

type TextCardProps = {
  content: string
}

export default function TextCard({ content }: TextCardProps) {
  return (
    <div className="w-[360px] h-[360px] inline-block bg-white rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] px-5 py-8">
      <div className="h-[290px] flex flex-col gap-6 overflow-hidden">
        <div className="text-[18px] font-medium font-pretendard text-black leading-relaxed overflow-y-auto max-h-[270px] pr-1">
          {content}
        </div>
      </div>
    </div>
  )
}
