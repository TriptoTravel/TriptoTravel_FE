import Header from "@/components/common/Header";

export default function Home() {
  return (
    <div>
      <Header variation="type-back" />
      <h1 className="text-3xl font-pretendard font-bold text-primary">Trip to Travel</h1>
      <p className="mt-2 text-gray-600">문체 스타일을 선택해주세요</p>
    </div>
  );
}
