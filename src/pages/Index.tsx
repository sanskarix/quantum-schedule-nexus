import { useState, useEffect } from 'react';
import { Search, Plus, Settings, User, Calendar, Clock, Link, MoreHorizontal, Eye, Copy, Menu, Bell, Moon, Sun, ChevronDown, TrendingUp, TrendingDown, GripVertical, Edit, Code2, Trash2, Map, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [eventTypes, setEventTypes] = useState([
    {
      id: 1,
      title: 'Product Demo',
      slug: '/sanskar/product-demo',
      description: 'Witness innovation in action! Reserve a time for a personalized demo of our next-gen scheduler (THIS SITE)',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'azure',
      icon: '⚡'
    },
    {
      id: 2,
      title: 'Interviews 🎬',
      slug: '/sanskar/interviews',
      description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
      durations: ['30m', '60m'],
      isActive: true,
      color: 'pulse',
      icon: '👤'
    },
    {
      id: 3,
      title: 'Product Hunt Chats',
      slug: '/sanskar/product-hunt-chats',
      description: "The essence of Product Hunt reflects in communities- Select a time suitable for you, and let's talk products!",
      durations: ['15m', '30m', '45m', '60m'],
      isActive: true,
      color: 'amber',
      icon: '💬'
    },
    {
      id: 4,
      title: 'Everything Else',
      slug: '/sanskar/everything-else',
      description: "Open Agenda! Let's brainstorm over coffee or talk about your favorite singer. Whatever it is, I'm all ears! 🍵",
      durations: ['15m', '30m', '60m'],
      isActive: true,
      color: 'quantum',
      icon: '☕'
    },
    {
      id: 5,
      title: 'Technical Review',
      slug: '/sanskar/technical-review',
      description: "Deep dive into technical architecture and code review sessions for your projects.",
      durations: ['45m', '60m'],
      isActive: true,
      color: 'azure',
      icon: '⚙️'
    },
    {
      id: 6,
      title: 'Strategy Session',
      slug: '/sanskar/strategy-session',
      description: "Plan your roadmap and discuss strategic decisions for your business growth.",
      durations: ['30m', '60m', '90m'],
      isActive: true,
      color: 'pulse',
      icon: '📊'
    },
    {
      id: 7,
      title: 'Team Standup',
      slug: '/sanskar/team-standup',
      description: "Quick sync meetings to align team priorities and discuss blockers.",
      durations: ['15m', '30m'],
      isActive: true,
      color: 'quantum',
      icon: '🔄'
    },
    {
      id: 8,
      title: 'Client Onboarding',
      slug: '/sanskar/client-onboarding',
      description: "Welcome new clients and walk them through our processes and expectations.",
      durations: ['45m', '60m'],
      isActive: true,
      color: 'amber',
      icon: '🎯'
    },
    {
      id: 9,
      title: 'Design Review',
      slug: '/sanskar/design-review',
      description: "Collaborative design sessions to review mockups, prototypes and user experience.",
      durations: ['30m', '45m', '60m'],
      isActive: true,
      color: 'azure',
      icon: '🎨'
    }
  ]);

  const teams = [
    {
      id: 1,
      name: 'Design Team',
      slug: 'cal.com/design-team',
      logo: '🎨',
      color: 'amber',
      eventTypes: 7
    },
    {
      id: 2,
      name: 'Engineering',
      slug: 'cal.com/engineering',
      logo: '⚙️',
      color: 'azure',
      eventTypes: 7
    },
    {
      id: 3,
      name: 'Marketing',
      slug: 'cal.com/marketing',
      logo: '📈',
      color: 'pulse',
      eventTypes: 7
    },
    {
      id: 4,
      name: 'Sales',
      slug: 'cal.com/sales',
      logo: '💼',
      color: 'quantum',
      eventTypes: 7
    }
  ];

  const stats = [
    { value: 18, label: 'This Month', trend: 'up', change: '+12%' },
    { value: 7, label: 'This Week', trend: 'up', change: '+5%' },
    { value: 3, label: 'Today', trend: 'down', change: '-2%' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'reschedule',
      title: 'Meeting Rescheduled',
      message: 'Product Demo with John Doe has been moved to tomorrow 3:00 PM',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'cancellation',
      title: 'Meeting Cancelled',
      message: 'Interview with Jane Smith has been cancelled',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'booking',
      title: 'New Booking',
      message: 'Strategy Session booked for Friday 2:00 PM',
      time: '3 hours ago',
      unread: false
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredEventTypes = eventTypes.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getColorClass = (color: string) => {
    switch (color) {
      case 'azure': return 'bg-azure/10 border-azure/20';
      case 'pulse': return 'bg-pulse/10 border-pulse/20';
      case 'amber': return 'bg-amber/10 border-amber/20';
      case 'quantum': return 'bg-quantum/10 border-quantum/20';
      default: return 'bg-gray-50 border-gray-200';
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

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const draggedIndex = eventTypes.findIndex(item => item.id === draggedItem);
    const targetIndex = eventTypes.findIndex(item => item.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newEventTypes = [...eventTypes];
      const draggedEvent = newEventTypes.splice(draggedIndex, 1)[0];
      newEventTypes.splice(targetIndex, 0, draggedEvent);
      setEventTypes(newEventTypes);
    }
    setDraggedItem(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-azure flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Cal ID</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {[
            { icon: Calendar, label: 'Event Types', active: true },
            { icon: Calendar, label: 'Bookings', active: false },
            { icon: Clock, label: 'Availability', active: false },
            { icon: User, label: 'Teams', active: false },
            { icon: Menu, label: 'Routing Forms', active: false },
            { icon: Menu, label: 'Workflows', active: false },
            { icon: Menu, label: 'Insights', active: false },
            { icon: Menu, label: 'All Products', active: false }
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active 
                  ? 'bg-azure/10 text-azure' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Settings className="w-4 h-4 text-gray-600" />
            </Button>
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-gray-600" />
              <Switch 
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-azure"
              />
              <Moon className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className={`sticky top-0 z-30 transition-all duration-200 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50' 
            : 'bg-white border-b border-gray-200'
        }`}>
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Event Types</h1>
              <p className="text-sm text-gray-600 mt-1">Create events to share for people to book on your calendar.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-pulse rounded-full"></span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className={`w-80 p-0 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-gray-200/50' : 'bg-white'}`}
                  align="end"
                >
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-azure/5' : ''
                        }`}
                      >
                        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-azure to-quantum flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">S</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Moon className="w-4 h-4 mr-2" />
                    Out of Office
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Map className="w-4 h-4 mr-2" />
                    Roadmap
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button className="bg-azure hover:bg-azure/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* User Profile Section */}
          <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-azure to-quantum flex items-center justify-center">
                  <span className="text-white font-semibold text-xl">S</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Sanskar Yadav</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="bg-gray-100 px-2 py-1 rounded-md flex items-center space-x-1">
                      <span className="text-sm text-gray-600">cal.id/sanskar</span>
                      <button onClick={() => copyToClipboard('cal.id/sanskar')}>
                        <Copy className="w-3 h-3 text-gray-500 hover:text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Your Teams Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">Your Teams</h2>
                {selectedTeam && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{selectedTeam.name}</span>
                    <div className="bg-gray-100 px-2 py-1 rounded-md flex items-center space-x-1">
                      <span className="text-xs">{selectedTeam.slug}</span>
                      <button onClick={() => copyToClipboard(selectedTeam.slug)}>
                        <Copy className="w-3 h-3 text-gray-500 hover:text-gray-700" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {teams.map((team) => (
                <div
                  key={team.id}
                  onClick={() => setSelectedTeam(selectedTeam?.id === team.id ? null : team)}
                  className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all hover:shadow-sm ${
                    selectedTeam?.id === team.id 
                      ? `${getColorClass(team.color)} border-${team.color}` 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg ${getIconColor(team.color)} flex items-center justify-center text-sm`}>
                        {team.logo}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{team.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-xs text-gray-500">{team.slug}</span>
                          <button onClick={(e) => { e.stopPropagation(); copyToClipboard(team.slug); }}>
                            <Copy className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{team.eventTypes} event types</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search event types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure transition-colors"
            />
          </div>

          {/* Event Types */}
          <div className="space-y-3">
            {filteredEventTypes.map((event) => (
              <div
                key={event.id}
                draggable
                onDragStart={(e) => handleDragStart(e, event.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, event.id)}
                className="group bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-move"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Drag Handle */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Event Icon */}
                    <div className={`w-10 h-10 rounded-lg ${getIconColor(event.color)} flex items-center justify-center text-lg`}>
                      {event.icon}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center space-x-2">
                        {event.durations.map((duration) => (
                          <span
                            key={duration}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs flex items-center space-x-1"
                          >
                            <Clock className="w-3 h-3" />
                            <span>{duration}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {/* Toggle */}
                    <Switch 
                      checked={event.isActive}
                      className="data-[state=checked]:bg-azure"
                    />

                    {/* Action Buttons */}
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="group/tooltip relative">
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </Button>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded">
                          Preview
                        </div>
                      </div>

                      <div className="group/tooltip relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-8 h-8"
                          onClick={() => copyToClipboard(event.slug)}
                        >
                          <Copy className="w-4 h-4 text-gray-500" />
                        </Button>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded">
                          Copy
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <MoreHorizontal className="w-4 h-4 text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Code2 className="w-4 h-4 mr-2" />
                            Embed
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
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
              <p className="text-gray-500">No event types found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
