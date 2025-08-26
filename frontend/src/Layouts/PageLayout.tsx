import { useState, useEffect } from "react";
import { ScrollToTop } from "../utils/pageUtils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Globe } from "lucide-react";
import { Outlet } from "react-router-dom";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Globe className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">wTSION</h1>
          <p className="text-cyan-300 text-lg">WorldStreet Tsion</p>
        </div>

        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white mt-4 text-sm">Loading the future of finance...</p>
      </div>
    </div>
  );
};

const PageLayout = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); // splash duration
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <ScrollToTop />
      <Navbar />
      <main className="">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
