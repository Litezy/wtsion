import React from 'react';
import { Users, TrendingUp, Shield, Zap, ArrowRight, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Hero } from '../components/Hero';
import TokenInfo from '../components/TokenInfo';



// Animation variants
const fadeInUp = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
  transition: `all 0.6s ease-out ${delay}s`,
});

const scaleIn = (isVisible: boolean, delay = 0) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'scale(1)' : 'scale(0.9)',
  transition: `all 0.6s ease-out ${delay}s`,
});



// Main Home Component
const Home: React.FC = () => {
  const [statsRef, statsVisible] = useScrollAnimation();
  const [ecosystemTitleRef, ecosystemTitleVisible] = useScrollAnimation();
  const [ecosystemCardsRef, ecosystemCardsVisible] = useScrollAnimation();
  const [newsletterRef, newsletterVisible] = useScrollAnimation();

  const stats = [
    { number: '10K+', label: 'Active Users', icon: Users },
    { number: '$50M+', label: 'Total Volume', icon: TrendingUp },
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '24/7', label: 'Support', icon: Zap }
  ];

  const ecosystemFeatures = [
    {
      title: 'WorldStreet Trading',
      description: 'Advanced crypto trading with professional tools and real-time analytics',
      icon: TrendingUp,
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'Tsiomart Marketplace',
      description: 'Secure e-commerce platform for buying and selling goods with crypto',
      icon: Shield,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      title: 'DeFi Services',
      description: 'Comprehensive financial services including staking, lending, and governance',
      icon: Zap,
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Stats Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={statsRef as any}
            style={fadeInUp(statsVisible)}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group"
                style={fadeInUp(statsVisible, index * 0.1)}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Features */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={ecosystemTitleRef as any}
            style={fadeInUp(ecosystemTitleVisible)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Complete <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Ecosystem</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need for modern digital finance in one integrated platform
            </p>
          </div>

          <div 
            ref={ecosystemCardsRef as any}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {ecosystemFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 group hover:transform hover:-translate-y-2"
                style={scaleIn(ecosystemCardsVisible, index * 0.2)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TokenInfo/>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            ref={newsletterRef as any}
            style={fadeInUp(newsletterVisible)}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
          >
            <Star className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-6">
              Get the latest news, updates, and exclusive insights from the WorldStreet ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              />
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;