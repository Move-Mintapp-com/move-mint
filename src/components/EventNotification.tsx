import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { Card } from './ui/card';

export function EventNotification() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <Card className="p-4 bg-card border-border shadow-lg max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white mb-1">Upcoming Event</h4>
            <p className="text-sm text-muted-foreground">
              City Center Marathon at 7 am on Friday, October 17
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </div>
  );
}
