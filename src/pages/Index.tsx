import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Grid3X3, Route, Layers, BarChart3, Menu, Bell, Sun, Moon, Settings, User, Map, HelpCircle, LogOut, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import MainContent from '../components/MainContent';
import SettingsDialog from '../components/SettingsDialog';

const Index = () => {
  const [activeView, setActiveView] = useState('event-types');
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [eventTypes, setEventTypes] = useState([{
    id: 1,
    title: 'Product Demo',
    slug: '/sanskar/product-demo',
    description: 'Witness innovation in action! Reserve a time for a personalized demo of our next-gen scheduler (THIS SITE)',
    durations: ['30m', '45m'],
    isActive: true,
    color: 'azure',
    icon: '⚡',
    bookingsToday: 3
  }, {
    id: 2,
    title: 'Interviews 🎬',
    slug: '/sanskar/interviews',
    description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
    durations: ['30m', '60m'],
    isActive: true,
    color: 'pulse',
    icon: '👤',
    bookingsToday: 1
  }, {
    id: 3,
    title: 'Product Hunt Chats',
    slug: '/sanskar/product-hunt-chats',
    description: "The essence of Product Hunt reflects in communities- Select a time suitable for you, and let's talk products!",
    durations: ['15m', '30m', '45m', '60m'],
    isActive: true,
    color: 'amber',
    icon: '💬',
    bookingsToday: 5
  }, {
    id: 4,
    title: 'Everything Else',
    slug: '/sanskar/everything-else',
    description: "Open Agenda! Let's brainstorm over coffee or talk about your favorite singer. Whatever it is, I'm all ears! 🍵",
    durations: ['15m', '30m', '60m'],
    isActive: true,
    color: 'quantum',
    icon: '☕',
    bookingsToday: 2
  }, {
    id: 5,
    title: 'Technical Review',
    slug: '/sanskar/technical-review',
    description: "Deep dive into technical architecture and code review sessions for your projects.",
    durations: ['45m', '60m'],
    isActive: true,
    color: 'azure',
    icon: '⚙️',
    bookingsToday: 0
  }, {
    id: 6,
    title: 'Strategy Session',
    slug: '/sanskar/strategy-session',
    description: "Plan your roadmap and discuss strategic decisions for your business growth.",
    durations: ['30m', '60m', '90m'],
    isActive: true,
    color: 'pulse',
    icon: '📊',
    bookingsToday: 1
  }, {
    id: 7,
    title: 'Team Standup',
    slug: '/sanskar/team-standup',
    description: "Quick sync meetings to align team priorities and discuss blockers.",
    durations: ['15m', '30m'],
    isActive: true,
    color: 'quantum',
    icon: '🔄',
    bookingsToday: 4
  }, {
    id: 8,
    title: 'Client Onboarding',
    slug: '/sanskar/client-onboarding',
    description: "Welcome new clients and walk them through our processes and expectations.",
    durations: ['45m', '60m'],
    isActive: true,
    color: 'amber',
    icon: '🎯',
    bookingsToday: 2
  }, {
    id: 9,
    title: 'Design Review',
    slug: '/sanskar/design-review',
    description: "Collaborative design sessions to review mockups, prototypes and user experience.",
    durations: ['30m', '45m', '60m'],
    isActive: true,
    color: 'azure',
    icon: '🎨',
    bookingsToday: 1
  }]);
  const teams = [{
    id: 1,
    name: 'Design Team',
    slug: 'cal.id/design-team',
    logo: '🎨',
    color: 'amber',
    eventTypes: [{
      id: 101,
      title: 'Design Critique',
      description: 'Review and critique design work',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'amber',
      icon: '🎨',
      bookingsToday: 2
    }, {
      id: 102,
      title: 'User Research Session',
      description: 'Conduct user interviews and research',
      durations: ['60m'],
      isActive: true,
      color: 'azure',
      icon: '🔍',
      bookingsToday: 1
    }, {
      id: 103,
      title: 'Design System Review',
      description: 'Review and update design system components',
      durations: ['45m'],
      isActive: true,
      color: 'pulse',
      icon: '📐',
      bookingsToday: 0
    }, {
      id: 104,
      title: 'Portfolio Review',
      description: 'Review designer portfolios and work',
      durations: ['30m', '60m'],
      isActive: true,
      color: 'quantum',
      icon: '📁',
      bookingsToday: 3
    }, {
      id: 105,
      title: 'Brand Workshop',
      description: 'Collaborate on brand identity and guidelines',
      durations: ['90m'],
      isActive: true,
      color: 'amber',
      icon: '🎪',
      bookingsToday: 1
    }, {
      id: 106,
      title: 'Wireframe Session',
      description: 'Create and review wireframes together',
      durations: ['45m', '60m'],
      isActive: true,
      color: 'azure',
      icon: '📱',
      bookingsToday: 2
    }, {
      id: 107,
      title: 'Design Handoff',
      description: 'Hand off designs to development team',
      durations: ['30m'],
      isActive: true,
      color: 'pulse',
      icon: '🤝',
      bookingsToday: 1
    }]
  }, {
    id: 2,
    name: 'Engineering',
    slug: 'cal.id/engineering',
    logo: '⚙️',
    color: 'azure',
    eventTypes: [{
      id: 201,
      title: 'Code Review',
      description: 'Review pull requests and code quality',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'azure',
      icon: '👁️',
      bookingsToday: 4
    }, {
      id: 202,
      title: 'Technical Architecture',
      description: 'Discuss system architecture and design',
      durations: ['60m', '90m'],
      isActive: true,
      color: 'pulse',
      icon: '🏗️',
      bookingsToday: 2
    }, {
      id: 203,
      title: 'Bug Triage',
      description: 'Review and prioritize bugs and issues',
      durations: ['30m'],
      isActive: true,
      color: 'quantum',
      icon: '🐛',
      bookingsToday: 1
    }, {
      id: 204,
      title: 'Sprint Planning',
      description: 'Plan upcoming sprint and tasks',
      durations: ['60m'],
      isActive: true,
      color: 'amber',
      icon: '📋',
      bookingsToday: 0
    }, {
      id: 205,
      title: 'Technical Interview',
      description: 'Conduct technical interviews for candidates',
      durations: ['45m', '60m'],
      isActive: true,
      color: 'azure',
      icon: '💻',
      bookingsToday: 3
    }, {
      id: 206,
      title: 'Pair Programming',
      description: 'Collaborative coding session',
      durations: ['60m', '90m'],
      isActive: true,
      color: 'pulse',
      icon: '👥',
      bookingsToday: 2
    }, {
      id: 207,
      title: 'Tech Debt Review',
      description: 'Review and plan technical debt improvements',
      durations: ['45m'],
      isActive: true,
      color: 'quantum',
      icon: '🔧',
      bookingsToday: 1
    }]
  }, {
    id: 3,
    name: 'Marketing',
    slug: 'cal.id/marketing',
    logo: '📈',
    color: 'pulse',
    eventTypes: [{
      id: 301,
      title: 'Campaign Review',
      description: 'Review marketing campaign performance',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'pulse',
      icon: '📊',
      bookingsToday: 3
    }, {
      id: 302,
      title: 'Content Strategy',
      description: 'Plan content calendar and strategy',
      durations: ['60m'],
      isActive: true,
      color: 'amber',
      icon: '📝',
      bookingsToday: 2
    }, {
      id: 303,
      title: 'Brand Guidelines',
      description: 'Review and update brand guidelines',
      durations: ['45m'],
      isActive: true,
      color: 'azure',
      icon: '🎨',
      bookingsToday: 1
    }, {
      id: 304,
      title: 'Social Media Planning',
      description: 'Plan social media content and strategy',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'quantum',
      icon: '📱',
      bookingsToday: 4
    }, {
      id: 305,
      title: 'Analytics Review',
      description: 'Review marketing analytics and metrics',
      durations: ['30m'],
      isActive: true,
      color: 'pulse',
      icon: '📈',
      bookingsToday: 2
    }, {
      id: 306,
      title: 'Partnership Discussion',
      description: 'Discuss potential partnerships and collaborations',
      durations: ['45m', '60m'],
      isActive: true,
      color: 'amber',
      icon: '🤝',
      bookingsToday: 1
    }, {
      id: 307,
      title: 'PR Strategy',
      description: 'Plan public relations and media strategy',
      durations: ['60m'],
      isActive: true,
      color: 'azure',
      icon: '📢',
      bookingsToday: 0
    }]
  }, {
    id: 4,
    name: 'Sales',
    slug: 'cal.id/sales',
    logo: '💼',
    color: 'quantum',
    eventTypes: [{
      id: 401,
      title: 'Sales Demo',
      description: 'Product demonstration for prospects',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'quantum',
      icon: '💼',
      bookingsToday: 5
    }, {
      id: 402,
      title: 'Discovery Call',
      description: 'Initial discovery and needs assessment',
      durations: ['30m'],
      isActive: true,
      color: 'azure',
      icon: '🔍',
      bookingsToday: 3
    }, {
      id: 403,
      title: 'Proposal Review',
      description: 'Review sales proposals with prospects',
      durations: ['45m', '60m'],
      isActive: true,
      color: 'pulse',
      icon: '📋',
      bookingsToday: 2
    }, {
      id: 404,
      title: 'Contract Negotiation',
      description: 'Negotiate contract terms and pricing',
      durations: ['60m'],
      isActive: true,
      color: 'amber',
      icon: '⚖️',
      bookingsToday: 1
    }, {
      id: 405,
      title: 'Customer Check-in',
      description: 'Regular check-ins with existing customers',
      durations: ['15m', '30m'],
      isActive: true,
      color: 'quantum',
      icon: '✅',
      bookingsToday: 4
    }, {
      id: 406,
      title: 'Sales Training',
      description: 'Training sessions for sales team',
      durations: ['60m', '90m'],
      isActive: true,
      color: 'azure',
      icon: '🎓',
      bookingsToday: 1
    }, {
      id: 407,
      title: 'Pipeline Review',
      description: 'Review sales pipeline and opportunities',
      durations: ['45m'],
      isActive: true,
      color: 'pulse',
      icon: '📊',
      bookingsToday: 2
    }]
  }];
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

  const sidebarItems = [
    { id: 'event-types', icon: Calendar, label: 'Event Types' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'availability', icon: Clock, label: 'Availability' },
    { id: 'teams', icon: Users, label: 'Teams' },
    { id: 'apps', icon: Grid3X3, label: 'Apps' },
    { id: 'routing-forms', icon: Route, label: 'Routing Forms' },
    { id: 'workflows', icon: Layers, label: 'Workflows' },
    { id: 'insights', icon: BarChart3, label: 'Insights' },
    { id: 'all-products', icon: Menu, label: 'All Products' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const getViewTitle = () => {
    switch (activeView) {
      case 'event-types': return 'Event Types';
      case 'bookings': return 'Bookings';
      case 'availability': return 'Availability';
      case 'teams': return 'Teams';
      case 'apps': return 'Apps';
      case 'routing-forms': return 'Routing Forms';
      case 'workflows': return 'Workflows';
      case 'insights': return 'Insights';
      case 'all-products': return 'All Products';
      default: return 'Event Types';
    }
  };

  const getViewDescription = () => {
    switch (activeView) {
      case 'event-types': return 'Create events to share for people to book on your calendar.';
      case 'bookings': return 'Manage your scheduled meetings and appointments.';
      case 'availability': return 'Configure when you\'re available for meetings.';
      case 'teams': return 'Manage your teams and collaborate with colleagues.';
      case 'apps': return 'Enhance your scheduling with powerful integrations.';
      case 'routing-forms': return 'Create forms to route visitors to the right event type.';
      case 'workflows': return 'Automate your scheduling process with custom workflows.';
      case 'insights': return 'Track your scheduling performance and analytics.';
      case 'all-products': return 'Explore all Cal.com products and features.';
      default: return 'Create events to share for people to book on your calendar.';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-[#151515]' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 border-r z-40 transition-all duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'} flex flex-col`}>
        {/* Logo */}
        <div className={`p-6 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center space-x-4">
            <img src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" alt="Cal ID" className="w-12 h-12" />
            <span className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
              Cal ID
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1">
          {sidebarItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeView === id 
                  ? `${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'} transform scale-[1.02]`
                  : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} hover:scale-[1.01]`
              }`}
              style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Actions - Moved here */}
        <div className="p-4 border-t border-gray-800">
          <div className={`flex items-center justify-between p-3 rounded-xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setShowSettings(true)}>
              <Settings className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </Button>
            <div className="flex items-center space-x-2">
              <Sun className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={setIsDarkMode} 
                className="data-[state=checked]:bg-[#C9D9E3] transition-all duration-200" 
              />
              <Moon className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header - More transparent */}
        <header className={`sticky top-0 z-30 transition-all duration-300 ${isDarkMode ? 'bg-[#1a1a1a]/80 backdrop-blur-xl border-gray-800/50' : 'bg-white/80 backdrop-blur-xl border-gray-200/50'} border-b`}>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                {getViewTitle()}
              </h1>
              <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                {getViewDescription()}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Notifications - Minimal animations */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={`w-80 p-0 shadow-xl rounded-2xl ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`} align="end">
                  <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                    <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2 space-y-2">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`p-3 rounded-xl cursor-pointer ${isDarkMode ? 'bg-[#151515] hover:bg-gray-800 border border-gray-800' : 'bg-white hover:bg-gray-50 border border-gray-100'} ${notification.unread ? 'shadow-sm' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                            {notification.title}
                          </h4>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                            {notification.time}
                          </span>
                        </div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                          {notification.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Profile Dropdown - Minimal animations */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold text-sm" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>S</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={`w-48 shadow-xl rounded-2xl ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
                  <DropdownMenuItem className={`rounded-xl m-1 ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`rounded-xl m-1 ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    <Moon className="w-4 h-4 mr-2" />
                    Out of Office
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`rounded-xl m-1 ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    <Map className="w-4 h-4 mr-2" />
                    Roadmap
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`rounded-xl m-1 ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
                  <DropdownMenuItem className={`rounded-xl m-1 ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <MainContent 
          activeView={activeView} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} isDarkMode={isDarkMode} eventTypes={eventTypes} setEventTypes={setEventTypes} teams={teams} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} isDarkMode={isDarkMode} />
    </div>
  );
};

export default Index;
