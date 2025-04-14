"use client";
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CTAButton from "@/components/buttons/CTAButton";
import ActionButton from "@/components/buttons/ActionButton";
import MultiSelectButton from "@/components/buttons/MultiSelectButton";
import TextFieldBubble from "@/components/common/TextFieldBubble";
import PhotoCard from "@/components/cards/PhotoCard";
import TextCard from "@/components/cards/TextCard";
import PhotoTextCard from "@/components/cards/PhotoTextCard";
import { photoTextCardMock } from "@/components/cards/parts/PhotoTextCardMock";

export default function Home() {
  const [time, setTime] = useState<string>(photoTextCardMock.timeMeta.value);
  const [location, setLocation] = useState<string>(
    photoTextCardMock.locationMeta.value
  );
  const [timeEditMode, setTimeEditMode] = useState(false);
  const [locationEditMode, setLocationEditMode] = useState(false);

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
        <div>
          <PhotoCard num={9} />
          <br />
          <PhotoCard num={13} />
        </div>
        <div>
          <TextCard
            title="여행의 시작"
            content={`왜 이렇게 엄살을 떨지? 근데 엄살 떠는 것도 회사 때문인 것 같습니다. 회사에 너무 오래 있어서 여유가 없는 것 입니다. 요즘 주 4일제에 대한 목소리가 많죠? 저는 당당하게 주 2일제를 주장하는 바입니다. 무슨 전당포에서 협상하듯 주 2일제 주장해서 주 4일제를 따내려는 전략이 아니고요. 진짜 진지하게 주 2일제 주장합니다. 여기까지 읽으면 '그래도 주 2일제는 오바 아닌가?'라고 생각하시는 분들이 있을 텐데요 사측이세요? 노측이면 주 2일제 동의 부탁드립니다.`}
          />
        </div>
        <div>
          <PhotoTextCard
            imageUrl={photoTextCardMock.imageUrl}
            timeMeta={{
              value: time,
              state: timeEditMode ? "edit" : time ? "default" : "error",
              onEdit: () => setTimeEditMode(true),
              onSave: (v) => {
                setTime(v);
                setTimeEditMode(false);
              },
            }}
            locationMeta={{
              value: location,
              state: locationEditMode ? "edit" : location ? "default" : "error",
              onEdit: () => setLocationEditMode(true),
              onSave: (v) => {
                setLocation(v);
                setLocationEditMode(false);
              },
            }}
          />
        </div>
        <CTAButton variation="disabled" label="다음 단계" />
      </div>
      <Footer />
    </main>
  );
}
