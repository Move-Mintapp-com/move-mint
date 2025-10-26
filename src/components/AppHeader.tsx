import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { HelpCircle, Bot } from 'lucide-react';
import { ProfileSlideOver } from './ProfileSlideOver';
import { HelpCenterModal } from './HelpCenterModal';

interface AppHeaderProps {
  greeting: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function AppHeader({ greeting, isDarkMode, onToggleDarkMode }: AppHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4 pt-12 pb-3 border-b border-border/50" style={{ paddingTop: 'max(3rem, env(safe-area-inset-top) + 1rem)' }}>
        <div>
          <h1 className="text-xl text-white">Hala, John 👋</h1>
          <p className="text-muted-foreground text-sm">Let's get moving and earn some rewards</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* AI Help Center */}
          <button 
            onClick={() => setIsHelpOpen(true)}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <HelpCircle className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
            <Badge
              className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs bg-primary border-2 border-background"
            >
              <Bot className="w-2 h-2 text-white" />
            </Badge>
          </button>

          {/* Profile Avatar */}
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="relative"
          >
            <Avatar className="w-10 h-10 border-2 border-primary hover:border-primary/80 transition-colors">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                JD
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>

      <ProfileSlideOver
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
      
      <HelpCenterModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </>
  );
}