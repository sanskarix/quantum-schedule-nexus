import React, { useRef, useState } from 'react';
import { Search, Plus, TrendingUp, TrendingDown, Copy, GripVertical, Eye, MoreHorizontal, Edit, Code2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedItems(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(selectedTeam?.id === team.id ? null : team);
  };

  const handleEventTileClick = (event: any, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="switch"]')) {
      return;
    }
    onEventClick(event);
  };

  const handleCreateEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: 'New Event Type',
      slug: '/sanskar/new-event',
      description: 'A new event type for scheduling meetings',
      durations: ['30m'],
      isActive: true,
      color: 'azure',
      icon: '📅',
      bookingsToday: 0
    };
    
    if (selectedTeam) {
      const updatedTeam = {
        ...selectedTeam,
        eventTypes: [...selectedTeam.eventTypes, newEvent]
      };
      setSelectedTeam(updatedTeam);
    } else {
      setEventTypes([...eventTypes, newEvent]);
    }
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

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('opacity-50', 'scale-95');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50', 'scale-95');
    setDraggedItem(null);
    setDragOverItem(null);
    dragCounter.current = 0;
  };

  const handleDragEnter = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    dragCounter.current++;
    setDragOverItem(targetId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverItem(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const sourceArray = selectedTeam ? selectedTeam.eventTypes : eventTypes;
    const draggedIndex = sourceArray.findIndex((item: any) => item.id === draggedItem);
    const targetIndex = sourceArray.findIndex((item: any) => item.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newArray = [...sourceArray];
      const draggedEvent = newArray.splice(draggedIndex, 1)[0];
      newArray.splice(targetIndex, 0, draggedEvent);
      
      if (selectedTeam) {
        const updatedTeam = { ...selectedTeam, eventTypes: newArray };
        setSelectedTeam(updatedTeam);
      } else {
        setEventTypes(newArray);
      }
    }
    
    setDraggedItem(null);
    setDragOverItem(null);
    dragCounter.current = 0;
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Event Types
        </h1>
        <p className={`text-base mt-2 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
          Create events to share for people to book on your calendar.
        </p>
      </div>

      {/* User Profile Section */}
      <div className={`rounded-xl p-8 border transition-all duration-500 hover:shadow-xl hover:scale-102 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-azure to-quantum flex items-center justify-center shadow-xl animate-pulse">
              <span className="text-white font-semibold text-2xl">S</span>
            </div>
            <div className="space-y-2">
              <h2 className={`text-2xl font-semibold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sanskar Yadav
              </h2>
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-[#818181]/20 hover:bg-[#818181]/30' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  <span className={`text-sm font-mono transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    cal.id/sanskar
                  </span>
                  <button 
                    onClick={() => copyToClipboard('cal.id/sanskar', 'profile')}
                    className="relative group"
                  >
                    <Copy className={`w-4 h-4 hover:text-gray-700 transition-all duration-200 group-hover:scale-110 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                    {copiedItems.profile && (
                      <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded shadow-lg animate-bounce ${isDarkMode ? 'bg-[#212124] text-white' : 'bg-gray-900 text-white'}`}>
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="flex space-x-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-1 transform transition-all duration-300 hover:scale-110">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className={`text-3xl font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </span>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-6 h-6 text-green-500 animate-bounce" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-500 animate-bounce" />
                  )}
                </div>
                <p className={`text-sm font-medium transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teams Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className={`text-xl font-semibold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Teams
            </h2>
            {selectedTeam && (
              <>
                <span className={`text-lg transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>•</span>
                <span className={`text-lg font-medium transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  {selectedTeam.name}
                </span>
                <div className={`px-3 py-1 rounded-lg flex items-center space-x-2 text-sm transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181] hover:bg-[#818181]/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <span className="font-mono">{selectedTeam.slug}</span>
                  <button 
                    onClick={() => copyToClipboard(selectedTeam.slug, selectedTeam.id)}
                    className="relative group"
                  >
                    <Copy className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                    {copiedItems[selectedTeam.id] && (
                      <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded shadow-lg animate-bounce ${isDarkMode ? 'bg-[#212124] text-white' : 'bg-gray-900 text-white'}`}>
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
          
          <Button 
            onClick={handleCreateEvent}
            className="bg-azure hover:bg-azure/90 text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event Type
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {teams.slice(0, 4).map((team) => (
            <div
              key={team.id}
              onClick={() => handleTeamSelect(team)}
              className={`p-6 border-2 cursor-pointer transition-all duration-500 rounded-xl ${
                selectedTeam?.id === team.id 
                  ? `border-azure/40 bg-azure/5 transform -translate-y-3 shadow-2xl scale-105 ${isDarkMode ? 'bg-azure/10' : ''}`
                  : `${isDarkMode ? 'border-[#818181]/20 hover:border-[#818181]/40 bg-[#212124] hover:bg-[#212124]/80' : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'} hover:shadow-xl hover:-translate-y-2 hover:scale-102`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${team.color === 'azure' ? 'bg-azure' : team.color === 'pulse' ? 'bg-pulse' : team.color === 'amber' ? 'bg-amber' : 'bg-quantum'} flex items-center justify-center text-white text-lg shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    {team.logo}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className={`font-semibold text-lg transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {team.name}
                      </h3>
                      <button
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          copyToClipboard(team.slug, `team-${team.id}`); 
                        }}
                        className={`text-xs px-3 py-1 rounded-full transition-all duration-300 hover:shadow-sm hover:scale-105 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181] hover:bg-[#818181]/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        <div className="flex items-center space-x-1 relative">
                          <span>Copy link</span>
                          {copiedItems[`team-${team.id}`] && (
                            <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded shadow-lg animate-bounce ${isDarkMode ? 'bg-[#212124] text-white' : 'bg-gray-900 text-white'}`}>
                              Copied!
                            </span>
                          )}
                        </div>
                      </button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={`text-sm font-mono transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
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

      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search event types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-500 focus:ring-2 focus:ring-azure/20 focus:border-azure focus:scale-102 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20 text-white placeholder-[#818181]' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} focus:outline-none`}
        />
      </div>

      {/* Event Types */}
      <div className="space-y-3">
        {filteredEventTypes.map((event: any) => (
          <div
            key={event.id}
            draggable
            onClick={(e) => handleEventTileClick(event, e)}
            className={`group rounded-xl p-6 border cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:scale-102 ${
              dragOverItem === event.id 
                ? `${isDarkMode ? 'border-azure/50 bg-azure/10 scale-105' : 'border-azure/30 bg-azure/5 scale-105'}` 
                : `${isDarkMode ? 'bg-[#212124] border-[#818181]/20 hover:border-[#818181]/40' : 'bg-white border-gray-200 hover:border-gray-300'}`
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 flex-1">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <GripVertical className={`w-5 h-5 transition-colors duration-500 hover:scale-110 ${isDarkMode ? 'text-[#818181]' : 'text-gray-400'}`} />
                </div>

                <div className={`w-14 h-14 rounded-xl ${event.color === 'azure' ? 'bg-azure' : event.color === 'pulse' ? 'bg-pulse' : event.color === 'amber' ? 'bg-amber' : 'bg-quantum'} flex items-center justify-center text-white text-xl shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  {event.icon}
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`font-semibold text-lg transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {event.title}
                    </h3>
                    <span className={`text-sm px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`}>
                      {event.bookingsToday} today
                    </span>
                  </div>
                  <p className={`text-base mb-3 transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    {event.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    {event.durations.map((duration: string) => (
                      <span
                        key={duration}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`}
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
                  className="data-[state=checked]:bg-azure transition-all duration-300"
                />

                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-10 h-10 transition-all duration-300 hover:shadow-sm hover:scale-110"
                    onClick={(e) => {e.stopPropagation();}}
                  >
                    <Eye className={`w-5 h-5 transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-10 h-10 transition-all duration-300 hover:shadow-sm hover:scale-110 relative group"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      copyToClipboard(event.slug, `event-${event.id}`); 
                    }}
                  >
                    <Copy className={`w-5 h-5 transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                    {copiedItems[`event-${event.id}`] && (
                      <span className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded shadow-lg animate-bounce ${isDarkMode ? 'bg-[#212124] text-white' : 'bg-gray-900 text-white'}`}>
                        Copied!
                      </span>
                    )}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-10 h-10 transition-all duration-300 hover:shadow-sm hover:scale-110"
                        onClick={(e) => {e.stopPropagation();}}
                      >
                        <MoreHorizontal className={`w-5 h-5 transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={`transition-colors duration-500 shadow-xl ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
                      <DropdownMenuItem 
                        onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                        className={`transition-colors duration-500 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => { e.stopPropagation(); handleDuplicateEvent(event); }}
                        className={`transition-colors duration-500 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className={`transition-colors duration-500 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
                        <Code2 className="w-4 h-4 mr-2" />
                        Embed
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className={`transition-colors duration-500 ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-200'}`} />
                      <DropdownMenuItem 
                        onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}
                        className={`text-red-600 transition-colors duration-500 ${isDarkMode ? 'hover:bg-[#818181]/10' : 'hover:bg-gray-50'}`}
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
        <div className="text-center py-16">
          <p className={`text-lg transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
            No event types found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventTypesList;
