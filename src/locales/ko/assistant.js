const assistant = {
  mode: "ko",
  learnMore: "자세히 보기",
  assistantPlan: "어시스턴트 플랜",
  title: `무료 소통 보조 외에도 어시스턴트는\n많은 것을 할 수 있습니다.`,
  service: "제공 서비스",
  first: {
    title1: "기업 맞춤형 어시스턴트로",
    title2: "더 정확하고 신속하게",
    subtitle1: "1% OF THE INDUSTRY",
    subtitle2: "프로젝트 성공을 위해 어시스턴트의 역할을 확장하세요.",
  },
  second: {
    options: {
      month: "월 구독",
      year: "1년 구독",
    },
    card: {
      free: "무료",
      currency: "만 원",
      month: "/ 월",
      year: "/ 1년",
      menu1: "고객 지원 및 분쟁 해결",
      menu2: "개발자 매칭 시 마일스톤 검증",
      menu3: "월 30시간 요청 가능",
      menu3_diff: "업무시간 상시 요청 가능",
      menu4: "중간관리 및 소통 보조",
      continue: "계속하기",
    },
    1: {
      title: "베이식 플랜",
      text: "소통 보조, 마일스톤 검증 및 분쟁을 해결",
    },
    2: {
      title: "스탠다드 플랜",
      text: "헤드헌팅 및 코딩 지식 보유",
    },
    3: {
      title: "엔터프라이즈 플랜",
      text: `기업 맞춤형 PM\n업무시간 상시 대기, 코드 검사 등`,
    },
  },
  third: {
    title: "어시스턴트의 역할 한눈에 보기",
    subtitle: "어시스턴트의 역할은 플랜마다 다르지만 기본적으로 제공되는 서비스는 아래와 같습니다.",
    1: {
      title: "마일스톤 검증",
      text: "모든 채용은 최소 한 달 이상의 마일스톤을 설정해야 하며, 요청 시 기업의 전달 내용과 개발자의 이해사항이 일치하는지 확인해 드립니다.",
    },
    2: {
      title: "분쟁시 관여",
      text: "매달 기업은 개발자에 대한 평가를 진행하며, 문제가 있을 시 kookje.in에서 마일스톤과 개발자의 업무내용을 바탕으로 분쟁을 조정합니다.",
    },
    3: {
      title: "비상 상황 해결",
      text: "개발자 대체 필요시 1주일 내로 대체자를 찾고 인수인계를 보조합니다.",
    },
    4: {
      title: "월 30시간 보조 (스탠다드 플랜)",
      text: "번역, 통역, 영상 미팅 참여 등 여러 가지의 보조 업무를 월 30시간에 한에 어시스턴트를 요청할 수 있습니다.",
    },
    5: {
      title: "중간 관리 및 소통 담당 (엔터프라이즈 플랜)",
      text: "기업은 개발자에게 할당할 업무를 kookje.in PM을 통해 전달할 수 있습니다. 소통에 어려움을 느끼신다면 이용을 권장 드립니다.",
    },
    6: {
      title: "업무시간 상시 대기 (엔터프라이즈 플랜)",
      text: "스탠다드와 다르게 월 30시간의 제한이 없고 업무시간에는 PM은 항상 상시 대기 중입니다.",
    },
  },
  fourth: {
    title: "우리 기업에 최적화된 플랜",
    subtitle1: "영어로 소통이 어느 정도 가능하다면 베이식 플랜.",
    subtitle2: "영어로 소통이 가능하되 도움이 많이 필요할 땐 스탠다드 플랜.",
    subtitle3: "소통이 불가능할 정도로 어려움을 겪는다면 엔터프라이즈 플랜.",
  },

  communication: "개발자 소통 언어에 능통",
  pre_contract_communication_support: "계약 전 소통 보조",
  pre_contract_milestone_verification: "계약 전 마일스톤 검증",
  involvement_in_disputes: "분쟁시 관여",
  post_contract_communication_support: "계약 후 소통 보조",
  third_party_meeting_request: "3자 미팅 요청 가능",
  assistant_coding_knowledge: "어시스턴트 코딩 지식 보유",
  developer_headhunting: "개발자 헤드헌팅",
  knowledge_transfer: "인수인계",
  on_call_during_business_hours: "업무시간 상시 대기",
  code_review_phase1: "1차 코드 검증",
  bug_resolution_emergency: "비상 시 버그 해결",

  communication_description: "모든 국제인 어시스턴트는 영어에 능통하며 개발자와 영어로 원할한 소통이 가능합니다.",
  pre_contract_communication_support_description:
    "프로젝트 등록 시 마일스톤을 같이 등록하게 됩니다. 요청시 기업의 전달내용과 개발자의 이해사항이 일치하는지 검증합니다. 마일스톤 검증 리포트는 플랫폼에 등록됩니다.",
  pre_contract_milestone_verification_description:
    "계약 진행 전, 개발자가 프로젝트의 요청사항을 정확히 이해했는지 검토합니다.",
  involvement_in_disputes_description: "개발자와 기업 간에 분쟁이 일어날 시, 관여를 하여 에스크로 환불을 진행합니다.",
  post_contract_communication_support_description:
    "개발자와의 소통에 있어 계약이 성사된 이후에도 꾸준히 보조를 하며 Enterprise 플랜 고객은 요청 시 소통을 전담할 수 있습니다.",
  third_party_meeting_request_description:
    "개발자와 기업이 화상으로 미팅 시에 참여하여 소통 보조를 하며, 통역이 필요할 시 통역까지 담당합니다.",
  assistant_coding_knowledge_description:
    "프로젝트의 스팩에 따라 개발 지식을 보유한 어시스턴트로 교체되어 기업 담당자와 개발자 간의 소통에 오류가 없는지 검토합니다.",
  developer_headhunting_description:
    "처음 프로젝트 등록 시, 프로젝트 스팩에 맞는 개발자를 추천해주며, 개발자 대체 필요시에 1주일 내로 대체자를 구합니다.",
  knowledge_transfer_description: "개발자 대체 필요시 인수인계를 하여 계획에 차질이 없게 돕습니다.",
  on_call_during_business_hours_description: "업무시간에 전화로 소통이 가능하며 부재 시 빠른 시간 내에 답장합니다.",
  code_review_phase1_description:
    "어시스턴트는 개발 지식을 보유하고 있어 개발자의 코드 검증을 내부적으로 1차 검증할 수 있습니다. (고객 요청 시)",
  bug_resolution_emergency_description:
    "어시스턴트는 개발 지식을 보유하고 있어 시차가 다른 개발자의 부재 중 버그를 수정해야 할 시 빠르게 검토하거나 개발자에게 연락을 합니다.",

  basic_possible: "개발자와 계약 전 가능",
  standard_possible: "월 30시간에 한에 가능",
  enterprise_possible: "업무시간 상시 요청 가능",

  seventh: {
    kookjein: "국제인과 시작하세요",
    title: "합리적인 가격으로 상위 3%의 개발자 채용",
    button: "무료 개발자 매칭 시작",
    create: "무료로 프로젝트 등록하기",
  },
};

export default assistant;
