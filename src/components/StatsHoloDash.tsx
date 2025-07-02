
import { TrendingUp, Users, Calendar, Clock, Target, Zap } from 'lucide-react';

const mockStats = {
  todayMeetings: 4,
  weeklyMeetings: 23,
  completionRate: 94,
  avgDuration: 42,
  upcomingToday: 2,
  efficiency: 87
};

export const StatsHoloDash = () => {
  const stats = [
    {
      label: 'Today',
      value: mockStats.todayMeetings,
      icon: Calendar,
      color: 'azure',
      trend: '+12%'
    },
    {
      label: 'This Week',
      value: mockStats.weeklyMeetings,
      icon: Users,
      color: 'quantum',
      trend: '+8%'
    },
    {
      label: 'Completion',
      value: `${mockStats.completionRate}%`,
      icon: Target,
      color: 'amber',
      trend: '+3%'
    },
    {
      label: 'Avg Duration',
      value: `${mockStats.avgDuration}m`,
      icon: Clock,
      color: 'pulse',
      trend: '-5%'
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-holographic">Live Metrics</h3>
        <div className="flex items-center space-x-1 text-xs text-quantum">
          <Zap className="w-3 h-3" />
          <span>Real-time</span>
        </div>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="glass rounded-xl p-4 hover-glow transition-all duration-300 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg glass-intense flex items-center justify-center text-${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                </div>
              </div>
              
              <div className={`text-xs font-medium px-2 py-1 rounded-lg ${
                stat.trend.startsWith('+') 
                  ? 'bg-quantum/20 text-quantum' 
                  : 'bg-pulse/20 text-pulse'
              }`}>
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Efficiency Meter */}
      <div className="glass rounded-xl p-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground">Neural Efficiency</span>
          <span className="text-lg font-bold text-holographic">{mockStats.efficiency}%</span>
        </div>
        
        <div className="relative">
          <div className="w-full h-2 glass rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-azure via-quantum to-amber transition-all duration-1000 quantum-glow"
              style={{ width: `${mockStats.efficiency}%` }}
            />
          </div>
          <div className="absolute right-0 top-0 w-2 h-2 bg-amber rounded-full animate-pulse" />
        </div>
      </div>

      {/* Quick Insights */}
      <div className="glass rounded-xl p-4 mt-4">
        <h4 className="font-medium mb-3 text-holographic">AI Insights</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-quantum rounded-full"></div>
            <span className="text-muted-foreground">Peak productivity: 2-4 PM</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-amber rounded-full"></div>
            <span className="text-muted-foreground">3 optimal slots available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-azure rounded-full"></div>
            <span className="text-muted-foreground">Client satisfaction: High</span>
          </div>
        </div>
      </div>
    </div>
  );
};
