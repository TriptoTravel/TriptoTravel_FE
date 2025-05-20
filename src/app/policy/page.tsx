"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function PolicyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header variation="combine-back" />

      <main className="flex flex-col items-center justify-center my-[60px] px-6">
        <div className="max-w-3xl w-full text-black text-base leading-relaxed space-y-6">
          <h1 className="text-2xl font-pretendard font-semibold mb-6">Trip to Travel 이용정책</h1>

          <section>
            <h2 className="text-xl font-pretendard font-semibold mb-2">1. 서비스 개요</h2>
            <p>
              Trip to Travel은 사용자가 업로드한 여행 사진을 기반으로 AI가 자동으로
              여행기를 생성해주는 서비스입니다. 해당 여행기는 사용자가 직접 저장하거나
              SNS에 공유할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-pretendard font-semibold mb-2">2. 이용 조건</h2>
            <p>
              본 서비스는 로그인 없이 자유롭게 이용할 수 있으며, 사진 업로드 후 단계를
              따라가면 자동으로 여행기가 생성됩니다. 사용자는 최소 1장 이상의 여행
              사진을 업로드해야 하며, 업로드된 사진에 포함된 EXIF 데이터 또는 사용자
              응답을 통해 여행기 문체 및 내용을 구성합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-pretendard font-semibold mb-2">3. 생성 콘텐츠에 대한 책임</h2>
            <p>
              본 서비스에서 제공되는 여행기는 AI가 자동으로 생성한 결과물로, 생성된
              문장의 정확성, 사실성, 표현에 대한 최종 책임은 사용자에게 있습니다.
              서비스 결과는 편집이 가능하며, 필요에 따라 사용자가 직접 수정할 수
              있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-pretendard font-semibold mb-2">4. 저작권 및 이미지 사용</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                사용자가 업로드하는 모든 사진은 본인의 창작물이거나, 해당 이미지를 사용할
                수 있는 적법한 권리를 보유하고 있어야 합니다.
              </li>
              <li>
                타인의 저작권, 초상권, 상표권 등을 침해하는 이미지 사용 시 발생하는 모든
                법적 책임은 사용자 본인에게 있습니다.
              </li>
              <li>
                Trip to Travel은 업로드된 이미지를 기반으로 AI 결과물을 생성할 뿐, 해당
                이미지의 저작권을 주장하지 않습니다.
              </li>
              <li>
                생성된 여행기의 저작권은 사용자에게 있으며, 개인적·비상업적 목적으로
                자유롭게 저장 및 공유가 가능합니다.
              </li>
              <li>
                생성된 결과물의 상업적 이용을 원할 경우 별도 문의가 필요할 수 있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-pretendard font-semibold mb-2">5. 개인정보 및 데이터 처리</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>본 서비스는 로그인 및 회원가입을 요구하지 않으며, 어떠한 개인정보도 수집하지 않습니다.</li>
              <li>업로드된 사진과 입력된 정보는 여행기 생성을 위한 일시적 처리에만 사용됩니다.</li>
              <li>
                다만, 서비스 개선 및 품질 향상을 위한 비식별화된 데이터 분석은 내부적으로 수행될 수 있습니다.
              </li>
              <li>생성이 완료된 여행기 및 관련 데이터는 일정 시간이 지난 후 자동으로 삭제됩니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-pretendard font-semibold mb-2">6. 면책 조항</h2>
            <p>
              본 서비스는 AI 기술을 기반으로 하며, 특정 표현이나 정보가 부정확하거나 사용자
              의도와 다를 수 있습니다. Trip to Travel은 생성된 콘텐츠로 인해 발생할 수 있는
              손해에 대해 법적 책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-pretendard font-semibold mb-2">7. 정책 변경</h2>
            <p>
              Trip to Travel은 서비스 개선을 위해 본 이용정책을 사전 공지 없이 변경할 수
              있으며, 중대한 변경이 있을 경우 서비스 내에서 별도로 안내합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-pretendard font-semibold mb-2">📧 문의</h2>
            <p>
              상업적 이용, 저작권, 기타 문의 사항은 아래 피드백 링크로 문의해 주세요.
              <br />
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
