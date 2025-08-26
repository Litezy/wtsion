import React from 'react';
import { CheckCircle, PieChart, TrendingUp, Shield, Lock, Users } from 'lucide-react';

const Tokenomics:React.FC = () => {
  const distribution = [
    { 
      category: 'Public Sale', 
      percentage: 30, 
      amount: '300,000,000', 
      color: 'from-cyan-400 to-blue-500',
      description: 'Fair distribution to community members'
    },
    { 
      category: 'Ecosystem Development', 
      percentage: 25, 
      amount: '250,000,000', 
      color: 'from-indigo-400 to-indigo-600',
      description: 'Funding for app features, partnerships, and innovations'
    },
    { 
      category: 'Team & Advisors', 
      percentage: 20, 
      amount: '200,000,000', 
      color: 'from-purple-400 to-purple-600',
      description: 'Vested over 24 months with 6-month cliff'
    },
    { 
      category: 'Liquidity Pool', 
      percentage: 15, 
      amount: '150,000,000', 
      color: 'from-green-400 to-green-600',
      description: 'Ensuring market stability'
    },
    { 
      category: 'Marketing & Growth', 
      percentage: 10, 
      amount: '100,000,000', 
      color: 'from-pink-400 to-pink-600',
      description: 'Global awareness initiatives'
    }
  ];

  const vestingSchedule = [
    { category: 'Team & Advisors', schedule: 'Locked linearly over 24 months with 6-month cliff' },
    { category: 'Ecosystem Development', schedule: 'Released quarterly based on milestone achievements' },
    { category: 'Liquidity Pool', schedule: 'Immediate release to ensure stability' },
    { category: 'Marketing & Growth', schedule: 'Gradual release aligned with campaigns' },
  ];

  const tokenUtilities = [
    {
      title: 'Transactions',
      description: 'Medium of exchange on Tsionmart for goods and services',
      icon: TrendingUp,
    },
    {
      title: 'Fee Discounts',
      description: 'Reduced fees for trades and services when using wTSION',
      icon: Users,
    },
    {
      title: 'Staking Rewards',
      description: 'Earn yields by staking tokens',
      icon: Shield,
    },
    {
      title: 'Governance',
      description: 'Vote on proposals shaping the WorldStreet ecosystem',
      icon: Lock,
    },
    {
      title: 'Collateral',
      description: 'Secure crypto-backed loans using wTSION holdings',
      icon: Shield,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Token<span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">omics</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transparent and sustainable token distribution designed for long-term ecosystem growth
          </p>
        </div>

        {/* Token Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
            <PieChart className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">1B</div>
            <div className="text-gray-300">Total Supply</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">wTSION</div>
            <div className="text-gray-300">Ticker</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
            <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">BEP-20</div>
            <div className="text-gray-300">Token Standard</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
            <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">BSC</div>
            <div className="text-gray-300">Blockchain</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Distribution */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-2">
              <PieChart className="w-6 h-6" />
              <span>Token Distribution</span>
            </h2>
            <div className="space-y-6">
              {distribution.map((item, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{item.category}</span>
                    <span className="text-cyan-300 font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden mb-2">
                    <div 
                      className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 group-hover:brightness-110`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.amount} wTSION</span>
                    <span className="text-gray-400">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Utilities */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Token Utilities</h3>
              <div className="space-y-6">
                {tokenUtilities.map((utility, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-700/30 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <utility.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1">{utility.title}</h4>
                      <p className="text-gray-300 text-sm">{utility.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vesting */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Vesting Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vestingSchedule.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/30">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium">{item.category}</h4>
                  <p className="text-gray-300 text-sm">{item.schedule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Participate in the wTSION Economy?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of users already benefiting from the WorldStreet ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-semibold">
                Buy wTSION
              </button>
              <button className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 font-semibold">
                View Whitepaper
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
