import { useState } from 'react';
import { StepCounter } from './StepCounter';
import { Card } from './ui/card';
import { GlassCard } from './ui/glass-card';
import { Badge } from './ui/badge';
import { CircularProgress } from './CircularProgress';
import { BahrainiAchievements } from './BahrainiAchievements';
import { CalendarDays, Flame, Target, Users } from 'lucide-react';

interface HomeScreenProps {
  onNavigate?: (tab: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  
  const achievements = [
    { id: 1, title: 'First 5K', description: 'Walk 5,000 steps in a day', completed: true },
    { id: 2, title: 'Week Warrior', description: 'Hit your goal 7 days straight', progress: 3 },
    { id: 3, title: 'Distance Master', description: 'Walk 50km total', progress: 32 },
  ];

  const weeklyStats = [
    { day: 'Mon', steps: 8450 },
    { day: 'Tue', steps: 9200 },
    { day: 'Wed', steps: 7800 },
    { day: 'Thu', steps: 10500 },
    { day: 'Fri', steps: 9800 },
    { day: 'Sat', steps: 11200 },
    { day: 'Sun', steps: 6847 },
  ];

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) return 'Good morning';
    if (currentHour >= 12 && currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const currentSteps = 6847;
  const dailyGoal = 10000;
  const progressPercent = Math.round((currentSteps / dailyGoal) * 100);
  const pointsEarned = currentSteps * 2;

  return (
    <div className="pb-20">
      {/* Main Step Counter with Circular Progress */}
      <div className="px-4 pt-6 pb-8">
        <div className="text-center mb-8">
          <CircularProgress progress={progressPercent} size={200}>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {progressPercent}%
              </div>
              <div className="text-base text-muted-foreground">
                {currentSteps.toLocaleString()} / {dailyGoal.toLocaleString()}
              </div>
            </div>
          </CircularProgress>
        </div>
        

      </div>

      {/* Quick Stats */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-3 gap-3">
          <GlassCard className="p-4 text-center">
            <CalendarDays className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-lg text-white">7</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <Flame className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-lg text-white">{pointsEarned.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-lg text-white">{progressPercent}%</div>
            <div className="text-xs text-muted-foreground">Goal Hit</div>
          </GlassCard>
        </div>
        
        {/* Calories Lost Card */}
        <div className="grid grid-cols-1 gap-3 mt-3">
          <GlassCard className="p-4 text-center">
            <Flame className="w-6 h-6 mx-auto mb-2 text-orange-400" />
            <div className="text-lg text-white">{Math.round((currentSteps / 1000) * 35)}</div>
            <div className="text-xs text-muted-foreground">Calories Burned</div>
          </GlassCard>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="px-4 mt-6">
        <h3 className="mb-3 text-white">This Week</h3>
        <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex justify-between gap-2">
            {weeklyStats.map((stat, index) => (
              <div key={stat.day} className="flex-1 text-center">
                <div
                  className={`h-16 bg-white/10 rounded-lg mb-2 relative overflow-hidden ${
                    index === weeklyStats.length - 1 ? 'bg-primary/30' : ''
                  }`}
                >
                  <div
                    className={`absolute bottom-0 left-0 right-0 rounded-lg transition-all ${
                      index === weeklyStats.length - 1 ? 'bg-primary' : 'bg-primary/70'
                    }`}
                    style={{ height: `${(stat.steps / 12000) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">{stat.day}</div>
                <div className="text-xs text-white">{(stat.steps / 1000).toFixed(1)}k</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Friends Leaderboard Snippet */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white">Friends Leaderboard</h3>
          <button
            className="text-primary text-sm hover:text-primary/80 transition-colors"
            onClick={() => onNavigate?.('leaderboard')}
          >
            View All
          </button>
        </div>
        <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="space-y-3">
            {[
              { name: 'Sarah J.', steps: 12450, rank: 1 },
              { name: 'You', steps: currentSteps, rank: 2, isUser: true },
              { name: 'Mike C.', steps: 10800, rank: 3 },
            ].map((friend) => (
              <div key={friend.rank} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-sm text-muted-foreground">#{friend.rank}</span>
                  <span className={`text-sm ${friend.isUser ? 'text-primary font-medium' : 'text-white'}`}>
                    {friend.name}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {friend.steps.toLocaleString()} steps
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <div className="px-4 mt-6">
        <h3 className="mb-3 text-white">Bahraini Achievements</h3>
        <BahrainiAchievements currentSteps={currentSteps} />
      </div>


    </div>
  );
}