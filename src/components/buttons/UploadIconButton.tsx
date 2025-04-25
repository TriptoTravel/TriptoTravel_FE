import { ChangeEvent } from "react"

type UploadIconButtonProps = {
  onUpload: (files: FileList) => void
}

export default function UploadIconButton({ onUpload }: UploadIconButtonProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files)
    }
  }

  return (
    <div className="relative">
      <input
        type="file"
        id="upload"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <label
        htmlFor="upload"
        className="cursor-pointer w-[120px] h-[120px] rounded-[14px] bg-zinc-300 flex items-center justify-center shadow-md text-[32px]"
      >
        업로드 아이콘
      </label>
    </div>
  )
}
