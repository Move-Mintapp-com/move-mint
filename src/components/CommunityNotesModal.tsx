import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { MapPin, MessageCircle, ThumbsUp, Send } from 'lucide-react';
import { Card } from './ui/card';

interface CommunityNote {
  id: string;
  user: string;
  avatar: string;
  note: string;
  likes: number;
  timestamp: string;
}

interface CommunityNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  locationNotes: CommunityNote[];
  onAddNote: (note: string) => void;
}

export function CommunityNotesModal({
  isOpen,
  onClose,
  locationName,
  locationNotes,
  onAddNote,
}: CommunityNotesModalProps) {
  const [newNote, setNewNote] = useState('');
  const [likedNotes, setLikedNotes] = useState<Set<string>>(new Set());

  const handleSubmit = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  const handleLike = (noteId: string) => {
    setLikedNotes(prev => {
      const updated = new Set(prev);
      if (updated.has(noteId)) {
        updated.delete(noteId);
      } else {
        updated.add(noteId);
      }
      return updated;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-lg mx-auto bg-card border-border shadow-2xl backdrop-blur-none opacity-100 max-h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <DialogTitle className="text-xl text-white">{locationName}</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            Share tips and experiences with the community
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {locationNotes.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No notes yet. Be the first to share!</p>
            </div>
          ) : (
            locationNotes.map((note) => (
              <Card key={note.id} className="p-4 bg-muted/50">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      {note.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white text-sm">{note.user}</span>
                      <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                    </div>
                    <p className="text-sm text-white mb-2">{note.note}</p>
                    <button
                      onClick={() => handleLike(note.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ThumbsUp 
                        className={`w-3 h-3 ${likedNotes.has(note.id) ? 'fill-primary text-primary' : ''}`} 
                      />
                      <span>{note.likes + (likedNotes.has(note.id) ? 1 : 0)}</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="mt-4 space-y-3 border-t border-border pt-4">
          <Textarea
            placeholder="Share your experience, tips, or recommendations..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="bg-input-background !border-2 !border-primary text-white min-h-[80px] resize-none focus:!border-primary focus:brightness-110 transition-all"
            maxLength={280}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {newNote.length}/280
            </span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!newNote.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="w-4 h-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
