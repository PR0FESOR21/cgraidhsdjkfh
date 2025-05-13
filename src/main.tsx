import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { base } from 'wagmi/chains';
import App from './App.tsx';
import './index.css';

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <App />
    </WagmiProvider>
  </StrictMode>
);