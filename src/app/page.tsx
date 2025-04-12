import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CTAButton from "@/components/buttons/CTAButton";
import ActionButton from "@/components/buttons/ActionButton";

export default function Home() {
  return (
    <main>
      <Header variation="type-back" />
      <h1 className="text-3xl font-pretendard font-bold text-primary">
        Trip to Travel
      </h1>

      <p className="mt-2 text-gray-600">문체 스타일을 선택해주세요</p>
      <div className="my-6 p-2">
        <ActionButton variation="edit" label="수정" />
        <CTAButton variation="disabled" label="다음 단계" />
      </div>
      <Footer />
    </main>
  );
}
