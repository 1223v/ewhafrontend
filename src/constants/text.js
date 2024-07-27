export const MAIN = {
  TITLE: "강의 목록",
  BTN: {
    create: "강의 생성",
    reset: "초기화",
  },
  SELECT: {
    semester: "학기",
    seperated: "분반"
  },
  PLACEHOLDER: "강의명을 입력하세요",
  TXT: {
    empty: "일정이 없습니다",
  }
}

export const MYPAGE = {
  TITLE: {
    info: "기본 정보",
    lec: "진행중인 강의"
  },
  BTN: {
    modifyOn: "수정",
    modifyOff: "수정 완료",
    cancle: "취소"
  },
  INFO_TABLE: [
    {
      id: 0,
      txt: "이름",
      content: "이주리애",
      name: "name",
    },
    {
      id: 1,
      txt: "이메일",
      content: "asdf@naver.com",
      name: "email",
    },
    {
      id: 2,
      txt: "전공",
      content: "한일번역",
      name: "major",
    },
    {
      id: 3,
      txt: "비밀번호",
      content: "password",
      name: "password",
    }
  ],
  CUR_TABLE: {
    th: [
      {
        id: 0,
        txt: "NO",
        width: "10"
      },
      {
        id: 1,
        txt: "강의명",
        width: "25"
      },
      {
        id: 2,
        txt: "분반",
        width: "20"
      },
      {
        id: 3,
        txt: "게시중인 과제 수",
        width: "20"
      },
      {
        id: 4,
        txt: "수강생 수",
        width: "10"
      },
      {
        id: 5,
        txt: "",
        width: "15"
      },
    ],
    td: [
      {
        id: 0,
        txt: "1",
        width: "10"
      },
      {
        id: 1,
        txt: "한일추가샘플(20240524)",
        width: "25"
      },
      {
        id: 2,
        txt: "한일통역 1분반",
        width: "20"
      },
      {
        id: 3,
        txt: "5개 게시중",
        width: "20"
      },
      {
        id: 4,
        txt: "15명",
        width: "10"
      },
      {
        id: 5,
        txt: "수강생 조회",
        width: "15"
      },
    ]
  },

  MODAL: {
    title: [
      {
        idx: 0,
        title: "현재 비밀번호",
        name: "currentPw"
      },
      {
        idx: 1,
        title: "새로운 비밀번호",
        name: "newPw",
      },
      {
        idx: 2,
        title: "새로운 비밀번호 확인",
        name: "newPwChk"
      }
    ],
    btn: {
      cancle: "취소",
      modify: "변경"
    }
  },
  CURRENT_LEC: {
    year: "2024",
    semester: "1학기"
  }
}

export const STUDENTLIST = {
  STUDENT: [
    {
      id: 0,
      txt: "이름",
      width: "25"
    },
    {
      id: 1,
      txt: "전공",
      width: "25"
    },
    {
      id: 2,
      txt: "이메일",
      width: "25"
    },
    {
      id: 3,
      txt: "등록일",
      width: "25"
    },
  ],
  WAIT: [
    {
      id: 0,
      txt: "상태",
      width: "15"
    },
    {
      id: 1,
      txt: "이름",
      width: "20"
    },
    {
      id: 2,
      txt: "전공",
      width: "20"
    },
    {
      id: 3,
      txt: "이메일",
      width: "25"
    },
    {
      id: 4,
      txt: "승인",
      width: "20"
    },
  ],
  STATUS: {
    true: "대기",
    false: "거절"
  }
};