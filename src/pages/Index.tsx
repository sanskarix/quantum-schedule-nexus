
import { useState, useEffect } from 'react';
import { Search, Plus, Settings, User, Calendar, Clock, Link, MoreHorizontal, Eye, Copy, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

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
      color: 'quantum',
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
      color: 'pulse',
      priority: 'low'
    }
  ];

  const filteredEventTypes = eventTypes.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCardStyle = (color: string, priority: string) => {
    const baseStyle = "relative overflow-hidden";
    const priorityGlow = priority === 'high' ? 'shadow-lg shadow-azure/20' : '';
    return `${baseStyle} ${priorityGlow}`;
  };

  const getBorderColor = (color: string) => {
    switch (color) {
      case 'azure': return 'border-azure/30';
      case 'quantum': return 'border-quantum/30';
      case 'amber': return 'border-amber/30';
      case 'pulse': return 'border-pulse/30';
      default: return 'border-white/10';
    }
  };

  const getAccentColor = (color: string) => {
    switch (color) {
      case 'azure': return 'text-azure';
      case 'quantum': return 'text-quantum';
      case 'amber': return 'text-amber';
      case 'pulse': return 'text-pulse';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-carbon via-slate-900 to-carbon relative overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 grid-8 opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-azure/5 to-transparent animate-pulse"></div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 glass-intense border-r border-white/10 z-50 backdrop-blur-xl">
        {/* User Profile */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-azure to-amber quantum-glow flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-azure to-amber rounded-full opacity-20 animate-pulse"></div>
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
          ].map(({ icon: Icon, label, active }, index) => (
            <button
              key={label}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-500 group relative ${
                active 
                  ? 'glass-intense text-azure border border-azure/20 quantum-glow' 
                  : 'text-muted-foreground hover:text-foreground hover:glass hover:border-white/10'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon className="w-4 h-4 transition-all duration-300 group-hover:scale-110" />
              <span>{label}</span>
              {active && (
                <div className="absolute right-2 w-2 h-2 bg-azure rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          {[
            { icon: Eye, label: 'View public page' },
            { icon: Copy, label: 'Copy public page link' },
            { icon: Settings, label: 'Settings' }
          ].map(({ icon: Icon, label }, index) => (
            <button
              key={label}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:glass transition-all duration-300 group"
              style={{ animationDelay: `${(index + 9) * 50}ms` }}
            >
              <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8 relative">
        {/* Floating Particles */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-azure rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-amber rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-60 right-60 w-1.5 h-1.5 bg-quantum rounded-full animate-bounce opacity-50"></div>

        {/* Header */}
        <div className={`flex items-center justify-between mb-8 transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div>
            <h1 className="text-4xl font-semibold text-holographic mb-2 bg-gradient-to-r from-azure via-amber to-pulse bg-clip-text text-transparent">
              Event Types
            </h1>
            <p className="text-muted-foreground text-lg">Create events to share for people to book on your calendar.</p>
          </div>
          <div className="relative group">
            <Button className="bg-gradient-to-r from-azure to-amber hover:from-azure/90 hover:to-amber/90 text-white px-8 py-3 text-lg quantum-glow transition-all duration-300 group-hover:scale-105">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              New
            </Button>
            <div className="absolute -inset-1 bg-gradient-to-r from-azure to-amber rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className={`glass-intense rounded-2xl p-6 mb-8 border border-white/10 relative overflow-hidden transition-all duration-1000 delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-pulse"></div>
          <div className="flex items-center space-x-4 relative z-10">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-azure to-amber quantum-glow flex items-center justify-center floating">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-azure/20 to-amber/20 rounded-2xl blur-lg animate-pulse"></div>
            </div>
            <div>
              <span className="text-xl font-semibold text-holographic">Sanskar Yadav</span>
              <div className="flex items-center space-x-2 mt-1">
                <Zap className="w-3 h-3 text-quantum" />
                <span className="text-sm text-muted-foreground">Neural efficiency: 94%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className={`relative mb-8 transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-azure transition-colors" />
            <input
              type="text"
              placeholder="Search with neural intelligence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass-intense rounded-xl border border-white/10 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-azure/50 focus:border-azure/50 focus:glass transition-all duration-300 text-lg"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-azure/10 via-transparent to-amber/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        </div>

        {/* Enhanced Event Types List */}
        <div className="space-y-6">
          {filteredEventTypes.map((event, index) => (
            <div
              key={event.id}
              className={`glass-intense rounded-2xl p-6 border ${getBorderColor(event.color)} hover:border-${event.color}/50 transition-all duration-500 hover-glow group relative overflow-hidden ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ 
                animationDelay: `${(index + 4) * 200}ms`,
                background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`
              }}
            >
              {/* Animated Border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${event.color}/20 via-transparent to-${event.color}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Priority Indicator */}
              <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                event.priority === 'high' ? 'bg-pulse animate-pulse' :
                event.priority === 'medium' ? 'bg-amber animate-ping' : 'bg-quantum'
              }`}></div>

              <div className="flex items-start justify-between relative z-10">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className={`text-xl font-semibold text-foreground group-hover:${getAccentColor(event.color)} transition-colors duration-300`}>
                      {event.title}
                    </h3>
                    <span className="text-sm text-muted-foreground font-mono bg-black/20 px-2 py-1 rounded-lg border border-white/10">
                      {event.slug}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg group-hover:text-foreground/80 transition-colors">
                    {event.description}
                  </p>
                  
                  {/* Enhanced Duration Tags */}
                  <div className="flex items-center space-x-3">
                    {event.durations.map((duration, dIndex) => (
                      <div
                        key={duration}
                        className={`relative group/duration cursor-pointer transition-all duration-300 hover:scale-110`}
                        style={{ animationDelay: `${dIndex * 100}ms` }}
                      >
                        <span className={`px-4 py-2 glass rounded-xl text-sm font-medium border border-white/10 hover:border-${event.color}/50 transition-all duration-300 flex items-center space-x-2 hover:glass-intense`}>
                          <Clock className="w-3 h-3" />
                          <span>{duration}</span>
                        </span>
                        <div className={`absolute -inset-1 bg-gradient-to-r from-${event.color}/20 to-transparent rounded-xl opacity-0 group-hover/duration:opacity-100 transition-opacity blur`}></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 ml-8">
                  {/* Enhanced Toggle Switch */}
                  <div className="relative">
                    <div className={`relative w-14 h-7 rounded-full transition-all duration-500 cursor-pointer group/toggle ${
                      event.isActive ? `bg-${event.color} quantum-glow` : 'bg-muted'
                    }`}>
                      <div className={`absolute w-6 h-6 bg-white rounded-full top-0.5 transition-all duration-500 shadow-lg ${
                        event.isActive ? 'left-7' : 'left-0.5'
                      } group-hover/toggle:scale-110`}>
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-${event.color}/20 to-transparent opacity-0 group-hover/toggle:opacity-100 transition-opacity`}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Action Buttons */}
                  <div className="flex space-x-2">
                    {[
                      { icon: Link, color: 'azure' },
                      { icon: Copy, color: 'amber' },
                      { icon: MoreHorizontal, color: 'muted-foreground' }
                    ].map(({ icon: Icon, color }, btnIndex) => (
                      <Button
                        key={btnIndex}
                        variant="ghost"
                        size="icon"
                        className={`glass hover:glass-intense w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110 group/btn hover:border-${color}/30`}
                      >
                        <Icon className={`w-4 h-4 text-${color} group-hover/btn:scale-125 transition-transform`} />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        {/* Enhanced No Results */}
        {filteredEventTypes.length === 0 && (
          <div className="text-center py-16 relative">
            <div className="relative inline-block">
              <p className="text-muted-foreground text-xl">No quantum matches found</p>
              <div className="absolute -inset-4 bg-gradient-to-r from-azure/10 via-transparent to-amber/10 rounded-lg blur-lg"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
