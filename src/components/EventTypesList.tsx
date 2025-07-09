
import React, { useState } from 'react';
import { Search, Plus, Calendar, Clock, Users, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
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
  const [selectedTeamForNew, setSelectedTeamForNew] = useState<'personal' | number>('personal');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: 'A quick video meeting',
    duration: '30',
    slug: 'new-event'
  });

  const getDisplayedEvents = () => {
    if (selectedProfile === 'personal') {
      return eventTypes;
    }
    const team = teams.find(t => t.id === selectedProfile);
    return team ? team.eventTypes : [];
  };

  const filteredEvents = getDisplayedEvents().filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateEvent = () => {
    const event = {
      id: Date.now(),
      title: newEvent.title,
      slug: `/${newEvent.slug}`,
      description: newEvent.description,
      durations: [newEvent.duration + 'm'],
      isActive: true,
      color: 'azure',
      icon: '📅',
      bookingsToday: 0
    };

    if (selectedTeamForNew === 'personal') {
      setEventTypes([...eventTypes, event]);
    }
    
    setNewEvent({ title: '', description: 'A quick video meeting', duration: '30', slug: 'new-event' });
    setShowNewEventDialog(false);
    onEventClick(event);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Event Types
            </h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Create events to share for people to book on your calendar.
            </p>
          </div>
          <Button
            onClick={() => setShowNewEventDialog(true)}
            className="bg-[#007ee5] hover:bg-[#0066cc] text-white px-6 py-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>

        {/* Team Tabs */}
        <div className="flex items-center space-x-1 mb-6">
          <button
            onClick={() => setSelectedProfile('personal')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedProfile === 'personal'
                ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`
                : `${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
            }`}
          >
            Personal
          </button>
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedProfile(team.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedProfile === team.id
                  ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`
                  : `${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              {team.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <Input
              placeholder="Search event types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>
        </div>

        {/* Event Types List */}
        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onEventClick(event)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {event.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {event.durations.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {event.bookingsToday} bookings today
                    </span>
                  </div>
                </div>
                <Switch checked={event.isActive} />
              </div>
            </div>
          ))}
        </div>

        {/* New Event Dialog */}
        <Dialog open={showNewEventDialog} onOpenChange={setShowNewEventDialog}>
          <DialogContent className={`max-w-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            <DialogHeader>
              <DialogTitle className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Add a new event type
              </DialogTitle>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Create a new event type for people to book times with.
              </p>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Title</Label>
                <Input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="30 Minute Meeting"
                  className={`mt-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              
              <div>
                <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>URL</Label>
                <div className={`mt-1 flex items-center border rounded-md ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <span className={`px-3 py-2 text-sm ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'} border-r ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    cal.id/sanskar/
                  </span>
                  <input
                    type="text"
                    value={newEvent.slug}
                    onChange={(e) => setNewEvent({...newEvent, slug: e.target.value})}
                    className={`flex-1 px-3 py-2 text-sm bg-transparent outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    placeholder="new-event"
                  />
                </div>
              </div>
              
              <div>
                <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Description</Label>
                <Textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="A quick video meeting"
                  className={`mt-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 placeholder-gray-500'}`}
                />
              </div>
              
              <div>
                <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Duration</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    type="number"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                    className={`w-20 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>minutes</span>
                </div>
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
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventTypesList;
