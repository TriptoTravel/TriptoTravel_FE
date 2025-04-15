// api 연결 전 mock 데이터입니다.

export const eXIFCardMock = {
    imageUrl: '/images/testimage.jpg',
    timeMeta: {
      value: '', // time 정보 없음 (error 상태)
      state: 'error',
      onEdit: () => alert('시간 수정 버튼 클릭'),
      onSave: (newValue: string) => alert(`저장된 시간: ${newValue}`),
    },
    locationMeta: {
      value: '부산 해운대 해수욕장', // 정상 위치 정보
      state: 'default',
      onEdit: () => alert('위치 수정 버튼 클릭'),
      onSave: (newValue: string) => alert(`저장된 위치: ${newValue}`),
    }
  } as const
  