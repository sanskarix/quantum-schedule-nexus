
import React, { useState } from 'react';
import { Search, Plus, Edit, Copy, MoreHorizontal, GripVertical, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

interface EventTypesListProps {
  isDarkMode: boolean;
  eventTypes: any[];
  setEventTypes: (events: any[]) => void;
  teams: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onEventClick: (event: any) => void;
}

const EventTypesList: React.FC<EventTypesListProps> = ({
  isDarkMode,
  eventTypes,
  setEventTypes,
  teams,
  searchQuery,
  setSearchQuery,
  onEventClick
}) => {
  const [selectedProfile, setSelectedProfile] = useState<'personal' | number>('personal');
  const [showNewEventDialog, setShowNewEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    duration: '30',
    slug: ''
  });
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      azure: '#007ee5',
      pulse: '#f1352c', 
      amber: '#f9a400',
      quantum: '#008c44'
    };
    return colorMap[color] || '#007ee5';
  };

  const getDisplayedEvents = () => {
    if (selectedProfile === 'personal') {
      return eventTypes;
    }
    const team = teams.find(t => t.id === selectedProfile);
    return team ? team.eventTypes : [];
  };

  const getSelectedTeamName = () => {
    if (selectedProfile === 'personal') return null;
    const team = teams.find(t => t.id === selectedProfile);
    return team ? team.name : null;
  };

  const filteredEvents = getDisplayedEvents().filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateEvent = () => {
    const event = {
      id: Date.now(),
      title: newEvent.title,
      slug: `/${newEvent.slug || newEvent.title.toLowerCase().replace(/\s+/g, '-')}`,
      description: newEvent.description,
      durations: [newEvent.duration + 'm'],
      isActive: true,
      color: 'azure',
      icon: '📅',
      bookingsToday: 0
    };

    if (selectedProfile === 'personal') {
      setEventTypes([...eventTypes, event]);
    }
    
    setNewEvent({ title: '', description: '', duration: '30', slug: '' });
    setShowNewEventDialog(false);
  };

  return (
    <div className={`space-y-6 ${isDarkMode ? 'bg-[#0f0f0f] text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className="flex items-center space-x-2">
        <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Event Types
        </h1>
        {getSelectedTeamName() && (
          <>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>•</span>
            <span className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {getSelectedTeamName()}
            </span>
          </>
        )}
      </div>

      {/* Profile Selection Card */}
      <Card className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center space-x-6">
          {/* Personal Profile */}
          <div 
            className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all ${
              selectedProfile === 'personal' 
                ? (isDarkMode ? 'bg-blue-900/30 border-2 border-blue-500' : 'bg-blue-50 border-2 border-blue-500')
                : (isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50')
            }`}
            onClick={() => setSelectedProfile('personal')}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">S</span>
            </div>
            <div>
              <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sanskar
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Personal
              </p>
            </div>
          </div>

          {/* Teams */}
          <div className="flex items-center space-x-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  selectedProfile === team.id
                    ? (isDarkMode ? 'bg-blue-900/30 border-2 border-blue-500' : 'bg-blue-50 border-2 border-blue-500')
                    : (isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50')
                }`}
                onClick={() => setSelectedProfile(team.id)}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: getColorClass(team.color) }}
                >
                  {team.logo}
                </div>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {team.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Search and New Event */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <Input
            placeholder="Search event types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-300'}`}
          />
        </div>

        <Dialog open={showNewEventDialog} onOpenChange={setShowNewEventDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#007ee5] hover:bg-[#0066cc] text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className={`${isDarkMode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-300'}`}>
            <DialogHeader>
              <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                Create New Event Type
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Event Title</Label>
                <Input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="e.g. 30 Minute Meeting"
                  className={isDarkMode ? 'bg-[#151515] border-gray-600' : 'bg-white border-gray-300'}
                />
              </div>
              
              <div>
                <Label className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>URL Slug</Label>
                <Input
                  value={newEvent.slug}
                  onChange={(e) => setNewEvent({...newEvent, slug: e.target.value})}
                  placeholder="30-minute-meeting"
                  className={isDarkMode ? 'bg-[#151515] border-gray-600' : 'bg-white border-gray-300'}
                />
              </div>
              
              <div>
                <Label className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Description</Label>
                <Textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="A brief description of your event"
                  className={isDarkMode ? 'bg-[#151515] border-gray-600' : 'bg-white border-gray-300'}
                />
              </div>
              
              <div>
                <Label className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>Duration (minutes)</Label>
                <Input
                  type="number"
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                  placeholder="30"
                  className={isDarkMode ? 'bg-[#151515] border-gray-600' : 'bg-white border-gray-300'}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowNewEventDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateEvent}
                  className="bg-[#007ee5] hover:bg-[#0066cc] text-white"
                  disabled={!newEvent.title}
                >
                  Create Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Event Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event, index) => (
          <div
            key={event.id}
            className="relative group"
            onMouseEnter={() => setHoveredEvent(event.id)}
            onMouseLeave={() => setHoveredEvent(null)}
          >
            {/* Hover Controls */}
            {hoveredEvent === event.id && (
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-10">
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                  <GripVertical className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            <Card 
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                isDarkMode ? 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onEventClick(event)}
            >
              <div className="flex items-start justify-between mb-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: getColorClass(event.color) }}
                >
                  {event.icon}
                </div>
                <div className="flex items-center space-x-1">
                  <Switch checked={event.isActive} size="sm" />
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <h3 className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {event.title}
              </h3>
              
              <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {event.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {event.durations[0]}
                </span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {event.bookingsToday} today
                </span>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTypesList;
