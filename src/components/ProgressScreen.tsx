import { useState } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BahrainMap } from './BahrainMap';
import { TrendingUp, Calendar, Trophy, Target, Flame, MapPin, Plus, Edit, Map } from 'lucide-react';

export function ProgressScreen() {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [fitnessGoal, setFitnessGoal] = useState<{
    type: string;
    target: number;
    deadline: string;
  } | null>({
    type: 'steps',
    target: 12000,
    deadline: '2024-12-31'
  });
  const [goalForm, setGoalForm] = useState({
    type: 'steps',
    target: '',
    deadline: ''
  });
  const weeklyData = [
    { day: 'Mon', steps: 8450, distance: 6.2, calories: 320 },
    { day: 'Tue', steps: 9200, distance: 6.8, calories: 360 },
    { day: 'Wed', steps: 7800, distance: 5.7, calories: 290 },
    { day: 'Thu', steps: 10500, distance: 7.7, calories: 410 },
    { day: 'Fri', steps: 9800, distance: 7.2, calories: 380 },
    { day: 'Sat', steps: 11200, distance: 8.2, calories: 440 },
    { day: 'Sun', steps: 6847, distance: 5.0, calories: 260 },
  ];

  const monthlyGoals = [
    { title: 'Step Master', description: '300,000 steps this month', progress: 78, current: '234,000', target: '300,000' },
    { title: 'Distance Runner', description: '150km walking distance', progress: 65, current: '97.5km', target: '150km' },
    { title: 'Calorie Burner', description: 'Burn 10,000 calories', progress: 72, current: '7,200', target: '10,000' },
  ];

  const achievements = [
    { title: 'First 5K', description: 'Walk 5,000 steps in a day', date: '2 days ago', completed: true },
    { title: 'Week Warrior', description: 'Hit your goal 7 days straight', date: 'In progress', progress: 3, total: 7 },
    { title: 'Distance Master', description: 'Walk 50km total', date: 'In progress', progress: 32, total: 50 },
    { title: 'Early Bird', description: 'Start walking before 8 AM', date: '1 week ago', completed: true },
    { title: 'Night Owl', description: 'Walk after 9 PM', date: '3 days ago', completed: true },
  ];

  const totalSteps = weeklyData.reduce((sum, day) => sum + day.steps, 0);
  const totalDistance = weeklyData.reduce((sum, day) => sum + day.distance, 0);
  const totalCalories = weeklyData.reduce((sum, day) => sum + day.calories, 0);

  const handleSaveGoal = () => {
    setFitnessGoal({
      type: goalForm.type,
      target: parseInt(goalForm.target),
      deadline: goalForm.deadline
    });
    setShowGoalModal(false);
    setGoalForm({ type: 'steps', target: '', deadline: '' });
  };

  const getCurrentProgress = () => {
    if (!fitnessGoal) return 0;
    
    switch (fitnessGoal.type) {
      case 'steps':
        return Math.min((totalSteps / fitnessGoal.target) * 100, 100);
      case 'distance':
        return Math.min((totalDistance / fitnessGoal.target) * 100, 100);
      case 'calories':
        return Math.min((totalCalories / fitnessGoal.target) * 100, 100);
      default:
        return 0;
    }
  };

  const getCurrentValue = () => {
    if (!fitnessGoal) return 0;
    
    switch (fitnessGoal.type) {
      case 'steps':
        return totalSteps;
      case 'distance':
        return totalDistance;
      case 'calories':
        return totalCalories;
      default:
        return 0;
    }
  };

  const getUnit = (type: string) => {
    switch (type) {
      case 'steps':
        return 'steps';
      case 'distance':
        return 'km';
      case 'calories':
        return 'calories';
      default:
        return '';
    }
  };

  return (
    <div className="pb-20 pt-4">
      <div className="px-4 mb-6">
        <h1 className="text-2xl mb-2">Your Progress</h1>
        <p className="text-muted-foreground">Track your fitness journey</p>
      </div>

      {/* Set Fitness Goal Section */}
      <div className="px-4 mb-6">
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-white">Daily Fitness Goal</h3>
              <p className="text-sm text-muted-foreground">Set and track your daily step target</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGoalModal(true)}
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              {fitnessGoal ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </Button>
          </div>
          
          {fitnessGoal ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Current Goal:</span>
                <span className="text-lg font-medium text-primary">
                  {fitnessGoal.target.toLocaleString()} {getUnit(fitnessGoal.type)}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress Today</span>
                  <span>{getCurrentProgress().toFixed(1)}%</span>
                </div>
                <Progress value={getCurrentProgress()} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{getCurrentValue().toLocaleString()} {getUnit(fitnessGoal.type)}</span>
                  <span>{fitnessGoal.target.toLocaleString()} {getUnit(fitnessGoal.type)}</span>
                </div>
              </div>
              
              {getCurrentProgress() >= 100 && (
                <div className="flex items-center gap-2 p-3 bg-green-500/20 rounded-lg text-green-400">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">Goal achieved! Great job! 🎉</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <Target className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground mb-4">Set your first fitness goal to start tracking progress</p>
              <Button 
                onClick={() => setShowGoalModal(true)}
                className="bg-primary hover:bg-primary/80"
              >
                <Plus className="w-4 h-4 mr-2" />
                Set a Fitness Goal
              </Button>
            </div>
          )}
        </Card>
      </div>

      <div className="px-4">
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="map">
              <Map className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-6">
            {/* Weekly Summary */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Card className="p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-lg">{totalSteps.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Steps</div>
              </Card>
              <Card className="p-4 text-center">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-lg">{totalDistance.toFixed(1)}km</div>
                <div className="text-xs text-muted-foreground">Distance</div>
              </Card>
              <Card className="p-4 text-center">
                <Flame className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                <div className="text-lg">{totalCalories}</div>
                <div className="text-xs text-muted-foreground">Calories</div>
              </Card>
            </div>

            {/* Daily Breakdown */}
            <Card className="p-4 mb-4">
              <h3 className="mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                This Week's Activity
              </h3>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={day.day} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === weeklyData.length - 1 ? 'bg-primary' : 'bg-gray-300'
                      }`} />
                      <span className="w-8 text-sm">{day.day}</span>
                    </div>
                    <div className="flex-1 mx-4">
                      <Progress value={(day.steps / 12000) * 100} className="h-2" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{day.steps.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{day.distance}km</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="mt-6">
            <div className="space-y-4">
              {monthlyGoals.map((goal, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        {goal.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    <Badge variant="outline">{goal.progress}%</Badge>
                  </div>
                  <div className="space-y-2">
                    <Progress value={goal.progress} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{goal.current}</span>
                      <span>{goal.target}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <BahrainMap />
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4>{achievement.title}</h4>
                        {achievement.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            <Trophy className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      {achievement.progress && (
                        <div className="space-y-2">
                          <Progress 
                            value={(achievement.progress / achievement.total!) * 100} 
                            className="h-2" 
                          />
                          <div className="text-xs text-muted-foreground">
                            {achievement.progress}/{achievement.total} completed
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right text-xs text-muted-foreground ml-4">
                      {achievement.date}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Set Goal Modal */}
      <Dialog open={showGoalModal} onOpenChange={setShowGoalModal}>
        <DialogContent className="w-[90%] max-w-md mx-auto bg-card border-border shadow-2xl backdrop-blur-none opacity-100">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Set Fitness Goal</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Choose your daily fitness target to track your progress
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal-type">Goal Type</Label>
              <select
                id="goal-type"
                value={goalForm.type}
                onChange={(e) => setGoalForm(prev => ({...prev, type: e.target.value}))}
                className="w-full p-3 bg-input-background border border-border rounded-lg text-white"
              >
                <option value="steps">Daily Steps</option>
                <option value="distance">Distance (km)</option>
                <option value="calories">Calories Burned</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="goal-target">Target Amount</Label>
              <Input
                id="goal-target"
                type="number"
                value={goalForm.target}
                onChange={(e) => setGoalForm(prev => ({...prev, target: e.target.value}))}
                placeholder={
                  goalForm.type === 'steps' ? '10000' :
                  goalForm.type === 'distance' ? '5' : '300'
                }
                className="bg-input-background"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {goalForm.type === 'steps' ? 'Recommended: 8,000-12,000 steps' :
                 goalForm.type === 'distance' ? 'Recommended: 3-8 km' : 'Recommended: 200-500 calories'}
              </p>
            </div>


            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowGoalModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveGoal}
                disabled={!goalForm.target}
                className="flex-1"
              >
                Save Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}