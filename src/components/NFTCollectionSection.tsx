import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, Info } from 'lucide-react';

interface NFT {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

const nftCollection: NFT[] = [
  {
    id: 1,
    name: "Golden Cigar #001",
    price: "0.1 ETH",
    image: "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg",
    description: "Limited edition golden-wrapped premium cigar NFT"
  },
  {
    id: 2,
    name: "Smoke Art #042",
    price: "0.08 ETH",
    image: "https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg",
    description: "Artistic smoke patterns captured in digital form"
  },
  {
    id: 3,
    name: "Vintage Collection #007",
    price: "0.15 ETH",
    image: "https://images.pexels.com/photos/2146991/pexels-photo-2146991.jpeg",
    description: "Classic vintage-style cigar memorabilia"
  },
  {
    id: 4,
    name: "Ember Series #123",
    price: "0.12 ETH",
    image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
    description: "Glowing ember captured in perpetual digital form"
  },
  {
    id: 5,
    name: "Luxury Box #056",
    price: "0.2 ETH",
    image: "https://images.pexels.com/photos/3379257/pexels-photo-3379257.jpeg",
    description: "Premium cigar box collection piece"
  },
  {
    id: 6,
    name: "Smoke Rings #089",
    price: "0.05 ETH",
    image: "https://images.pexels.com/photos/2602521/pexels-photo-2602521.jpeg",
    description: "Perfect smoke rings frozen in time"
  }
];

const NFTCollectionSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="nft-collection" className="relative py-20 bg-gradient-to-b from-black to-dark overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="section-title">NFT Collection</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Exclusive digital collectibles for true $CIGAR connoisseurs
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {nftCollection.map((nft) => (
              <motion.div
                key={nft.id}
                className="bg-dark/30 backdrop-blur-sm rounded-xl border border-cigar-gold/20 overflow-hidden hover:border-cigar-gold/50 transition-all duration-300 relative"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(247, 147, 30, 0.1)' }}
              >
                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                  <h3 className="text-2xl font-bold text-cigar-gold mb-2">Coming Soon</h3>
                  <p className="text-gray-400 text-sm text-center px-4">
                    NFT collection launching soon. Stay tuned!
                  </p>
                </div>

                <div className="relative aspect-square">
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{nft.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-cigar-gold font-bold">{nft.price}</span>
                    <button 
                      className="btn-primary flex items-center gap-2 text-sm py-2 opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <ShoppingCart size={16} />
                      Buy Now
                    </button>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-cigar-gold/20 bg-dark/50">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Info size={14} />
                    <span>Limited Edition 1/100</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-16 p-8 rounded-xl bg-gradient-to-r from-dark via-cigar-ember/20 to-dark border border-cigar-gold/30 text-center"
            variants={itemVariants}
          >
            <p className="text-lg text-gray-300">
              Each NFT grants exclusive access to the $CIGAR DAO and special holder benefits.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NFTCollectionSection;