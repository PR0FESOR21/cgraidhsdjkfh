import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wallet, Check, AlertCircle, X } from 'lucide-react';

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
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [hasOKX, setHasOKX] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<'metamask' | 'okx' | null>(null);

  useEffect(() => {
    setHasMetaMask(typeof window.ethereum !== 'undefined');
    setHasOKX(typeof window.okxwallet !== 'undefined');
  }, []);

  const connectMetaMask = async () => {
    try {
      if (!hasMetaMask) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      const accounts = await window.ethereum?.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please create an account in MetaMask.');
      }

      setAddress(accounts[0]);
      setIsConnected(true);
      setCurrentWallet('metamask');
      setError('');
      setShowWalletModal(false);
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to MetaMask');
    }
  };

  const connectOKX = async () => {
    try {
      if (!hasOKX) {
        throw new Error('OKX Wallet is not installed. Please install OKX Wallet to continue.');
      }

      const accounts = await window.okxwallet?.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please create an account in OKX Wallet.');
      }

      setAddress(accounts[0]);
      setIsConnected(true);
      setCurrentWallet('okx');
      setError('');
      setShowWalletModal(false);
    } catch (err: any) {
      console.error('Error connecting to OKX:', err);
      const errorMessage = err.code === 4001
        ? 'Connection rejected. Please approve the connection request in your OKX wallet.'
        : err instanceof Error
        ? err.message
        : 'Failed to connect to OKX Wallet';
      setError(errorMessage);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (currentWallet === 'metamask' && window.ethereum) {
        await window.ethereum.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }],
        });
      }

      setAddress(null);
      setIsConnected(false);
      setMessage('');
      setError('');
      setShowWalletModal(false);
      setCurrentWallet(null);
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
      setError('Failed to disconnect wallet. Please try again.');
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
                  onClick={() => setShowWalletModal(true)}
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
                  <p className="text-sm text-gray-400">Connected Wallet ({currentWallet === 'metamask' ? 'MetaMask' : 'OKX'})</p>
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

                <button onClick={disconnectWallet} className="text-sm text-gray-400 hover:text-cigar-gold transition-colors mx-auto block">
                  Disconnect Wallet
                </button>
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

      {/* Wallet Selection Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowWalletModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-6 bg-dark border border-cigar-gold/20 rounded-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
                <button onClick={() => setShowWalletModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <motion.button
                  className={`w-full p-4 rounded-lg bg-dark/50 border border-cigar-gold/20 hover:border-cigar-gold/50 transition-all flex items-center gap-3 text-left ${!hasMetaMask && 'opacity-50 cursor-not-allowed'}`}
                  onClick={connectMetaMask}
                  whileHover={hasMetaMask ? { scale: 1.02 } : {}}
                  whileTap={hasMetaMask ? { scale: 0.98 } : {}}
                  disabled={!hasMetaMask}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-8 h-8" />
                  <div>
                    <p className="font-semibold">MetaMask</p>
                    <p className="text-sm text-gray-400">
                      {hasMetaMask ? 'Connect to your MetaMask Wallet' : 'Please install MetaMask'}
                    </p>
                  </div>
                </motion.button>

                <motion.button
                  className={`w-full p-4 rounded-lg bg-dark/50 border border-cigar-gold/20 hover:border-cigar-gold/50 transition-all flex items-center gap-3 text-left ${!hasOKX && 'opacity-50 cursor-not-allowed'}`}
                  onClick={connectOKX}
                  whileHover={hasOKX ? { scale: 1.02 } : {}}
                  whileTap={hasOKX ? { scale: 0.98 } : {}}
                  disabled={!hasOKX}
                >
                  <img src="https://static.okx.com/cdn/assets/imgs/241/C66135F3E522346E.png" alt="OKX" className="w-8 h-8" />
                  <div>
                    <p className="font-semibold">OKX Wallet</p>
                    <p className="text-sm text-gray-400">
                      {hasOKX ? 'Connect to your OKX Wallet' : 'Please install OKX Wallet'}
                    </p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AirdropWaitlist;