import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trophy, ChevronDown, ChevronUp } from 'lucide-react';

interface Achievement {
  steps: number;
  title: string;
  description: string;
  emoji: string;
}

const achievements: Achievement[] = [
  { steps: 1000, title: "Yallah Starter", description: "You've finally started moving 😆", emoji: "🚶" },
  { steps: 3000, title: "Kafi Lazy!", description: "You're doing better than the couch crew!", emoji: "🛋️" },
  { steps: 5000, title: "Try Hard Bahraini", description: "Committed and showing effort 💪", emoji: "💪" },
  { steps: 7000, title: "Mini Falcon", description: "You're starting to soar 🦅", emoji: "🦅" },
  { steps: 10000, title: "Masha'allah Mover", description: "You're killing it!", emoji: "⭐" },
  { steps: 15000, title: "Souq Walker", description: "Walk all over Manama Souq 😂", emoji: "🛍️" },
  { steps: 20000, title: "Shaikh of Steps", description: "You rule the walking kingdom 👑", emoji: "👑" },
  { steps: 25000, title: "3eed Walker", description: "Nonstop Eid walk vibes 😅", emoji: "🎉" },
  { steps: 30000, title: "Khaleeji Power", description: "Unstoppable regional pride 🌟", emoji: "🌟" },
  { steps: 40000, title: "The Corniche King/Queen", description: "Walk the seafront 🌊", emoji: "🌊" },
  { steps: 50000, title: "Malik Move-Mint", description: "Bahraini fitness royalty 👑🇧🇭", emoji: "👑" },
];

interface BahrainiAchievementsProps {
  currentSteps: number;
}

export function BahrainiAchievements({ currentSteps }: BahrainiAchievementsProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedAchievements = showAll ? achievements : achievements.slice(0, 5);

  const isAchieved = (steps: number) => currentSteps >= steps;
  const getProgress = (steps: number) => {
    if (currentSteps >= steps) return 100;
    return Math.min((currentSteps / steps) * 100, 99);
  };

  return (
    <div className="space-y-3">
      {displayedAchievements.map((achievement, index) => {
        const achieved = isAchieved(achievement.steps);
        const progress = getProgress(achievement.steps);

        return (
          <Card
            key={index}
            className={`p-4 ${achieved ? 'border-2 border-primary bg-primary/5' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`text-2xl ${achieved ? '' : 'opacity-40'}`}>
                  {achievement.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${achieved ? 'text-primary' : 'text-white'}`}>
                      {achievement.title}
                    </h4>
                    {achieved && (
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                        <Trophy className="w-3 h-3 mr-1" />
                        Unlocked
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  {!achieved && (
                    <div className="text-xs text-muted-foreground">
                      {currentSteps.toLocaleString()} / {achievement.steps.toLocaleString()} steps
                      <div className="mt-1 w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      {achievements.length > 5 && (
        <Button
          variant="outline"
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center justify-center gap-2"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show More ({achievements.length - 5} more)
            </>
          )}
        </Button>
      )}
    </div>
  );
}
