import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { DeviceConnectionModal } from './DeviceConnectionModal';
import { ProfileEditModal } from './ProfileEditModal';
import { PrivacySettingsScreen } from './PrivacySettingsScreen';
import { 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Smartphone, 
  LogOut,
  Settings,
  ChevronRight,
  MapPin
} from 'lucide-react';

interface ProfileSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function ProfileSlideOver({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  onToggleDarkMode 
}: ProfileSlideOverProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [locationPermission, setLocationPermission] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+973 3456 7890',
    username: 'johndoe123',
    avatar: ''
  };

  const linkedDevices = [
    { name: 'iPhone 15 Pro', type: 'HealthKit', connected: true },
    { name: 'Apple Watch Series 9', type: 'HealthKit', connected: true },
  ];

  if (showPrivacySettings) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          side="right" 
          className="w-80 p-0 bg-sidebar backdrop-blur-md border-sidebar-border"
        >
          <PrivacySettingsScreen 
            onBack={() => setShowPrivacySettings(false)}
            user={user}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-80 p-0 bg-sidebar backdrop-blur-md border-sidebar-border"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-6 pb-4 border-b border-border">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <SheetTitle className="text-left">{user.name}</SheetTitle>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {/* Settings Section */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                  Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      <span>Dark Mode</span>
                    </div>
                    <Switch 
                      checked={isDarkMode} 
                      onCheckedChange={onToggleDarkMode}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5" />
                      <span>Notifications</span>
                    </div>
                    <Switch 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      <span>Location</span>
                    </div>
                    <Switch 
                      checked={locationPermission} 
                      onCheckedChange={setLocationPermission}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Linked Devices */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                  Linked Devices
                </h3>
                <div className="space-y-3">
                  {linkedDevices.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-4 h-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">{device.name}</div>
                          <div className="text-xs text-muted-foreground">{device.type}</div>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => setShowDeviceModal(true)}
                  >
                    <span>Connect Device</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                  Account
                </h3>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setShowEditModal(true)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setShowPrivacySettings(true)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Privacy Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-6 border-t border-border">
            <Button 
              variant="outline" 
              className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>

      {/* Device Connection Modal */}
      <DeviceConnectionModal
        isOpen={showDeviceModal}
        onClose={() => setShowDeviceModal(false)}
      />

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
      />
    </Sheet>
  );
}