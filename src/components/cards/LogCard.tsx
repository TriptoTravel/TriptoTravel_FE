'use client'

import { useState } from 'react'
import SinglePhotoCard from './SinglePhotoCard'
import TextCard from './TextCard'
import { cn } from '@/utils/cn'

type LogCardProps = {
  photoCardProps: {
    imageUrl: string
  }
  textCardProps: {
    title: string
    content: string
  }
}

export default function LogCard({ photoCardProps, textCardProps }: LogCardProps) {
  const [showPhoto, setShowPhoto] = useState(true)

  return (
    <div className="relative w-[360px] h-[360px] overflow-hidden rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] bg-white">
      <div
        className={cn(
          'flex w-[720px] h-[360px] transition-transform duration-500 ease-in-out',
          showPhoto ? 'translate-x-0' : '-translate-x-[360px]'
        )}
        onClick={() => setShowPhoto(!showPhoto)}
      >
        <div className="w-[360px] h-full shrink-0">
          <SinglePhotoCard imageUrl={photoCardProps.imageUrl} />
        </div>
        <div className="w-[360px] h-full shrink-0">
          <TextCard
            title={textCardProps.title}
            content={textCardProps.content}
          />
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 flex gap-2">
        <div
          className={cn(
            'w-2 h-2 rounded-full transition-colors duration-300',
            showPhoto ? 'bg-black' : 'bg-gray-300'
          )}
        />
        <div
          className={cn(
            'w-2 h-2 rounded-full transition-colors duration-300',
            showPhoto ? 'bg-gray-300' : 'bg-black'
          )}
        />
      </div>
    </div>
  )
}
