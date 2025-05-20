import type { Metadata } from "next";
import "../styles/globals.css";
import { TripProvider } from "@/contexts/tripStore";

export const metadata: Metadata = {
  title: "✈️Trip to Travel✈️",
  description: "사용자 업로드 이미지 기반 여행기 자동 생성 AI 서비스입니다.",
  keywords: ["AI", "여행기", "이미지 기반", "자동 생성", "Trip to Travel"],
  authors: [
    { name: "Trip to Travel Team", url: "https://triptotravel.netlify.app" },
  ],
  creator: "Trip to Travel",
  themeColor: "#ffffff",
  colorScheme: "light",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",

  openGraph: {
    title: "Trip to Travel",
    description: "AI가 자동으로 당신의 여행기를 완성해줍니다.",
    url: "https://triptotravel.netlify.app",
    siteName: "Trip to Travel",
    images: [
      {
        url: "https://i.ibb.co/nqYsvJVm/metaimage.jpg",
        width: 1200,
        height: 630,
        alt: "Trip to Travel 미리보기 이미지",
      },
    ],
    type: "website",
  },

  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <TripProvider>{children}</TripProvider>
      </body>
    </html>
  );
}
