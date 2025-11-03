import { Home, TrendingUp, ShoppingBag, Trophy, Building2 } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'progress', icon: TrendingUp, label: 'Progress' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'leaderboard', icon: Trophy, label: 'Ranking' },
    { id: 'sponsor', icon: Building2, label: 'Partner' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-white/10 px-2 py-2 safe-area-pb">
      <div className="flex justify-around">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center py-2 px-2 rounded-lg transition-colors ${
              activeTab === id
                ? 'text-primary bg-primary/20'
                : 'text-muted-foreground hover:text-white'
            }`}
          >
            <Icon size={18} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}