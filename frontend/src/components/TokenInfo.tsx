import React, { useEffect, useState } from "react";
import { Globe, Coins, Shield, Zap, CheckCircle, X } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { ModalLayout } from "./ModalLayout";
import { submitUserData } from "../services/submitData";
import LoadingEffect from "../shared/LoadingEffect";

// Animation variants
const fadeInUp = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "translateY(0px)" : "translateY(30px)",
  transition: `all 0.6s ease-out ${delay}s`,
});

const scaleIn = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "scale(1)" : "scale(0.9)",
  transition: `all 0.6s ease-out ${delay}s`,
});

const fadeInLeft = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "translateX(0px)" : "translateX(-50px)",
  transition: `all 0.6s ease-out ${delay}s`,
});

const fadeInRight = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "translateX(0px)" : "translateX(50px)",
  transition: `all 0.6s ease-out ${delay}s`,
});

const TokenInfo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // form states
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);

  const [errors, setErrors] = useState<{
    wallet?: string;
    amount?: string;
    email?: string;
    screenshot?: string;
  }>({});

  // Animation refs
  const [titleRef, titleVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  const tokenStats = [
    { label: "Token Name", value: "WorldStreet Tsion", icon: Globe },
    { label: "Symbol", value: "wTSION", icon: Coins },
    { label: "Network", value: "BNB Smart Chain", icon: Shield },
    { label: "Type", value: "BEP-20", icon: Zap },
  ];

  const features = [
    {
      title: "Low Transaction Fees",
      description: "Minimal fees for all WorldStreet app transactions",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      title: "Governance Rights",
      description: "Vote on important ecosystem decisions and proposals",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      title: "Staking Rewards",
      description: "Earn passive income by staking your wTSION tokens",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      title: "Marketplace Access",
      description: "Use tokens for purchases on Tsiomart platform",
      gradient: "from-orange-400 to-red-500",
    },
    {
      title: "Financial Services",
      description: "Access crypto-backed loans and financial products",
      gradient: "from-indigo-400 to-purple-500",
    },
    {
      title: "Exclusive Benefits",
      description: "Premium features and early access to new services",
      gradient: "from-cyan-400 to-blue-500",
    },
  ];

  // ✅ Validation for all fields
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      newErrors.wallet = "Please enter a valid BNB Smart Chain wallet address.";
    }
    const numericAmount = Number(amount.replace(/,/g, ''));
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      newErrors.amount = "Please enter a valid token amount.";
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!screenshot) {
      newErrors.screenshot = "Screenshot is required.";
    } else if (screenshot.size > 5 * 1024 * 1024) {
      newErrors.screenshot = "File must not exceed 5MB.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  // auto-clear errors after 3s
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true); // start loading

    try {
      const result = await submitUserData(
        wallet,
        amount.replace(/,/g, ""), // remove commas
        email,
        screenshot
      );

      if (result) {
        // Reset form on success
        setWallet("");
        setAmount("");
        setEmail("");
        setScreenshot(null);
        setErrors({});
        setIsModalOpen(false);
      }
    } catch (err: any) {
      console.log(err)
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div
          ref={titleRef as any}
          style={fadeInUp(titleVisible)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              wTSION
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The native token powering the entire WorldStreet ecosystem,
            enabling seamless transactions and unlocking exclusive features
            across our platform.
          </p>
        </div>

        {/* Token Stats */}
        <div
          ref={statsRef as any}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {tokenStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 group hover:transform hover:scale-105"
              style={scaleIn(statsVisible, index * 0.1)}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {stat.label}
              </h3>
              <p className="text-cyan-300 font-medium">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div
          ref={featuresRef as any}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group hover:transform hover:-translate-y-2"
              style={
                index % 2 === 0
                  ? fadeInLeft(featuresVisible, index * 0.1)
                  : fadeInRight(featuresVisible, index * 0.1)
              }
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-8 h-8 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Migration Notice CTA */}
        <div className="text-center">
          <div
            ref={ctaRef as any}
            style={fadeInUp(ctaVisible)}
            className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Migration to Upgraded Contract
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We have successfully upgraded our smart contract. If you
              currently hold{" "}
              <span className="text-cyan-400 font-semibold">wTSION</span>{" "}
              tokens, please submit your wallet address, token balance, and
              email. A screenshot is required for verification.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-semibold transform hover:scale-105"
            >
              Submit Details
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalLayout isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            Submit Your Details
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Wallet */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {errors.wallet && (
              <p className="text-red-400 text-sm mt-1">{errors.wallet}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Amount Held
            </label>
            <input
              type="text" // use text so formatted numbers with commas work
              value={amount}
              onChange={(e) => {
                // Remove any non-digit characters (except dot for decimals)
                const rawValue = e.target.value.replace(/,/g, '');
                const numericValue = Number(rawValue);

                if (!isNaN(numericValue)) {
                  setAmount(numericValue.toLocaleString());
                } else {
                  setAmount('');
                }
              }}
              placeholder="Enter amount"
              inputMode="decimal"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />

            {errors.amount && (
              <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Screenshot */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Upload Screenshot
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size > 5 * 1024 * 1024) {
                  setErrors((prev) => ({
                    ...prev,
                    screenshot: "File must not exceed 5MB",
                  }));
                  setScreenshot(null);
                } else {
                  setScreenshot(file || null);
                  setErrors((prev) => ({ ...prev, screenshot: "" }));
                }
              }}
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/40 cursor-pointer"
            />
            {errors.screenshot && (
              <p className="text-red-400 text-sm mt-1">{errors.screenshot}</p>
            )}
          </div>

          {/* Submit */}
          <LoadingEffect type="submit" isLoading={isLoading}>
            Submit
          </LoadingEffect>
        </form>
      </ModalLayout>
    </section>
  );
};

export default TokenInfo;
