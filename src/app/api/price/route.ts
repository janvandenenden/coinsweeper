import { NextRequest, NextResponse } from "next/server";

const getPrice = async (
  addresses: string[],
  currency: string = "USD",
  chain: number = 1
) => {
  const url = new URL(
    `https://api.1inch.dev/price/v1.1/${chain}/${addresses.join(",")}`
  );
  url.search = new URLSearchParams({ currency }).toString();

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
  const address = searchParams.get("address")?.split(",");
  const currency = searchParams.get("currency") ?? "USD";

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  const price = await getPrice(address, currency, chain);
  return NextResponse.json(price);
}
