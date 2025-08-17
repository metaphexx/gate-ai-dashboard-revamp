
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookmarkPlus, Edit, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  timestamp: number;
  content: string;
  created: Date;
}

interface NoteTakingProps {
  videoId: string;
  currentTime: number;
}

const NoteTaking: React.FC<NoteTakingProps> = ({ videoId, currentTime }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${videoId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [videoId]);

  // Save notes to localStorage
  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem(`notes-${videoId}`, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const addNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      timestamp: Math.floor(currentTime),
      content: newNote.trim(),
      created: new Date()
    };

    const updatedNotes = [...notes, note].sort((a, b) => a.timestamp - b.timestamp);
    saveNotes(updatedNotes);
    setNewNote('');
    
    toast({
      title: "Note added",
      description: `Note saved at ${formatTime(note.timestamp)}`,
    });
  };

  const updateNote = (id: string, content: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, content } : note
    );
    saveNotes(updatedNotes);
    setEditingId(null);
    
    toast({
      title: "Note updated",
      description: "Your note has been saved",
    });
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
    
    toast({
      title: "Note deleted",
      description: "Note has been removed",
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookmarkPlus className="w-5 h-5" />
          Notes ({notes.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pb-20 md:pb-6">
        {/* Add new note */}
        <div className="space-y-2">
          <Textarea
            placeholder="Add a note at the current time..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={3}
          />
          <div className="flex justify-between items-center">
            <Badge variant="outline">
              Time: {formatTime(Math.floor(currentTime))}
            </Badge>
            <Button onClick={addNote} disabled={!newNote.trim()}>
              <Save className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>
        </div>

        {/* Notes list */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {notes.map((note) => (
            <div key={note.id} className="p-3 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-xs">
                  {formatTime(note.timestamp)}
                </Badge>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(note.id)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              {editingId === note.id ? (
                <div className="space-y-2">
                  <Textarea
                    defaultValue={note.content}
                    onBlur={(e) => updateNote(note.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.ctrlKey) {
                        updateNote(note.id, e.currentTarget.value);
                      }
                    }}
                    autoFocus
                  />
                  <div className="text-xs text-gray-500">
                    Press Ctrl+Enter to save
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-700">{note.content}</p>
              )}
            </div>
          ))}
          
          {notes.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No notes yet. Add your first note!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteTaking;
