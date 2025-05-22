"use client";

type LogThumbnailProps = {
  imageUrl: string;
};

export default function LogThumbnail({ imageUrl }: LogThumbnailProps) {
  return (
    <div className="w-[240px] h-[360px] bg-white rounded-[10px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] px-5 pt-[50px] flex items-start justify-center">
      <div className="w-[200px] h-[200px] shadow-inner bg-gray-100  overflow-hidden cursor-pointer">
        <img
          src={imageUrl}
          alt="photo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
