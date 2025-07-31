import { NextRequest, NextResponse } from "next/server";

const getToken = async (addresses: string[], chain: number = 1) => {
  const url = new URL(
    `https://api.1inch.dev/token/v1.4/${chain}/custom?addresses=${addresses.join(
      "&addresses="
    )}`
  );

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`,
    },
  });
  const data = await response.json();

  return data;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const chain = Number(searchParams.get("chain") ?? 1);
  const addresses = searchParams.get("address")?.split(",");

  if (!addresses) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  const token = await getToken(addresses, chain);
  return NextResponse.json(token);
}
