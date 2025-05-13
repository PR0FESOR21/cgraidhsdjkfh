import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  },
  {
    id: 7,
    name: "Havana Nights #234",
    price: "0.18 ETH",
    image: "https://images.pexels.com/photos/1637108/pexels-photo-1637108.jpeg",
    description: "Capturing the essence of Cuban cigar culture"
  },
  {
    id: 8,
    name: "Ash & Ember #167",
    price: "0.15 ETH",
    image: "https://images.pexels.com/photos/2495601/pexels-photo-2495601.jpeg",
    description: "The perfect moment when ash meets ember"
  },
  {
    id: 9,
    name: "Collector's Edition #003",
    price: "0.25 ETH",
    image: "https://images.pexels.com/photos/3379258/pexels-photo-3379258.jpeg",
    description: "Rare collector's edition cigar memorabilia"
  }
];

const NFTCollectionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-cigar-gold hover:text-cigar-ember transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-cigar-gold mb-4">
              $CIGAR NFT Collection
            </h1>
            <p className="text-xl text-gray-300">
              Browse and collect our exclusive digital assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nftCollection.map((nft) => (
              <motion.div
                key={nft.id}
                className="bg-dark/30 backdrop-blur-sm rounded-xl border border-cigar-gold/20 overflow-hidden hover:border-cigar-gold/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(247, 147, 30, 0.1)' }}
              >
                <div className="relative aspect-square">
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{nft.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-cigar-gold font-bold">{nft.price}</span>
                    <button 
                      className="btn-primary flex items-center gap-2 text-sm py-2"
                      onClick={() => alert('NFT purchase coming soon!')}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCollectionPage;