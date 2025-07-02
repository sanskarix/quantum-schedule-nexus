
import { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Filter, Calendar, User, Clock } from 'lucide-react';

const mockSuggestions = [
  { type: 'client', icon: User, text: 'Sarah Johnson', category: 'Recent' },
  { type: 'event', icon: Calendar, text: 'Product Demo with Michael', category: 'Today' },
  { type: 'time', icon: Clock, text: 'Available slots this week', category: 'Schedule' },
  { type: 'client', icon: User, text: 'Emma Wilson interview prep', category: 'Upcoming' }
];

export const NeuralSearchHub = () => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      // Simulate AI-powered filtering
      const filtered = mockSuggestions.filter(item => 
        item.text.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(mockSuggestions);
    }
  }, [query]);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    // Delay to allow clicking on suggestions
    setTimeout(() => setIsActive(false), 200);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className={`relative glass rounded-2xl transition-all duration-300 ${
        isActive ? 'quantum-glow ring-2 ring-azure/30' : ''
      }`}>
        <div className="flex items-center p-4">
          <Search className={`w-5 h-5 mr-3 transition-colors duration-300 ${
            isActive ? 'text-azure' : 'text-muted-foreground'
          }`} />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Neural search across appointments, clients, and schedules..."
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none text-lg font-medium"
          />

          <div className="flex items-center space-x-2 ml-4">
            <button className="glass rounded-lg p-2 hover-glow transition-all duration-300">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
            
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-all duration-300 ${
              isActive ? 'bg-azure/20 text-azure' : 'glass text-muted-foreground'
            }`}>
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI</span>
            </div>
          </div>
        </div>

        {/* Neural indicator */}
        {isActive && (
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-azure to-transparent animate-pulse" />
        )}
      </div>

      {/* AI Suggestions Dropdown */}
      {isActive && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-intense rounded-xl p-2 z-50 animate-fade-in">
          <div className="text-xs text-muted-foreground px-3 py-2 flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>AI-powered suggestions</span>
          </div>
          
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:glass-intense transition-all duration-200 text-left group"
                onClick={() => {
                  setQuery(suggestion.text);
                  setIsActive(false);
                }}
              >
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:quantum-glow transition-all duration-300">
                  <suggestion.icon className="w-4 h-4 text-azure" />
                </div>
                
                <div className="flex-1">
                  <div className="font-medium text-foreground">{suggestion.text}</div>
                  <div className="text-xs text-muted-foreground">{suggestion.category}</div>
                </div>

                <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  ⏎
                </div>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="border-t border-border/50 mt-2 pt-2">
            <div className="text-xs text-muted-foreground px-3 py-1">Quick Actions</div>
            <div className="flex space-x-2 p-2">
              {['Today', 'This Week', 'Available', 'Pending'].map((action) => (
                <button
                  key={action}
                  className="px-3 py-1 rounded-lg glass hover:glass-intense text-sm transition-all duration-200 hover-glow"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
