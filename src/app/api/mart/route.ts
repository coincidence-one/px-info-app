import { NextResponse } from "next/server";

const OPENAPI_URL = process.env.OPENAPI_URL;
const API_KEY = process.env.OPENAPI_USER_AUTHENTICATION_KEY;

export async function GET() {
  const TYPE = "json";
  const SERVICE = "TB_MND_MART_CURRENT";
  const START_INDEX = 1;
  const END_INDEX = 122;

  const url = `${OPENAPI_URL}/${API_KEY}/${TYPE}/${SERVICE}/${START_INDEX}/${END_INDEX}/`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("PX OpenAPI fetch error:", error);
    return NextResponse.json({ error: "PX 정보 로딩 실패" }, { status: 500 });
  }
}