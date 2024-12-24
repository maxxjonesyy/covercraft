import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../hooks";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type PaymentStatus = "pending" | "success" | "error";

function PaymentRedirect() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const axiosInstance = useAxiosInstance();
  const [status, setStatus] = useState<PaymentStatus>("pending");

  const config = {
    pending: {
      title: "Processing Payment",
      description:
        "Please don't close this page, we are sorting out some stuff on our end",
      toast: "Processing Payment",
    },
    success: {
      title: "Successful Payment",
      description:
        "Tokens have been added to your account, we will now redirect you",
      toast: "Successful Payment",
      redirect: true,
    },
    error: {
      title: "Error Processing Payment",
      description:
        "There was an error processing your payment, please try again later",
      toast: "Error Processing Payment",
      redirect: true,
    },
  };

  function handleRedirect() {
    let timeToRedirect = 5;

    const interval = setInterval(() => {
      const timer = document.getElementById("timer");

      if (timer) {
        timeToRedirect--;
        timer.innerText = timeToRedirect.toString();
      }

      if (timeToRedirect === 0) {
        clearInterval(interval);
        navigate("/token");
      }
    }, 1000);
  }

  const verifyPayment = useMutation({
    mutationFn: async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        throw new Error("Missing session ID");
      }

      return await axiosInstance.get(`/verify-payment/${sessionId}`, {
        params: { email: user?.email },
      });
    },
    onMutate: () => {
      setStatus("pending");
    },
    onSuccess: (response) => {
      if (response?.data) {
        setUser((prev: any) => ({
          ...prev,
          tokenCount: response.data,
        }));

        setStatus("success");
      }
    },
    onError: () => {
      setStatus("error");
    },
  });

  useEffect(() => {
    switch (status) {
      case "pending":
        toast.dismiss();
        toast.loading(config.pending.toast);
        verifyPayment.mutate();
        break;
      case "success":
        toast.dismiss();
        toast.success(config.success.toast);
        handleRedirect();
        break;
      case "error":
        toast.dismiss();
        toast.error(config.error.toast);
        handleRedirect();
        break;
      default:
        toast.dismiss();
        break;
    }
  }, [status]);

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="container justify-center text-center">
      <h1 className="text-3xl my-3">
        {config[status].title}

        {status === "pending" && (
          <span className="animate-pulse text-accentBlue">...</span>
        )}
      </h1>
      <p>{config[status].description}</p>
      <p className="font-bold mt-5">
        Redirecting in{" "}
        <span id="timer" className="text-accentBlue">
          5
        </span>{" "}
        seconds
      </p>
    </motion.div>
  );
}

export default PaymentRedirect;
