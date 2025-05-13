import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Flame, Target } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="relative py- overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="section-title">Why $CIGAR?</h2>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            Born from the ashes of traditional finance. $CIGAR is a memecoin for degens who dare to light up the crypto world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div 
              className="bg-dark/30 backdrop-blur-sm p-6 rounded-xl border border-cigar-gold/20 hover:border-cigar-gold/50 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(247, 147, 30, 0.1)' }}
            >
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-cigar-gold/10 flex items-center justify-center">
                  <Flame size={32} className="text-cigar-gold" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-cigar-gold">Rebellious Spirit</h3>
              <p className="text-gray-300">
                We're not just another memecoin. We're a statement against the boring, over-regulated finance world. $CIGAR ignites a new era of freedom in DeFi.
              </p>
            </motion.div>

            <motion.div 
              className="bg-dark/30 backdrop-blur-sm p-6 rounded-xl border border-cigar-gold/20 hover:border-cigar-gold/50 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(247, 147, 30, 0.1)' }}
            >
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-cigar-gold/10 flex items-center justify-center">
                  <Target size={32} className="text-cigar-gold" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-cigar-gold">Community Focused</h3>
              <p className="text-gray-300">
                Our community is the ember that keeps $CIGAR burning bright. Together, we're creating something that's more than just smoke and mirrors.
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="mt-16 p-8 rounded-xl bg-gradient-to-r from-dark via-cigar-ember/20 to-dark border border-cigar-gold/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-lg md:text-xl italic">
              "$CIGAR isn't just a token, it's a lifestyle. For those who know that the best gains come with a little risk and a lot of community."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;