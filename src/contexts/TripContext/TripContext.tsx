/**
 * Trip to Travel 서비스 전반에서 사용할 데이터를 전역 상태로 관리하는 Context입니다.
 * 사용자 선택 정보를 단계별로 전역 저장하여 페이지 전환 간 정보가 유지되도록 합니다.
*/
'use client'

import { createContext, useContext, useState } from 'react'
import type {
  TripStyle,
  TripCompanion,
  TripPurpose,
  SelectedImage,
  ExifData,
  QnaData,
} from './types'

// 전역 상태로 관리할 변수들과 각 setter 함수 타입 정의
type TripContextType = {
  // 문체 스타일
  style: TripStyle | null 
  setStyle: (style: TripStyle) => void

  // WHO
  who: TripCompanion | null
  setWho: (companion: TripCompanion) => void

  // WHY
  why: TripPurpose[]
  setWhy: (purposes: TripPurpose[]) => void

  // 사진 개수
  photoCount: number | null
  setPhotoCount: (count: number) => void

  // 최종 선택 사진
  selectedImages: SelectedImage[]
  setSelectedImages: (images: SelectedImage[]) => void

  // 사진별 EXIF(WHEN, WHERE)
  exifData: ExifData
  setExifData: (data: ExifData) => void

  // 사진별 정보(HOW, EMOTION)
  qnaData: QnaData
  setQnaData: (data: QnaData) => void
}

// Context 생성 (초기값은 undefined, Provider 내부에서만 사용 가능하도록 제한)
const TripContext = createContext<TripContextType | undefined>(undefined)

// TripProvider: 전역 상태를 관리하며 하위 컴포넌트에 context 값을 공급하는 Provider
export function TripProvider({ children }: { children: React.ReactNode }) {
  // 각 항복에 대한 상태 선언
  const [style, setStyle] = useState<TripStyle | null>(null)
  const [who, setWho] = useState<TripCompanion | null>(null)
  const [why, setWhy] = useState<TripPurpose[]>([])
  const [photoCount, setPhotoCount] = useState<number | null>(null)

  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([])
  const [exifData, setExifData] = useState<ExifData>({})
  const [qnaData, setQnaData] = useState<QnaData>({})

  return (
    <TripContext.Provider
      value={{
        style,
        setStyle,
        who,
        setWho,
        why,
        setWhy,
        photoCount,
        setPhotoCount,
        selectedImages,
        setSelectedImages,
        exifData,
        setExifData,
        qnaData,
        setQnaData,
      }}
    >
      {children}
    </TripContext.Provider>
  )
}

// useTrip: context를 사용하는 커스텀 훅
// TripProvider 안에서만 호출 가능하며, 외부 호출 시 에러를 던짐
export function useTrip() {
  const context = useContext(TripContext)
  if (!context) throw new Error('useTrip must be used within a TripProvider')
  return context
}
