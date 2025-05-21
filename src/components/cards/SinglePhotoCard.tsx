"use client";

type SinglePhotoCardProps = {
  imageUrl: string;
};

export default function SinglePhotoCard({ imageUrl }: SinglePhotoCardProps) {

  return (
    <div className="w-[360px] h-[360px] bg-white rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] p-5 flex items-center justify-center">
      <div className="w-[320px] h-[320px] bg-zinc-300 rounded-[20px] overflow-hidden cursor-pointer">
        <img
          src={imageUrl || "/images/loadingimage.png"}
          alt="photo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
