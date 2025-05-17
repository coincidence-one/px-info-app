

import { NextResponse } from "next/server";

const OPENAPI_URL = process.env.OPENAPI_URL;
const API_KEY = process.env.OPENAPI_USER_AUTHENTICATION_KEY;

export async function GET() {
  const TYPE = "json";
  const SERVICE = "DS_MND_PX_PARD_PRDT_INFO";
  const START_INDEX = 1;
  const END_INDEX = 100;

  const url = `${OPENAPI_URL}/${API_KEY}/${TYPE}/${SERVICE}/${START_INDEX}/${END_INDEX}/`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("PX 인기상품 OpenAPI fetch error:", error);
    return NextResponse.json({ error: "PX 인기상품 정보 로딩 실패" }, { status: 500 });
  }
}