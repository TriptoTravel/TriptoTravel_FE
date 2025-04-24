type TripStyle = "default" | "정보형" | "요약형" | "감성형";

type StyleCardProps = {
  style: TripStyle;
};

const contentMap: Record<TripStyle, { imageUrl: string; text: string }> = {
  default: {
    imageUrl: "/images/testimage.jpg",
    text: "시간: 2025년 2월 12일 오후 2시 30분 \n 위치: 계동길 94 \n 정보: 한옥 자전거 아이스크림 조형물 벚꽃",
  },
  정보형: {
    imageUrl: "/images/testimage.jpg",
    text: "오후 2시 30분, 서울 종로구 계동길 94. \n 따뜻한 햇살이 내리쬐던 그 시간, 나는 자전거를 타고 조용한 골목을 지나고 있었다. \n 전통 한옥이 고요하게 서 있고, 작은 상점들마다 아기자기한 소품들이 시선을 끌었다. 한쪽에는 노란 아이스크림 조형물이 서 있었고, 봄바람에 벚꽃 장식이 살랑였다. \n 골목을 따라 천천히 페달을 밟으며, 이곳의 분위기를 온전히 느낄 수 있었다.",
  },
  요약형: {
    imageUrl: "/images/testimage.jpg",
    text: "계동길 94의 한적한 오후, 나는 자전거를 타고 골목을 천천히 지나갔다. \n 한옥과 작은 가게들, 그리고 그 사이를 흐르던 따뜻한 햇살 덕분에 짧은 순간마저도 여행의 한 장면처럼 느껴졌다.",
  },
  감성형: {
    imageUrl: "/images/testimage.jpg",
    text: "햇살이 부드럽게 내리쬐는 골목길, 오래된 한옥과 아기자기한 가게들이 어우러진 풍경이 눈길을 사로잡는다. \n 바람에 흔들리는 벚꽃 장식과 노란 아이스크림 조형물이 정겨운 분위기를 더해준다. \n 자전거를 타고 그 사이를 스쳐 지나가던 나는, 이 고요하고 따스한 순간을 온몸으로 느끼고 있었다.",
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
