// AdBanner Component for Spark: Digital Couples Connection Game ($4.99 version)
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AdBanner = ({ 
  adSlot = "1234567890", 
  adClient = process.env.REACT_APP_GOOGLE_ADSENSE_CLIENT_ID,
  className = "",
  size = "banner" // banner, square, leaderboard
}) => {
  const adRef = useRef(null);

  // Get ad dimensions based on size
  const getAdDimensions = () => {
    switch (size) {
      case 'banner':
        return { width: 320, height: 50 };
      case 'square':
        return { width: 250, height: 250 };
      case 'leaderboard':
        return { width: 728, height: 90 };
      default:
        return { width: 320, height: 50 };
    }
  };

  const { width, height } = getAdDimensions();

  useEffect(() => {
    // Check if AdSense is available and load ad
    try {
      if (window.adsbygoogle && adClient) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.warn('AdSense not loaded:', error);
    }
  }, [adClient]);

  // Fallback content when ads are not available
  const FallbackAd = () => (
    <motion.div
      className={`bg-gradient-to-r from-primary-50 to-romantic-pink/10 border border-primary-100 rounded-lg flex items-center justify-center ${className}`}
      style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center px-4">
        <div className="text-2xl mb-1">💕</div>
        <p className="text-xs text-gray-500 font-medium">
          Upgrade to Premium
        </p>
        <p className="text-xs text-gray-400">
          for ad-free experience
        </p>
      </div>
    </motion.div>
  );

  // Don't show ads if no client ID is configured
  if (!adClient || adClient === 'ca-pub-XXXXXXXXX') {
    return <FallbackAd />;
  }

  return (
    <motion.div
      className={`ad-container flex justify-center ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'inline-block',
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%'
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </motion.div>
  );
};

export default AdBanner; 