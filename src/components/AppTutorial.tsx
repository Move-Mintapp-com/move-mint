import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CircularProgress } from './CircularProgress';
import { Footprints, Trophy, ShoppingBag, Users, ChevronRight, ChevronLeft, X } from 'lucide-react';

interface AppTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function AppTutorial({ onComplete, onSkip }: AppTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Move - Mint! 🚶‍♂️",
      description: "Turn your steps into rewards. Every step you take earns you points that you can redeem at partner shops.",
      icon: <Footprints className="w-16 h-16 text-primary" />,
      content: (
        <div className="text-center space-y-4">
          <div className="p-6 bg-primary/20 rounded-full w-32 h-32 flex items-center justify-center mx-auto">
            <Footprints className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Walk, earn points, and get rewarded!
            </p>
            <div className="text-sm text-primary">
              10 steps = 1 BD point
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Track Your Progress 📊",
      description: "Monitor your daily steps, set goals, and track your fitness journey with beautiful circular progress indicators.",
      icon: <Trophy className="w-16 h-16 text-primary" />,
      content: (
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CircularProgress progress={68} size={120}>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">68%</div>
                <div className="text-xs text-muted-foreground">6,847 steps</div>
              </div>
            </CircularProgress>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Set daily goals and track your streaks
            </p>
            <div className="text-sm text-primary">
              Connect wearables for automatic tracking
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Redeem at Partner Shops 🛍️",
      description: "Use your earned points to get discounts and offers at our partner restaurants, gyms, and clothing stores.",
      icon: <ShoppingBag className="w-16 h-16 text-primary" />,
      content: (
        <div className="text-center space-y-4">
          <div className="p-6 bg-secondary/20 rounded-full w-32 h-32 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-16 h-16 text-secondary" />
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Redeem points for real rewards
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-card/50 p-2 rounded">
                <div className="text-primary">🍽️</div>
                <div>Food</div>
              </div>
              <div className="bg-card/50 p-2 rounded">
                <div className="text-primary">💪</div>
                <div>Fitness</div>
              </div>
              <div className="bg-card/50 p-2 rounded">
                <div className="text-primary">👕</div>
                <div>Fashion</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Compete with Friends 🏆",
      description: "Add friends, compare steps, and climb the leaderboard together. Make fitness fun and social!",
      icon: <Users className="w-16 h-16 text-primary" />,
      content: (
        <div className="text-center space-y-4">
          <div className="p-6 bg-orange-500/20 rounded-full w-32 h-32 flex items-center justify-center mx-auto">
            <Users className="w-16 h-16 text-orange-400" />
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Stay motivated with friends
            </p>
            <Card className="p-3 bg-card/50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">#1 Sarah J.</span>
                  <span className="text-white">12,450 steps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary font-medium">#2 You</span>
                  <span className="text-white">8,500 steps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">#3 Mike C.</span>
                  <span className="text-white">7,200 steps</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      background: 'linear-gradient(180deg, #3EB489 0%, #9f7aea 100%)' 
    }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="text-white hover:bg-white/10"
          >
            <X className="w-4 h-4 mr-1" />
            Skip
          </Button>
        </div>

        {/* Content Card */}
        <Card className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 backdrop-blur-sm border-0 text-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {currentTutorial.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {currentTutorial.description}
              </p>
            </div>

            {/* Step Content */}
            <div className="py-4">
              {currentTutorial.content}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 bg-black text-white hover:bg-black/90"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="text-sm text-gray-500">
                {currentStep + 1} of {tutorialSteps.length}
              </div>

              <Button
                onClick={nextStep}
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              >
                {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer Message */}
        <p className="text-center text-white/80 text-sm mt-6">
          Ready to start your fitness journey? Let's walk towards rewards together! 🚶‍♂️✨
        </p>
      </div>
    </div>
  );
}