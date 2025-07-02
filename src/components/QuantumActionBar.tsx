
import { useState } from 'react';
import { Plus, Mic, Calendar, Users, Settings, Zap } from 'lucide-react';

export const QuantumActionBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const actions = [
    { icon: Calendar, label: 'New Event', color: 'azure' },
    { icon: Users, label: 'Add Client', color: 'quantum' },
    { icon: Settings, label: 'Settings', color: 'muted-foreground' },
    { icon: Zap, label: 'Quick Action', color: 'amber' }
  ];

  return (
    <div className="relative">
      {/* Main Action Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-azure to-amber quantum-glow floating flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <Plus className={`w-6 h-6 text-white transition-transform duration-300 ${
          isExpanded ? 'rotate-45' : ''
        }`} />
      </button>

      {/* Voice Input Toggle */}
      <button
        onClick={() => setIsVoiceActive(!isVoiceActive)}
        className={`absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass transition-all duration-300 flex items-center justify-center ${
          isVoiceActive ? 'quantum-glow bg-pulse/20' : 'hover-glow'
        }`}
      >
        <Mic className={`w-5 h-5 ${
          isVoiceActive ? 'text-pulse animate-pulse' : 'text-muted-foreground'
        }`} />
      </button>

      {/* Radial Menu */}
      {isExpanded && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {actions.map((action, index) => {
            const angle = (index * 90) - 135; // Position around the circle
            const radius = 80;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <button
                key={action.label}
                className="absolute w-12 h-12 rounded-full glass hover:glass-intense transition-all duration-300 flex items-center justify-center hover-glow animate-scale-in group"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  animationDelay: `${index * 0.1}s`
                }}
                title={action.label}
              >
                <action.icon className={`w-5 h-5 text-${action.color}`} />
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 px-2 py-1 bg-carbon/90 backdrop-blur-sm text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {action.label}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Context-sensitive indicator */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber rounded-full flex items-center justify-center animate-pulse">
        <span className="text-xs font-bold text-carbon">3</span>
      </div>
    </div>
  );
};
