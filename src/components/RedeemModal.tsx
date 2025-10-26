import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Star, Clock, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface RedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  userPoints: number;
  onRedeem: (offer: any) => void;
}

export function RedeemModal({ isOpen, onClose, offer, userPoints, onRedeem }: RedeemModalProps) {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');

  if (!offer) return null;

  const formatBD = (points: number) => {
    return `BD ${(points / 1000).toFixed(3)}`;
  };

  const generateRedeemCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleRedeem = async () => {
    setIsRedeeming(true);
    // Simulate API call
    setTimeout(() => {
      setIsRedeeming(false);
      setIsRedeemed(true);
      setRedeemCode(generateRedeemCode());
      onRedeem(offer);
    }, 1000);
  };

  const canRedeem = userPoints >= offer.points && !offer.comingSoon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-md mx-auto bg-card border-border shadow-2xl backdrop-blur-none">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl text-white">{offer.name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Review and redeem this offer with your points
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isRedeemed ? (
            <>
              {/* Offer Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{offer.rating}</span>
                  {offer.popular && <Badge variant="secondary">Popular</Badge>}
                  {offer.comingSoon && <Badge variant="outline">Coming Soon</Badge>}
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg border border-border">
                  <h3 className="font-medium mb-3 text-primary">Offer Details</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">Discount</h4>
                      <p className="text-sm text-muted-foreground">{offer.offer}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">Valid Until</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{offer.expiryDate || 'Dec 31, 2024'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Redeemed State */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Offer Redeemed! 🎉</h3>
                  <p className="text-sm text-muted-foreground">Present this code to the cashier or use in the app</p>
                </div>
                
                <div className="p-6 bg-primary/10 rounded-lg border border-primary/30">
                  <div className="text-xs text-muted-foreground mb-2">REDEEM CODE</div>
                  <div className="text-3xl font-mono font-bold text-primary tracking-wider">
                    {redeemCode}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Valid until {offer.expiryDate || 'Dec 31, 2024'}
                  </div>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg border border-border">
                  <h4 className="text-sm font-medium text-white mb-2">Your Purchase</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Offer:</span>
                      <span className="text-white">{offer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount:</span>
                      <span className="text-white">{offer.offer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Points Used:</span>
                      <span className="text-destructive">-BD {(offer.points / 1000).toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining Balance:</span>
                      <span className="text-primary">BD {((userPoints - offer.points) / 1000).toFixed(3)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => {
                    setIsRedeemed(false);
                    setRedeemCode('');
                    onClose();
                  }}
                  className="w-full"
                  size="lg"
                >
                  Done
                </Button>
              </div>
            </>
          )}

          {!isRedeemed && (
            <>
              {/* Points Required */}
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                <span className="font-medium">Points Required</span>
                <span className="text-lg font-medium text-primary">{formatBD(offer.points)}</span>
              </div>

              {/* User Balance */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Your Balance</span>
                <span className={`font-medium ${canRedeem ? 'text-primary' : 'text-destructive'}`}>
                  {formatBD(userPoints)}
                </span>
              </div>

              {/* Redeem Button */}
              <div className="space-y-3">
                <Button 
                  onClick={handleRedeem}
                  disabled={!canRedeem || isRedeeming}
                  className="w-full"
                  size="lg"
                >
                  {isRedeeming ? 'Processing...' : 
                   offer.comingSoon ? 'Coming Soon' :
                   !canRedeem ? 'Insufficient Points' : 'Redeem Now'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="w-full"
                  disabled={isRedeeming}
                >
                  Cancel
                </Button>
              </div>

              {/* Terms */}
              <p className="text-xs text-muted-foreground text-center">
                By redeeming, you agree to the terms and conditions. 
                Points will be deducted from your balance immediately.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}