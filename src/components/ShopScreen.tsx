import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UtensilsCrossed, Dumbbell, Shirt, Gift, Star, Search } from 'lucide-react';
import { RedeemModal } from './RedeemModal';


export function ShopScreen() {
  const [userPoints, setUserPoints] = useState(342);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);

  
  const formatPoints = (points: number) => {
    return `${points} points`;
  };

  const foodOffers = [
    {
      id: 1,
      name: 'Grams and Cals',
      offer: '2 points off any meal',
      points: 1000,
      description: 'Valid at all Bahrain locations',
      rating: 4.5,
      popular: true
    },
    {
      id: 2,
      name: 'Subway',
      offer: '20% off of any footlong sandwich',
      points: 1300,
      description: 'Valid at all locations',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Papa Johns',
      offer: '20% off medium pizza',
      points: 200,
      description: 'Online orders only',
      rating: 4.2
    },
    {
      id: 4,
      name: 'Boost Juice',
      offer: 'Buy 1 Get 1 50% off',
      points: 175,
      description: 'On large smoothies',
      rating: 4.4
    }
  ];

  const gymOffers = [
    {
      id: 1,
      name: 'Gold Fitness',
      offer: 'Free 3-day guest pass',
      points: 250,
      description: 'Bring a friend workout',
      rating: 4.3
    },
    {
      id: 2,
      name: 'Fitness First',
      offer: '25 points off membership',
      points: 500,
      description: 'New members only',
      rating: 4.1,
      popular: true
    },
    {
      id: 3,
      name: 'Serenity Yoga',
      offer: 'Free yoga class',
      points: 120,
      description: 'Any class level',
      rating: 4.8
    }
  ];

  const clothingOffers = [
    {
      id: 1,
      name: 'Nike',
      offer: '15% off athletic wear',
      points: 300,
      description: 'City Centre Bahrain',
      rating: 4.6,
      comingSoon: true
    },
    {
      id: 2,
      name: 'Under Armour',
      offer: '4 points off 20 points purchase',
      points: 250,
      description: 'Sportswear collection',
      rating: 4.4,
      comingSoon: true
    }
  ];

  const handleOfferClick = (offer: any) => {
    setSelectedOffer(offer);
    setShowRedeemModal(true);
  };

  const handleRedeem = (offer: any) => {
    setUserPoints(prev => prev - offer.points);
  };



  const filterOffers = (offers: any[]) => {
    if (!searchQuery) return offers;
    return offers.filter(offer => 
      offer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.offer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const OfferCard = ({ offer, category }: { offer: any; category: string }) => (
    <Card 
      className="p-4 mb-4 cursor-pointer hover:bg-muted/20 transition-colors"
      onClick={() => handleOfferClick(offer)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4>{offer.name}</h4>
            {offer.popular && <Badge variant="secondary">Popular</Badge>}
            {offer.comingSoon && <Badge variant="outline">Coming Soon</Badge>}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{offer.offer}</p>
          <p className="text-xs text-muted-foreground">{offer.description}</p>
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">{offer.rating}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-medium text-primary mb-2">{formatPoints(offer.points)}</div>
          <Button
            size="sm"
            variant="mint"
            disabled={userPoints < offer.points || offer.comingSoon}
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleOfferClick(offer);
            }}
          >
            {offer.comingSoon ? 'Soon' : userPoints >= offer.points ? 'Redeem' : 'Need more'}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="pb-20 pt-4">
      <div className="px-4 mb-6">
        <h1 className="text-2xl text-white mb-2">Reward Shop</h1>
        <p className="text-muted-foreground">You have <span className="text-primary font-medium">{formatPoints(userPoints)}</span> to spend</p>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search sponsors or offers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input-background"
          />
        </div>
      </div>

      <div className="px-4">
        <Tabs defaultValue="food" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="food" className="flex items-center gap-2">
              <UtensilsCrossed size={16} />
              Food
            </TabsTrigger>
            <TabsTrigger value="gym" className="flex items-center gap-2">
              <Dumbbell size={16} />
              Fitness
            </TabsTrigger>
            <TabsTrigger value="clothing" className="flex items-center gap-2">
              <Shirt size={16} />
              Clothing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="food" className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{filterOffers(foodOffers).length} offers available</span>
            </div>
            {filterOffers(foodOffers).map((offer) => (
              <OfferCard key={offer.id} offer={offer} category="food" />
            ))}
            {filterOffers(foodOffers).length === 0 && searchQuery && (
              <div className="text-center py-8 text-muted-foreground">
                No food offers found for "{searchQuery}"
              </div>
            )}
          </TabsContent>

          <TabsContent value="gym" className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{filterOffers(gymOffers).length} offers available</span>
            </div>
            {filterOffers(gymOffers).map((offer) => (
              <OfferCard key={offer.id} offer={offer} category="gym" />
            ))}
            {filterOffers(gymOffers).length === 0 && searchQuery && (
              <div className="text-center py-8 text-muted-foreground">
                No fitness offers found for "{searchQuery}"
              </div>
            )}
          </TabsContent>

          <TabsContent value="clothing" className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{filterOffers(clothingOffers).length} offers coming soon</span>
            </div>
            {filterOffers(clothingOffers).map((offer) => (
              <OfferCard key={offer.id} offer={offer} category="clothing" />
            ))}
            {filterOffers(clothingOffers).length === 0 && searchQuery && (
              <div className="text-center py-8 text-muted-foreground">
                No clothing offers found for "{searchQuery}"
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <RedeemModal
        isOpen={showRedeemModal}
        onClose={() => setShowRedeemModal(false)}
        offer={selectedOffer}
        userPoints={userPoints}
        onRedeem={handleRedeem}
      />


    </div>
  );
}