
import { useState } from 'react';
import { Search, Plus, Settings, User, Calendar, Clock, Link, MoreHorizontal, Eye, Copy, Menu, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const eventTypes = [
    {
      id: 1,
      title: 'Product Demo',
      slug: '/sanskar/product-demo',
      description: 'Witness innovation in action! Reserve a time for a personalized demo of our next-gen scheduler (THIS SITE)',
      durations: ['30m', '45m'],
      isActive: true,
      color: 'azure',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Interviews 🎬',
      slug: '/sanskar/interviews',
      description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
      durations: ['30m', '60m'],
      isActive: true,
      color: 'pulse',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Product Hunt Chats',
      slug: '/sanskar/product-hunt-chats',
      description: "The essence of Product Hunt reflects in communities- Select a time suitable for you, and let's talk products!",
      durations: ['15m', '30m', '45m', '60m'],
      isActive: true,
      color: 'amber',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Everything Else',
      slug: '/sanskar/everything-else',
      description: "Open Agenda! Let's brainstorm over coffee or talk about your favorite singer. Whatever it is, I'm all ears! 🍵",
      durations: ['15m', '30m', '60m'],
      isActive: true,
      color: 'quantum',
      priority: 'low'
    }
  ];

  const filteredEventTypes = eventTypes.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { icon: Calendar, label: 'Event Types', active: true },
    { icon: Calendar, label: 'Bookings', active: false },
    { icon: Clock, label: 'Availability', active: false },
    { icon: User, label: 'Teams', active: false },
    { icon: Settings, label: 'Settings', active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}>
        
        {/* Sidebar Header */}
        <div className="h-16 px-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-azure flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && <span className="font-semibold text-gray-900 text-sm">Cal.com</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 hover:bg-gray-100"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        {/* User Profile */}
        {sidebarOpen && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-azure to-quantum flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm text-gray-900">Sanskar Yadav</div>
                <div className="text-xs text-gray-500">sanskar@example.com</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-2">
          {sidebarItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors mb-1 ${
                active 
                  ? 'bg-azure/10 text-azure' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span className="ml-3">{label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        
        {/* Top Header */}
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-azure to-quantum flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-900">Sanskar Yadav</span>
                <span className="text-sm text-gray-500 ml-2">sanskar@example.com</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 bg-gray-100 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure focus:bg-white transition-colors"
              />
            </div>
            <Button className="bg-azure hover:bg-azure/90 text-white text-sm px-4 py-2">
              <Plus className="w-4 h-4 mr-2" />
              New
            </Button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Event Types
            </h1>
            <p className="text-gray-600 text-sm">Create events to share for people to book on your calendar.</p>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3 mb-6">
            <Button variant="outline" className="text-sm">
              All Event Types
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="text-sm">
              All Categories
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Event Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEventTypes.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    event.color === 'azure' ? 'bg-azure' :
                    event.color === 'pulse' ? 'bg-pulse' :
                    event.color === 'amber' ? 'bg-amber' :
                    'bg-quantum'
                  }`}>
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Toggle Switch */}
                    <div className={`relative w-8 h-4 rounded-full transition-colors cursor-pointer ${
                      event.isActive ? 'bg-azure' : 'bg-gray-300'
                    }`}>
                      <div className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transition-all shadow-sm ${
                        event.isActive ? 'left-4' : 'left-0.5'
                      }`}></div>
                    </div>
                    
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-base mb-1">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                </div>
                
                {/* Duration Tags */}
                <div className="flex items-center space-x-2 mb-4">
                  {event.durations.map((duration) => (
                    <span
                      key={duration}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium flex items-center space-x-1"
                    >
                      <Clock className="w-3 h-3" />
                      <span>{duration}</span>
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <Button variant="ghost" size="sm" className="text-azure hover:bg-azure/10 text-sm px-3">
                    <Link className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-gray-100 text-sm px-3">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredEventTypes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No event types found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
