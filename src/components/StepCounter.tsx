import { useEffect, useState } from 'react';
import { Progress } from './ui/progress';
import { Footprints, Trophy } from 'lucide-react';

export function StepCounter() {
  const [steps, setSteps] = useState(6847);
  const [rewards, setRewards] = useState(342);
  const dailyGoal = 10000;
  const progress = (steps / dailyGoal) * 100;

  // Simulate step counting
  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(prev => {
        const newSteps = prev + Math.floor(Math.random() * 3);
        const newRewards = Math.floor(newSteps / 10); // 1 reward per 10 steps
        setRewards(newRewards);
        return newSteps;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 mx-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Footprints size={24} />
          <span>Today's Steps</span>
        </div>
        <div className="flex items-center gap-1">
          <Trophy size={16} />
          <span className="text-sm">{rewards} points</span>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{steps.toLocaleString()}</div>
        <div className="text-sm opacity-90">of {dailyGoal.toLocaleString()} daily goal</div>
      </div>

      <div className="space-y-2">
        <Progress value={progress} className="h-3 bg-primary-foreground/20" />
        <div className="flex justify-between text-sm opacity-90">
          <span>{Math.round(progress)}% complete</span>
          <span>{(dailyGoal - steps).toLocaleString()} steps to go</span>
        </div>
      </div>
    </div>
  );
}