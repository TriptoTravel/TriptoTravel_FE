"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type HeaderProps = {
  variation: "type" | "combine" | "type-back" | "combine-back";
};

export default function Header({ variation }: HeaderProps) {
  const router = useRouter();

  const isBack = variation.includes("back");
  const isType = variation.includes("type");
  const logoSrc = isType ? "/logos/Type.svg" : "/logos/Combine.svg";

  return (
    <div className="w-full h-11 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-center relative">
      {isBack && (
        <button
          onClick={() => router.back()}
          className="absolute left-2 w-6 h-11"
        >
          <Image
            src="/icons/Move.svg"
            alt="뒤로가기"
            width={24}
            height={24}
            className="rotate-180"
          />
        </button>
      )}

      <div className="flex pt-1 w-[180px] inset-0 justify-center">
        <Image
          src={logoSrc}
          alt="로고"
          height={32}
          width={0}
          className="h-[32px] w-auto"
        />
      </div>
    </div>
  );
}
