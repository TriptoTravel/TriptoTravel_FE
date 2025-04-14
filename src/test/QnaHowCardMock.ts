export const qnaHowCardMock = {
    imageUrl: '/images/testimage.jpg',
    question: '여행 중 가장 기억에 남는 활동은 무엇이었나요?',
    answer: '',
    isEditing: false,
    onSave: (newAnswer: string) => alert(`저장된 답변: ${newAnswer}`),
  } as const
  