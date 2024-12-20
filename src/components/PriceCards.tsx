import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../hooks/index";
import toast from "react-hot-toast";

const env = import.meta.env.VITE_ENVIRONMENT;

function PriceCards() {
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const planData = [
    {
      price: "$5",
      tokens: 5,
      perTokenPrice: "$1",
      features: ["5 Tokens", "$1 per Token"],
      highlight: false,
      gradient: "from-gray-100 to-gray-200",
      priceId:
        env === "production"
          ? "price_1QXzDeF40ixAgrNfftRIseVZ"
          : "price_1QLfUtF40ixAgrNfyuMWGKUh",
    },
    {
      price: "$10",
      tokens: 15,
      perTokenPrice: "$0.67",
      features: ["15 Tokens", "Bonus 5 Tokens", "Save 33% per Token"],
      highlight: true,
      gradient: "from-[#3943B7]/10 to-purple-200/20",
      priceId:
        env === "production"
          ? "price_1QXzDmF40ixAgrNfPGSS96i9"
          : "price_1QLfe2F40ixAgrNfx1zpyWKP",
    },
    {
      price: "$15",
      tokens: 25,
      perTokenPrice: "$0.60",
      features: ["25 Tokens", "Bonus 10 Tokens", "Save 40% per Token"],
      highlight: false,
      gradient: "from-blue-100/10 to-[#3943B7]/10",
      priceId:
        env === "production"
          ? "price_1QXzDpF40ixAgrNfgIJNVdO1"
          : "price_1QLffZF40ixAgrNfYC0QcWZf",
    },
  ];

  const createCheckoutSession = useMutation({
    mutationFn: async (priceId: string) =>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
      {planData.map((plan, index) => (
        <div
          key={index}
          className={`relative group ${plan.highlight ? "scale-105" : ""}`}>
          <div
            className={`
          absolute inset-0 bg-gradient-to-br ${plan.gradient} 
          opacity-50 rounded-lg blur-lg scale-105 transition-all
          group-hover:opacity-80
        `}></div>

          <div
            className={`
          relative bg-white border rounded-lg p-6 py-20
          ${
            plan.highlight
              ? "border-[#3943B7]/30 shadow-2xl"
              : "border-gray-200"
          }
          transition-all hover:shadow-xl
        `}>
            {plan.highlight && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#3943B7] to-purple-600 text-white py-1 text-sm rounded-t-lg">
                Most Popular
              </div>
            )}

            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3943B7] to-purple-600 mb-6">
              {plan.price}
            </div>

            <div className="text-gray-600 mb-6">
              {plan.tokens} Tokens ({plan.perTokenPrice} per Token)
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#3943B7] mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() =>
                !user
                  ? navigate("/login")
                  : createCheckoutSession.mutate(plan.priceId)
              }
              className={`
            w-full py-3 rounded-lg transition-all
            ${
              plan.highlight
                ? "bg-gradient-to-r from-[#3943B7] to-purple-600 text-white hover:from-[#3943B7]/90 hover:to-purple-500"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }
          `}>
              Purchase
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PriceCards;
