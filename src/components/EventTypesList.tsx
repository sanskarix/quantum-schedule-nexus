import React, { useRef } from 'react';
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
  const [draggedItem, setDraggedItem] = React.useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = React.useState<number | null>(null);

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

  const getColorClass = (color: string) => {
    switch (color) {
      case 'azure': return 'bg-azure/10 border-azure/20 dark:bg-azure/20 dark:border-azure/30';
      case 'pulse': return 'bg-pulse/10 border-pulse/20 dark:bg-pulse/20 dark:border-pulse/30';
      case 'amber': return 'bg-amber/10 border-amber/20 dark:bg-amber/20 dark:border-amber/30';
      case 'quantum': return 'bg-quantum/10 border-quantum/20 dark:bg-quantum/20 dark:border-quantum/30';
      default: return 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'azure': return 'bg-azure text-white';
      case 'pulse': return 'bg-pulse text-white';
      case 'amber': return 'bg-amber text-white';
      case 'quantum': return 'bg-quantum text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(selectedTeam?.id === team.id ? null : team);
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Event Types
        </h1>
        <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
          Create events to share for people to book on your calendar.
        </p>
      </div>

      {/* User Profile Section */}
      <div className={`rounded-xl p-6 border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-azure to-quantum flex items-center justify-center">
              <span className="text-white font-semibold text-xl">S</span>
            </div>
            <div>
              <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sanskar Yadav
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`px-2 py-1 rounded-md flex items-center space-x-1 transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-100'}`}>
                  <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    cal.id/sanskar
                  </span>
                  <button onClick={() => copyToClipboard('cal.id/sanskar')}>
                    <Copy className={`w-3 h-3 hover:text-gray-700 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </span>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teams Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h2 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Teams
            </h2>
            {selectedTeam && (
              <>
                <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>•</span>
                <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  {selectedTeam.name}
                </span>
                <div className={`px-2 py-1 rounded-md flex items-center space-x-1 text-xs transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`}>
                  <span>{selectedTeam.slug}</span>
                  <button onClick={() => copyToClipboard(selectedTeam.slug)}>
                    <Copy className="w-3 h-3" />
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
              className={`p-4 border-2 cursor-pointer transition-all duration-300 rounded-lg ${
                selectedTeam?.id === team.id 
                  ? `${getColorClass(team.color)} transform -translate-y-1 shadow-lg` 
                  : `${isDarkMode ? 'border-[#818181]/20 hover:border-[#818181]/40 bg-[#212124]' : 'border-gray-200 hover:border-gray-300 bg-white'} hover:shadow-md hover:-translate-y-0.5`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${getIconColor(team.color)} flex items-center justify-center text-sm`}>
                    {team.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {team.name}
                      </h3>
                      <button
                        onClick={(e) => { e.stopPropagation(); copyToClipboard(team.slug); }}
                        className={`text-xs px-2 py-1 rounded transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181] hover:bg-[#818181]/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        Copy link
                      </button>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
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
      <div className="relative mb-4">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search event types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20 text-white placeholder-[#818181]' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure`}
        />
      </div>

      {/* Event Types */}
      <div className="space-y-2">
        {filteredEventTypes.map((event: any) => (
          <div
            key={event.id}
            draggable
            onDragStart={(e) => handleDragStart(e, event.id)}
            onDragEnd={handleDragEnd}
            onDragEnter={(e) => handleDragEnter(e, event.id)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, event.id)}
            className={`group rounded-lg p-4 border cursor-move transition-all duration-200 ${
              dragOverItem === event.id 
                ? `${isDarkMode ? 'border-azure/50 bg-azure/10' : 'border-azure/30 bg-azure/5'}` 
                : `${isDarkMode ? 'bg-[#212124] border-[#818181]/20 hover:border-[#818181]/40' : 'bg-white border-gray-200 hover:border-gray-300'} hover:shadow-sm`
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                {/* Drag Handle */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-400'}`} />
                </div>

                {/* Event Icon */}
                <div className={`w-10 h-10 rounded-lg ${getIconColor(event.color)} flex items-center justify-center text-lg`}>
                  {event.icon}
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 
                      className={`font-medium cursor-pointer hover:text-azure transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      onClick={() => onEventClick(event)}
                    >
                      {event.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`}>
                      {event.bookingsToday} today
                    </span>
                  </div>
                  <p className={`text-sm mb-2 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    {event.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    {event.durations.map((duration: string) => (
                      <span
                        key={duration}
                        className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {duration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={event.isActive}
                  className="data-[state=checked]:bg-azure"
                />

                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Eye className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-8 h-8"
                    onClick={() => copyToClipboard(event.slug)}
                  >
                    <Copy className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <MoreHorizontal className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={`transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
                      <DropdownMenuItem className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
                        <Code2 className="w-4 h-4 mr-2" />
                        Embed
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className={`transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-200'}`} />
                      <DropdownMenuItem className={`text-red-600 transition-colors duration-300 ${isDarkMode ? 'hover:bg-[#818181]/10' : 'hover:bg-gray-50'}`}>
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

      {/* No Results */}
      {filteredEventTypes.length === 0 && (
        <div className="text-center py-12">
          <p className={`transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
            No event types found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventTypesList;
