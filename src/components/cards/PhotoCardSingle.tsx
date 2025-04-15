'use client'

import { useState } from 'react'
import ImageModal from '../common/ImageModal'

type PhotoCardSingleProps = {
  imageUrl: string
}

export default function PhotoCardSingle({ imageUrl }: PhotoCardSingleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="w-[360px] h-[360px] bg-white rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] p-5 flex items-center justify-center">
      <div
        className="w-[320px] h-[320px] bg-zinc-300 rounded-[20px] overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img src={imageUrl} alt="photo" className="w-full h-full object-cover" />
      </div>

      {isModalOpen && (
        <ImageModal imageUrl={imageUrl} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
