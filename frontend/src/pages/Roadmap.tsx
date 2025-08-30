import React from 'react';
import { CheckCircle, Rocket, Target, Globe, Users } from 'lucide-react';
import { AnimatedSection, staggerChildren } from '../hooks/useScrollAnimation';

const Roadmap: React.FC = () => {
  const roadmapItems = [
    {
      quarter: 'Q1 2024',
      title: 'Foundation & Launch',
      items: [
        'wTSION token launch on BSC',
        'Initial liquidity provision',
        'Community building initiatives',
        'Security audits completion',
        'Core team assembly'
      ],
      status: 'completed',
      icon: Rocket,
      achievements: '✅ Successfully launched with $2M initial liquidity'
    },
    {
      quarter: 'Q2 2024',
      title: 'Core Platform Development',
      items: [
        'WorldStreet app beta release',
        'Basic trading features implementation',
        'Wallet integration (MetaMask, Trust)',
        'Mobile app development start',
        'User onboarding system'
      ],
      status: 'completed',
      icon: Target,
      achievements: '✅ 5,000+ beta users onboarded successfully'
    },
    {
      quarter: 'Q3 2024',
      title: 'Marketplace Integration',
      items: [
        'Tsiomart marketplace launch',
        'Merchant onboarding program',
        'Payment gateway integration',
        'Advanced trading tools rollout',
        'Multi-language support (Phase 1)'
      ],
      status: 'current',
      icon: Globe,
      progress: 75,
      achievements: '🚀 200+ merchants already onboarded'
    },
    {
      quarter: 'Q4 2024',
      title: 'DeFi Services Expansion',
      items: [
        'Staking platform launch',
        'Governance system implementation',
        'Crypto-backed lending protocol',
        'Partnership with major exchanges',
        'NFT marketplace integration'
      ],
      status: 'upcoming',
      icon: CheckCircle,
      target: 'Expected 10,000+ active stakers'
    },
    {
      quarter: 'Q1 2025',
      title: 'Global Expansion',
      items: [
        'Multi-language support completion',
        'International partnership deals',
        'Enhanced mobile app features',
        'Cross-chain bridge development',
        'Regulatory compliance (EU/US)'
      ],
      status: 'upcoming',
      icon: Globe,
      target: 'Target: 50+ countries supported'
    },
    {
      quarter: 'Q2 2025',
      title: 'Advanced Features & AI',
      items: [
        'AI-powered trading insights',
        'Advanced DeFi products launch',
        'Enterprise solutions rollout',
        'Global marketplace expansion',
        'Institutional investor onboarding'
      ],
      status: 'upcoming',
      icon: Target,
      target: 'Goal: $100M+ TVL across ecosystem'
    },
    {
      quarter: 'Q4 2025',
      title: 'Migration & App Beta',
      items: [
        'wTSION Migration + Airdrop completion',
        'WorldStreet App Beta Launch'
      ],
      status: 'upcoming',
      icon: Rocket,
      target: 'Seamless migration & strong beta adoption'
    },
    {
      quarter: 'Q1 2026',
      title: 'Mainstream Release',
      items: [
        'Full app release on iOS/Android',
        'First CEX Listings'
      ],
      status: 'upcoming',
      icon: Globe,
      target: 'Target: 50,000+ daily active users'
    },
    {
      quarter: 'Q2 2026',
      title: 'Commerce & Lending',
      items: [
        'Tsionmart vendor onboarding',
        'Loan feature launch'
      ],
      status: 'upcoming',
      icon: Target,
      target: '1000+ vendors, lending live'
    },
    {
      quarter: 'Q3 2026',
      title: 'Global Governance',
      items: [
        'Global fiat gateway expansion',
        'Governance module launch'
      ],
      status: 'upcoming',
      icon: CheckCircle,
      target: 'Fully decentralized governance model'
    }
  ];

  const milestones = [
    { metric: 'Users Onboarded', current: '10,000+', target: '100,000+' },
    { metric: 'Trading Volume', current: '$50M+', target: '$1B+' },
    { metric: 'Merchants', current: '200+', target: '5,000+' },
    { metric: 'Countries', current: '15', target: '50+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <AnimatedSection animation="fadeInUp" className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
            Road<span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">map</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Our journey towards building the most comprehensive digital finance ecosystem
          </p>
        </AnimatedSection>

        {/* Key Milestones - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {milestones.map((milestone, index) => (
            <AnimatedSection
              key={index}
              animation="scaleIn"
              delay={staggerChildren(index)}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 text-center"
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{milestone.metric}</h3>
              <div className="text-xl sm:text-2xl font-bold text-cyan-300 mb-1">{milestone.current}</div>
              <div className="text-xs sm:text-sm text-gray-400">Target: {milestone.target}</div>
            </AnimatedSection>
          ))}
        </div>

        {/* Timeline - Mobile-First Design */}
        <div className="relative">
          {/* Desktop timeline line (hidden on mobile) */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-500 opacity-30"></div>
          
          {/* Mobile timeline line (visible on mobile/tablet) */}
          <div className="lg:hidden absolute left-8 sm:left-12 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-500 opacity-30"></div>

          <div className="space-y-8 sm:space-y-12">
            {roadmapItems.map((item, index) => (
              <AnimatedSection
                key={index}
                animation={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
                delay={staggerChildren(index)}
                className={`relative flex items-start lg:items-center ${
                  // Desktop: alternating layout, Mobile: consistent left layout
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-row`}
              >
                {/* Mobile Timeline Dot (visible on mobile/tablet) */}
                <div className="lg:hidden flex-shrink-0 mr-6 sm:mr-8">
                  <div className={`relative z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-4 ${
                    item.status === 'completed' ? 'bg-green-400 border-green-400' :
                    item.status === 'current' ? 'bg-cyan-400 border-cyan-400 animate-pulse' :
                    'bg-gray-600 border-gray-600'
                  }`}>
                    {item.status === 'current' && (
                      <div className="absolute -inset-1 rounded-full bg-cyan-400 opacity-25 animate-ping"></div>
                    )}
                  </div>
                </div>

                {/* Timeline Card - Responsive Width */}
                <div className={`flex-1 lg:w-1/2 ${
                  // Desktop spacing, Mobile full width
                  index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'
                }`}>
                  <div className={`bg-white/10 backdrop-blur-md border rounded-xl sm:rounded-2xl p-4 sm:p-6 ${
                    item.status === 'completed' ? 'border-green-500/50 bg-green-500/5' :
                    item.status === 'current' ? 'border-cyan-500/50 bg-cyan-500/5' :
                    'border-gray-600/50'
                  } hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105`}>
                    
                    {/* Header - Responsive Layout */}
                    <div className={`flex items-center space-x-3 mb-4 ${
                      // Desktop: alternating alignment, Mobile: always left
                      index % 2 === 0 ? 'lg:justify-end justify-start' : 'justify-start'
                    }`}>
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'current' ? 'bg-cyan-500' :
                        'bg-gray-600'
                      } ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className={index % 2 === 0 ? 'lg:order-1 lg:text-right' : 'lg:order-2'}>
                        <span className="text-xs sm:text-sm font-semibold text-cyan-300">{item.quarter}</span>
                        <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                      </div>
                    </div>

                    {/* Progress bar */}
                    {item.status === 'current' && item.progress && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-2">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-1000"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Tasks - Responsive Layout */}
                    <ul className="space-y-2 mb-4">
                      {item.items.map((task, taskIndex) => (
                        <li key={taskIndex} className={`flex items-start space-x-2 text-gray-300 text-sm sm:text-base ${
                          // Desktop: alternating alignment, Mobile: always left
                          index % 2 === 0 ? 'lg:justify-end lg:text-right' : 'justify-start'
                        }`}>
                          <CheckCircle className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 ${
                            item.status === 'completed' ? 'text-green-400' :
                            item.status === 'current' ? 'text-cyan-400' :
                            'text-gray-500'
                          } ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`} />
                          <span className={`text-xs sm:text-sm ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                            {task}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Achievement/Target */}
                    {item.achievements && (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <p className="text-green-300 text-xs sm:text-sm font-medium">{item.achievements}</p>
                      </div>
                    )}
                    
                    {item.target && (
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                        <p className="text-cyan-300 text-xs sm:text-sm font-medium">{item.target}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Timeline dot (hidden on mobile) */}
                <div className="hidden lg:block relative z-10">
                  <div className={`w-8 h-8 rounded-full border-4 ${
                    item.status === 'completed' ? 'bg-green-400 border-green-400' :
                    item.status === 'current' ? 'bg-cyan-400 border-cyan-400 animate-pulse' :
                    'bg-gray-600 border-gray-600'
                  }`}>
                    {item.status === 'current' && (
                      <div className="absolute -inset-1 rounded-full bg-cyan-400 opacity-25 animate-ping"></div>
                    )}
                  </div>
                </div>

                {/* Desktop spacer (hidden on mobile) */}
                <div className="hidden lg:block w-1/2"></div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Team Section - Responsive Grid */}
        <AnimatedSection animation="fadeInUp" className="mt-16 sm:mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { name: 'DR. Daysman', role: 'Founder', bio: '10+ years in blockchain fintech.' },
              { name: 'John Peter Odion', role: 'CTO', bio: 'Expert in scalable app architecture.' },
              { name: 'Efosa Williams Aisevbo', role: 'Head of Business', bio: 'Background in cross-industry partnerships.' },
              { name: 'David (Mr White)', role: 'Development', bio: 'Profound blockchain developer.' }
            ].map((member, i) => (
              <AnimatedSection
                key={i}
                animation="scaleIn"
                delay={staggerChildren(i)}
                className="bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6"
              >
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-cyan-300 text-sm sm:text-base">{member.role}</p>
                <p className="text-gray-400 mt-2 text-xs sm:text-sm">{member.bio}</p>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Disclaimer - Responsive */}
        <AnimatedSection animation="fadeIn" delay={0.3} className="mt-16 sm:mt-20 text-center max-w-3xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Disclaimer</h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              This whitepaper outlines future aspirations. It is not financial advice. 
              Participants should exercise due diligence and understand the risks associated with digital assets.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Roadmap;