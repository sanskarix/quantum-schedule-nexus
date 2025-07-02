
import { useState } from 'react';
import { Search, Plus, Settings, User, Calendar, Clock, Link, MoreHorizontal, Eye, Copy } from 'lucide-react';
import { Button } from '../components/ui/button';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const eventTypes = [
    {
      id: 1,
      title: 'Product Demo',
      slug: '/sanskar/product-demo',
      description: 'Witness innovation in action! Reserve a time for a personalized demo of our next-gen scheduler (THIS SITE)',
      durations: ['30m', '45m'],
      isActive: true
    },
    {
      id: 2,
      title: 'Interviews 🎬',
      slug: '/sanskar/interviews',
      description: "Let's chat about how your skills can be an asset for our team. No stress, just good vibes and great questions!",
      durations: ['30m', '60m'],
      isActive: true
    },
    {
      id: 3,
      title: 'Product Hunt Chats',
      slug: '/sanskar/product-hunt-chats',
      description: "The essence of Product Hunt reflects in communities- Select a time suitable for you, and let's talk products!",
      durations: ['15m', '30m', '45m', '60m'],
      isActive: true
    },
    {
      id: 4,
      title: 'Everything Else',
      slug: '/sanskar/everything-else',
      description: "Open Agenda! Let's brainstorm over coffee or talk about your favorite singer. Whatever it is, I'm all ears! 🍵",
      durations: ['15m', '30m', '60m'],
      isActive: true
    }
  ];

  const filteredEventTypes = eventTypes.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-carbon via-slate-900 to-carbon">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 glass-intense border-r border-white/10 z-50">
        {/* User Profile */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-azure to-amber quantum-glow flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">Sanskar Yad...</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {[
            { icon: Calendar, label: 'Event Types', active: true },
            { icon: Calendar, label: 'Bookings', active: false },
            { icon: Clock, label: 'Availability', active: false },
            { icon: User, label: 'Teams', active: false },
            { icon: Settings, label: 'Apps', active: false },
            { icon: Settings, label: 'Routing Forms', active: false },
            { icon: Settings, label: 'Workflows', active: false },
            { icon: Settings, label: 'Insights', active: false },
            { icon: Settings, label: 'All Products', active: false }
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                active 
                  ? 'glass-intense text-azure border border-azure/20' 
                  : 'text-muted-foreground hover:text-foreground hover:glass'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:glass transition-all duration-300">
            <Eye className="w-4 h-4" />
            <span>View public page</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:glass transition-all duration-300">
            <Copy className="w-4 h-4" />
            <span>Copy public page link</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:glass transition-all duration-300">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-holographic mb-2">Event Types</h1>
            <p className="text-muted-foreground">Create events to share for people to book on your calendar.</p>
          </div>
          <Button className="bg-azure hover:bg-azure/90 text-white px-6 quantum-glow">
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>

        {/* User Profile Section */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-azure to-amber quantum-glow flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-medium text-foreground">Sanskar Yadav</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 glass rounded-xl border border-white/10 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-azure/50 focus:border-azure/50 transition-all duration-300"
          />
        </div>

        {/* Event Types List */}
        <div className="space-y-4">
          {filteredEventTypes.map((event) => (
            <div key={event.id} className="glass rounded-2xl p-6 hover:glass-intense transition-all duration-300 hover-glow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                    <span className="text-sm text-muted-foreground font-mono">{event.slug}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{event.description}</p>
                  <div className="flex items-center space-x-2">
                    {event.durations.map((duration) => (
                      <span
                        key={duration}
                        className="px-3 py-1 bg-muted/50 rounded-lg text-sm text-muted-foreground border border-white/10"
                      >
                        <Clock className="w-3 h-3 inline mr-1" />
                        {duration}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 ml-6">
                  {/* Toggle Switch */}
                  <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    event.isActive ? 'bg-azure quantum-glow' : 'bg-muted'
                  }`}>
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 ${
                      event.isActive ? 'left-6' : 'left-0.5'
                    }`} />
                  </div>
                  
                  {/* Action Buttons */}
                  <Button variant="ghost" size="icon" className="glass hover:glass-intense">
                    <Link className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="glass hover:glass-intense">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="glass hover:glass-intense">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEventTypes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No more results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
