
import { useState, useEffect } from 'react';
import { Search, Plus, Settings, User, Calendar, Clock, Link, MoreHorizontal, Eye, Copy, Menu } from 'lucide-react';
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

  const getColorClass = (color: string) => {
    switch (color) {
      case 'azure': return 'border-azure/20 hover:border-azure/40';
      case 'pulse': return 'border-pulse/20 hover:border-pulse/40';
      case 'amber': return 'border-amber/20 hover:border-amber/40';
      case 'quantum': return 'border-quantum/20 hover:border-quantum/40';
      default: return 'border-border';
    }
  };

  const getAccentColor = (color: string) => {
    switch (color) {
      case 'azure': return 'text-azure';
      case 'pulse': return 'text-pulse';
      case 'amber': return 'text-amber';
      case 'quantum': return 'text-quantum';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Clean Modern Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-border z-50 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-azure flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              {sidebarOpen && <span className="font-semibold text-foreground">Cal.com</span>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* User Profile */}
        {sidebarOpen && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-azure to-quantum flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm">Sanskar Yadav</div>
                <div className="text-xs text-muted-foreground">sanskar@example.com</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {[
            { icon: Calendar, label: 'Event Types', active: true },
            { icon: Calendar, label: 'Bookings', active: false },
            { icon: Clock, label: 'Availability', active: false },
            { icon: User, label: 'Teams', active: false },
            { icon: Settings, label: 'Settings', active: false }
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active 
                  ? 'bg-azure/10 text-azure border border-azure/20' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4 space-y-1">
            {[
              { icon: Eye, label: 'View public page' },
              { icon: Copy, label: 'Copy public page link' }
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} p-8`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Event Types
            </h1>
            <p className="text-muted-foreground">Create events to share for people to book on your calendar.</p>
          </div>
          <Button className="bg-azure hover:bg-azure/90 text-white px-6">
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-xl p-6 mb-6 border border-border subtle-shadow">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-azure to-quantum flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Sanskar Yadav</h3>
              <p className="text-sm text-muted-foreground">Professional scheduling made simple</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search event types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure transition-colors"
          />
        </div>

        {/* Event Types List */}
        <div className="space-y-4">
          {filteredEventTypes.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-xl p-6 border transition-all duration-200 hover-lift ${getColorClass(event.color)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md font-mono">
                      {event.slug}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Duration Tags */}
                  <div className="flex items-center space-x-2">
                    {event.durations.map((duration) => (
                      <span
                        key={duration}
                        className="px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-sm font-medium border border-border hover:border-border transition-colors flex items-center space-x-1"
                      >
                        <Clock className="w-3 h-3" />
                        <span>{duration}</span>
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 ml-6">
                  {/* Toggle Switch */}
                  <div className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    event.isActive ? 'bg-azure' : 'bg-muted'
                  }`}>
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all shadow-sm ${
                      event.isActive ? 'left-5' : 'left-0.5'
                    }`}></div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-1">
                    {[
                      { icon: Link, color: 'azure' },
                      { icon: Copy, color: 'muted-foreground' },
                      { icon: MoreHorizontal, color: 'muted-foreground' }
                    ].map(({ icon: Icon, color }, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="icon"
                        className="w-9 h-9 hover:bg-muted"
                      >
                        <Icon className={`w-4 h-4 text-${color}`} />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEventTypes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No event types found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
