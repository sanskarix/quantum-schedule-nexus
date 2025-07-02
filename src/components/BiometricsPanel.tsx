
import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'urgent',
    title: 'Client running late',
    message: 'Sarah Johnson - 5 min delay',
    priority: 'high',
    timestamp: '2 min ago'
  },
  {
    id: 2,
    type: 'success',
    title: 'Meeting confirmed',
    message: 'Emma Wilson confirmed 2PM slot',
    priority: 'medium',
    timestamp: '15 min ago'
  },
  {
    id: 3,
    type: 'info',
    title: 'Schedule optimization',
    message: '3 available slots detected',
    priority: 'low',
    timestamp: '1 hour ago'
  }
];

export const BiometricsPanel = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Simulate bio-rhythm pulse
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-pulse bg-pulse/10 text-pulse';
      case 'medium':
        return 'border-l-amber bg-amber/10 text-amber';
      case 'low':
        return 'border-l-azure bg-azure/10 text-azure';
      default:
        return 'border-l-muted bg-muted/10';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      case 'info':
        return Clock;
      default:
        return Bell;
    }
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-12 h-12 rounded-xl glass hover:glass-intense transition-all duration-300 flex items-center justify-center relative ${
          pulse ? 'quantum-glow scale-110' : ''
        }`}
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-pulse rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xs font-bold text-white">{unreadCount}</span>
          </div>
        )}

        {/* Bio-rhythm indicator */}
        <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${
          pulse ? 'border-pulse/50 scale-110' : 'border-transparent scale-100'
        }`} />
      </button>

      {/* Notifications Panel */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-80 glass-intense rounded-xl p-4 z-50 animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-holographic">Bio-Rhythm Alerts</h3>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Zap className="w-3 h-3" />
              <span>Live</span>
            </div>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);
              
              return (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border-l-4 transition-all duration-300 hover:glass cursor-pointer ${
                    getPriorityStyle(notification.priority)
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">
                        {notification.title}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {notification.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="border-t border-border/50 mt-4 pt-3 flex space-x-2">
            <button className="flex-1 glass rounded-lg py-2 text-sm hover-glow transition-all duration-300">
              Mark All Read
            </button>
            <button className="flex-1 glass rounded-lg py-2 text-sm hover-glow transition-all duration-300">
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
