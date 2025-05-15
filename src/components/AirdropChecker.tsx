import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wallet, Gift, AlertCircle, X } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';

interface AirdropResponse {
  status: string;
  message: string;
  wallet_address: string;
  amount: number;
}

const AirdropChecker: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const { address, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  
  const [isLoading, setIsLoading] = useState(false);
  const [airdropAmount, setAirdropAmount] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);

  const isWrongNetwork = chainId !== base.id;

  const handleConnect = async (type: 'metamask' | 'okx') => {
    try {
      await connect({ connector: new InjectedConnector() });
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    }
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchChain({ chainId: base.id });
      setShowNetworkModal(false);
    } catch (err) {
      console.error('Error switching network:', err);
      setError('Failed to switch network. Please try again.');
    }
  };

  const checkAirdrop = async () => {
    if (!address) return;

    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('https://cigarapis.up.railway.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet_address: address }),
      });

      if (!response.ok) {
        throw new Error('Failed to check airdrop amount');
      }

      const data: AirdropResponse = await response.json();

      if (data.status === 'success') {
        setAirdropAmount(data.amount.toString());
      } else {
        throw new Error(data.message || 'Failed to check airdrop amount');
      }
    } catch (err) {
      console.error('Error checking airdrop:', err);
      setError('Unable to check airdrop amount. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="airdrop" className="relative py-20 bg-gradient-to-b from-dark to-black overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="section-title">Airdrop Checker</h2>
            <p className="text-xl text-gray-300">
              Connect your wallet to check your $CIGAR airdrop allocation
            </p>
          </div>

          <motion.div className="bg-dark/30 backdrop-blur-sm p-8 rounded-xl border border-cigar-gold/20" variants={containerVariants}>
            {!address ? (
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
                  <p className="text-sm text-gray-400">Connected Wallet</p>
                  <p className="font-mono text-sm text-gray-300 truncate">{address}</p>
                </div>

                {isWrongNetwork ? (
                  <motion.button
                    className="btn-primary flex items-center gap-2 mx-auto"
                    onClick={handleSwitchNetwork}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Switch to Base Network
                  </motion.button>
                ) : !airdropAmount && !isLoading && (
                  <motion.button
                    className="btn-primary flex items-center gap-2 mx-auto"
                    onClick={checkAirdrop}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                  >
                    Check Airdrop
                  </motion.button>
                )}

                {isLoading && (
                  <motion.div className="text-center space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="w-8 h-8 border-2 border-cigar-gold border-t-transparent rounded-full mx-auto animate-spin" />
                    <p className="text-gray-400">Calculating your airdrop amount...</p>
                  </motion.div>
                )}

                {airdropAmount && (
                  <motion.div
                    className="bg-cigar-gold/10 p-6 rounded-lg border border-cigar-gold"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Gift size={32} className="text-cigar-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">Your Airdrop Amount</h3>
                    <p className="text-3xl font-bold text-cigar-gold text-center">{airdropAmount} $CIGAR</p>
                  </motion.div>
                )}

                <button onClick={() => disconnect()} className="text-sm text-gray-400 hover:text-cigar-gold transition-colors mx-auto block">
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

          <motion.div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-dark via-cigar-ember/20 to-dark border border-cigar-gold/30" variants={containerVariants}>
            <p className="text-center text-sm text-gray-400">
              Make sure you're connected to the Base network to check your airdrop allocation.
            </p>
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
                  className="w-full p-4 rounded-lg bg-dark/50 border border-cigar-gold/20 hover:border-cigar-gold/50 transition-all flex items-center gap-3 text-left"
                  onClick={() => handleConnect('metamask')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-8 h-8" />
                  <div>
                    <p className="font-semibold">MetaMask</p>
                    <p className="text-sm text-gray-400">Connect to your MetaMask Wallet</p>
                  </div>
                </motion.button>

                <motion.button
                  className="w-full p-4 rounded-lg bg-dark/50 border border-cigar-gold/20 hover:border-cigar-gold/50 transition-all flex items-center gap-3 text-left"
                  onClick={() => handleConnect('okx')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img src="https://static.okx.com/cdn/assets/imgs/241/C66135F3E522346E.png" alt="OKX" className="w-8 h-8" />
                  <div>
                    <p className="font-semibold">OKX Wallet</p>
                    <p className="text-sm text-gray-400">Connect to your OKX Wallet</p>
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

export default AirdropChecker;