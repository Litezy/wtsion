import React, { useEffect, useState } from "react";
import { Globe, Coins, Shield, Zap, CheckCircle, X } from "lucide-react";
import { ModalLayout } from "./ModalLayout";

const TokenInfo:React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wallet, setWallet] = useState("");
    const [amount, setAmount] = useState("");
    const [errors, setErrors] = useState<{ wallet?: string; amount?: string }>({});

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

    const validateForm = () => {
        const newErrors: { wallet?: string; amount?: string } = {};

        if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
            newErrors.wallet = "Please enter a valid BNB Smart Chain wallet address.";
        }
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            newErrors.amount = "Please enter a valid token amount.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Submitting:", { wallet, amount });
            // 🚀 You can send this to backend/API
            setIsModalOpen(false);
            setWallet("");
            setAmount("");
            setErrors({});
        }
    };


    useEffect(() => {
        if (errors?.amount || errors?.wallet) {
            const timer = setTimeout(() => {
                setErrors({ wallet: '', amount: '' });
            }, 3000);

            return () => clearTimeout(timer); // cleanup
        }
    }, [errors]);

    return (
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Meet{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            wTSION
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        The native token powering the entire WorldStreet ecosystem, enabling
                        seamless transactions and unlocking exclusive features across our
                        platform.
                    </p>
                </div>

                {/* Token Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {tokenStats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 group hover:transform hover:scale-105"
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {stat.label}
                            </h3>
                            <p className="text-cyan-300 font-medium">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group hover:transform hover:-translate-y-2"
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

                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Migration Notice CTA */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Migration to Upgraded Contract
                        </h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            We have successfully upgraded our smart contract. If you currently
                            hold <span className="text-cyan-400 font-semibold">wTSION</span>{" "}
                            tokens, please submit your wallet address and token balance. Our
                            team will airdrop the same amount to your address on the new
                            contract.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-semibold"
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
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
                <h3 className="text-xl font-bold text-white mb-4">Submit Your Details</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Wallet Address</label>
                        <input
                            type="text"
                            value={wallet}
                            onChange={(e) => setWallet(e.target.value)}
                            placeholder="0x..."
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-cyan-400"
                        />
                        {errors.wallet && (
                            <p className="text-red-400 text-sm mt-1">{errors.wallet}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm mb-1">Amount Held</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            inputMode="decimal"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-cyan-400"
                        />
                        {errors.amount && (
                            <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-semibold"
                    >
                        Submit
                    </button>
                </form>
            </ModalLayout>
        </section>
    );
};

export default TokenInfo;
