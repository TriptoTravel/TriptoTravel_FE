import { useRouter } from "next/router";
import Header from "@/components/common/Header";
import CTAButton from "@/components/buttons/CTAButton";
import Footer from "@/components/common/Footer";

export default function SharePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="type-back" />

      <main className="flex flex-col items-center justify-center my-[60px] gap-[60px]">
        <CTAButton variation="default" label="저장하기" onClick={} />
        <CTAButton variation="default" label="공유하기" onClick={} />

        <CTAButton
          variation="black"
          label="처음부터 다시하기"
          onClick={() => router.push("/")}
        />
      </main>

      <Footer />
    </div>
  );
}
