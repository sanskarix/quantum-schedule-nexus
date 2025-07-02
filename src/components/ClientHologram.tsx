
import { Mail, Phone, Calendar, MapPin, Star, Clock } from 'lucide-react';

interface ClientHologramProps {
  client: {
    id: number;
    client: string;
    type: string;
    avatar: string;
    status: string;
    time: string;
    duration: number;
    location: string;
  };
}

export const ClientHologram = ({ client }: ClientHologramProps) => {
  const mockClientData = {
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    timezone: 'PST (UTC-8)',
    rating: 4.9,
    totalMeetings: 12,
    lastMeeting: '2 weeks ago',
    notes: 'Interested in enterprise features. Previous demo went well.',
    preferences: ['Video calls', 'Morning slots', 'Detailed agendas']
  };

  return (
    <div className="animate-scale-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-holographic">Client Profile</h3>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-amber fill-current" />
          <span className="text-sm font-medium">{mockClientData.rating}</span>
        </div>
      </div>

      {/* Holographic Avatar */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-2xl glass-intense flex items-center justify-center text-3xl floating quantum-glow">
          {client.avatar}
        </div>
        <h4 className="text-xl font-semibold mt-3 text-holographic">
          {client.client}
        </h4>
        <p className="text-muted-foreground">{client.type}</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 mb-6">
        <div className="glass rounded-lg p-3 flex items-center space-x-3">
          <Mail className="w-4 h-4 text-azure" />
          <span className="text-sm">{mockClientData.email}</span>
        </div>
        
        <div className="glass rounded-lg p-3 flex items-center space-x-3">
          <Phone className="w-4 h-4 text-quantum" />
          <span className="text-sm">{mockClientData.phone}</span>
        </div>
        
        <div className="glass rounded-lg p-3 flex items-center space-x-3">
          <MapPin className="w-4 h-4 text-amber" />
          <span className="text-sm">{mockClientData.timezone}</span>
        </div>
      </div>

      {/* Meeting Stats */}
      <div className="glass rounded-lg p-4 mb-6">
        <h5 className="font-medium mb-3 text-holographic">Meeting History</h5>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold text-azure">{mockClientData.totalMeetings}</div>
            <div className="text-xs text-muted-foreground">Total Meetings</div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">{mockClientData.lastMeeting}</div>
            <div className="text-xs text-muted-foreground">Last Meeting</div>
          </div>
        </div>
      </div>

      {/* Current Appointment */}
      <div className="glass rounded-lg p-4 mb-6">
        <h5 className="font-medium mb-3 text-holographic">Current Appointment</h5>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{client.time} • {client.duration} min</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{client.type}</span>
          </div>
          <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${
            client.status === 'confirmed' 
              ? 'bg-quantum/20 text-quantum' 
              : 'bg-amber/20 text-amber'
          }`}>
            {client.status}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="glass rounded-lg p-4 mb-6">
        <h5 className="font-medium mb-3 text-holographic">Notes</h5>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {mockClientData.notes}
        </p>
      </div>

      {/* Preferences */}
      <div className="glass rounded-lg p-4">
        <h5 className="font-medium mb-3 text-holographic">Preferences</h5>
        <div className="flex flex-wrap gap-2">
          {mockClientData.preferences.map((pref, index) => (
            <span
              key={index}
              className="px-2 py-1 glass rounded-lg text-xs font-medium"
            >
              {pref}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
