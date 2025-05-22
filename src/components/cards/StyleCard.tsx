import React from "react";

type TripStyle = "default" | "정보형" | "요약형" | "감성형";

type StyleCardProps = {
  style: TripStyle;
};

const contentMap: Record<
  TripStyle,
  { imageUrl: string; text: React.ReactNode }
> = {
  default: {
    imageUrl: "/images/testimage.jpg",
    text: (
      <span>
        시간:{" "}
        <span className="bg-amber-100">2025년 2월 12일 오후 2시 30분</span>
        <br />
        장소: <span className="bg-yellow-100">계동길 94</span>
        <br />
        정보: <span className="bg-lime-100">한옥</span>,{" "}
        <span className="bg-lime-100">자전거</span>,{" "}
        <span className="bg-lime-100">아이스크림 조형물</span>,{" "}
        <span className="bg-lime-100">벚꽃</span>
        <br />
        감정: <span className="bg-sky-100">설렘</span>,{" "}
        <span className="bg-sky-100">평온함</span>
      </span>
    ),
  },
  정보형: {
    imageUrl: "/images/testimage.jpg",
    text: (
      <span>
        <span className="bg-amber-100">2025년 4월 12일 오후 2시 30분</span>,{" "}
        <span className="bg-yellow-100">서울특별시 종로구 계동길 94</span>에서{" "}
        <span className="bg-lime-100">자전거</span>
        여행을 시작했습니다.
        <br />
        이곳은 전통 <span className="bg-lime-100">한옥</span>이 늘어서 있는
        조용한 골목으로, 작은 상점들마다 다양한 소품들이 진열되어 있었고, 하얀{" "}
        <span className="bg-lime-100">아이스크림 조형물</span>과{" "}
        <span className="bg-lime-100">벚꽃</span> 장식이 골목 풍경을 더욱 생동감
        있게 만들어주었습니다.
      </span>
    ),
  },
  요약형: {
    imageUrl: "/images/testimage.jpg",
    text: (
      <span>
        <span className="bg-amber-100">4월 12일 오후</span>,{" "}
        <span className="bg-yellow-100">계동길 94</span>에서{" "}
        <span className="bg-lime-100">자전거</span>를 타고 골목을 지나갔다.
        <span className="bg-lime-100">한옥</span>과 소품 가게들,{" "}
        <span className="bg-lime-100">아이스크림 조형물</span>이{" "}
        <span className="bg-sky-100">평온한</span> 풍경을 이루었다. 햇살은
        따뜻했고, <span className="bg-lime-100">벚꽃</span> 장식이 흔들리는
        모습이 인상적이었다.
      </span>
    ),
  },
  감성형: {
    imageUrl: "/images/testimage.jpg",
    text: (
      <>
        <span>
          <span className="bg-amber-100">햇살이 부드럽게 내리쬐는</span>{" "}
          <span className="bg-yellow-100">골목길</span>, 오래된{" "}
          <span className="bg-lime-100">한옥</span>과 아기자기한 가게들이
          어우러진 풍경이 눈길을 사로잡는다.
          <br />
          바람에 흔들리는 <span className="bg-lime-100">벚꽃</span> 장식과 하얀{" "}
          <span className="bg-lime-100">아이스크림 조형물</span>이 정겨운
          분위기를 더해준다.
          <br />
          나는 <span className="bg-lime-100">자전거</span>를 타고 그 사이를 스쳐
          지나가며, 이{" "}
          <span className="bg-sky-100">고요하고 따스한 순간을</span> 온몸으로
          느끼고 있었다.
        </span>
      </>
    ),
  },
};

export default function StyleCard({ style }: StyleCardProps) {
  const { imageUrl, text } = contentMap[style];

  return (
    <div className="w-[360px] bg-white rounded-[40px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] p-5 flex flex-col gap-4 items-start">
      <div className="w-[320px] h-[160px] bg-zinc-300 rounded-[20px] overflow-hidden cursor-pointer">
        <img
          src={imageUrl}
          alt={style}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full h-[130px] overflow-y-scroll text-[14px] font-medium font-pretendard text-black leading-relaxed whitespace-pre-line">
        {text}
      </div>
    </div>
  );
}
