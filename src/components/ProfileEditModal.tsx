import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, Mail, Phone, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    phone: string;
    username: string;
  };
}

export function ProfileEditModal({ isOpen, onClose, user }: ProfileEditModalProps) {
  const [step, setStep] = useState(1); // 1: verify identity, 2: verify code, 3: edit profile
  const [currentCredentials, setCurrentCredentials] = useState({
    username: '',
    password: ''
  });
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    username: ''
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleVerifyIdentity = () => {
    if (currentCredentials.username !== user.username || currentCredentials.password !== 'password123') {
      alert('Invalid credentials. For demo: username = ' + user.username + ', password = password123');
      return;
    }
    setStep(2);
  };

  const handleSendVerification = () => {
    // Show small popup notification
    const popup = document.createElement('div');
    popup.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm z-50';
    popup.textContent = 'Verification code sent! Please enter it to continue.';
    document.body.appendChild(popup);
    
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 3000);
    
    // Simulate sending verification code
    setStep(3);
  };

  const handleVerifyCode = async () => {
    if (verificationCode !== '123456') {
      alert('Invalid verification code. Try 123456 for demo.');
      return;
    }

    // Initialize edit data with current user info
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      username: user.username
    });
    setStep(3);
  };

  const handleSaveProfile = async () => {
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      setIsComplete(true);
      
      // Close modal after showing success
      setTimeout(() => {
        handleReset();
        onClose();
      }, 2000);
    }, 1000);
  };

  const handleReset = () => {
    setStep(1);
    setCurrentCredentials({ username: '', password: '' });
    setEditData({ name: '', email: '', phone: '', username: '' });
    setVerificationCode('');
    setIsComplete(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[90%] max-w-md mx-auto bg-card border-border shadow-2xl backdrop-blur-none">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {step > 1 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setStep(step - 1)}
                className="p-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <DialogTitle className="text-xl text-white">
              {step === 1 ? 'Verify Identity' : 
               step === 2 ? 'SMS/Email Verification' : 
               step === 3 && !isComplete ? 'Edit Profile' : 'Profile Updated'}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {step === 1 ? 'Enter your current username and password' : 
               step === 2 ? 'Verify with code sent to your email/SMS' : 
               step === 3 && !isComplete ? 'Enter your new profile information' : 'Your profile has been successfully updated'}
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {step === 1 && (
            <>
              <p className="text-muted-foreground">Enter your current credentials to continue:</p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-username">Username</Label>
                  <Input
                    id="current-username"
                    value={currentCredentials.username}
                    onChange={(e) => setCurrentCredentials(prev => ({...prev, username: e.target.value}))}
                    className="bg-input-background"
                    placeholder="Enter your username"
                  />
                </div>
                
                <div>
                  <Label htmlFor="current-password">Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentCredentials.password}
                    onChange={(e) => setCurrentCredentials(prev => ({...prev, password: e.target.value}))}
                    className="bg-input-background"
                    placeholder="Enter your password"
                  />
                </div>
                
                <p className="text-xs text-muted-foreground">
                  For demo: username = {user.username}, password = password123
                </p>
              </div>

              <Button 
                onClick={handleVerifyIdentity} 
                className="w-full" 
                size="lg"
                disabled={!currentCredentials.username || !currentCredentials.password}
              >
                Verify Identity
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  We'll send a verification code to your email/SMS to confirm your identity.
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
              
              <Button 
                onClick={handleSendVerification} 
                className="w-full" 
                size="lg"
              >
                Send Verification Code
              </Button>
              
              <div>
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="bg-input-background text-center"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  For demo purposes, use: 123456
                </p>
              </div>

              <Button 
                onClick={handleVerifyCode} 
                className="w-full" 
                size="lg"
                disabled={verificationCode.length !== 6}
              >
                Verify Code
              </Button>
            </>
          )}

          {step === 3 && !isComplete && (
            <>
              <p className="text-muted-foreground">Enter your new profile information:</p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({...prev, name: e.target.value}))}
                    className="bg-input-background"
                  />
                </div>
                
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={editData.username}
                    onChange={(e) => setEditData(prev => ({...prev, username: e.target.value}))}
                    className="bg-input-background"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData(prev => ({...prev, email: e.target.value}))}
                    className="bg-input-background"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={editData.phone}
                    onChange={(e) => setEditData(prev => ({...prev, phone: e.target.value}))}
                    className="bg-input-background"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSaveProfile} 
                className="w-full" 
                size="lg"
                disabled={isVerifying}
              >
                {isVerifying ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          )}

          {isComplete && (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 p-4 bg-green-500/20 rounded-lg text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span>Your profile has been updated successfully ✅</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your changes have been saved and are now active.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}