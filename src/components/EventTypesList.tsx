import React, { useRef, useState } from 'react';
import { Search, Plus, TrendingUp, TrendingDown, Copy, GripVertical, Eye, MoreHorizontal, Edit, Code2, Trash2, ChevronDown, ChevronUp, Calendar, Clock, Users, Grid3X3, Route, Layers, BarChart3 } from 'lucide-react';
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
    slug: 'new-event',
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

  const eventTypeIcons = {
    1: Calendar,
    2: Users,
    3: Grid3X3,
    4: Clock,
    5: Route,
    6: BarChart3,
    7: Layers,
    8: Users,
    9: Edit
  };

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
      slug: `/${selectedCreateTeam ? selectedCreateTeam.name.toLowerCase().replace(' ', '') : 'sanskar'}/${newEventForm.slug}`,
      description: newEventForm.description,
      durations: newEventForm.selectedDurations,
      isActive: true,
      color: 'neutral',
      icon: Calendar,
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
      slug: 'new-event',
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

  const handleMoveEvent = (eventId: number, direction: 'up' | 'down') => {
    const events = selectedTeam ? selectedTeam.eventTypes : eventTypes;
    const currentIndex = events.findIndex((e: any) => e.id === eventId);
    
    if (direction === 'up' && currentIndex > 0) {
      const newEvents = [...events];
      [newEvents[currentIndex], newEvents[currentIndex - 1]] = [newEvents[currentIndex - 1], newEvents[currentIndex]];
      
      if (selectedTeam) {
        setSelectedTeam({ ...selectedTeam, eventTypes: newEvents });
      } else {
        setEventTypes(newEvents);
      }
    } else if (direction === 'down' && currentIndex < events.length - 1) {
      const newEvents = [...events];
      [newEvents[currentIndex], newEvents[currentIndex + 1]] = [newEvents[currentIndex + 1], newEvents[currentIndex]];
      
      if (selectedTeam) {
        setSelectedTeam({ ...selectedTeam, eventTypes: newEvents });
      } else {
        setEventTypes(newEvents);
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, eventId: number) => {
    setDraggedItem(eventId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, eventId: number) => {
    e.preventDefault();
    setDragOverItem(eventId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, dropEventId: number) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === dropEventId) return;
    
    const events = selectedTeam ? selectedTeam.eventTypes : eventTypes;
    const draggedIndex = events.findIndex((e: any) => e.id === draggedItem);
    const dropIndex = events.findIndex((e: any) => e.id === dropEventId);
    
    const newEvents = [...events];
    const draggedEvent = newEvents.splice(draggedIndex, 1)[0];
    newEvents.splice(dropIndex, 0, draggedEvent);
    
    if (selectedTeam) {
      setSelectedTeam({ ...selectedTeam, eventTypes: newEvents });
    } else {
      setEventTypes(newEvents);
    }
    
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const getUrlPrefix = () => {
    if (selectedCreateTeam) {
      return `cal.id/${selectedCreateTeam.name.toLowerCase().replace(' ', '')}`;
    }
    return 'cal.id/sanskar';
  };

  const handleTeamDropdownClick = (team: any) => {
    setSelectedCreateTeam(team);
    setShowCreateDialog(true);
  };

  return (
    <div className="space-y-6" onClick={handleContainerClick}>
      {/* User Profile Section */}
      <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-semibold text-xl" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>S</span>
            </div>
            <div className="space-y-2">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Sanskar Yadav
              </h2>
              <div className="flex items-center space-x-2">
                <div className={`link-container flex items-center space-x-2 px-2 py-1 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <span className={`text-xs font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    cal.id/sanskar
                  </span>
                  <button 
                    onClick={() => copyToClipboard('cal.id/sanskar', 'profile')}
                    className="relative group"
                  >
                    <Copy className={`w-3 h-3 hover:text-gray-700 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                    {copiedItems.profile && (
                      <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded shadow-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-1 transition-transform duration-200 hover:scale-105">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    {stat.value}
                  </span>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
              Your Teams
            </h2>
            {selectedTeam && (
              <>
                <span className={`text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>•</span>
                <span className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  {selectedTeam.name}
                </span>
                <div className={`link-container flex items-center space-x-2 text-sm px-2 py-1 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <span className="font-mono text-xs" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>{selectedTeam.slug}</span>
                  <button 
                    onClick={() => copyToClipboard(selectedTeam.slug, selectedTeam.id)}
                    className="relative group"
                  >
                    <Copy className="w-3 h-3 transition-transform duration-200 hover:scale-110" />
                    {copiedItems[selectedTeam.id] && (
                      <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded shadow-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {teams.slice(0, 4).map((team) => (
            <div
              key={team.id}
              onClick={() => handleTeamSelect(team)}
              className={`team-card p-4 border-2 cursor-pointer rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
                selectedTeam?.id === team.id 
                  ? `border-blue-400 bg-blue-50/50 ${isDarkMode ? 'bg-blue-900/20 border-blue-500' : ''}`
                  : `${isDarkMode ? 'border-gray-700 hover:border-gray-600 bg-[#1e1e1e] hover:bg-[#252525]' : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'}`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${team.color === 'azure' ? 'bg-[#007ee5]' : team.color === 'pulse' ? 'bg-[#F1352C]' : team.color === 'amber' ? 'bg-[#f1f1f1]' : 'bg-[#008C44]'} flex items-center justify-center text-white text-sm shadow-md`}>
                    {team.logo}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-semibold text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        {team.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={`text-xs font-mono transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
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

      {/* Search and Create Button */}
      <div className="flex items-center justify-between space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search event types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#007ee5]/20 focus:border-[#007ee5] ${isDarkMode ? 'bg-[#1e1e1e] border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} focus:outline-none text-sm`}
            style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
          />
        </div>
        
        <DropdownMenu open={showTeamSelector} onOpenChange={setShowTeamSelector}>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#007ee5] hover:bg-[#0066cc] text-white transition-all duration-200 hover:shadow-md rounded-xl px-6 py-3" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={`w-48 shadow-xl rounded-xl ${isDarkMode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'}`}>
            <DropdownMenuItem 
              onClick={() => {
                setSelectedCreateTeam(null);
                setShowCreateDialog(true);
                setShowTeamSelector(false);
              }}
              className={`rounded-lg m-1 ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}
              style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
            >
              Personal (Sanskar)
            </DropdownMenuItem>
            <DropdownMenuSeparator className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            {teams.map((team) => (
              <DropdownMenuItem 
                key={team.id}
                onClick={() => handleTeamDropdownClick(team)}
                className={`rounded-lg m-1 ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}
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
        <DialogContent className={`rounded-2xl ${isDarkMode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'}`}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Add New Event Type
              </DialogTitle>
              <button
                onClick={() => setShowTeamSelector(true)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
              >
                <span className="text-sm">
                  {selectedCreateTeam ? selectedCreateTeam.name : 'Personal'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Title
              </label>
              <input
                type="text"
                value={newEventForm.title}
                onChange={(e) => setNewEventForm(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#007ee5]/20 focus:border-[#007ee5] ${isDarkMode ? 'bg-[#151515] border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none text-sm`}
                placeholder="Event title"
                style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                URL
              </label>
              <div className="flex items-center">
                <span className={`px-4 py-3 rounded-l-xl border-r-0 border ${isDarkMode ? 'bg-[#151515] border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'} text-sm`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                  {getUrlPrefix()}/
                </span>
                <input
                  type="text"
                  value={newEventForm.slug}
                  onChange={(e) => setNewEventForm(prev => ({ ...prev, slug: e.target.value }))}
                  className={`flex-1 px-4 py-3 rounded-r-xl border focus:ring-2 focus:ring-[#007ee5]/20 focus:border-[#007ee5] ${isDarkMode ? 'bg-[#151515] border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none text-sm`}
                  style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif', color: '#f1f1f1' }}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Description
              </label>
              <input
                type="text"
                value={newEventForm.description}
                onChange={(e) => setNewEventForm(prev => ({ ...prev, description: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#007ee5]/20 focus:border-[#007ee5] ${isDarkMode ? 'bg-[#151515] border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} focus:outline-none text-sm`}
                placeholder="A quick video meeting"
                style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                Duration
              </label>
              <div className="flex flex-wrap gap-2">
                {durationOptions.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleDurationToggle(duration)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      newEventForm.selectedDurations.includes(duration)
                        ? 'bg-[#007ee5] text-white'
                        : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
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
                className={`rounded-xl ${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateEventSubmit}
                className="bg-[#007ee5] hover:bg-[#0066cc] text-white rounded-xl"
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
      <div className="space-y-3">
        {filteredEventTypes.map((event: any, index: number) => {
          const IconComponent = eventTypeIcons[event.id] || Calendar;
          return (
            <div
              key={event.id}
              draggable
              onDragStart={(e) => handleDragStart(e, event.id)}
              onDragOver={(e) => handleDragOver(e, event.id)}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, event.id)}
              onClick={(e) => handleEventTileClick(event, e)}
              className={`group rounded-2xl p-6 border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                dragOverItem === event.id 
                  ? `${isDarkMode ? 'border-blue-500/50 bg-blue-900/20' : 'border-blue-300 bg-blue-50/50'}` 
                  : `${isDarkMode ? 'bg-[#1e1e1e] border-gray-700 hover:border-gray-600 hover:bg-[#252525]' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Reorder Controls */}
                  <div className="flex flex-col items-center space-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveEvent(event.id, 'up');
                      }}
                      disabled={index === 0}
                      className={`p-1 rounded transition-all duration-300 transform hover:scale-110 ${
                        index === 0 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`
                      }`}
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <GripVertical className={`w-3 h-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveEvent(event.id, 'down');
                      }}
                      disabled={index === filteredEventTypes.length - 1}
                      className={`p-1 rounded transition-all duration-300 transform hover:scale-110 ${
                        index === filteredEventTypes.length - 1 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`
                      }`}
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Event Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} shadow-sm`}>
                    <IconComponent className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        {event.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        {event.bookingsToday} today
                      </span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                      {event.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      {event.durations.map((duration: string) => (
                        <span
                          key={duration}
                          className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                          style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                        >
                          {duration}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch 
                    checked={event.isActive}
                    onCheckedChange={() => handleToggleActive(event.id)}
                    className="data-[state=checked]:bg-[#007ee5]"
                  />

                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={(e) => {e.stopPropagation();}}
                    >
                      <Eye className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative group"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        copyToClipboard(event.slug, `event-${event.id}`); 
                      }}
                    >
                      <Copy className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      {copiedItems[`event-${event.id}`] && (
                        <span className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded shadow-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                          Copied!
                        </span>
                      )}
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={(e) => {e.stopPropagation();}}
                        >
                          <MoreHorizontal className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className={`shadow-xl rounded-xl ${isDarkMode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'}`}>
                        <DropdownMenuItem 
                          onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                          className={`rounded-lg m-1 ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}
                          style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => { e.stopPropagation(); handleDuplicateEvent(event); }}
                          className={`rounded-lg m-1 ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}
                          style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className={`rounded-lg m-1 ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                          <Code2 className="w-4 h-4 mr-2" />
                          Embed
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        <DropdownMenuItem 
                          onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}
                          className={`text-red-600 rounded-lg m-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
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
          );
        })}
      </div>

      {filteredEventTypes.length === 0 && (
        <div className="text-center py-12">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
            No event types found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventTypesList;