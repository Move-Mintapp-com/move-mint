import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trophy, Medal, Award, Users, Globe, UserPlus } from 'lucide-react';
import { AddFriendModal } from './AddFriendModal';

export function LeaderboardScreen() {
  const [selectedTab, setSelectedTab] = useState('friends');
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friends, setFriends] = useState<string[]>([]);
  const [pendingRequests, setPendingRequests] = useState([
    { id: 'jw1', name: 'Jessica Williams', avatar: '' }
  ]);

  const friendsLeaderboard = [
    { 
      id: 1, 
      rank: 1, 
      name: 'Sarah Johnson', 
      avatar: '', 
      steps: 12450, 
      streak: 15,
      points: 1245,
      isUser: false
    },
    { 
      id: 2, 
      rank: 2, 
      name: 'You', 
      avatar: '', 
      steps: 11200, 
      streak: 7,
      points: 1120,
      isUser: true
    },
    { 
      id: 3, 
      rank: 3, 
      name: 'Mike Chen', 
      avatar: '', 
      steps: 10800, 
      streak: 12,
      points: 1080,
      isUser: false
    },
    { 
      id: 4, 
      rank: 4, 
      name: 'Emily Davis', 
      avatar: '', 
      steps: 9650, 
      streak: 3,
      points: 965,
      isUser: false
    },
    { 
      id: 5, 
      rank: 5, 
      name: 'Alex Rodriguez', 
      avatar: '', 
      steps: 8900, 
      streak: 21,
      points: 890,
      isUser: false
    },
  ];

  const globalLeaderboard = [
    { 
      id: 1, 
      rank: 1, 
      name: 'Ahmad Al-Rashid', 
      avatar: '', 
      steps: 18750, 
      streak: 45,
      points: 1875,
      location: 'Manama'
    },
    { 
      id: 2, 
      rank: 2, 
      name: 'Fatima Hassan', 
      avatar: '', 
      steps: 17200, 
      streak: 32,
      points: 1720,
      location: 'Riffa'
    },
    { 
      id: 3, 
      rank: 3, 
      name: 'Omar Khalil', 
      avatar: '', 
      steps: 16800, 
      streak: 28,
      points: 1680,
      location: 'Muharraq'
    },
    // ... more global users
    { 
      id: 247, 
      rank: 247, 
      name: 'You', 
      avatar: '', 
      steps: 11200, 
      streak: 7,
      points: 1120,
      isUser: true,
      location: 'Manama'
    },
  ];

  const handleAddFriend = (friendId: string) => {
    setFriends(prev => [...prev, friendId]);
  };

  const handleAcceptRequest = (requestId: string) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      setFriends(prev => [...prev, request.name]);
      setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    }
  };

  const handleDeclineRequest = (requestId: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 text-center text-muted-foreground">#{rank}</span>;
    }
  };

  const LeaderboardItem = ({ user, showLocation = false }: { user: any; showLocation?: boolean }) => (
    <Card className={`p-4 mb-3 ${user.isUser ? 'border-primary bg-primary/5' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8">
            {getRankIcon(user.rank)}
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/20 text-primary">
              {user.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`font-medium ${user.isUser ? 'text-primary' : ''}`}>
                {user.name}
              </span>
              {user.isUser && <Badge variant="secondary">You</Badge>}
            </div>
            <div className="text-sm text-muted-foreground">
              {user.steps.toLocaleString()} steps
              {showLocation && user.location && ` • ${user.location}`}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-medium text-primary">{user.points} points</div>
          <div className="text-xs text-muted-foreground">{user.streak} day streak</div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="mb-6">
        <h1 className="text-2xl text-white mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">See how you stack up against others</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="friends" className="flex items-center gap-2">
            <Users size={16} />
            Friends
          </TabsTrigger>
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Globe size={16} />
            Local
          </TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-4">
          {/* Add Friends Button */}
          <Card className="p-4 border-dashed">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4>Add Friends</h4>
                  <p className="text-sm text-muted-foreground">Compete with friends and family</p>
                </div>
              </div>
              <Button size="sm" onClick={() => setShowAddFriendModal(true)}>Add</Button>
            </div>
          </Card>

          {/* Friends Leaderboard */}
          <div>
            <h3 className="mb-4 text-white">This Week</h3>
            {friendsLeaderboard.map((user) => (
              <LeaderboardItem key={user.id} user={user} />
            ))}
          </div>

          {/* Friend Requests */}
          {pendingRequests.length > 0 && (
            <Card className="p-4">
              <h4 className="mb-3">Pending Requests</h4>
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-muted text-xs">
                          {request.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{request.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 px-2 text-xs"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        Decline
                      </Button>
                      <Button 
                        size="sm" 
                        className="h-7 px-2 text-xs"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="global" className="space-y-4">
          <div className="mb-4">
            <h3 className="text-white mb-2">Bahrain Rankings</h3>
            <p className="text-sm text-muted-foreground">Top performers in your region</p>
          </div>

          {/* Top 3 */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {globalLeaderboard.slice(0, 3).map((user, index) => (
              <Card key={user.id} className="p-3 text-center">
                <div className="mb-2">
                  {getRankIcon(user.rank)}
                </div>
                <Avatar className="w-8 h-8 mx-auto mb-2">
                  <AvatarFallback className="text-xs bg-primary/20 text-primary">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs font-medium mb-1">{user.name.split(' ')[0]}</div>
                <div className="text-xs text-muted-foreground">{user.steps.toLocaleString()}</div>
              </Card>
            ))}
          </div>

          {/* Your Rank */}
          <div className="mb-4">
            <h4 className="text-sm text-muted-foreground mb-2">Your Position</h4>
            <LeaderboardItem 
              user={globalLeaderboard.find(u => u.isUser)} 
              showLocation 
            />
          </div>

          {/* Top performers around user */}
          <div>
            <h4 className="text-sm text-muted-foreground mb-2">Around Your Rank</h4>
            {globalLeaderboard.slice(3, 8).map((user) => (
              <LeaderboardItem key={user.id} user={user} showLocation />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Friend Modal */}
      <AddFriendModal
        isOpen={showAddFriendModal}
        onClose={() => setShowAddFriendModal(false)}
        onAddFriend={handleAddFriend}
      />
    </div>
  );
}