import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { UserPlus, CheckCircle, X } from 'lucide-react';

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: (friendId: string) => void;
}

export function AddFriendModal({ isOpen, onClose, onAddFriend }: AddFriendModalProps) {
  const [friendId, setFriendId] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!friendId.trim()) {
      setError('Please enter a friend ID or username');
      return;
    }

    setIsAdding(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      onAddFriend(friendId);
      
      // Close modal after showing success
      setTimeout(() => {
        setIsAdded(false);
        setFriendId('');
        onClose();
      }, 2000);
    }, 1000);
  };

  const handleClose = () => {
    setFriendId('');
    setError('');
    setIsAdded(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[90%] max-w-md mx-auto bg-card border-border shadow-2xl backdrop-blur-none">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-xl text-white">Add Friend</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Connect with friends to compete on the leaderboard
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {isAdded ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 p-4 bg-green-500/20 rounded-lg text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span>Friend added successfully!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You can now compete with {friendId} on the leaderboard.
              </p>
            </div>
          ) : (
            <>
              <p className="text-center text-muted-foreground">
                Enter your friend's ID or username to send them a friend request.
              </p>
              
              <div className="space-y-2">
                <Input
                  placeholder="Friend ID or username"
                  value={friendId}
                  onChange={(e) => {
                    setFriendId(e.target.value);
                    setError('');
                  }}
                  className="bg-input-background"
                  disabled={isAdding}
                />
                {error && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {error}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleAdd}
                  disabled={isAdding || !friendId.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isAdding ? 'Adding Friend...' : 'Add Friend'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleClose}
                  className="w-full"
                  disabled={isAdding}
                >
                  Cancel
                </Button>
              </div>

              <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
                <p className="font-medium mb-1">Tips:</p>
                <ul className="space-y-1">
                  <li>• Ask your friend for their Move-Mint ID</li>
                  <li>• You can find your ID in your profile settings</li>
                  <li>• Friend requests expire after 7 days</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}