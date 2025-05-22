type TripStyle = "default" | "정보형" | "요약형" | "감성형";

type StyleCardProps = {
  style: TripStyle;
};

const contentMap: Record<TripStyle, { imageUrl: string; text: string }> = {
  default: {
    imageUrl: "/images/testimage.jpg",
    text: "시간: 2025년 2월 12일 오후 2시 30분\n위치: 계동길 94\n정보: 한옥 자전거 아이스크림 조형물 벚꽃",
  },
  정보형: {
    imageUrl: "/images/testimage.jpg",
    text: "2025년 4월 12일 오후 2시 30분, 서울특별시 종로구 계동길 94에서 자전거 여행을 시작했습니다.\n이곳은 전통 한옥이 늘어서 있는 조용한 골목으로, 햇살이 따뜻하게 비추는 시간이었습니다.\n작은 상점들마다 다양한 소품들이 진열되어 있었고, 노란 아이스크림 조형물과 벚꽃 장식이 골목 풍경을 더욱 생동감 있게 만들어주었습니다.",
  },
  요약형: {
    imageUrl: "/images/testimage.jpg",
    text: "2025년 4월 12일 오후, 계동길 94에서 자전거를 타고 골목을 천천히 지나갔다.\n한옥과 소품 가게들, 노란 아이스크림 조형물이 조용한 풍경을 이루었다.\n햇살은 따뜻했고, 벚꽃 장식이 흔들리는 모습이 인상적이었다.",
  },
  감성형: {
    imageUrl: "/images/testimage.jpg",
    text: "햇살이 부드럽게 내리쬐는 골목길, 오래된 한옥과 아기자기한 가게들이 어우러진 풍경이 눈길을 사로잡는다.\n바람에 흔들리는 벚꽃 장식과 노란 아이스크림 조형물이 정겨운 분위기를 더해준다.\n자전거를 타고 그 사이를 스쳐 지나가던 나는, 이 고요하고 따스한 순간을 온몸으로 느끼고 있었다.",
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
