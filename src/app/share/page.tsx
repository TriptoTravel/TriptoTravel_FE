"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LogThumbnail from "@/components/common/LogThumbnail";
import CTAButton from "@/components/buttons/CTAButton";

export default function SharePage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <section className="w-full flex flex-col gap-[30px] items-center">
          <LogThumbnail imageUrl="/images/testimage.jpg" />
          <div className="flex flex-col gap-4">
            <CTAButton variation="default" label="저장하기" />
            <CTAButton variation="default" label="공유하기" />
          </div>
        </section>
        <CTAButton variation="black" label="처음부터 다시하기" onClick={handleNext} />
      </main>

      <Footer />
    </div>
  );
}
