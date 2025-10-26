import { useState } from 'react';
import { Card } from './ui/card';
import { CircularProgress } from './CircularProgress';
import { CommunityNotesModal } from './CommunityNotesModal';
import { MapPin, ZoomIn, ZoomOut, Maximize2, Coffee, Utensils, TreePine, Waves } from 'lucide-react';
import { Button } from './ui/button';

interface CommunityNote {
  id: string;
  user: string;
  avatar: string;
  note: string;
  likes: number;
  timestamp: string;
}

interface LocationMarker {
  id: string;
  name: string;
  slangName: string;
  type: 'city' | 'beach' | 'restaurant' | 'park' | 'cafe';
  lat: number; // percentage from top
  lng: number; // percentage from left
  visited: boolean;
  notes: CommunityNote[];
}

export function BahrainMap() {
  const [zoom, setZoom] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<LocationMarker | null>(null);
  const [showNotesModal, setShowNotesModal] = useState(false);

  // Locations based on actual Bahrain map
  const [locations, setLocations] = useState<LocationMarker[]>([
    // Major Cities
    { id: 'manama', name: 'Manama', slangName: 'Manama', type: 'city', lat: 20, lng: 58, visited: true, notes: [
        {
          id: '1',
          user: 'Ahmed Al-Khalifa',
          avatar: '',
          note: 'Great running track along the corniche! Best time is early morning 🌅',
          likes: 24,
          timestamp: '2 days ago',
        },
        {
          id: '2',
          user: 'Sara Hassan',
          avatar: '',
          note: 'Manama Souq is perfect for walking! So many steps counted here 😂',
          likes: 18,
          timestamp: '1 week ago',
        },
      ]
    },
    { id: 'muharraq', name: 'Muharraq', slangName: 'Muharraq', type: 'city', lat: 16, lng: 70, visited: true, notes: [
        {
          id: '3',
          user: 'Fatima Ali',
          avatar: '',
          note: 'Beautiful walking paths near Arad Fort. Historic and healthy! 🏰',
          likes: 31,
          timestamp: '3 days ago',
        },
      ]
    },
    { id: 'hidd', name: 'Hidd', slangName: 'Hidd', type: 'city', lat: 15, lng: 77, visited: false, notes: [] },
    { id: 'budaiya', name: 'Budaiya', slangName: 'Budaiya', type: 'city', lat: 22, lng: 32, visited: true, notes: [] },
    { id: 'diraz', name: 'Diraz', slangName: 'Diraz', type: 'city', lat: 24, lng: 35, visited: false, notes: [] },
    { id: 'bani-jamra', name: 'Bani Jamra', slangName: 'Bani Jamra', type: 'city', lat: 26, lng: 37, visited: false, notes: [] },
    { id: 'sanabis', name: 'Sanabis', slangName: 'Sanabis', type: 'city', lat: 19, lng: 48, visited: false, notes: [] },
    { id: 'saar', name: 'Saar', slangName: 'Saar', type: 'city', lat: 28, lng: 44, visited: false, notes: [] },
    { id: 'jidhafs', name: 'Jidhafs', slangName: 'Jidhafs', type: 'city', lat: 24, lng: 52, visited: false, notes: [] },
    { id: 'tubli', name: 'Tubli', slangName: 'Tubli', type: 'city', lat: 30, lng: 58, visited: false, notes: [] },
    { id: 'adliya', name: 'Adliya', slangName: 'Adliya', type: 'city', lat: 22, lng: 62, visited: true, notes: [] },
    { id: 'isa-town', name: 'Isa Town', slangName: 'Isa Town', type: 'city', lat: 38, lng: 54, visited: true, notes: [
        {
          id: '4',
          user: 'Mohammed Yusuf',
          avatar: '',
          note: 'Mall walking is underrated! Perfect for hot days 🌡️❄️',
          likes: 12,
          timestamp: '5 days ago',
        },
      ]
    },
    { id: 'aali', name: "A'ali", slangName: "A'ali", type: 'city', lat: 42, lng: 52, visited: false, notes: [] },
    { id: 'sitra', name: 'Sitra', slangName: 'Sitra', type: 'city', lat: 38, lng: 68, visited: true, notes: [
        {
          id: '5',
          user: 'Layla Ahmed',
          avatar: '',
          note: 'The beach walkway here is amazing! Sea breeze makes it so refreshing 🌊',
          likes: 27,
          timestamp: '4 days ago',
        },
      ]
    },
    { id: 'hamad-town', name: 'Hamad Town', slangName: 'Hamad Town', type: 'city', lat: 52, lng: 48, visited: false, notes: [] },
    { id: 'riffa', name: 'Riffa', slangName: 'Riffa', type: 'city', lat: 50, lng: 56, visited: false, notes: [] },
    { id: 'awali', name: 'Awali', slangName: 'Awali', type: 'city', lat: 58, lng: 64, visited: false, notes: [] },
    { id: 'askar', name: 'Askar', slangName: 'Askar', type: 'city', lat: 60, lng: 72, visited: false, notes: [] },
    { id: 'zallaq', name: 'Zallaq', slangName: 'Zallaq', type: 'city', lat: 68, lng: 42, visited: false, notes: [] },
    { id: 'al-malikiyah', name: 'Al-Malikiyah', slangName: 'Al-Malikiyah', type: 'city', lat: 62, lng: 45, visited: false, notes: [] },
    { id: 'al-dur', name: 'Al Dur', slangName: 'Al Dur', type: 'city', lat: 78, lng: 68, visited: false, notes: [] },
    { id: 'durrat', name: 'Durrat al Bahrain', slangName: 'Durrat al Bahrain', type: 'city', lat: 88, lng: 65, visited: false, notes: [] },
    
    // Points of Interest
    { id: 'um-al-naasan', name: 'Um Al Naasan', slangName: 'Um Al Naasan', type: 'park', lat: 45, lng: 28, visited: false, notes: [] },
  ]);

  const visitedLocations = locations.filter(loc => loc.visited).length;
  const progressPercentage = Math.round((visitedLocations / locations.length) * 100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.8));
  const handleReset = () => setZoom(1);

  const handleLocationClick = (location: LocationMarker) => {
    setSelectedLocation(location);
    setShowNotesModal(true);
    
    // Mark as visited when clicked
    if (!location.visited) {
      setLocations(prev => prev.map(loc =>
        loc.id === location.id ? { ...loc, visited: true } : loc
      ));
    }
  };

  const handleAddNote = (note: string) => {
    if (selectedLocation) {
      const newNote: CommunityNote = {
        id: Date.now().toString(),
        user: 'You',
        avatar: '',
        note,
        likes: 0,
        timestamp: 'Just now',
      };

      setLocations(prev => prev.map(loc =>
        loc.id === selectedLocation.id
          ? { ...loc, notes: [...loc.notes, newNote] }
          : loc
      ));

      setSelectedLocation(prev => prev ? { ...prev, notes: [...prev.notes, newNote] } : null);
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'beach':
        return <Waves className="w-4 h-4" />;
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'park':
        return <TreePine className="w-4 h-4" />;
      case 'cafe':
        return <Coffee className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Progress Stats */}
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-white mb-1">Bahrain Exploration</h3>
            <p className="text-sm text-muted-foreground">
              You've walked {progressPercentage}% of Bahrain
            </p>
            <div className="mt-3 w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <div className="ml-6">
            <CircularProgress progress={progressPercentage} size={80}>
              <div className="text-center">
                <div className="text-xl font-bold text-white">{progressPercentage}%</div>
                <div className="text-xs text-muted-foreground">Explored</div>
              </div>
            </CircularProgress>
          </div>
        </div>
      </Card>

      {/* Map Container */}
      <Card className="p-0 bg-[#0D0D0D] border-border/50 overflow-hidden">
        {/* Map Header */}
        <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border-b border-white/10">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#81D8D0]" />
            <h3 className="text-white">Interactive Map</h3>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="w-8 h-8 p-0 bg-[#2a2a2a] border-white/20 hover:bg-[#3a3a3a]"
            >
              <ZoomOut className="w-4 h-4 text-white" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="w-8 h-8 p-0 bg-[#2a2a2a] border-white/20 hover:bg-[#3a3a3a]"
            >
              <ZoomIn className="w-4 h-4 text-white" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="w-8 h-8 p-0 bg-[#2a2a2a] border-white/20 hover:bg-[#3a3a3a]"
            >
              <Maximize2 className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>

        {/* Map Area */}
        <div className="relative w-full h-[600px] overflow-hidden bg-[#0D0D0D]">
          {/* Map Image Background */}
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Bahrain Map Image */}
            <div className="relative w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1649322683053-affc3190ccca?w=800&h=1200&fit=crop"
                alt="Bahrain Map"
                className="w-full h-full object-cover opacity-95"
                style={{
                  filter: 'brightness(0.6) contrast(1.3) saturate(0.7)',
                  mixBlendMode: 'normal',
                }}
              />
              
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
              
              {/* Visited areas overlay */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <radialGradient id="visitedGlow">
                    <stop offset="0%" stopColor="rgba(129, 216, 208, 0.3)" />
                    <stop offset="50%" stopColor="rgba(129, 216, 208, 0.15)" />
                    <stop offset="100%" stopColor="rgba(129, 216, 208, 0)" />
                  </radialGradient>
                </defs>
                
                {/* Visited location glows */}
                {locations.filter(loc => loc.visited && loc.type === 'city').map((loc) => (
                  <circle
                    key={`visited-${loc.id}`}
                    cx={`${loc.lng}%`}
                    cy={`${loc.lat}%`}
                    r="8"
                    fill="url(#visitedGlow)"
                    style={{
                      filter: 'blur(15px)',
                    }}
                  />
                ))}
              </svg>
              
              {/* Interactive markers layer */}
              <div className="absolute inset-0">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => handleLocationClick(location)}
                    className="absolute cursor-pointer transition-all duration-200 hover:scale-125"
                    style={{
                      left: `${location.lng}%`,
                      top: `${location.lat}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Marker pin */}
                    <div className="relative">
                      <div
                        className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${
                          location.visited ? 'bg-[#81D8D0] animate-pulse' : 'bg-[#4a5f6e]'
                        }`}
                        style={{
                          boxShadow: location.visited
                            ? '0 0 20px rgba(129, 216, 208, 0.8)'
                            : '0 4px 8px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        {getMarkerIcon(location.type)}
                      </div>
                      
                      {/* Notes count badge */}
                      {location.notes.length > 0 && (
                        <div
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
                        >
                          <span className="text-white text-xs font-bold">
                            {location.notes.length}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Location label */}
                    <div
                      className={`absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-xs font-semibold ${
                        location.visited ? 'text-[#81D8D0]' : 'text-white'
                      }`}
                      style={{
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(4px)',
                        fontSize: location.type === 'city' ? '11px' : '9px',
                      }}
                    >
                      {location.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-3 rounded-lg text-xs text-white space-y-2 border border-white/10">
            <p className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-[#81D8D0] rounded-full border-2 border-white"></span>
              <span>Visited areas</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 bg-[#4a5f6e] rounded-full border-2 border-white"></span>
              <span>Not explored</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-4 h-4 bg-[#ff4444] text-white rounded-full border border-white text-[8px]">2</span>
              <span>Community notes</span>
            </p>
          </div>

          {/* Zoom indicator */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-white border border-white/10">
            Zoom: {Math.round(zoom * 100)}%
          </div>
        </div>

        {/* Map Footer */}
        <div className="p-3 bg-[#1a1a1a] border-t border-white/10">
          <p className="text-xs text-center" style={{ color: '#81D8D0' }}>
            Tap markers to explore • Pinch or use buttons to zoom • {visitedLocations}/{locations.length} locations discovered
          </p>
        </div>
      </Card>

      {/* Community Notes Modal */}
      {selectedLocation && (
        <CommunityNotesModal
          isOpen={showNotesModal}
          onClose={() => setShowNotesModal(false)}
          locationName={selectedLocation.name}
          locationNotes={selectedLocation.notes}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
}
