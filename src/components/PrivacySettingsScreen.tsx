import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Mail, Phone, Shield, Eye, Lock } from 'lucide-react';

interface PrivacySettingsScreenProps {
  onBack: () => void;
  user: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
}

export function PrivacySettingsScreen({ onBack, user }: PrivacySettingsScreenProps) {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/90 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-4 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-medium">Privacy Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your personal information</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Information */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-medium text-white">{user.name}</h2>
              <p className="text-sm text-muted-foreground">Move - Mint Member</p>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-white">Contact Information</h3>
          <div className="space-y-3">
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Email Address</div>
                  <div className="text-white font-medium">{user.email}</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Phone Number</div>
                  <div className="text-white font-medium">{user.phone}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Privacy Controls */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-white">Privacy Controls</h3>
          <div className="space-y-3">
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">Profile Visibility</div>
                  <div className="text-sm text-muted-foreground">Your profile is visible to friends only</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">Data Sharing</div>
                  <div className="text-sm text-muted-foreground">Limited to app functionality only</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">Account Security</div>
                  <div className="text-sm text-muted-foreground">Two-factor authentication enabled</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Data Management */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-white">Data Management</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Request Data Deletion
            </Button>
          </div>
        </div>

        {/* Terms & Policies */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-white">Legal</h3>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              Terms of Service
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              Data Usage Policy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}