import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Sparkles, Cloud, Bomb } from 'lucide-react';

const RoadmapSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const phases = [
    {
      icon: Rocket,
      title: '🔥 Ignition',
      items: [
        'Official Website Launch', 
        'Social Media Activation', 
        'Airdrop Registration Open',
        'Community Building Begins',

      ],
      active: true,
    },
    {
      icon: Sparkles,
      title: '🚬 First Puff',
      items: [
        'Airdrop & NFT Holder Rewards',
        'Listing on DEX',
        'First Burn Event (Unused airdrop allocation)',
        'Token Holder Snapshot (Silent)',
      ],
      active: false,
    },
    {
      icon: Cloud,
      title: '💨 Cloud Nine',
      items: [
        'Launch of NFT Collection', 
        'Community Dashboard & Holder Tools', 
        'LP Rewards',
        'Strategic Partnerships & Collaborations',
        'Community Events & Giveaways',
        'Merchandise Drop'
      ],
      active: false,
    },
    {
      icon: Bomb,
      title: '🧨 Last Drag',
      items: [
        'CIGARverse: Meme-driven metaverse concept',
        'Launch Degen Mini Games',
        'DAO Governance (Community Voting)',
        'Further CEX Listings',
        'Community Treasury Proposal System',
        'Long-Term Ecosystem Growth Planning'
      ],
      active: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="roadmap" className="relative py-5 overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="section-title">Roadmap</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our path to making $CIGAR the hottest memecoin in crypto
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line representing the cigarette */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cigar-ember via-gray-400 to-cigar-ash/30" />

            {/* Phases */}
            <div className="relative z-10">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.title}
                  className="mb-20 relative"
                  variants={itemVariants}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${index === 0 ? 'bg-cigar-ember' : 'bg-gray-700'} border-4 border-dark flex items-center justify-center`}>
                    {index === 0 && (
                      <motion.div
                        className="absolute w-full h-full rounded-full bg-cigar-ember/50"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:items-start gap-8`}>
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} mt-10 md:mt-0`}>
                      <div className="p-6 bg-dark/30 backdrop-blur-sm rounded-lg border border-cigar-gold/20 hover:border-cigar-gold/40 transition-all duration-300">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                          <phase.icon size={20} className="text-cigar-gold" />
                          <h3 className="text-xl font-bold text-cigar-gold">{phase.title}</h3>
                        </div>
                        <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          {phase.items.map((item, i) => (
                            <li key={i} className="text-gray-300 flex items-center gap-2 justify-center md:justify-start">
                              <span className="w-1 h-1 bg-cigar-gold rounded-full hidden md:block"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        {phase.active && (
                          <div className="mt-4 pt-4 border-t border-cigar-gold/20">
                            <span className="text-cigar-gold text-sm font-semibold">ACTIVE</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="hidden md:block w-full md:w-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom ember effect */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-20 h-20 rounded-full bg-cigar-ember/30 blur-md" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadmapSection;