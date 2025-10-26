import { useState, useEffect } from 'react';
import { BottomNavigation } from './components/BottomNavigation';
import { HomeScreen } from './components/HomeScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { ShopScreen } from './components/ShopScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { SponsorSignupScreen } from './components/SponsorSignupScreen';
import { AppHeader } from './components/AppHeader';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { AppTutorial } from './components/AppTutorial';
import { EventNotification } from './components/EventNotification';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) return 'Good morning';
    if (currentHour >= 12 && currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    // Apply dark mode by default
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
    
    // Check if tutorial has been completed
    const tutorialCompleted = localStorage.getItem('move-mint-tutorial');
    const onboardingCompleted = localStorage.getItem('move-mint-onboarding');
    
    if (!tutorialCompleted) {
      setShowTutorial(true);
    } else if (!onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, [isDarkMode]);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={setActiveTab} />;
      case 'progress':
        return <ProgressScreen />;
      case 'shop':
        return <ShopScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'sponsor':
        return <SponsorSignupScreen />;
      case 'profile':
        return <ProfileScreen isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
      default:
        return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} isDarkMode={isDarkMode} />;
  }

  if (showTutorial) {
    return (
      <AppTutorial 
        onComplete={() => {
          localStorage.setItem('move-mint-tutorial', 'completed');
          setShowTutorial(false);
          // Check if onboarding is also needed
          const onboardingCompleted = localStorage.getItem('move-mint-onboarding');
          if (!onboardingCompleted) {
            setShowOnboarding(true);
          }
        }}
        onSkip={() => {
          localStorage.setItem('move-mint-tutorial', 'completed');
          setShowTutorial(false);
          // Check if onboarding is also needed
          const onboardingCompleted = localStorage.getItem('move-mint-onboarding');
          if (!onboardingCompleted) {
            setShowOnboarding(true);
          }
        }}
      />
    );
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto min-h-screen relative">
        <AppHeader 
          greeting={getGreeting()}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        {renderScreen()}
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <EventNotification />
      </div>
    </div>
  );
}