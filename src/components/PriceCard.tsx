import TickSVG from "./TickSVG";

interface PriceCardProps {
  tokenCount: number;
  price: number;
  pricePerToken: number;
  paymentUrl: string;
  bonusTokens?: number;
}

function PriceCard({
  tokenCount,
  price,
  pricePerToken,
  bonusTokens,
  paymentUrl,
}: PriceCardProps) {
  function handlePricePerToken(pricePerToken: number) {
    if (pricePerToken < 1) {
      return `${pricePerToken.toFixed(2)}c`;
    }

    return `${pricePerToken.toFixed(0)}`;
  }

  return (
    <div className="flex flex-col border p-5 rounded-xl w-full max-h-[400px] max-w-[300px] shadow">
      <p className="md:text-lg mb-2">{tokenCount} tokens</p>
      <p className="font-bold text-2xl border-b border-gray-200 pb-5">
        ${price}{" "}
        <span className="text-primary/50 font-normal text-base">/ AUD</span>
      </p>

      <ul className="mt-5 flex-grow">
        <li className="flex items-center gap-2 mt-5">
          <TickSVG />
          <p className="text-sm">{tokenCount} tokens</p>
        </li>

        <li className="flex items-center gap-2 mt-5">
          <TickSVG />
          <p className="text-sm">
            ${handlePricePerToken(pricePerToken)} per token
          </p>
        </li>

        {bonusTokens && (
          <li className="flex items-center gap-2 mt-5">
            <TickSVG />
            <p className="text-sm">Bonus {bonusTokens} tokens</p>
          </li>
        )}
      </ul>

      <a
        href={paymentUrl}
        className="mt-10 block w-full text-center bg-accentBlue text-white py-1.5 rounded-2xl">
        Purchase
      </a>
    </div>
  );
}

export default PriceCard;
