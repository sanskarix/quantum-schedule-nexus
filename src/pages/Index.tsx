
import { useState, useEffect, useRef } from 'react';
import { Search, Plus, Settings, User, Calendar, Clock, Link, MoreHorizontal, Eye, Copy, Menu, Bell, Moon, Sun, ChevronDown, TrendingUp, TrendingDown, GripVertical, Edit, Code2, Trash2, Map, HelpCircle, LogOut, ChevronRight, Users, Layers, FileText, BarChart3, Route, Grid3X3, ArrowLeft } from 'lucide-react';
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
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const dragCounter = useRef(0);

  const [eventTypes, setEventTypes] = useState([
    {
      id: 1,
      title: 'Product Demo',
      slug: '/sanskar/product-demo',
      description: 'Witness innovation in action! Reserve a time for a personalized demo of our next-gen scheduler (THIS SITE)',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'azure',
      icon: '⚡',
      bookingsToday: 3
    },
    {
      id: 2,
      title: 'Interviews 🎬',
      slug: '/sanskar/interviews',
      description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
      durations: ['30m', '60m'],
      isActive: true,
      color: 'pulse',
      icon: '👤',
      bookingsToday: 1
    },
    {
      id: 3,
      title: 'Product Hunt Chats',
      slug: '/sanskar/product-hunt-chats',
      description: "The essence of Product Hunt reflects in communities- Select a time suitable for you, and let's talk products!",
      durations: ['15m', '30m', '45m', '60m'],
      isActive: true,
      color: 'amber',
      icon: '💬',
      bookingsToday: 5
    },
    {
      id: 4,
      title: 'Everything Else',
      slug: '/sanskar/everything-else',
      description: "Open Agenda! Let's brainstorm over coffee or talk about your favorite singer. Whatever it is, I'm all ears! 🍵",
      durations: ['15m', '30m', '60m'],
      isActive: true,
      color: 'quantum',
      icon: '☕',
      bookingsToday: 2
    },
    {
      id: 5,
      title: 'Technical Review',
      slug: '/sanskar/technical-review',
      description: "Deep dive into technical architecture and code review sessions for your projects.",
      durations: ['45m', '60m'],
      isActive: true,
      color: 'azure',
      icon: '⚙️',
      bookingsToday: 0
    },
    {
      id: 6,
      title: 'Strategy Session',
      slug: '/sanskar/strategy-session',
      description: "Plan your roadmap and discuss strategic decisions for your business growth.",
      durations: ['30m', '60m', '90m'],
      isActive: true,
      color: 'pulse',
      icon: '📊',
      bookingsToday: 1
    },
    {
      id: 7,
      title: 'Team Standup',
      slug: '/sanskar/team-standup',
      description: "Quick sync meetings to align team priorities and discuss blockers.",
      durations: ['15m', '30m'],
      isActive: true,
      color: 'quantum',
      icon: '🔄',
      bookingsToday: 4
    },
    {
      id: 8,
      title: 'Client Onboarding',
      slug: '/sanskar/client-onboarding',
      description: "Welcome new clients and walk them through our processes and expectations.",
      durations: ['45m', '60m'],
      isActive: true,
      color: 'amber',
      icon: '🎯',
      bookingsToday: 2
    },
    {
      id: 9,
      title: 'Design Review',
      slug: '/sanskar/design-review',
      description: "Collaborative design sessions to review mockups, prototypes and user experience.",
      durations: ['30m', '45m', '60m'],
      isActive: true,
      color: 'azure',
      icon: '🎨',
      bookingsToday: 1
    }
  ]);

  const teams = [
    {
      id: 1,
      name: 'Design Team',
      slug: 'cal.id/design-team',
      logo: '🎨',
      color: 'amber',
      eventTypes: [
        { id: 101, title: 'Design Critique', description: 'Review and critique design work', durations: ['30m', '45m'], isActive: true, color: 'amber', icon: '🎨', bookingsToday: 2 },
        { id: 102, title: 'User Research Session', description: 'Conduct user interviews and research', durations: ['60m'], isActive: true, color: 'azure', icon: '🔍', bookingsToday: 1 },
        { id: 103, title: 'Design System Review', description: 'Review and update design system components', durations: ['45m'], isActive: true, color: 'pulse', icon: '📐', bookingsToday: 0 },
        { id: 104, title: 'Portfolio Review', description: 'Review designer portfolios and work', durations: ['30m', '60m'], isActive: true, color: 'quantum', icon: '📁', bookingsToday: 3 },
        { id: 105, title: 'Brand Workshop', description: 'Collaborate on brand identity and guidelines', durations: ['90m'], isActive: true, color: 'amber', icon: '🎪', bookingsToday: 1 },
        { id: 106, title: 'Wireframe Session', description: 'Create and review wireframes together', durations: ['45m', '60m'], isActive: true, color: 'azure', icon: '📱', bookingsToday: 2 },
        { id: 107, title: 'Design Handoff', description: 'Hand off designs to development team', durations: ['30m'], isActive: true, color: 'pulse', icon: '🤝', bookingsToday: 1 }
      ]
    },
    {
      id: 2,
      name: 'Engineering',
      slug: 'cal.id/engineering',
      logo: '⚙️',
      color: 'azure',
      eventTypes: [
        { id: 201, title: 'Code Review', description: 'Review pull requests and code quality', durations: ['30m', '45m'], isActive: true, color: 'azure', icon: '👁️', bookingsToday: 4 },
        { id: 202, title: 'Technical Architecture', description: 'Discuss system architecture and design', durations: ['60m', '90m'], isActive: true, color: 'pulse', icon: '🏗️', bookingsToday: 2 },
        { id: 203, title: 'Bug Triage', description: 'Review and prioritize bugs and issues', durations: ['30m'], isActive: true, color: 'quantum', icon: '🐛', bookingsToday: 1 },
        { id: 204, title: 'Sprint Planning', description: 'Plan upcoming sprint and tasks', durations: ['60m'], isActive: true, color: 'amber', icon: '📋', bookingsToday: 0 },
        { id: 205, title: 'Technical Interview', description: 'Conduct technical interviews for candidates', durations: ['45m', '60m'], isActive: true, color: 'azure', icon: '💻', bookingsToday: 3 },
        { id: 206, title: 'Pair Programming', description: 'Collaborative coding session', durations: ['60m', '90m'], isActive: true, color: 'pulse', icon: '👥', bookingsToday: 2 },
        { id: 207, title: 'Tech Debt Review', description: 'Review and plan technical debt improvements', durations: ['45m'], isActive: true, color: 'quantum', icon: '🔧', bookingsToday: 1 }
      ]
    },
    {
      id: 3,
      name: 'Marketing',
      slug: 'cal.id/marketing',
      logo: '📈',
      color: 'pulse',
      eventTypes: [
        { id: 301, title: 'Campaign Review', description: 'Review marketing campaign performance', durations: ['30m', '45m'], isActive: true, color: 'pulse', icon: '📊', bookingsToday: 3 },
        { id: 302, title: 'Content Strategy', description: 'Plan content calendar and strategy', durations: ['60m'], isActive: true, color: 'amber', icon: '📝', bookingsToday: 2 },
        { id: 303, title: 'Brand Guidelines', description: 'Review and update brand guidelines', durations: ['45m'], isActive: true, color: 'azure', icon: '🎨', bookingsToday: 1 },
        { id: 304, title: 'Social Media Planning', description: 'Plan social media content and strategy', durations: ['30m', '45m'], isActive: true, color: 'quantum', icon: '📱', bookingsToday: 4 },
        { id: 305, title: 'Analytics Review', description: 'Review marketing analytics and metrics', durations: ['30m'], isActive: true, color: 'pulse', icon: '📈', bookingsToday: 2 },
        { id: 306, title: 'Partnership Discussion', description: 'Discuss potential partnerships and collaborations', durations: ['45m', '60m'], isActive: true, color: 'amber', icon: '🤝', bookingsToday: 1 },
        { id: 307, title: 'PR Strategy', description: 'Plan public relations and media strategy', durations: ['60m'], isActive: true, color: 'azure', icon: '📢', bookingsToday: 0 }
      ]
    },
    {
      id: 4,
      name: 'Sales',
      slug: 'cal.id/sales',
      logo: '💼',
      color: 'quantum',
      eventTypes: [
        { id: 401, title: 'Sales Demo', description: 'Product demonstration for prospects', durations: ['30m', '45m'], isActive: true, color: 'quantum', icon: '💼', bookingsToday: 5 },
        { id: 402, title: 'Discovery Call', description: 'Initial discovery and needs assessment', durations: ['30m'], isActive: true, color: 'azure', icon: '🔍', bookingsToday: 3 },
        { id: 403, title: 'Proposal Review', description: 'Review sales proposals with prospects', durations: ['45m', '60m'], isActive: true, color: 'pulse', icon: '📋', bookingsToday: 2 },
        { id: 404, title: 'Contract Negotiation', description: 'Negotiate contract terms and pricing', durations: ['60m'], isActive: true, color: 'amber', icon: '⚖️', bookingsToday: 1 },
        { id: 405, title: 'Customer Check-in', description: 'Regular check-ins with existing customers', durations: ['15m', '30m'], isActive: true, color: 'quantum', icon: '✅', bookingsToday: 4 },
        { id: 406, title: 'Sales Training', description: 'Training sessions for sales team', durations: ['60m', '90m'], isActive: true, color: 'azure', icon: '🎓', bookingsToday: 1 },
        { id: 407, title: 'Pipeline Review', description: 'Review sales pipeline and opportunities', durations: ['45m'], isActive: true, color: 'pulse', icon: '📊', bookingsToday: 2 }
      ]
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

  const sidebarItems = [
    { icon: Calendar, label: 'Event Types', active: !selectedEvent },
    { icon: Calendar, label: 'Bookings', active: false },
    { icon: Clock, label: 'Availability', active: false },
    { icon: Users, label: 'Teams', active: false },
    { icon: Grid3X3, label: 'Apps', active: false },
    { icon: Route, label: 'Routing Forms', active: false },
    { icon: Layers, label: 'Workflows', active: false },
    { icon: BarChart3, label: 'Insights', active: false },
    { icon: Menu, label: 'All Products', active: false }
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(selectedTeam?.id === team.id ? null : team);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const handleBackToEventTypes = () => {
    setSelectedEvent(null);
  };

  if (selectedEvent) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-[#161618]' : 'bg-gray-50'}`}>
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full w-64 border-r z-40 transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          {/* Logo */}
          <div className={`p-6 border-b transition-colors duration-300 ${isDarkMode ? 'border-[#818181]/20' : 'border-gray-100'}`}>
            <div className="flex items-center space-x-3">
              <img src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" alt="Cal ID" className="w-8 h-8" />
              <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cal ID</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {sidebarItems.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active 
                    ? `${isDarkMode ? 'bg-azure/20 text-azure' : 'bg-azure/10 text-azure'}` 
                    : `${isDarkMode ? 'text-[#818181] hover:text-white hover:bg-[#818181]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="absolute bottom-6 left-4 right-4">
            <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/10' : 'bg-gray-50'}`}>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Settings className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
              </Button>
              <div className="flex items-center space-x-2">
                <Sun className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
                <Switch 
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="data-[state=checked]:bg-azure"
                />
                <Moon className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64">
          {/* Header */}
          <header className={`sticky top-0 z-30 transition-all duration-300 ${
            isScrolled 
              ? `${isDarkMode ? 'bg-[#212124]/80 backdrop-blur-md border-[#818181]/20' : 'bg-white/80 backdrop-blur-md border-gray-200/50'} border-b` 
              : `${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'} border-b`
          }`}>
            <div className="flex items-center justify-between px-8 py-4">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleBackToEventTypes}
                  className={`transition-colors duration-300 ${isDarkMode ? 'text-[#818181] hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedEvent.title}
                  </h1>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    Configure your event type settings
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button className="bg-azure hover:bg-azure/90 text-white">
                  Save Changes
                </Button>
              </div>
            </div>
          </header>

          {/* Event Configuration */}
          <div className="p-8 space-y-8">
            {/* Event Setup */}
            <div className={`rounded-xl p-6 border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Event Setup</h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Title</label>
                  <input 
                    type="text" 
                    value={selectedEvent.title}
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Description</label>
                  <textarea 
                    value={selectedEvent.description}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure`}
                  />
                  <div className="flex items-center mt-2 space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                      Translate description to the visitor's browser language using AI
                    </span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>URL</label>
                  <div className={`px-3 py-2 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/10 border-[#818181]/20 text-[#818181]' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>
                    cal.id/sanskar/{selectedEvent.slug.split('/').pop()}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Available durations</label>
                  <div className="flex space-x-2">
                    {selectedEvent.durations.map((duration: string) => (
                      <span key={duration} className={`px-3 py-1 border rounded-lg text-sm transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/10 border-[#818181]/20 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`}>
                        {duration}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Default duration</label>
                  <select className={`px-3 py-2 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                    <option>30 mins</option>
                    <option>45 mins</option>
                  </select>
                  <div className="flex items-center mt-2 space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                      Allow booker to select duration
                    </span>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Location</label>
                  <div className={`p-4 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'border-[#818181]/20' : 'border-gray-300'}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <img src="https://cal.id/app-store/googlevideo/logo.webp" alt="Google Meet" className="w-8 h-8" />
                      <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Google Meet</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Add a location
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className={`rounded-xl p-6 border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Availability</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className={`font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Working Hours - Default</h3>
                  <div className="space-y-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className={`w-24 text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>{day}</div>
                        <input type="time" value="09:00" className={`px-2 py-1 border rounded text-sm transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                        <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>-</span>
                        <input type="time" value="17:00" className={`px-2 py-1 border rounded text-sm transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>Time zone - Asia/Calcutta</span>
                </div>
              </div>
            </div>

            {/* Apps */}
            <div className={`rounded-xl p-6 border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Apps</h2>
              
              <div className={`text-center py-8 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                <p className="mb-4">NO APPS ADDED YET</p>
                <h3 className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Available apps</h3>
                <p className="text-sm">View popular apps below and explore more in our App Store</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Basecamp3', category: 'Other', icon: 'https://cal.id/app-store/basecamp3/icon-dark.svg' },
                  { name: 'Close.com', category: 'CRM', icon: 'https://cal.id/app-store/closecom/icon.svg' },
                  { name: 'Fathom', category: 'Analytics', icon: 'https://cal.id/app-store/fathom/icon.svg' },
                  { name: 'Google Analytics', category: 'Analytics', icon: 'https://cal.id/app-store/ga4/icon.svg' },
                  { name: 'Stripe', category: 'Payment', icon: 'https://cal.id/app-store/stripepayment/icon.svg' },
                  { name: 'Razorpay', category: 'Payment', icon: 'https://cal.id/app-store/razorpay/icon.png' }
                ].map((app) => (
                  <div key={app.name} className={`p-4 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'border-[#818181]/20 hover:bg-[#818181]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <img src={app.icon} alt={app.name} className="w-8 h-8" />
                      <div>
                        <h4 className={`font-medium text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.name}</h4>
                        <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>{app.category}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">Add</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-[#161618]' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 border-r z-40 transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
        {/* Logo */}
        <div className={`p-6 border-b transition-colors duration-300 ${isDarkMode ? 'border-[#818181]/20' : 'border-gray-100'}`}>
          <div className="flex items-center space-x-3">
            <img src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" alt="Cal ID" className="w-8 h-8" />
            <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cal ID</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active 
                  ? `${isDarkMode ? 'bg-azure/20 text-azure' : 'bg-azure/10 text-azure'}` 
                  : `${isDarkMode ? 'text-[#818181] hover:text-white hover:bg-[#818181]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/10' : 'bg-gray-50'}`}>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Settings className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
            </Button>
            <div className="flex items-center space-x-2">
              <Sun className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
              <Switch 
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-azure"
              />
              <Moon className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled 
            ? `${isDarkMode ? 'bg-[#212124]/80 backdrop-blur-md border-[#818181]/20' : 'bg-white/80 backdrop-blur-md border-gray-200/50'} border-b` 
            : `${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'} border-b`
        }`}>
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Event Types</h1>
              <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>Create events to share for people to book on your calendar.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-pulse rounded-full"></span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className={`w-80 p-0 transition-all duration-300 ${
                    isScrolled 
                      ? `${isDarkMode ? 'bg-[#212124]/80 backdrop-blur-md border-[#818181]/20' : 'bg-white/80 backdrop-blur-md border-gray-200/50'}` 
                      : `${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`
                  }`}
                  align="end"
                >
                  <div className={`p-4 border-b transition-colors duration-300 ${isDarkMode ? 'border-[#818181]/20' : 'border-gray-100'}`}>
                    <h3 className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2 space-y-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          isDarkMode 
                            ? 'bg-[#161618] hover:bg-[#818181]/10 border border-[#818181]/20' 
                            : 'bg-white hover:bg-gray-50 border border-gray-100'
                        } ${notification.unread ? 'shadow-sm' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-medium text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{notification.title}</h4>
                          <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>{notification.time}</span>
                        </div>
                        <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>{notification.message}</p>
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
                <DropdownMenuContent align="end" className={`w-48 transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
                  <DropdownMenuItem className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
                    <Moon className="w-4 h-4 mr-2" />
                    Out of Office
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
                    <Map className="w-4 h-4 mr-2" />
                    Roadmap
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={`transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-200'}`} />
                  <DropdownMenuItem className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
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
          <div className={`rounded-xl p-6 mb-6 border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-azure to-quantum flex items-center justify-center">
                  <span className="text-white font-semibold text-xl">S</span>
                </div>
                <div>
                  <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sanskar Yadav</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`px-2 py-1 rounded-md flex items-center space-x-1 transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-100'}`}>
                      <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>cal.id/sanskar</span>
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
                      <span className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</span>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>{stat.label}</p>
                    <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Your Teams Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h2 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Teams</h2>
                {selectedTeam && (
                  <>
                    <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>•</span>
                    <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{selectedTeam.name}</span>
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
              {teams.map((team) => (
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
                        <h3 className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{team.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>{team.slug}</span>
                          <button onClick={(e) => { e.stopPropagation(); copyToClipboard(team.slug); }}>
                            <Copy className={`w-3 h-3 hover:text-gray-600 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-400'}`} />
                          </button>
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
                          onClick={() => handleEventClick(event)}
                        >
                          {event.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`}>
                          {event.bookingsToday} today
                        </span>
                      </div>
                      <p className={`text-sm mb-2 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>{event.description}</p>
                      <div className="flex items-center space-x-2">
                        {event.durations.map((duration: string) => (
                          <span
                            key={duration}
                            className={`px-2 py-1 rounded text-xs flex items-center space-x-1 transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`}
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
                          <Eye className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                        </Button>
                        <div className={`absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity text-white text-xs py-1 px-2 rounded ${isDarkMode ? 'bg-[#161618]' : 'bg-gray-900'}`}>
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
                          <Copy className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                        </Button>
                        <div className={`absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity text-white text-xs py-1 px-2 rounded ${isDarkMode ? 'bg-[#161618]' : 'bg-gray-900'}`}>
                          Copy
                        </div>
                      </div>

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
              <p className={`transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>No event types found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
