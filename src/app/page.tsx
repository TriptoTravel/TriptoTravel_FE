import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CTAButton from "@/components/buttons/CTAButton";

export default function Home() {
  return (
    <main>
      <Header variation="type-back" />
      <h1 className="text-3xl font-pretendard font-bold text-primary">Trip to Travel</h1>
      
      <p className="mt-2 text-gray-600">문체 스타일을 선택해주세요</p>
      <div className="my-6">
      <CTAButton label="다음 단계" variation="disabled" />

      </div>
      <Footer/>
    </main>
  );
}
