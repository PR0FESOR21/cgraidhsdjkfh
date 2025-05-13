import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, MessageCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-24">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 lg:col-span-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Meet <span className="text-cigar-gold">$CIGAR</span>:
              <br />
              <span className="relative">
                The First Memecoin
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-cigar-gold"
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
              <br />
              You Can Puff and Pump.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A rebellious token on a mission to burn charts, not just cigarettes.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist
              </motion.a>
              <motion.a
                href="#tokenomics"
                className="btn-outline flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 size={20} />
                Chart
              </motion.a>
              <motion.a
                href="#community"
                className="btn-outline flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={20} />
                Join Telegram
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block lg:col-span-6"
          >
            <img src="images/hero.png" alt="Cigar Mascot" className="w-full h-auto mx-auto" />
            
            {/* Animated smoke elements */}
            <div className="absolute top-10 right-32">
              <div className="w-8 h-8 rounded-full bg-cigar-ash/20 animate-smoke-1" />
            </div>
            <div className="absolute top-5 right-40">
              <div className="w-6 h-6 rounded-full bg-cigar-ash/20 animate-smoke-2" />
            </div>
            <div className="absolute top-12 right-44">
              <div className="w-10 h-10 rounded-full bg-cigar-ash/20 animate-smoke-3" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
};

export default HeroSection;