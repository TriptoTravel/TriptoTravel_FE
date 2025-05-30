# Trip to Travel

**짧은 여행 Trip을 긴 여행 Travel로 바꿔주는 AI 여행기 자동 생성 서비스**

배포 주소: [https://triptotravel.netlify.app/](https://triptotravel.netlify.app/)

---

## 📝 서비스 소개

**Trip to Travel**은 사용자가 사진만 업로드하면, AI가 자동으로 사진을 분석하고, 시간 순 정렬, 감정 분석, 문체 스타일 반영 등 다양한 요소를 바탕으로 여행기를 생성해주는 서비스입니다.

* 여행 기록의 자동화와 개인화
* 사진 선별, 이미지 캡셔닝, 여행기 생성까지 한 번에
* PDF 저장, 링크 공유 등 다양한 활용 가능

---

## 👨‍💻 팀원 소개

| 이름 | 역할 | GitHub |
|------|------|--------|
| 오세호 | DB 설계 및 API 연동 | [github.com/SaehoOh](https://github.com/SaehoOh) |
| 서상민 | DB 설계 및 API 연동 | [github.com/ss721229](https://github.com/ss721229) |
| 이유진 | 프론트엔드 개발 및 디자인 | [github.com/newjinlee](https://github.com/newjinlee) |
| 김소희 | AI 모델 개발 및 파인튜닝 | [github.com/heesohek](https://github.com/heesohek) |

---

## 🧩 주요 기능

* 여행 목적 기반 핵심 이미지 선별
* EXIF 기반 시간·위치 자동 추출 및 입력 보완
* 감정 및 활동 정보 수집을 통한 개인화 반영
* 다양한 문체 선택 가능: 감성형, 정보형, 요약형
* GPT 기반 여행기 초안 생성 및 사용자 수정 기능
* PDF 저장 및 SNS 공유

---

## ⚙️ 기술 스택

* **Frontend**: React, TypeScript, TailwindCSS, Netlify
* **Backend**: FastAPI, Gunicorn, SQLAlchemy, Qoddi, Supabase(PostgreSQL)
* **AI Server**: Google Cloud Platform (Compute Engine, GCS)
* **AI Models**:

  * **CLIP (OpenAI)**: 이미지-텍스트 유사도 기반 사진 선별
  * **PHash**: 유사 이미지 제거
  * **BLIP (Salesforce)**: 이미지 캡셔닝 (한국 데이터 기반 파인튜닝)
  * **GPT-4 Turbo (OpenAI)**: 여행기 문장 생성
  * **LLaVA**: 시각-텍스트 통합 정보 기반 문맥 조정 여행기 생성
* **Infra**: Docker, GitHub Actions, Nginx

---

## 🧠 AI 구성 및 모델 사용

### 📌 전체 파이프라인

1. **CLIP + PHash**: 사진 업로드 후 유사 이미지 제거 및 목적 키워드 기반 중요도 분석
2. **BLIP (Fine-tuned)**: 선별된 사진에 대해 캡션 자동 생성
3. **사용자 입력 반영**: 감정(emotion), 행동(how), 문체 스타일 등 수집
4. **GPT-4 Turbo + LLaVA**: 모든 정보 기반 초안 생성 → 사용자 수정 → 최종본 저장

### 📍 BLIP 파인튜닝

* **데이터**: 한국 관광지, 음식, 풍경 중심의 블로그/인스타 이미지 데이터셋 수집
* **방식**: Pretrained BLIP 모델에 대해 image-caption pair supervised fine-tuning
* **효과**: 기존 BLIP 대비 감성 표현 및 한국 맥락 인식 성능 향상

### 🧠 모델별 역할

* **CLIP**: 사용자 입력 여행 목적 텍스트와 각 사진 간 의미 유사도 계산 (중요도 순 정렬)
* **PHash**: 유사한 이미지 자동 제거 (중복 제거)
* **BLIP**: 각 이미지에 자연어 설명 자동 생성 (이미지 캡션)
* **GPT-4**: 감정, 장소, 캡션, 문체 기반 개별 문장 생성 (초안)
* **LLaVA**: 전체 문맥 흐름 조정 및 통합 여행기 완성 (최종본)

---

## 🏗️ 시스템 아키텍처

* GitHub Actions로 CI/CD 자동화
* Front: React → Netlify에 배포
* Back: FastAPI → Qoddi에 배포 (Gunicorn + Nginx)
* AI Server: GCP Compute Engine에 상시 활성화
* Data 저장: GCP Cloud Storage (이미지), Supabase(PostgreSQL)

![image](https://github.com/user-attachments/assets/481cd065-de73-49eb-b3ce-b346b2152d2e)

---

## 🖥️ UI·UX 흐름

1. 문체 선택 (감성/정보/요약)
2. 여행 동행자 및 목적 선택
3. 사진 업로드 → AI 기반 자동 정렬
4. 사용자 최종 선택 (1차 선별 후 수동 조정)
5. 메타데이터 자동 추출 (누락 시 수동 입력)
6. 감정/행동 정보 수집
7. AI 초안 생성 → 수정 → 최종본 저장
8. PDF 저장 or SNS 공유

---

## 🗃️ 데이터베이스 설계

* 총 11개 테이블 사용
* 핵심 테이블: travelogue (여행 단위), image (사진 단위), style, metadata, question\_response 등
* travelogue\_image: 중간 매핑 테이블로 여행기-이미지 연결
* metadata: EXIF에서 추출한 날짜/위치 저장
* question\_response: 감정 및 활동 정보 저장
* draft, final 테이블: 각 이미지에 대한 여행기 초안/최종본 저장

---

## 📡 API 명세

Swagger 문서: [https://hzeuoicgfl.us14.qoddiapp.com/docs](https://hzeuoicgfl.us14.qoddiapp.com/docs)

| 기능        | 엔드포인트                                         | 메서드   | 설명                                  |
| --------- | --------------------------------------------- | ----- | ----------------------------------- |
| 이미지 업로드   | `/api/image/upload`                           | POST  | base64 이미지 업로드 → GCP 저장 → URI DB 저장 |
| 2차 선별 시작  | `/api/image/{travelogue_id}/selection/second` | POST  | AI 서버로 목적 + 이미지 URI 전달 후 중요도 반환     |
| 메타데이터 추출  | `/api/image/exif`                             | PATCH | EXIF 데이터 저장 또는 수동 입력                |
| 감정/행동 입력  | `/api/image/question-response`                | POST  | 이미지별 emotion/how 저장                 |
| 여행기 초안 생성 | `/generate-caption` + `/generate-travel-log`  | POST  | AI 초안 생성 후 반환                       |
| 최종본 저장    | `/api/travelogue/final`                       | PATCH | 사용자 수정 후 최종본 저장                     |

---

## 📄 라이선스

MIT License
