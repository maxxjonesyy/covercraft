import { useMutation } from "@tanstack/react-query";
import TickSVG from "./TickSVG";
import useAxiosInstance from "../hooks/useAxiosInstance";
import toast from "react-hot-toast";

interface PriceCardProps {
  tokenCount: number;
  price: number;
  pricePerToken: number;
  priceId: string;
  bonusTokens?: number;
}

function PriceCard({
  tokenCount,
  price,
  pricePerToken,
  priceId,
  bonusTokens,
}: PriceCardProps) {
  const axiosInstance = useAxiosInstance();

  function handlePricePerToken(pricePerToken: number) {
    if (pricePerToken < 1) {
      return `${pricePerToken.toFixed(2)}c`;
    }

    return `${pricePerToken.toFixed(0)}`;
  }

  const createCheckoutSession = useMutation({
    mutationFn: async () =>
      await axiosInstance.post("/create-checkout-session", {
        priceId,
      }),
    onMutate: () => {
      toast.loading("Redirecting...");
    },
    onSuccess: ({ data }) => {
      toast.dismiss();

      if (data.url) {
        window.location.href = data.url;
      }
    },
  });

  return (
    <div className="flex flex-col border p-5 rounded-xl w-full max-h-[400px] md:max-w-[300px] shadow transition-shadow duration-300 hover:shadow-lg hover:shadow-accentBlue/40">
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

      <button
        onClick={() => createCheckoutSession.mutate()}
        className="mt-10 block w-full text-center bg-accentBlue text-white py-1.5 rounded-2xl">
        Purchase
      </button>
    </div>
  );
}

export default PriceCard;
