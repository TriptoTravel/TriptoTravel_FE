import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CTAButton from "@/components/buttons/CTAButton";
import ActionButton from "@/components/buttons/ActionButton";
import MultiSelectButton from "@/components/buttons/MultiSelectButton";
import TextFieldBubble from "@/components/common/TextFieldBubble";
import PhotoCard from "@/components/cards/photocard";
export default function Home() {
  return (
    <main>
      <Header variation="type-back" />
      <div className="my-6 p-2">
        <div className="flex gap-2 my-3">
          <MultiSelectButton variation="default" label="친구와" />
          <MultiSelectButton variation="unselected" label="친구와" />
          <MultiSelectButton variation="selected" label="친구와" />
        </div>
        <div className="flex gap-2">
          <ActionButton variation="edit" />
          <ActionButton variation="delete" />
          <ActionButton variation="save" />
        </div>
        <br />
        <div className="flex flex-col gap-2">
          <TextFieldBubble
            type="instruction"
            text="선호하는 여행기 문체를 선택해 주세요!"
          />
          <TextFieldBubble
            type="question"
            text="이 여행은 누구와 함께 다녀왔나요?"
          />
          <TextFieldBubble
            type="answer"
            text="친한 친구들과 함께 다녀왔어요. 일정도 같이 짜고 되게 신났어요."
          />
        </div>
        <br />
        <div className="gap-2">
          <PhotoCard num={9} />
          <br />
          <PhotoCard num={13} />
        </div>
        <CTAButton variation="disabled" label="다음 단계" />
      </div>
      <Footer />
    </main>
  );
}
