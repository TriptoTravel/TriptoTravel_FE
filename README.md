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

* **Frontend**: React, TypeScript, TailwindCSS
* **Backend**: FastAPI, SQLAlchemy, Supabase(PostgreSQL)
* **AI Models**:
  * **CLIP**: 이미지-텍스트 유사도 기반 사진 선별 (+PHash, DBSCAN, Laplacian)  
  * **BLIP**: 이미지 캡셔닝 (한국 데이터 기반 파인튜닝)
  * **GPT-4 Turbo**: 여행기 문장 생성
* **Cloud**: Netlify, Qoddi, Google Cloud Platform (Compute Engine, GCS)

---

## 🧠 AI 구성 및 모델 사용

### 📌 전체 파이프라인

1. **CLIP**: 사진 업로드 후 유사 이미지 제거 및 목적 키워드 기반 중요도 분석
2. **BLIP**: 선별된 사진에 대해 캡션 생성
3. **사용자 입력 반영**: 감정(emotion), 행동(how), 문체 스타일 등 수집
4. **GPT-4 Turbo**: 모든 정보 기반 초안 생성

### 📍 BLIP 파인튜닝
* **데이터**: 한국 관광지, 음식, 풍경 중심의 블로그/인스타 이미지 데이터셋 수집
* **방식**: Pretrained BLIP 모델에 대해 image-caption pair supervised fine-tuning
* **효과**: 기존 BLIP 대비 감성 표현 및 한국 맥락 인식 성능 향상

---

## 🏗️ 시스템 아키텍처
![image](https://github.com/user-attachments/assets/6c444cbc-77bc-4f9e-8912-86f6bb0ad02f)

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
![image](https://github.com/user-attachments/assets/27797c9f-da71-4f60-894b-ba53e2f427d7)

---

## 📡 주요 API 명세

| 주요 기능 | Endpoint                                                   | 설명 |
|--------|------------------------------------------------------------|------|
| POST   | `/api/travelogue/{travelogue_id}/question/total`          | 여행 목적 및 전체 질문 테이블 튜플 생성 |
| POST   | `/api/image/upload`                                        | 이미지 튜플 생성 및 업로드 |
| PATCH  | `/api/image/{travelogue_id}/selection/first`               | 이미지 중요도 평가 및 1차 선별 수행 |
| POST   | `/api/image/{travelogue_id}/selection/second`              | 이미지 2차 선별, 캡셔닝, 메타데이터 추출 |
| PATCH  | `/api/image/{image_id}/metadata`                           | 이미지 메타데이터 튜플 수정 |
| POST   | `/api/image/{image_id}/question`                           | 이미지에 대한 사전 질문 응답 튜플 생성 |
| PATCH  | `/api/travelogue/{travelogue_id}/generation`               | 여행기 초안 생성 및 저장 |
| PATCH  | `/api/image/{image_id}/correction`                         | 여행기 final 필드 수정 |
| GET    | `/api/travelogue/{travelogue_id}/export`                   | 여행기 PDF 저장 |
| GET    | `/api/travelogue/{travelogue_id}/share`                    | 여행기 PDF 공유 링크 발급 |
