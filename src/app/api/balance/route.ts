import { NextRequest, NextResponse } from "next/server";

import omitBy from "lodash/omitBy";

const getBalance = async (walletAddress: string, chain: number = 1) => {
  const url = `https://api.1inch.dev/balance/v1.2/${chain}/balances/${walletAddress}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`,
    },
  });
  const data = await response.json();

  return omitBy(data, (value) => value === "0");
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const chain = Number(searchParams.get("chain") ?? 1);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  const balance = await getBalance(address, chain);
  return NextResponse.json(balance);
}
