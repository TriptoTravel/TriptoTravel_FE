"use client";
import Header from "@/components/common/Header";

import { useTrip } from "@/contexts/tripStore";

export default function InfoPage() {
  const { style } = useTrip();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header variation="type-back" />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <p>triptotravel</p>
          <p className="text-sm text-gray-500">
            선택한 문체 스타일: {style ?? "없음"}
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
