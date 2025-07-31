export type Token = {
  chain_id: number;
  address: string;
  decimals: number;
  symbol: string;
  name: string;
};

export type ChainInfo = {
  chain_id: number;
  chain_name: string;
  chain_icon: string;
  native_token: Token;
};

export type ChainWithBalances = {
  name: string;
  logo: string;
  id: number;
};

export type ChainBalances = Record<string, Record<string, string>>;

export type TokenInfo = {
  address: string;
  chainId: number;
  decimals: number;
  name: string;
  symbol: string;
  providers: string[];
  logoURI: string;
  eip2612: boolean;
  tags: string[];
  rating: number;
  balance: string;
  priceInUSD: string;
  isSelected: boolean;
};

export type TokenMap = Record<string, TokenInfo>;
