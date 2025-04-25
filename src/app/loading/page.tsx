"use client";
import Header from "@/components/common/Header";

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="combine" />

      <main className="h-full flex flex-col items-center justify-center m-auto">
        
        {/* 로딩 애니메이션 배경화면 추가해야 함*/}

        <div className="flex flex-col items-center justify-center gap-5">
          <div className="cursor-pointer w-[120px] h-[120px] rounded-[14px] bg-zinc-300 flex items-center justify-center shadow-md text-[32px]">
            로딩 아이콘
          </div>
          <p className="text-[18px] font-semibold text-center w-full">여행기를 생성 중입니다.</p>
        </div>
      </main>
    </div>
  );
}
