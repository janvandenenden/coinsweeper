import { NextResponse } from "next/server";

const getSupportedChains = async () => {
  const url = `https://api.1inch.dev/portfolio/portfolio/v5.0/general/supported_chains`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`,
    },
  });
  const data = await response.json();

  return data;
};

export async function GET() {
  const supportedChains = await getSupportedChains();
  return NextResponse.json(supportedChains.result);
}
