"use client";

import { useTrip } from "@/contexts/tripStore";

export default function UploadPage() {
  const { style, who, why } = useTrip();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <p>triptotravel</p>
          <div>
            <p className="font-semibold">선택한 여행기 스타일:</p>
            <p>{style ?? "선택되지 않음"}</p>
          </div>

          <div>
            <p className="font-semibold">누구와 함께한 여행인가요?</p>
            <p>{who ?? "선택되지 않음"}</p>
          </div>

          <div>
            <p className="font-semibold">왜 떠난 여행인가요?</p>
            <ul className="list-disc ml-5">
              {why.length > 0 ? (
                why.map((purpose, idx) => <li key={idx}>{purpose}</li>)
              ) : (
                <li>선택되지 않음</li>
              )}
            </ul>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
