'use client'

import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import CTAButton from '@/components/buttons/CTAButton'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleStart = () => {
    router.push('/style') // 여행기 문체 선택 페이지
  }

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white">
      <Header variation="type" />

      <main className="flex flex-col items-center justify-center flex-1 gap-10">
        <CTAButton variation="black" label="여행기 만들기" onClick={handleStart} />
      </main>

      <Footer />
    </div>
  )
}
