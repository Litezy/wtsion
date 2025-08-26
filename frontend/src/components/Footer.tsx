import React from 'react';
import { Globe, Twitter, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer:React.FC = () => {
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/official_tsion' },
    { name: 'Telegram', icon: MessageCircle, url: '#' },
    { name: 'Email', icon: Mail, url: 'mailto:contact@wtsion.com' }
  ];

  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'Tokenomics', url: '/tokenomics' },
    { name: 'Roadmap', url: '/roadmap' },
    { name: 'Contact', url: '/contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Disclaimer', href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">wTSION</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              WorldStreet Tsion - Powering the future of digital finance through innovation, 
              security, and accessibility. Join the revolution today.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.url}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h4 className="text-white font-medium text-sm mb-2">Legacy Contract</h4>
              <p className="text-xs text-gray-400 font-mono break-all">
                0x1cd740C327fFC5f0C50704aE3A97cE7d0A4aa858
              </p>
              <a
                href="https://bscscan.com/address/0x1cd740c327ffc5f0c50704ae3a97ce7d0a4aa858"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-xs mt-1"
              >
                <span>View on BSCScan</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 wTSION. All rights reserved. WorldStreet Tsion ecosystem.
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Powered by BNB Smart Chain</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Network Status: Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;