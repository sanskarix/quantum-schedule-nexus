
import { useState } from 'react';
import { Clock, User, Video, MapPin, MoreVertical } from 'lucide-react';

const mockAppointments = [
  {
    id: 1,
    time: '09:00',
    duration: 30,
    client: 'Sarah Johnson',
    type: 'Product Demo',
    status: 'confirmed',
    avatar: '👩‍💼',
    color: 'azure',
    location: 'Virtual'
  },
  {
    id: 2,
    time: '10:30',
    duration: 45,
    client: 'Michael Chen',
    type: 'Interview',
    status: 'pending',
    avatar: '👨‍💻',
    color: 'amber',
    location: 'Office'
  },
  {
    id: 3,
    time: '14:00',
    duration: 60,
    client: 'Emma Wilson',
    type: 'Product Hunt Chat',
    status: 'confirmed',
    avatar: '👩‍🎨',
    color: 'quantum',
    location: 'Virtual'
  },
  {
    id: 4,
    time: '16:00',
    duration: 30,
    client: 'David Park',
    type: 'Everything Else',
    status: 'confirmed',
    avatar: '👨‍🚀',
    color: 'pulse',
    location: 'Phone'
  }
];

interface HolographicScheduleProps {
  onClientSelect: (client: any) => void;
}

export const HolographicSchedule = ({ onClientSelect }: HolographicScheduleProps) => {
  const [hoveredAppointment, setHoveredAppointment] = useState<number | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'border-l-quantum bg-quantum/5';
      case 'pending':
        return 'border-l-amber bg-amber/5 opacity-75';
      default:
        return 'border-l-muted bg-muted/5';
    }
  };

  const getColorClass = (color: string) => {
    const colors = {
      azure: 'text-azure',
      amber: 'text-amber',
      quantum: 'text-quantum',
      pulse: 'text-pulse'
    };
    return colors[color as keyof typeof colors] || 'text-foreground';
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-holographic">
          Holographic Schedule
        </h2>
        <div className="flex items-center space-x-2">
          <button className="glass rounded-lg px-3 py-1 text-sm hover-glow transition-all duration-300">
            Today
          </button>
          <button className="glass rounded-lg px-3 py-1 text-sm hover-glow transition-all duration-300">
            Week
          </button>
        </div>
      </div>

      {/* Time Grid */}
      <div className="relative">
        {/* Hour markers */}
        <div className="absolute left-0 top-0 bottom-0 w-16 space-y-16">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="text-xs text-muted-foreground font-mono">
              {String(9 + i * 2).padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {/* Schedule container */}
        <div className="ml-20 space-y-4">
          {mockAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`
                relative glass rounded-xl p-4 border-l-4 transition-all duration-300 cursor-pointer
                ${getStatusStyle(appointment.status)}
                ${hoveredAppointment === appointment.id ? 'quantum-glow scale-[1.02] z-10' : ''}
              `}
              onMouseEnter={() => setHoveredAppointment(appointment.id)}
              onMouseLeave={() => setHoveredAppointment(null)}
              onClick={() => onClientSelect(appointment)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-xl glass-intense flex items-center justify-center text-xl floating">
                    {appointment.avatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {appointment.client}
                      </h3>
                      <span className={`text-sm font-medium ${getColorClass(appointment.color)}`}>
                        {appointment.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time} • {appointment.duration}min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {appointment.location === 'Virtual' ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <button className="glass rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity hover-glow">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Hover expansion */}
              {hoveredAppointment === appointment.id && (
                <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Status</span>
                      <div className={`capitalize font-medium ${
                        appointment.status === 'confirmed' ? 'text-quantum' : 'text-amber'
                      }`}>
                        {appointment.status}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration</span>
                      <div className="font-medium">{appointment.duration} min</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type</span>
                      <div className="font-medium">{appointment.type}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
