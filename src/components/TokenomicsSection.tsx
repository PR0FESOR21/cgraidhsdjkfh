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
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="section-title mb-4">Tokenomics</h2>
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl md:text-3xl font-bold text-cigar-gold">
                10,000,000,000 $CIGAR
              </p>
              <p className="text-lg text-gray-400">Total Supply</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Circular Chart */}
            <motion.div 
              className="lg:col-span-5 flex justify-center items-center"
              variants={itemVariants}
            >
              <div className="relative w-full max-w-md aspect-square">
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

                <motion.div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: [0.2, 0.5, 0.2] } : { opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-16 h-16 rounded-full bg-cigar-ember/30 blur-md" />
                </motion.div>
              </div>
            </motion.div>

            {/* Tokenomics List */}
            <motion.div 
              className="lg:col-span-7 flex flex-col justify-center"
              variants={containerVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tokenomics.map((item, index) => (
                  <motion.div 
                    key={item.name}
                    className="bg-dark/30 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -2, borderColor: item.color }}
                  >
                    <div className="p-4 flex items-start gap-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <item.icon size={20} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-white truncate" style={{ color: item.color }}>
                            {item.name}
                          </h3>
                          <span className="font-bold shrink-0" style={{ color: item.color }}>
                            {item.percentage}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-8 p-6 rounded-xl bg-gradient-to-r from-dark via-cigar-ember/10 to-dark border border-cigar-gold/30"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cigar-gold/10 flex items-center justify-center">
                    <BadgeDollarSign size={20} className="text-cigar-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-cigar-gold mb-1">Transaction Fee</h4>
                    <p className="text-sm text-gray-300">
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