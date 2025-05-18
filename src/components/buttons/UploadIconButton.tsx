import { ChangeEvent } from "react";

type UploadIconButtonProps = {
  onUpload: (files: FileList) => void;
};

export default function UploadIconButton({ onUpload }: UploadIconButtonProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
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
        className="cursor-pointer w-[120px] h-[120px] rounded-[14px] flex items-center justify-center"
      >
        <img
          src="/images/imageicon.svg"
          alt="업로드 아이콘"
          className="w-40 h-40 object-cover"
        />
      </label>
      <p className="text-[18px] font-semibold text-center w-full">
        아이콘을 클릭해
        <br />
        사진을 업로드하세요
      </p>
    </div>
  );
}
