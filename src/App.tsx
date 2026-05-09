/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import ThreeScene from './components/ThreeScene';
import SystemBoot from './components/SystemBoot';
import Portfolio from './components/Portfolio';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Handle system boot completion
  const handleBootComplete = () => {
    setIsIntroFinished(true);
    setTimeout(() => {
      setShowContent(true);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <ThreeScene introMode={!isIntroFinished} />

      <AnimatePresence mode="wait">
        {!isIntroFinished ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(30px)' }}
            transition={{ duration: 1.2, ease: "circIn" }}
          >
            <SystemBoot onComplete={handleBootComplete} />
          </motion.div>
        ) : (
          showContent && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <Portfolio />
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Global Vignette and Noise */}
      <div className="fixed inset-0 pointer-events-none z-[100] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

