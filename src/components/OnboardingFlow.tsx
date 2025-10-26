import { useState } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Store onboarding completion
      localStorage.setItem('move-mint-onboarding', 'completed');
      onComplete();
    }
  };

  const steps = [
    {
      title: "Push Notifications",
      content: "Allow Move-Mint to send you reminders and reward updates.",
      hasToggle: true,
      toggleValue: notificationsEnabled,
      onToggle: setNotificationsEnabled,
      buttonText: "Continue"
    },
    {
      title: "Location Access", 
      content: "Allow location access to show nearby partners and track your movement.",
      hasToggle: true,
      toggleValue: locationEnabled,
      onToggle: setLocationEnabled,
      buttonText: "Continue"
    },
    {
      title: "Fraud Warning",
      content: "⚠️ Move-Mint uses AI to detect fake steps (like phone shaking).\nStay active, stay fair!",
      hasToggle: false,
      buttonText: "Got it 👍"
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50" style={{ background: 'linear-gradient(180deg, #000000 0%, #4B0082 100%)' }}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm mx-auto backdrop-blur-sm">
          {/* Progress indicators */}
          <div className="flex space-x-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full flex-1 ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="text-center mb-8">
            <h2 className="text-card-foreground mb-4">
              {currentStepData.title}
            </h2>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {currentStepData.content}
            </p>
          </div>

          {/* Toggle switch if needed */}
          {currentStepData.hasToggle && (
            <div className="flex items-center justify-between mb-8 p-4 bg-muted rounded-lg">
              <span className="text-card-foreground">
                {currentStep === 0 ? 'Allow Notifications' : 'Allow Location'}
              </span>
              <Switch
                checked={currentStepData.toggleValue}
                onCheckedChange={currentStepData.onToggle}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          )}

          {/* Continue button */}
          <Button
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground"
          >
            {currentStepData.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}