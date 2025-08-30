import React, { useState } from 'react';
import {
  Globe,
  Users,
  Shield,
  ExternalLink,
  MessageCircle,
  Twitter,
  Send,
  Star,
} from 'lucide-react';
import { AnimatedSection, staggerChildren } from "../hooks/useScrollAnimation";
import Subscribe from '../components/Subscribe';
import { ErrorMessage, SuccessMessage } from '../utils/Notify';
import { Apis, ClientPostApi } from '../services/APIS';
import LoadingEffect from '../shared/LoadingEffect';

const Contact: React.FC = () => {
  const [loading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.subject) {
      return ErrorMessage("Please fill all fields")
    }

    const formdata = {
      name: formData.name, email: formData.email, subject: formData.subject, message: formData.message
    }
    setIsLoading(true)
    try {
      const res = await ClientPostApi(Apis.non_auth.contact_us, formdata)
      if (res.status) {
        SuccessMessage(res.message)
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
      else {
        ErrorMessage(res.message || "failed to submit")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  };

  const officialLinks = [
    {
      name: 'Official Website',
      url: '/',
      icon: Globe,
      description: 'Visit our main website for latest updates'
    },
    {
      name: 'Twitter/X',
      url: 'https://twitter.com/official_tsion',
      icon: Twitter,
      description: 'Follow us for real-time announcements'
    },
    {
      name: 'Telegram Community',
      url: '#',
      icon: MessageCircle,
      description: 'Join our active community chat'
    }
  ];

  const communityStats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Countries', value: '50+', icon: Globe },
    { label: 'Daily Transactions', value: '5,000+', icon: Shield },
    { label: 'Community Rating', value: '4.8/5', icon: Star }
  ];

  const supportTopics = [
    'General Inquiry',
    'Technical Support',
    'Partnership Opportunities',
    'Press & Media',
    'Token Listing',
    'Security Issues'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Title */}
        <AnimatedSection animation="fadeInUp" delay={0}>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our community and stay updated with the latest developments in the WorldStreet ecosystem
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Contact Form */}
          <AnimatedSection animation="fadeInLeft" delay={0.2}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Send className="w-6 h-6" />
                <span>Send us a Message</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="">Select a topic</option>
                    {supportTopics.map((topic, index) => (
                      <option key={index} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <div className="w-full">
                  <LoadingEffect  type="submit" isLoading={loading}>
                    Submit
                  </LoadingEffect>
                </div>
              </form>
            </div>
          </AnimatedSection>

          {/* Contact Info + Links */}
          <AnimatedSection animation="fadeInRight" delay={0.3}>
            <div className="space-y-8">
              {/* Official Links */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Official Links</h2>
                <div className="space-y-4">
                  {officialLinks.map((link, index) => (
                    <AnimatedSection
                      key={index}
                      animation="fadeInUp"
                      delay={staggerChildren(index, 0.2)}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <link.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white group-hover:text-cyan-300 font-medium">{link.name}</div>
                          <div className="text-gray-400 text-sm">{link.description}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                      </a>
                    </AnimatedSection>
                  ))}
                </div>
              </div>

              {/* Legacy Contract Info */}
              <AnimatedSection animation="fadeInUp" delay={0.4}>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Legacy Contract Info</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">TSION+ Contract Address:</div>
                      <div className="text-xs text-cyan-300 font-mono bg-gray-800/50 p-3 rounded-lg break-all">
                        0x1cd740C327fFC5f0C50704aE3A97cE7d0A4aa858
                      </div>
                    </div>
                    <a
                      href="https://bscscan.com/address/0x1cd740c327ffc5f0c50704ae3a97ce7d0a4aa858"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 text-sm mt-2 group"
                    >
                      <span>View on BSCScan</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>

        {/* Community Stats */}
        <AnimatedSection animation="scaleIn" delay={0.2}>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Join Our Growing Community</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityStats.map((stat, index) => (
                <AnimatedSection
                  key={index}
                  animation="fadeInUp"
                  delay={staggerChildren(index, 0.2)}
                >
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Newsletter Signup */}
        <Subscribe />

      </div>
    </div>
  );
};

export default Contact;
