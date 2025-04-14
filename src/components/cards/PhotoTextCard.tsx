import PhotoTextCardMeta from './parts/PhotoTextCardMeta'

type PhotoTextCardProps = {
  imageUrl?: string
  timeMeta: {
    value?: string
    state?: 'default' | 'error' | 'edit'
    onEdit?: () => void
    onSave?: (value: string) => void
  }
  locationMeta: {
    value?: string
    state?: 'default' | 'error' | 'edit'
    onEdit?: () => void
    onSave?: (value: string) => void
  }
}

export default function PhotoTextCard({ imageUrl, timeMeta, locationMeta }: PhotoTextCardProps) {
  return (
    <div className="w-[360px] bg-white rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] p-5 flex flex-col gap-4 items-start">
      {/* 사진 */}
      <div className="w-[320px] h-[160px] bg-zinc-300 rounded-[20px] overflow-hidden">
        {imageUrl && (
          <img src={imageUrl} alt="photo" className="w-full h-full object-cover" />
        )}
      </div>

      {/* 시간 */}
      <PhotoTextCardMeta
        label="시간"
        value={timeMeta.value}
        state={timeMeta.state}
        onEdit={timeMeta.onEdit}
        onSave={timeMeta.onSave}
      />

      {/* 위치 */}
      <PhotoTextCardMeta
        label="위치"
        value={locationMeta.value}
        state={locationMeta.state}
        onEdit={locationMeta.onEdit}
        onSave={locationMeta.onSave}
      />
    </div>
  )
}
