
import React, { useRef, useState } from 'react';
import { Search, Plus, TrendingUp, TrendingDown, Copy, GripVertical, Eye, MoreHorizontal, Edit, Code2, Trash2, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface EventTypesListProps {
  selectedTeam: any;
  setSelectedTeam: (team: any) => void;
  isDarkMode: boolean;
  eventTypes: any[];
  setEventTypes: (events: any[]) => void;
  teams: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onEventClick: (event: any) => void;
}

const EventTypesList: React.FC<EventTypesListProps> = ({
  selectedTeam,
  setSelectedTeam,
  isDarkMode,
  eventTypes,
  setEventTypes,
  teams,
  searchQuery,
  setSearchQuery,
  onEventClick
}) => {
  const dragCounter = useRef(0);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);
  const [copiedItems, setCopiedItems] = useState<{ [key: string]: boolean }>({});
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTeamSelector, setShowTeamSelector] = useState(false);
  const [selectedCreateTeam, setSelectedCreateTeam] = useState<any>(null);
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    slug: 'newevent',
    description: 'A quick video meeting',
    selectedDurations: ['30m']
  });

  const stats = [
    { value: 18, label: 'This Month', trend: 'up', change: '+12%' },
    { value: 7, label: 'This Week', trend: 'up', change: '+5%' },
    { value: 3, label: 'Today', trend: 'down', change: '-2%' }
  ];

  const currentEventTypes = selectedTeam ? selectedTeam.eventTypes : eventTypes;
  const filteredEventTypes = currentEventTypes.filter((event: any) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const durationOptions = ['15m', '30m', '45m', '60m', '90m'];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedItems(prev => ({ ...prev, [id]: false }));
    }, 1500);
  };

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(selectedTeam?.id === team.id ? null : team);
  };

  // Click outside handler to deselect team
  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.team-card') && !target.closest('button')) {
      if (selectedTeam) {
        setSelectedTeam(null);
      }
    }
  };

  const handleEventTileClick = (event: any, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="switch"]')) {
      return;
    }
    onEventClick(event);
  };

  const handleCreateEventSubmit = () => {
    const newEvent = {
      id: Date.now(),
      title: newEventForm.title || 'New Event Type',
      slug: `/sanskar/${newEventForm.slug}`,
      description: newEventForm.description,
      durations: newEventForm.selectedDurations,
      isActive: true,
      color: 'azure',
      icon: '📅',
      bookingsToday: 0
    };
    
    if (selectedCreateTeam) {
      const updatedTeam = {
        ...selectedCreateTeam,
        eventTypes: [...selectedCreateTeam.eventTypes, newEvent]
      };
      setSelectedTeam(updatedTeam);
    } else {
      setEventTypes([...eventTypes, newEvent]);
    }
    
    setShowCreateDialog(false);
    setNewEventForm({
      title: '',
      slug: 'newevent',
      description: 'A quick video meeting',
      selectedDurations: ['30m']
    });
    setSelectedCreateTeam(null);
    onEventClick(newEvent);
  };

  const handleDeleteEvent = (eventId: number) => {
    if (selectedTeam) {
      const updatedTeam = {
        ...selectedTeam,
        eventTypes: selectedTeam.eventTypes.filter((e: any) => e.id !== eventId)
      };
      setSelectedTeam(updatedTeam);
    } else {
      setEventTypes(eventTypes.filter(e => e.id !== eventId));
    }
  };

  const handleDuplicateEvent = (event: any) => {
    const duplicatedEvent = {
      ...event,
      id: Date.now(),
      title: `${event.title} (Copy)`,
      slug: `${event.slug}-copy`
    };
    
    if (selectedTeam) {
      const updatedTeam = {
        ...selectedTeam,
        eventTypes: [...selectedTeam.eventTypes, duplicatedEvent]
      };
      setSelectedTeam(updatedTeam);
    } else {
      setEventTypes([...eventTypes, duplicatedEvent]);
    }
  };

  const handleToggleActive = (eventId: number) => {
    if (selectedTeam) {
      const updatedTeam = {
        ...selectedTeam,
        eventTypes: selectedTeam.eventTypes.map((e: any) => 
          e.id === eventId ? { ...e, isActive: !e.isActive } : e
        )
      };
      setSelectedTeam(updatedTeam);
    } else {
      setEventTypes(eventTypes.map(e => 
        e.id === eventId ? { ...e, isActive: !e.isActive } : e
      ));
    }
  };

  const handleDurationToggle = (duration: string) => {
    setNewEventForm(prev => ({
      ...prev,
      selectedDurations: prev.selectedDurations.includes(duration)
        ? prev.selectedDurations.filter(d => d !== duration)
        : [...prev.selectedDurations, duration]
    }));
  };

  return (
    <div className="space-y-4" onClick={handleContainerClick}>
      {/* User Profile Section */}
      <div className={`rounded-xl p-4 border transition-all duration-150 hover:shadow-md ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-azure to-quantum flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-lg" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>S</span>
            </div>
            <div className="space-y-1">
              <h2 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Sanskar Yadav
              </h2>
              <div className="flex items-center space-x-2">
                <div className={`link-container flex items-center space-x-2 transition-all duration-150 hover:scale-105`}>
                  <span className={`text-sm font-mono transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    cal.id/sanskar
                  </span>
                  <button 
                    onClick={() => copyToClipboard('cal.id/sanskar', 'profile')}
                    className="relative group"
                  >
                    <Copy className={`w-3 h-3 hover:text-gray-700 transition-all duration-150 group-hover:scale-110 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                    {copiedItems.profile && (
                      <span className={`absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded shadow-lg animate-fade-in ${isDarkMode ? 'bg-[#212124] text-white' : 'bg-gray-900 text-white'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="flex space-x-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-1 transform transition-all duration-150 hover:scale-105">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    {stat.value}
                  </span>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <p className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  {stat.label}
                </p>
                <p className={`text-xs font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teams Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
              Your Teams
            </h2>
            {selectedTeam && (
              <>
                <span className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>•</span>
                <span className={`text-lg font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  {selectedTeam.name}
                </span>
                <div className={`link-container flex items-center space-x-2 text-sm transition-all duration-150 hover:scale-105`}>
                  <span className="font-mono" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>{selectedTeam.slug}</span>
                  <button 
                    onClick={() => copyToClipboard(selectedTeam.slug, selectedTeam.id)}
                    className="relative group"
                  >
                    <Copy className="w-3 h-3 group-hover:scale-110 transition-transform duration-150" />
                    {copiedItems[selectedTeam.id] && (
                      <span className={`absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded shadow-lg animate-fade-in ${isDarkMode ? 'bg-[#212124] text-white' : 'bg-gray-900 text-white'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {teams.slice(0, 4).map((team) => (
            <div
              key={team.id}
              onClick={() => handleTeamSelect(team)}
              className={`team-card p-3 border-2 cursor-pointer transition-all duration-150 rounded-lg ${
                selectedTeam?.id === team.id 
                  ? `border-azure/40 bg-azure/5 transform scale-102 shadow-lg ${isDarkMode ? 'bg-azure/10' : ''}`
                  : `${isDarkMode ? 'border-[#818181]/20 hover:border-[#818181]/40 bg-[#212124] hover:bg-[#212124]/80' : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'} hover:shadow-md hover:scale-101`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${team.color === 'azure' ? 'bg-azure' : team.color === 'pulse' ? 'bg-pulse' : team.color === 'amber' ? 'bg-amber' : 'bg-quantum'} flex items-center justify-center text-white text-sm shadow-md`}>
                    {team.logo}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-semibold text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        {team.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={`text-xs font-mono transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        {team.slug}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Create Button - Repositioned */}
      <div className="flex items-center justify-between space-x-3">
        <div className="relative flex-1 max-w-sm">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search event types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-150 focus:ring-2 focus:ring-azure/20 focus:border-azure ${isDarkMode ? 'bg-[#212124] border-[#818181]/20 text-white placeholder-[#818181]' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} focus:outline-none text-sm`}
            style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
          />
        </div>
        
        <DropdownMenu open={showTeamSelector} onOpenChange={setShowTeamSelector}>
          <DropdownMenuTrigger asChild>
            <Button className="bg-azure hover:bg-azure/90 text-white transition-all duration-150 hover:shadow-md" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
              <Plus className="w-4 h-4 mr-2" />
              Create Event Type
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={`w-48 transition-colors duration-150 shadow-lg ${isDarkMode ? 'bg-[#212124]/90 backdrop-blur-xl border-[#818181]/20' : 'bg-white/90 backdrop-blur-xl border-gray-200'}`}>
            <DropdownMenuItem 
              onClick={() => {
                setSelectedCreateTeam(null);
                setShowCreateDialog(true);
                setShowTeamSelector(false);
              }}
              className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}
              style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
            >
              Personal (Sanskar)
            </DropdownMenuItem>
            <DropdownMenuSeparator className={`transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-200'}`} />
            {teams.map((team) => (
              <DropdownMenuItem 
                key={team.id}
                onClick={() => {
                  setSelectedCreateTeam(team);
                  setShowCreateDialog(true);
                  setShowTeamSelector(false);
                }}
                className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}
                style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
              >
                <span className="mr-2">{team.logo}</span>
                {team.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Create Event Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className={`transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
              Add a new event type
            </DialogTitle>
            <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
              Create a new event type for people to book times with.
            </p>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Title
              </label>
              <input
                type="text"
                value={newEventForm.title}
                onChange={(e) => setNewEventForm(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border transition-all duration-150 focus:ring-2 focus:ring-azure/20 focus:border-azure ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none text-sm`}
                placeholder="Event title"
                style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                URL
              </label>
              <div className="flex items-center">
                <span className={`px-3 py-2 rounded-l-lg border-r-0 border transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-[#818181]' : 'bg-gray-50 border-gray-200 text-gray-500'} text-sm`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  cal.id/sanskar/
                </span>
                <input
                  type="text"
                  value={newEventForm.slug}
                  onChange={(e) => setNewEventForm(prev => ({ ...prev, slug: e.target.value }))}
                  className={`flex-1 px-3 py-2 rounded-r-lg border transition-all duration-150 focus:ring-2 focus:ring-azure/20 focus:border-azure ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none text-sm`}
                  style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Description
              </label>
              <input
                type="text"
                value={newEventForm.description}
                onChange={(e) => setNewEventForm(prev => ({ ...prev, description: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border transition-all duration-150 focus:ring-2 focus:ring-azure/20 focus:border-azure ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white placeholder-[#818181]' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} focus:outline-none text-sm`}
                placeholder="A quick video meeting"
                style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Duration
              </label>
              <div className="flex flex-wrap gap-2">
                {durationOptions.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleDurationToggle(duration)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all duration-150 ${
                      newEventForm.selectedDurations.includes(duration)
                        ? 'bg-azure text-white'
                        : `${isDarkMode ? 'bg-[#818181]/20 text-[#818181] hover:bg-[#818181]/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                    }`}
                    style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateDialog(false)}
                className={`transition-colors duration-300 ${isDarkMode ? 'border-[#818181]/20 text-[#818181] hover:bg-[#818181]/10' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateEventSubmit}
                className="bg-azure hover:bg-azure/90 text-white transition-all duration-150"
                disabled={!newEventForm.title.trim()}
                style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
              >
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Types */}
      <div className="space-y-2">
        {filteredEventTypes.map((event: any) => (
          <div
            key={event.id}
            draggable
            onClick={(e) => handleEventTileClick(event, e)}
            className={`group rounded-lg p-3 border cursor-pointer transition-all duration-150 hover:shadow-sm hover:scale-101 ${
              dragOverItem === event.id 
                ? `${isDarkMode ? 'border-azure/50 bg-azure/10' : 'border-azure/30 bg-azure/5'}` 
                : `${isDarkMode ? 'bg-[#212124] border-[#818181]/20 hover:border-[#818181]/40' : 'bg-white border-gray-200 hover:border-gray-300'}`
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-150">
                  <GripVertical className={`w-3 h-3 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-400'}`} />
                </div>

                <div className={`w-8 h-8 rounded-lg ${event.color === 'azure' ? 'bg-azure' : event.color === 'pulse' ? 'bg-pulse' : event.color === 'amber' ? 'bg-amber' : 'bg-quantum'} flex items-center justify-center text-white text-sm shadow-sm`}>
                  {event.icon}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-semibold text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                      {event.title}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full transition-all duration-150 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                      {event.bookingsToday} today
                    </span>
                  </div>
                  <p className={`text-xs mb-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    {event.description}
                  </p>
                  <div className="flex items-center space-x-1">
                    {event.durations.map((duration: string) => (
                      <span
                        key={duration}
                        className={`px-2 py-0.5 rounded-full text-xs transition-all duration-150 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`}
                        style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                      >
                        {duration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  checked={event.isActive}
                  onCheckedChange={() => handleToggleActive(event.id)}
                  className="data-[state=checked]:bg-azure transition-all duration-150"
                />

                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-150">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-8 h-8 transition-all duration-150"
                    onClick={(e) => {e.stopPropagation();}}
                  >
                    <Eye className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-8 h-8 transition-all duration-150 relative group"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      copyToClipboard(event.slug, `event-${event.id}`); 
                    }}
                  >
                    <Copy className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                    {copiedItems[`event-${event.id}`] && (
                      <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded shadow-lg animate-fade-in ${isDarkMode ? 'bg-[#212124] text-white' : 'bg-gray-900 text-white'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        Copied!
                      </span>
                    )}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8 transition-all duration-150"
                        onClick={(e) => {e.stopPropagation();}}
                      >
                        <MoreHorizontal className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={`transition-colors duration-150 shadow-lg ${isDarkMode ? 'bg-[#212124]/90 backdrop-blur-xl border-[#818181]/20' : 'bg-white/90 backdrop-blur-xl border-gray-200'}`}>
                      <DropdownMenuItem 
                        onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                        className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}
                        style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => { e.stopPropagation(); handleDuplicateEvent(event); }}
                        className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}
                        style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        <Code2 className="w-4 h-4 mr-2" />
                        Embed
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className={`transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-200'}`} />
                      <DropdownMenuItem 
                        onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}
                        className={`text-red-600 transition-colors duration-300 ${isDarkMode ? 'hover:bg-[#818181]/10' : 'hover:bg-gray-50'}`}
                        style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEventTypes.length === 0 && (
        <div className="text-center py-8">
          <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
            No event types found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventTypesList;
