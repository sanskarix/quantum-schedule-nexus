
import { useState } from 'react';
import { Search, Mic, Calendar, Users, TrendingUp, Clock, Plus, Settings, Bell, User } from 'lucide-react';
import { HolographicSchedule } from '../components/HolographicSchedule';
import { QuantumActionBar } from '../components/QuantumActionBar';
import { NeuralSearchHub } from '../components/NeuralSearchHub';
import { BiometricsPanel } from '../components/BiometricsPanel';
import { ClientHologram } from '../components/ClientHologram';
import { StatsHoloDash } from '../components/StatsHoloDash';

const Index = () => {
  const [activeView, setActiveView] = useState('schedule');
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-carbon via-slate-900 to-carbon grid-8">
      {/* Neural Navigation Sidebar */}
      <div className="fixed left-0 top-0 h-full w-20 glass-intense z-50 flex flex-col items-center py-6 space-y-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-azure to-amber flex items-center justify-center quantum-glow">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        
        <nav className="flex flex-col space-y-4">
          {[
            { icon: Calendar, id: 'schedule', active: activeView === 'schedule' },
            { icon: Users, id: 'clients', active: activeView === 'clients' },
            { icon: TrendingUp, id: 'analytics', active: activeView === 'analytics' },
            { icon: Settings, id: 'settings', active: activeView === 'settings' }
          ].map(({ icon: Icon, id, active }) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover-glow ${
                active 
                  ? 'glass-intense quantum-glow text-azure' 
                  : 'glass hover:glass-intense text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button className="w-12 h-12 rounded-xl glass hover:glass-intense transition-all duration-300 flex items-center justify-center hover-glow">
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Main Dashboard Container */}
      <div className="ml-20 p-8">
        {/* Neural Search Hub */}
        <div className="mb-8">
          <NeuralSearchHub />
        </div>

        {/* Quantum Action Bar */}
        <div className="fixed top-8 right-8 z-40">
          <QuantumActionBar />
        </div>

        {/* Bio-Rhythm Notifications */}
        <div className="fixed top-8 right-32 z-40">
          <BiometricsPanel />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 h-[calc(100vh-12rem)]">
          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-6">
            {/* Header */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-holographic mb-2">
                    Mission Control
                  </h1>
                  <p className="text-muted-foreground">
                    Today • {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="glass rounded-xl px-4 py-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-quantum rounded-full animate-pulse"></div>
                    <span className="text-sm text-quantum font-medium">Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Holographic Schedule View */}
            <div className="glass rounded-2xl p-6 h-full animate-scale-in">
              <HolographicSchedule onClientSelect={setSelectedClient} />
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Stats Dashboard */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <StatsHoloDash />
            </div>

            {/* Client Profile Hologram */}
            {selectedClient && (
              <div className="glass rounded-2xl p-6 animate-scale-in">
                <ClientHologram client={selectedClient} />
              </div>
            )}

            {/* Quick Actions */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4 text-holographic">
                Quick Launch
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'New Appointment', color: 'azure', icon: Plus },
                  { label: 'Client Check-in', color: 'quantum', icon: Users },
                  { label: 'Time Block', color: 'amber', icon: Clock }
                ].map(({ label, color, icon: Icon }) => (
                  <button
                    key={label}
                    className={`w-full glass rounded-xl p-3 flex items-center space-x-3 hover-glow transition-all duration-300 hover:bg-${color}/10`}
                  >
                    <Icon className={`w-5 h-5 text-${color}`} />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
