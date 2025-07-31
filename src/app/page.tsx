import { ConnectButton } from "@rainbow-me/rainbowkit";
import AssetOverview from "@/components/AssetOverview";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen">
      <main className="w-full border-b border-gray-200 py-2">
        <div className="container flex justify-between items-center mx-auto px-2 lg:px-0">
          <p className="text-2xl font-bold">CoinSweeper</p>
          <ConnectButton />
        </div>
      </main>
      <div className="container-lg mx-auto px-2 lg:px-0 py-8 text-center">
        <h1 className="text-7xl font-bold mb-4">Move Everything,</h1>
        <h1 className="text-7xl font-bold mb-4">Miss Nothing</h1>
        <p className="text-2xl font-light">
          Consolidate leftover funds from all chains into one wallet — gas-free.
        </p>
        <div className="py-8 w-full">
          <AssetOverview />
        </div>
      </div>
    </div>
  );
}
