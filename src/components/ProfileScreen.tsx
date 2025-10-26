import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  Trophy, 
  Target,
  Calendar,
  Footprints,
  MapPin,
  Flame,
  ChevronRight,
  Moon,
  Smartphone,
  RotateCcw,
  Bluetooth
} from 'lucide-react';
import { ProfileEditModal } from './ProfileEditModal';
import { DeviceConnectionFlow } from './DeviceConnectionFlow';

interface ProfileScreenProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function ProfileScreen({ isDarkMode = false, onToggleDarkMode }: ProfileScreenProps = {}) {
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [showDeviceConnection, setShowDeviceConnection] = useState(false);
  const [preferences, setPreferences] = useState({
    darkMode: isDarkMode,
    pushNotifications: true,
    allowLocation: true
  });
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+973 1234 5678'
  });

  const userStats = {
    totalSteps: 1234567,
    totalDistance: 923.4,
    totalCalories: 45678,
    joinDate: 'March 2024',
    currentStreak: 14,
    longestStreak: 28,
    achievements: 12,
    pointsEarned: 2847
  };

  const recentActivity = [
    { date: 'Today', steps: 6847, points: 68 },
    { date: 'Yesterday', steps: 11200, points: 112 },
    { date: '2 days ago', steps: 9800, points: 98 },
  ];

  const settingsGroups = [
    {
      title: 'Notifications',
      items: [
        { icon: Bell, label: 'Daily Reminders', type: 'switch', enabled: true },
        { icon: Trophy, label: 'Achievement Alerts', type: 'switch', enabled: true },
        { icon: Target, label: 'Goal Notifications', type: 'switch', enabled: false },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: Moon, 
          label: 'Dark Mode', 
          type: 'switch', 
          enabled: isDarkMode,
          onChange: (checked: boolean) => {
            setPreferences(prev => ({...prev, darkMode: checked}));
            if (onToggleDarkMode) onToggleDarkMode();
          }
        },
        { 
          icon: Bell, 
          label: 'Push Notifications', 
          type: 'switch', 
          enabled: preferences.pushNotifications,
          onChange: (checked: boolean) => setPreferences(prev => ({...prev, pushNotifications: checked}))
        },
        { 
          icon: MapPin, 
          label: 'Allow Location', 
          type: 'switch', 
          enabled: preferences.allowLocation,
          onChange: (checked: boolean) => setPreferences(prev => ({...prev, allowLocation: checked}))
        },
      ]
    },
    {
      title: 'Devices',
      items: [
        { icon: Bluetooth, label: 'Connect Device', type: 'link', action: () => setShowDeviceConnection(true) },
        { icon: Smartphone, label: 'Auto-sync Steps', type: 'switch', enabled: true },
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', type: 'link', action: () => setShowProfileEditModal(true) },
        { icon: Shield, label: 'Privacy Settings', type: 'link' },
        { icon: HelpCircle, label: 'Help & Support', type: 'link' },
      ]
    },
    {
      title: 'Development',
      items: [
        { icon: RotateCcw, label: 'Reset Onboarding', type: 'link', action: () => {
          localStorage.removeItem('move-mint-onboarding');
          window.location.reload();
        }},
      ]
    }
  ];

  return (
    <div className="pb-20 pt-4">
      {/* Profile Header */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="text-lg">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl">{profile.name}</h2>
            <p className="text-muted-foreground">Walking enthusiast</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">Level 5</Badge>
              <Badge variant="outline">Member since {userStats.joinDate}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-4 mb-6">
        <h3 className="mb-4">Lifetime Stats</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4 text-center">
            <Footprints className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-lg">{userStats.totalSteps.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Steps</div>
          </Card>
          <Card className="p-4 text-center">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-lg">{userStats.totalDistance.toFixed(1)}km</div>
            <div className="text-xs text-muted-foreground">Distance</div>
          </Card>
          <Card className="p-4 text-center">
            <Flame className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <div className="text-lg">{userStats.totalCalories.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Calories</div>
          </Card>
          <Card className="p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-lg">{userStats.pointsEarned}</div>
            <div className="text-xs text-muted-foreground">Points Earned</div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center">
            <div className="text-lg text-primary">{userStats.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Current Streak</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg text-green-500">{userStats.longestStreak}</div>
            <div className="text-xs text-muted-foreground">Best Streak</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg text-yellow-500">{userStats.achievements}</div>
            <div className="text-xs text-muted-foreground">Achievements</div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mb-6">
        <h3 className="mb-3">Recent Activity</h3>
        <Card className="p-4">
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{activity.date}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm">{activity.steps.toLocaleString()} steps</div>
                  <div className="text-xs text-muted-foreground">+{activity.points} points</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Settings */}
      <div className="px-4">
        <h3 className="mb-4">Settings</h3>
        <div className="space-y-4">
          {settingsGroups.map((group, groupIndex) => (
            <Card key={groupIndex} className="p-4">
              <h4 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {group.title}
              </h4>
              <div className="space-y-3">
                {group.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className={`flex items-center justify-between ${item.action ? 'cursor-pointer hover:bg-muted/20 p-2 rounded -m-2' : ''}`}
                    onClick={item.action}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span>{item.label}</span>
                    </div>
                    {item.type === 'switch' ? (
                      <Switch 
                        checked={item.enabled} 
                        onCheckedChange={item.onChange || (() => {})}
                      />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Button variant="outline" className="w-full">
            Sign Out
          </Button>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showProfileEditModal}
        onClose={() => setShowProfileEditModal(false)}
        currentProfile={profile}
        onSave={(newProfile) => setProfile(newProfile)}
      />
      
      {/* Device Connection Modal */}
      <DeviceConnectionFlow 
        isOpen={showDeviceConnection}
        onClose={() => setShowDeviceConnection(false)}
      />
    </div>
  );
}