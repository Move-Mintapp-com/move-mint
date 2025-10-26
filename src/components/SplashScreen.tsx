import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/1390363901968a23e047c60fc9336825ddd9acbb.png';

interface SplashScreenProps {
  onComplete: () => void;
  isDarkMode: boolean;
}

// Money coin component for rain effect
const MoneyCoin = ({ delay, index }: { delay: number; index: number }) => {
  const randomX = Math.random() * 100; // Random horizontal position
  const randomRotation = Math.random() * 360; // Random initial rotation
  const randomDuration = 1.2 + Math.random() * 0.8; // Random fall duration (1.2-2s)
  const randomSize = 6 + Math.random() * 4; // Random size between 6-10

  return (
    <motion.div
      initial={{ 
        x: `${randomX}vw`, 
        y: '-100px',
        rotate: randomRotation,
        scale: 0.6,
        opacity: 0
      }}
      animate={{ 
        y: '110vh',
        rotate: randomRotation + 720, // Double rotation for more dynamic effect
        scale: [0.6, 1.2, 0.4],
        opacity: [0, 1, 0.8, 0]
      }}
      transition={{ 
        delay,
        duration: randomDuration,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for smoother motion
      }}
      className="absolute pointer-events-none"
      style={{ zIndex: 10 + index }}
    >
      <div 
        className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full border-2 border-yellow-300 shadow-xl flex items-center justify-center"
        style={{ 
          width: `${randomSize * 4}px`, 
          height: `${randomSize * 4}px`,
          boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)'
        }}
      >
        <span className="text-xs font-bold text-yellow-900">BD</span>
      </div>
    </motion.div>
  );
};

// Footstep component for walking animation
const Footstep = ({ delay, index, side }: { delay: number; index: number; side: 'left' | 'right' }) => {
  const startX = side === 'left' ? 20 : 80;
  const endX = 50; // Walk toward center where money falls
  const stepSize = (endX - startX) / 8; // 8 steps total
  const currentX = startX + (stepSize * index);

  return (
    <motion.div
      initial={{ 
        x: `${startX}vw`,
        y: '90vh',
        scale: 0,
        opacity: 0
      }}
      animate={{ 
        x: `${currentX}vw`,
        y: ['90vh', '88vh', '90vh'], // Slight bounce for walking effect
        scale: [0, 1, 0.8, 0],
        opacity: [0, 1, 0.8, 0],
        rotate: side === 'left' ? [-10, 0, 10] : [10, 0, -10]
      }}
      transition={{ 
        delay: delay,
        duration: 0.8,
        ease: "easeInOut",
        y: { repeat: 2, duration: 0.4 }
      }}
      className="absolute pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <div className={`text-2xl ${side === 'left' ? 'scale-x-[-1]' : ''}`}>
        👟
      </div>
    </motion.div>
  );
};

export function SplashScreen({ onComplete, isDarkMode }: SplashScreenProps) {
  const [animationPhase, setAnimationPhase] = useState<'logo' | 'money-rain' | 'complete'>('logo');

  useEffect(() => {
    // Check if user has seen intro before
    const hasSeenIntro = localStorage.getItem('move-mint-intro-seen');
    
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    // Phase 1: Logo fade in (2s for smoother experience)
    const logoTimer = setTimeout(() => {
      setAnimationPhase('money-rain');
    }, 2000);

    // Phase 2: Money rain starts (2s duration for more effect)
    const moneyTimer = setTimeout(() => {
      setAnimationPhase('complete');
    }, 4000);

    // Phase 3: Complete and transition to app (4.5s total)
    const completeTimer = setTimeout(() => {
      localStorage.setItem('move-mint-intro-seen', 'true');
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(moneyTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const skipAnimation = () => {
    localStorage.setItem('move-mint-intro-seen', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background with mint green to purple gradient */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: animationPhase === 'complete' ? 0 : 1,
          background: animationPhase === 'logo' 
            ? 'linear-gradient(135deg, #3EB489 0%, #9370DB 100%)'
            : isDarkMode 
              ? 'linear-gradient(180deg, #000000 0%, #4B0082 100%)'
              : '#ffffff'
        }}
        transition={{ 
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="absolute inset-0"
      />

      {/* Phase 1: Logo Animation */}
      <AnimatePresence>
        {animationPhase === 'logo' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ 
                scale: 0.9, 
                opacity: 0,
                y: -30,
                filter: "blur(8px)"
              }}
              transition={{ 
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                exit: { 
                  duration: 0.8,
                  ease: [0.55, 0.055, 0.675, 0.19]
                }
              }}
              className="text-center"
            >
              <motion.img
                src={logoImage}
                alt="Move - Mint Logo"
                className="w-80 h-80 mx-auto mb-4" // Much bigger logo
                initial={{ scale: 0.8, rotateY: 0 }}
                animate={{ 
                  scale: 1,
                  rotateY: [0, 5, -5, 0] // Subtle 3D effect
                }}
                transition={{ 
                  duration: 2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  rotateY: { 
                    duration: 3,
                    ease: "easeInOut"
                  }
                }}
              />
              
              {/* Glowing effect around logo */}
              <motion.div
                className="absolute inset-0 w-80 h-80 mx-auto rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(62, 180, 137, 0.3) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: [0.5, 1.2, 1],
                  opacity: [0, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut"
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Phase 2: Money Rain Effect */}
      <AnimatePresence>
        {animationPhase === 'money-rain' && (
          <div className="absolute inset-0">
            {/* Generate many more money coins for dramatic effect */}
            {Array.from({ length: 35 }).map((_, index) => (
              <MoneyCoin 
                key={`coin-${index}`} 
                delay={index * 0.05} // Faster succession for more dramatic effect
                index={index} 
              />
            ))}
            
            {/* Left side footsteps walking toward money */}
            {Array.from({ length: 4 }).map((_, index) => (
              <Footstep
                key={`left-step-${index}`}
                delay={0.2 + index * 0.15}
                index={index}
                side="left"
              />
            ))}
            
            {/* Right side footsteps walking toward money */}
            {Array.from({ length: 4 }).map((_, index) => (
              <Footstep
                key={`right-step-${index}`}
                delay={0.3 + index * 0.15}
                index={index}
                side="right"
              />
            ))}
            
            {/* Logo fading out during money rain with better transition */}
            <motion.div
              initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              animate={{ 
                opacity: 0, 
                scale: 0.7,
                filter: "blur(12px)",
                y: -50
              }}
              transition={{ 
                duration: 1.2, 
                ease: [0.55, 0.055, 0.675, 0.19]
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={logoImage}
                alt="Move - Mint Logo"
                className="w-80 h-80"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Skip button with enhanced styling */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1.5,
          duration: 0.6,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: "rgba(62, 180, 137, 0.2)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={skipAnimation}
        className={`absolute bottom-8 right-8 transition-all duration-300 z-20 px-6 py-3 rounded-xl backdrop-blur-md shadow-lg ${
          isDarkMode 
            ? 'text-white/80 hover:text-white bg-white/10 border border-white/20' 
            : 'text-black/80 hover:text-black bg-black/10 border border-black/20'
        }`}
      >
        Skip
      </motion.button>
    </div>
  );
}