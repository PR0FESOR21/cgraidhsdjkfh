import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wallet, Check, AlertCircle } from 'lucide-react';

const AirdropWaitlist: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to participate');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please create an account in MetaMask.');
      }

      setAddress(accounts[0]);
      setIsConnected(true);
      setError('');
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    }
  };

  const registerForAirdrop = async () => {
    if (!address) return;

    try {
      setIsLoading(true);
      setError('');
      setMessage('');

      const response = await fetch('https://cigarapis.up.railway.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet_address: address }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error('Error registering for airdrop:', err);
      setError('Failed to register for airdrop. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="airdrop-waitlist" className="relative py-20 bg-gradient-to-b from-dark to-black overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="section-title">Airdrop Waitlist</h2>
            <p className="text-xl text-gray-300">
              Join the $CIGAR airdrop waitlist and be among the first to receive tokens
            </p>
          </div>

          <motion.div className="bg-dark/30 backdrop-blur-sm p-8 rounded-xl border border-cigar-gold/20">
            {!isConnected ? (
              <div className="text-center">
                <motion.button
                  className="btn-primary flex items-center gap-2 mx-auto"
                  onClick={connectWallet}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Wallet size={20} />
                  Connect Wallet
                </motion.button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-dark/50 p-4 rounded-lg border border-gray-800">
                  <p className="text-sm text-gray-400">Connected Wallet</p>
                  <p className="font-mono text-sm text-gray-300 truncate">{address}</p>
                </div>

                {!message && !isLoading && (
                  <motion.button
                    className="btn-primary flex items-center gap-2 mx-auto"
                    onClick={registerForAirdrop}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                  >
                    <Check size={20} />
                    Participate in Airdrop
                  </motion.button>
                )}

                {isLoading && (
                  <div className="text-center space-y-3">
                    <div className="w-8 h-8 border-2 border-cigar-gold border-t-transparent rounded-full mx-auto animate-spin" />
                    <p className="text-gray-400">Registering for airdrop...</p>
                  </div>
                )}

                {message && (
                  <motion.div
                    className="bg-cigar-gold/10 p-6 rounded-lg border border-cigar-gold"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Check size={32} className="text-cigar-gold" />
                    </div>
                    <p className="text-center text-gray-300">{message}</p>
                  </motion.div>
                )}
              </div>
            )}

            {error && (
              <motion.div
                className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle size={20} />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AirdropWaitlist;