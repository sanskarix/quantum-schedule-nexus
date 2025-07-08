import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MoreVertical, Copy, CheckCircle, Search, Settings, Code2, Trash2, ExternalLink, BarChart3, Menu, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import EmbedDialog from './EmbedDialog';

interface EventType {
  id: number;
  title: string;
  slug: string;
  description: string;
  durations: string[];
  isActive: boolean;
  color: string;
  icon: string;
  bookingsToday: number;
}

interface Team {
  id: number;
  name: string;
  slug: string;
  logo: string;
  color: string;
  eventTypes: EventType[];
}

interface EventTypesListProps {
  eventTypes: EventType[];
  setEventTypes: React.Dispatch<React.SetStateAction<EventType[]>>;
  isDarkMode: boolean;
  searchQuery: string;
  teams: Team[];
  selectedTeam: Team | null;
}

const EventTypesList: React.FC<EventTypesListProps> = ({ eventTypes, setEventTypes, isDarkMode, searchQuery, teams, selectedTeam }) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEmbedDialog, setShowEmbedDialog] = useState(false);
  const [selectedEventForEmbed, setSelectedEventForEmbed] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);
  const [newEventType, setNewEventType] = useState({
    title: '',
    slug: '',
    description: 'A quick video meeting',
    selectedDurations: ['30m']
  });

  const stats = [
    { label: 'Avg. duration', value: '30m' },
    { label: 'Total events', value: '9' },
    { label: 'This week', value: '+3' },
  ];

  const handleCreateEvent = () => {
    setShowCreateDialog(true);
  };

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(`cal.com/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverItem(index);
  };

  const handleDragEnd = () => {
    if (draggedItem !== null && dragOverItem !== null && draggedItem !== dragOverItem) {
      const newEventTypes = [...currentEventTypes];
      const draggedEventType = newEventTypes[draggedItem];
      newEventTypes.splice(draggedItem, 1);
      newEventTypes.splice(dragOverItem, 0, draggedEventType);
      
      if (selectedTeam) {
        const updatedTeams = teams.map(team => 
          team.id === selectedTeam.id 
            ? { ...team, eventTypes: newEventTypes }
            : team
        );
        // Update teams state if needed
      } else {
        setEventTypes(newEventTypes);
      }
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const moveEventType = (index: number, direction: 'up' | 'down') => {
    const newEventTypes = [...currentEventTypes];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newEventTypes.length) {
      const temp = newEventTypes[index];
      newEventTypes[index] = newEventTypes[targetIndex];
      newEventTypes[targetIndex] = temp;
      
      if (selectedTeam) {
        const updatedTeams = teams.map(team => 
          team.id === selectedTeam.id 
            ? { ...team, eventTypes: newEventTypes }
            : team
        );
        // Update teams state if needed
      } else {
        setEventTypes(newEventTypes);
      }
    }
  };

  const getCurrentEventTypes = () => {
    if (selectedTeam) {
      return teams.find(team => team.id === selectedTeam.id)?.eventTypes.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
    } else {
      return eventTypes.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  const handleDeleteEvent = (id: number) => {
    if (selectedTeam) {
      const updatedTeams = teams.map(team =>
        team.id === selectedTeam.id
          ? { ...team, eventTypes: team.eventTypes.filter(event => event.id !== id) }
          : team
      );
      // Update teams state if needed
    } else {
      setEventTypes(eventTypes.filter(event => event.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {stats.map((stat) => (
            <div key={stat.label} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              {stat.label}: <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</span>
            </div>
          ))}
        </div>
        <Button onClick={handleCreateEvent} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Event Type
        </Button>
      </div>

      {/* Create Event Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className={`max-w-2xl max-h-[85vh] overflow-y-auto ${isDarkMode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create New Event Type</DialogTitle>
            <DialogDescription className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Define the details for your new event type.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className={`text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Title</Label>
              <Input id="title" value={newEventType.title} onChange={(e) => setNewEventType({ ...newEventType, title: e.target.value })} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className={`text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Slug</Label>
              <Input id="slug" value={newEventType.slug} onChange={(e) => setNewEventType({ ...newEventType, slug: e.target.value })} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="description" className={`text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Description</Label>
              <Textarea id="description" value={newEventType.description} onChange={(e) => setNewEventType({ ...newEventType, description: e.target.value })} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className={`text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Durations</Label>
              <div className="col-span-3 flex space-x-2">
                <Select onValueChange={(value) => setNewEventType({ ...newEventType, selectedDurations: [value] })}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15m">15 minutes</SelectItem>
                    <SelectItem value="30m">30 minutes</SelectItem>
                    <SelectItem value="45m">45 minutes</SelectItem>
                    <SelectItem value="60m">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCurrentEventTypes().map((event, index) => (
          <Card 
            key={event.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`group cursor-move transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
              isDarkMode ? 'bg-[#1a1a1a] border-gray-800 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
            } ${dragOverItem === index ? 'ring-2 ring-blue-500' : ''}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {/* Event Type Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <Calendar className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                  
                  {/* Drag and Move Controls */}
                  <div className="flex flex-col items-center space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveEventType(index, 'up')}
                      disabled={index === 0}
                      className="w-6 h-6 p-0"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <GripVertical className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveEventType(index, 'down')}
                      disabled={index === getCurrentEventTypes().length - 1}
                      className="w-6 h-6 p-0"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#C9D9E3] ${
                        isDarkMode ? 'hover:bg-gray-700' : ''
                      }`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={`w-48 shadow-xl rounded-xl ${isDarkMode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'}`}>
                    <DropdownMenuItem 
                      onClick={(e) => { e.stopPropagation(); setShowEmbedDialog(true); setSelectedEventForEmbed(event); }}
                      className={`rounded-lg m-1 text-base ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`} 
                      style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                    >
                      <Code2 className="w-5 h-5 mr-3" />
                      Embed
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}
                      className={`text-red-600 rounded-lg m-1 text-base ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                    >
                      <Trash2 className="w-5 h-5 mr-3" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Event Details */}
              <h3 className={`text-lg font-semibold mb-2 transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {event.title}
              </h3>
              <p className={`text-sm mb-3 transition-colors duration-200 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {event.description}
              </p>

              {/* Durations and Active Status */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {event.durations.map((duration) => (
                    <Badge key={duration} variant="secondary">
                      {duration}
                    </Badge>
                  ))}
                </div>
                <Switch checked={event.isActive} disabled={true} />
              </div>

              {/* Copy Link */}
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => { e.stopPropagation(); copyToClipboard(event.slug); }}
                className="w-full mt-4"
              >
                {copiedId === event.slug ? (
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copiedId === event.slug ? 'Link Copied!' : 'Copy Link'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Embed Dialog */}
      <EmbedDialog 
        open={showEmbedDialog}
        onOpenChange={setShowEmbedDialog}
        isDarkMode={isDarkMode}
        eventType={selectedEventForEmbed}
      />
    </div>
  );
};

export default EventTypesList;
