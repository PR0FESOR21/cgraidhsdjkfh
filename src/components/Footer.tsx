import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
              <img src="cigar-icon.svg" alt="Cigar icon" style={{ width: '20px', height: 'auto' }} />
              <h3 className="text-xl font-bold text-cigar-gold">$CIGAR</h3>
              </div>
              <p className="text-gray-400 mb-4">
                The first memecoin you can puff and pump. Join our rebellion against boring finance.
              </p>
              <div className="flex gap-4 items-center">
                <a href="#" className="text-gray-400 hover:text-cigar-gold transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-cigar-gold transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-cigar-gold transition-colors">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-cigar-gold transition-colors">About</a>
                </li>
                <li>
                  <a href="#tokenomics" className="text-gray-400 hover:text-cigar-gold transition-colors">Tokenomics</a>
                </li>
                <li>
                  <a href="#roadmap" className="text-gray-400 hover:text-cigar-gold transition-colors">Roadmap</a>
                </li>
                <li>
                  <a href="#community" className="text-gray-400 hover:text-cigar-gold transition-colors">Community</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contract</h4>
              <div className="flex items-center gap-2 p-3 bg-dark/50 rounded-lg border border-gray-800 mb-4">
                <code className="text-xs text-gray-300 overflow-hidden text-ellipsis">0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t</code>
                <button className="text-cigar-gold hover:text-cigar-ember" title="Copy address">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-2">
                <a href="#" className="text-xs flex items-center gap-1 text-gray-400 hover:text-cigar-gold">
                  View on Etherscan <ExternalLink size={12} />
                </a>
                <a href="#" className="text-xs flex items-center gap-1 text-gray-400 hover:text-cigar-gold">
                  View on CoinGecko <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-10 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              🚫 This token is for entertainment only. Smoking kills, and so does FOMO.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              © 2025 $CIGAR. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Background ember effect */}
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-96 h-32 bg-cigar-ember blur-3xl opacity-10 rounded-full" />
      </motion.div>
    </footer>
  );
};

const Twitter: React.FC<{ size: number, className?: string }> = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default Footer;