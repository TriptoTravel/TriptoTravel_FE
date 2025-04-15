import Image from 'next/image'

type ImageModalProps = {
  imageUrl: string
  isOpen: boolean
  onClose: () => void
}

export default function ImageModal({ imageUrl, isOpen, onClose }: ImageModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-[90%] max-h-[90%] rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageUrl}
          alt="popup preview"
          width={800}
          height={600}
          className="w-full h-auto object-contain"
        />
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  )
}