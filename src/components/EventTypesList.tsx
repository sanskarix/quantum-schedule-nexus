import React, { useState } from 'react';
import { Search, Plus, Edit, Copy, MoreHorizontal, GripVertical, ArrowUp, ArrowDown, Check, ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

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
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [selectedTeamForNew, setSelectedTeamForNew] = useState<'personal' | number>('personal');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: 'A quick video meeting',
    duration: '30',
    slug: 'new-event'
  });
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

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
    if (selectedProfile === 'personal') return 'Personal';
    const team = teams.find(t => t.id === selectedProfile);
    return team ? team.name : '';
  };

  const getSelectedTeamSlug = () => {
    if (selectedProfile === 'personal') return 'cal.id/sanskar';
    const team = teams.find(t => t.id === selectedProfile);
    return team ? team.slug : '';
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
    
    // Navigate to edit page
    onEventClick(event);
  };

  const handleCopyLink = (slug: string) => {
    const baseUrl = selectedProfile === 'personal' ? 'cal.id/sanskar' : getSelectedTeamSlug();
    const fullUrl = `${baseUrl}${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(slug);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const moveEvent = (eventId: number, direction: 'up' | 'down') => {
    const events = getDisplayedEvents();
    const currentIndex = events.findIndex(e => e.id === eventId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= events.length) return;

    const newEvents = [...events];
    [newEvents[currentIndex], newEvents[newIndex]] = [newEvents[newIndex], newEvents[currentIndex]];
    
    if (selectedProfile === 'personal') {
      setEventTypes(newEvents);
    }
  };

  const getTeamForNewEvent = () => {
    if (selectedTeamForNew === 'personal') return 'Personal';
    const team = teams.find(t => t.id === selectedTeamForNew);
    return team ? team.name : '';
  };

  const getSlugForNewEvent = () => {
    if (selectedTeamForNew === 'personal') return 'sanskar';
    const team = teams.find(t => t.id === selectedTeamForNew);
    return team ? team.slug.split('/').pop() : '';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Team Tabs */}
        <div className="flex items-center space-x-1 mb-8">
          <button
            onClick={() => setSelectedProfile('personal')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedProfile === 'personal'
                ? `${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}`
                : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
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
                  ? `${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}`
                  : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
            >
              {team.name}
            </button>
          ))}
        </div>

        {/* Search and New Event */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <Input
                placeholder="Search event types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 w-80 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
            
            {selectedProfile !== 'personal' && (
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} animate-fade-in`}>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {getSelectedTeamSlug()}
                </span>
                <button
                  onClick={() => handleCopyLink('')}
                  className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <Button
              onClick={() => setShowTeamDropdown(!showTeamDropdown)}
              className="bg-[#007ee5] hover:bg-[#0066cc] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
            
            {showTeamDropdown && (
              <div className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setSelectedTeamForNew('personal');
                      setShowTeamDropdown(false);
                      setShowNewEventDialog(true);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    Personal
                  </button>
                  {teams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => {
                        setSelectedTeamForNew(team.id);
                        setShowTeamDropdown(false);
                        setShowNewEventDialog(true);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                      {team.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
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
                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1 z-10">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-8 h-8 p-0"
                    onClick={() => moveEvent(event.id, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    <GripVertical className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-8 h-8 p-0"
                    onClick={() => moveEvent(event.id, 'down')}
                    disabled={index === filteredEvents.length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div 
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: getColorClass(event.color) }}
                  >
                    {event.icon}
                  </div>
                  <Switch checked={event.isActive} />
                </div>
                
                <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {event.title}
                </h3>
                
                <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {event.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {event.durations.map((duration: string, idx: number) => (
                      <span 
                        key={idx}
                        className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {duration}
                      </span>
                    ))}
                  </div>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {event.bookingsToday} bookings today
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center space-x-2 px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {selectedProfile === 'personal' ? 'cal.id/sanskar' : getSelectedTeamSlug()}{event.slug}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyLink(event.slug);
                        }}
                        className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors`}
                      >
                        {copiedLink === event.slug ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
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
                    cal.id/{getSlugForNewEvent()}/
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