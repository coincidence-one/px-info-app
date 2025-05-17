export interface PxMart {
  SEQ: number;                 // 순번
  MART: string;               // 마트명
  SCALE: number | string;     // 규모 
  OP_WEEKDAY: string;         // 평일 운영시간
  OP_SAT: string;             // 토요일 운영시간 
  OP_SUN: string;             // 일요일 운영시간
  LUNCH_WEEKDAY: string;      // 평일 점심시간
  LUNCH_SAT: string;          // 토요일 점심시간
  LUNCH_SUN: string;          // 일요일 점심시간
  NOTE: string;               // 비고
  TEL: string;                // 전화번호
  LOC: string;                // 주소
}

export interface PxMartResponse {
  TB_MND_MART_CURRENT: {
    list_total_count: number;
    row: PxMart[];
  };
}