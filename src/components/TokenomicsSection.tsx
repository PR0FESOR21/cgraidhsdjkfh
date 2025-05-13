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
    <section id="tokenomics" className="relative py-5 bg-gradient-to-b from-dark to-black overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="section-title">Tokenomics</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Total Supply: 10,000,000,000 $CIGAR
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Circular Chart */}
            <motion.div 
              className="flex justify-center items-center"
              variants={itemVariants}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
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
                  <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="#f7931e" fontSize="10" fontWeight="bold">
                    $CIGAR
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
            <motion.div className="flex flex-col justify-center" variants={itemVariants}>
              <div className="space-y-4">
                {tokenomics.map((item, index) => (
                  <motion.div 
                    key={item.name}
                    className="flex items-center p-4 rounded-lg bg-dark/50 border border-gray-800"
                    initial={{ x: 50, opacity: 0 }}
                    animate={inView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <item.icon size={24} color={item.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <span className="font-bold text-cigar-gold ml-2">{item.percentage}%</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-8 p-4 rounded-lg border border-cigar-gold/30 bg-gradient-to-r from-dark to-cigar-gold/10"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-cigar-gold">Transaction Fee:</span> 2% on each transaction - 1% distributed to holders, 1% sent to burn wallet.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TokenomicsSection;