import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageCircle, Twitter, Users } from 'lucide-react';

const CommunitySection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

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

  // Sample memes for carousel
  const memes = [
    "images/buying_cigar_meme.png",
    "images/hold_cigar_meme.png",
    "images/rocket_cigar.png"
  ];

  return (
    <section id="community" className="relative py-5 bg-gradient-to-b from-black to-dark overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="section-title">Join Our Community</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with fellow $CIGAR holders and be part of our growing community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Telegram */}
            <motion.a
              href="https://t.me/cigartoken"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark/30 backdrop-blur-sm p-8 rounded-xl border border-cigar-gold/20 hover:border-cigar-gold/50 transition-all duration-300 flex flex-col items-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(247, 147, 30, 0.1)' }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <MessageCircle size={32} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Telegram</h3>
              <p className="text-gray-400 text-center">Join our active Telegram community for live updates</p>
            </motion.a>

            {/* Twitter */}
            <motion.a
              href="https://twitter.com/cigartoken"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark/30 backdrop-blur-sm p-8 rounded-xl border border-cigar-gold/20 hover:border-cigar-gold/50 transition-all duration-300 flex flex-col items-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(247, 147, 30, 0.1)' }}
            >
              <div className="w-16 h-16 rounded-full bg-sky-500/10 flex items-center justify-center mb-4">
                <Twitter size={32} className="text-sky-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Twitter</h3>
              <p className="text-gray-400 text-center">Follow us for news, memes, and community updates</p>
            </motion.a>

            {/* Discord */}
            <motion.a
              href="https://discord.gg/cigartoken"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark/30 backdrop-blur-sm p-8 rounded-xl border border-cigar-gold/20 hover:border-cigar-gold/50 transition-all duration-300 flex flex-col items-center"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(247, 147, 30, 0.1)' }}
            >
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                <Users size={32} className="text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discord</h3>
              <p className="text-gray-400 text-center">Hang out with the community and chat with the team</p>
            </motion.a>
          </div>

          {/* Community Stats */}
          <motion.div 
            className="bg-gradient-to-r from-dark via-cigar-gold/5 to-dark p-6 rounded-xl border border-cigar-gold/30 mb-16"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-gray-400 mb-1">Telegram Members</p>
                <h3 className="text-3xl font-bold text-cigar-gold">12,400+</h3>
              </div>
              <div className="text-center">
                <p className="text-gray-400 mb-1">Token Holders</p>
                <h3 className="text-3xl font-bold text-cigar-gold">3,200+</h3>
              </div>
              <div className="text-center">
                <p className="text-gray-400 mb-1">Twitter Followers</p>
                <h3 className="text-3xl font-bold text-cigar-gold">8,700+</h3>
              </div>
            </div>
          </motion.div>

          {/* Meme Carousel */}
          <motion.div variants={itemVariants} className="mb-10">
            <h3 className="text-2xl font-semibold text-center mb-8">Community Memes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {memes.map((meme, index) => (
                <motion.div 
                  key={index}
                  className="rounded-lg overflow-hidden border border-cigar-gold/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1, transition: { delay: 0.1 * index } } : { opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <img src={meme} alt={`Community meme ${index+1}`} className="w-full h-48 object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-10"
            variants={itemVariants}
          >
            <a 
              href="#" 
              className="btn-primary text-lg px-10 py-3"
            >
              Join the Community
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;