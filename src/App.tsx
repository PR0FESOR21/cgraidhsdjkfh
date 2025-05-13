import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TokenomicsSection from './components/TokenomicsSection';
import RoadmapSection from './components/RoadmapSection';
import NFTPreviewSection from './components/NFTPreviewSection';
import CommunitySection from './components/CommunitySection';
import AirdropChecker from './components/AirdropChecker';
import Footer from './components/Footer';
import SmokeBackground from './components/SmokeBackground';
import NFTCollectionPage from './pages/NFTCollectionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/nft-collection" element={<NFTCollectionPage />} />
        <Route path="/" element={
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-dark text-white relative"
          >
            <SmokeBackground />
            <Navbar />
            <HeroSection />
            <AboutSection />
            <TokenomicsSection />
            <RoadmapSection />
            <NFTPreviewSection />
            <AirdropChecker />
            <CommunitySection />
            <Footer />
          </motion.div>
        } />
      </Routes>
    </Router>
  );
}

export default App;