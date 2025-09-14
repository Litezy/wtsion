import { ArrowRight, Shield, Star, TrendingUp, Zap } from "lucide-react";
import { fadeInUp, useScrollAnimation } from "../hooks/useScrollAnimation";

export const Hero: React.FC = () => {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [titleRef, titleVisible] = useScrollAnimation();
  const [subtitleRef, subtitleVisible] = useScrollAnimation();
  const [buttonsRef, buttonsVisible] = useScrollAnimation();
  const [cardsRef, cardsVisible] = useScrollAnimation();

  return (
    <section className="relative pt-24 pb-10 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          ref={heroRef as any}
          style={fadeInUp(heroVisible, 0)}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">WorldStreet Ecosystem</span>
          </div>
        </div>

        <h1 
          ref={titleRef as any}
          style={fadeInUp(titleVisible, 0.2)}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          The Future of
          <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Digital Finance
          </span>
        </h1>

        <p 
          ref={subtitleRef as any}
          style={fadeInUp(subtitleVisible, 0.4)}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          wTSION powers the WorldStreet ecosystem - your all-in-one platform for crypto trading, 
          e-commerce, and decentralized financial services.
        </p>

        <div 
          ref={buttonsRef as any}
          style={fadeInUp(buttonsVisible, 0.6)}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center space-x-2 transform hover:scale-105">
            <span>Explore Ecosystem</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 font-semibold flex items-center space-x-2">
            <span>Watch Demo</span>
          </button>
        </div>

        <div 
          ref={cardsRef as any}
          style={fadeInUp(cardsVisible, 0.8)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Crypto Trading</h3>
            <p className="text-gray-300">Advanced trading tools for crypto, CFDs, and futures</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure Marketplace</h3>
            <p className="text-gray-300">Buy and sell goods on our Tsionmart platform</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">DeFi Services</h3>
            <p className="text-gray-300">Staking, governance, and crypto-backed loans</p>
          </div>
        </div>
      </div>
    </section>
  );
};