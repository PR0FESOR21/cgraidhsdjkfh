import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gift, Palette, Diamond, Globe, Droplets, BadgeDollarSign, Brain, Handshake, Archive } from 'lucide-react';

const TokenomicsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const tokenomics = [
    { name: 'Community Airdrop 🔥', percentage: 25, color: '#E25822', icon: Gift, label: 'For registered users (based on Base activity)' },
    { name: 'NFT Holder Rewards 🎨', percentage: 5, color: '#9333EA', icon: Palette, label: 'For official $CIGAR NFT holders' },
    { name: 'Holder Reward 💎', percentage: 10, color: '#2563EB', icon: Diamond, label: 'For holders who don\'t sell (silent snapshot)' },
    { name: 'Ecosystem & LP Rewards 🌐', percentage: 20, color: '#059669', icon: Globe, label: 'For LP staking, events & community (12-month vesting)' },
    { name: 'Liquidity Provision 💧', percentage: 10, color: '#3B82F6', icon: Droplets, label: 'Provided on DEX (Base/ETH/USDC pair)' },
    { name: 'Marketing & Campaigns 📣', percentage: 12, color: '#F7931E', icon: BadgeDollarSign, label: 'Campaigns, collaborations & promotions' },
    { name: 'Core Team 🧠', percentage: 8, color: '#DC2626', icon: Brain, label: '8 months cliff + 18 months linear vesting' },
    { name: 'Strategic & Listings 🤝', percentage: 5, color: '#8B5CF6', icon: Handshake, label: 'For CEX listings & strategic partners (locked)' },
    { name: 'Reserve & Operational 🧾', percentage: 5, color: '#6B7280', icon: Archive, label: 'Including reserve & development fund' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="tokenomics" className="relative py-20 bg-gradient-to-b from-dark to-black overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="section-title mb-4">Tokenomics</h2>
            <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-cigar-gold/20 p-6 inline-block">
              <p className="text-2xl md:text-4xl font-bold text-cigar-gold mb-2">
                10,000,000,000 $CIGAR
              </p>
              <p className="text-lg text-gray-400">Total Supply</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column - Chart */}
            <motion.div 
              className="lg:col-span-1"
              variants={itemVariants}
            >
              <div className="sticky top-24">
                <div className="relative w-full max-w-sm mx-auto aspect-square">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {tokenomics.map((item, index) => {
                      const prevPercentages = tokenomics
                        .slice(0, index)
                        .reduce((sum, item) => sum + item.percentage, 0);
                      const offset = (prevPercentages / 100) * 100;
                      const percent = item.percentage;
                      
                      return (
                        <motion.circle
                          key={item.name}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke={item.color}
                          strokeWidth="20"
                          strokeDasharray={`${percent} ${100 - percent}`}
                          strokeDashoffset={-offset}
                          initial={{ strokeDashoffset: 100 }}
                          animate={inView ? { strokeDashoffset: -offset } : { strokeDashoffset: 100 }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.2 }}
                        />
                      );
                    })}
                    <circle cx="50" cy="50" r="30" fill="#0f0f0f" />
                    <text x="50" y="45" textAnchor="middle" fill="#f7931e" fontSize="10" fontWeight="bold">
                      $CIGAR
                    </text>
                    <text x="50" y="55" textAnchor="middle" fill="#f7931e" fontSize="6">
                      ALLOCATION
                    </text>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Allocation Details */}
            <motion.div 
              className="lg:col-span-2"
              variants={containerVariants}
            >
              <div className="space-y-4">
                {tokenomics.map((item, index) => (
                  <motion.div 
                    key={item.name}
                    className="bg-dark/30 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -2, borderColor: item.color }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <item.icon size={24} style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold" style={{ color: item.color }}>
                              {item.name}
                            </h3>
                            <span className="text-2xl font-bold ml-4" style={{ color: item.color }}>
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 pl-16">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Transaction Fee Info */}
              <motion.div 
                className="mt-8 p-6 rounded-xl bg-gradient-to-r from-dark via-cigar-ember/10 to-dark border border-cigar-gold/30"
                variants={itemVariants}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cigar-gold/10 flex items-center justify-center shrink-0">
                    <BadgeDollarSign size={24} className="text-cigar-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-cigar-gold mb-2">Transaction Fee</h4>
                    <p className="text-gray-300">
                      2% on each transaction - 1% distributed to holders, 1% sent to burn wallet
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TokenomicsSection;