
import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Plus, Settings, Users, Calendar, Globe, Zap, Shield, Target, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

interface EventTypeDetailProps {
  event: any;
  onBack: () => void;
  isDarkMode: boolean;
}

const EventTypeDetail: React.FC<EventTypeDetailProps> = ({ event, onBack, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('setup');
  const [saved, setSaved] = useState(false);
  const [eventData, setEventData] = useState({
    title: event.title,
    description: event.description,
    url: event.slug,
    durations: event.durations,
    defaultDuration: event.durations[0],
    allowBookerToSelectDuration: true,
    translateDescription: false,
    location: 'Google Meet',
    workingHours: {
      monday: { enabled: true, start: '09:00', end: '17:00' },
      tuesday: { enabled: true, start: '09:00', end: '17:00' },
      wednesday: { enabled: true, start: '09:00', end: '17:00' },
      thursday: { enabled: true, start: '09:00', end: '17:00' },
      friday: { enabled: true, start: '09:00', end: '17:00' },
      saturday: { enabled: false, start: '09:00', end: '17:00' },
      sunday: { enabled: false, start: '09:00', end: '17:00' }
    },
    timezone: 'Asia/Calcutta',
    limits: {
      beforeEvent: 0,
      afterEvent: 0,
      minimumNotice: 0,
      timeSlotIntervals: 'default',
      limitBookingFrequency: false,
      oneSlotPerDay: false,
      limitTotalDuration: false,
      limitFutureBookings: false,
      offsetStartTimes: 0
    }
  });

  const tabs = [
    { id: 'setup', label: 'Event Setup', icon: Settings },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'limits', label: 'Limits', icon: Shield },
    { id: 'apps', label: 'Apps', icon: Zap },
    { id: 'workflows', label: 'Workflows', icon: Target },
    { id: 'insights', label: 'Insights', icon: BarChart3 }
  ];

  const apps = [
    { name: 'Basecamp3', category: 'Other', icon: 'https://cal.id/app-store/basecamp3/icon-dark.svg', installed: false },
    { name: 'Close.com', category: 'CRM', icon: 'https://cal.id/app-store/closecom/icon.svg', installed: false },
    { name: 'Fathom', category: 'Analytics', icon: 'https://cal.id/app-store/fathom/icon.svg', installed: false },
    { name: 'Google Analytics', category: 'Analytics', icon: 'https://cal.id/app-store/ga4/icon.svg', installed: true },
    { name: 'Stripe', category: 'Payment', icon: 'https://cal.id/app-store/stripepayment/icon.svg', installed: true },
    { name: 'Razorpay', category: 'Payment', icon: 'https://cal.id/app-store/razorpay/icon.png', installed: false }
  ];

  const [installedApps, setInstalledApps] = useState(apps);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleInstallApp = (appName: string) => {
    setInstalledApps(prev => prev.map(app => 
      app.name === appName ? { ...app, installed: !app.installed } : app
    ));
  };

  const renderEventSetup = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Title</label>
        <input 
          type="text" 
          value={eventData.title}
          onChange={(e) => setEventData({...eventData, title: e.target.value})}
          className={`w-full px-3 py-2 border rounded-lg transition-all duration-500 focus:scale-102 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure`}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Description</label>
        <textarea 
          value={eventData.description}
          onChange={(e) => setEventData({...eventData, description: e.target.value})}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg transition-all duration-500 focus:scale-102 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure`}
        />
        <div className="flex items-center mt-2 space-x-2">
          <Switch
            checked={eventData.translateDescription}
            onCheckedChange={(checked) => setEventData({...eventData, translateDescription: checked})}
            className="data-[state=checked]:bg-azure"
          />
          <span className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
            Translate description to the visitor's browser language using AI
          </span>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>URL</label>
        <div className={`px-3 py-2 border rounded-lg transition-colors duration-500 ${isDarkMode ? 'bg-[#818181]/10 border-[#818181]/20 text-[#818181]' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>
          cal.id/sanskar/{eventData.url.split('/').pop()}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Available durations</label>
        <div className="flex space-x-2">
          {eventData.durations.map((duration: string) => (
            <span key={duration} className={`px-3 py-1 border rounded-lg text-sm transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-[#818181]/10 border-[#818181]/20 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`}>
              {duration}
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Default duration</label>
        <select 
          value={eventData.defaultDuration}
          onChange={(e) => setEventData({...eventData, defaultDuration: e.target.value})}
          className={`px-3 py-2 border rounded-lg transition-all duration-500 focus:scale-102 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        >
          {eventData.durations.map((duration: string) => (
            <option key={duration} value={duration}>{duration}</option>
          ))}
        </select>
        <div className="flex items-center mt-2 space-x-2">
          <Switch
            checked={eventData.allowBookerToSelectDuration}
            onCheckedChange={(checked) => setEventData({...eventData, allowBookerToSelectDuration: checked})}
            className="data-[state=checked]:bg-azure"
          />
          <span className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
            Allow booker to select duration
          </span>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Location</label>
        <div className={`p-4 border rounded-lg transition-colors duration-500 ${isDarkMode ? 'border-[#818181]/20' : 'border-gray-300'}`}>
          <div className="flex items-center space-x-3 mb-3">
            <img src="https://cal.id/app-store/googlevideo/logo.webp" alt="Google Meet" className="w-8 h-8" />
            <span className={`font-medium transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Google Meet</span>
          </div>
          <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            Add a location
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAvailability = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`font-medium mb-4 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Working Hours - Default</h3>
        <div className="space-y-3">
          {Object.entries(eventData.workingHours).map(([day, hours]: [string, any]) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 w-32">
                <Switch
                  checked={hours.enabled}
                  onCheckedChange={(checked) => setEventData({
                    ...eventData,
                    workingHours: {
                      ...eventData.workingHours,
                      [day]: { ...hours, enabled: checked }
                    }
                  })}
                  className="data-[state=checked]:bg-azure"
                />
                <span className={`text-sm capitalize transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                  {day}
                </span>
              </div>
              {hours.enabled && (
                <>
                  <input 
                    type="time" 
                    value={hours.start}
                    onChange={(e) => setEventData({
                      ...eventData,
                      workingHours: {
                        ...eventData.workingHours,
                        [day]: { ...hours, start: e.target.value }
                      }
                    })}
                    className={`px-2 py-1 border rounded text-sm transition-all duration-500 focus:scale-105 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                  />
                  <span className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>-</span>
                  <input 
                    type="time" 
                    value={hours.end}
                    onChange={(e) => setEventData({
                      ...eventData,
                      workingHours: {
                        ...eventData.workingHours,
                        [day]: { ...hours, end: e.target.value }
                      }
                    })}
                    className={`px-2 py-1 border rounded text-sm transition-all duration-500 focus:scale-105 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <span className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
            Time zone - {eventData.timezone}
          </span>
        </div>
      </div>
    </div>
  );

  const renderLimits = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Before event</label>
          <select className={`w-full px-3 py-2 border rounded-lg transition-all duration-500 focus:scale-102 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
            <option>No buffer time</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>After event</label>
          <select className={`w-full px-3 py-2 border rounded-lg transition-all duration-500 focus:scale-102 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
            <option>No buffer time</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Minimum Notice</label>
          <input 
            type="number" 
            placeholder="Hours"
            className={`w-full px-3 py-2 border rounded-lg transition-all duration-500 focus:scale-102 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Time-slot intervals</label>
          <select className={`w-full px-3 py-2 border rounded-lg transition-all duration-500 focus:scale-102 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
            <option>Use event length (default)</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {[
          { key: 'limitBookingFrequency', label: 'Limit booking frequency', desc: 'Limit how many times this event can be booked' },
          { key: 'oneSlotPerDay', label: 'Only show the first slot of each day as available', desc: 'This will limit your availability for this event type to one slot per day' },
          { key: 'limitTotalDuration', label: 'Limit total booking duration', desc: 'Limit total amount of time that this event can be booked' },
          { key: 'limitFutureBookings', label: 'Limit future bookings', desc: 'Limit how far in the future this event can be booked' }
        ].map((setting) => (
          <div key={setting.key} className="flex items-start space-x-3">
            <Switch
              checked={eventData.limits[setting.key as keyof typeof eventData.limits] as boolean}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                limits: { ...eventData.limits, [setting.key]: checked }
              })}
              className="data-[state=checked]:bg-azure mt-1"
            />
            <div>
              <label className={`font-medium transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {setting.label}
              </label>
              <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                {setting.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApps = () => (
    <div className="space-y-6">
      <div className={`text-center py-8 transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
        <h3 className={`font-medium mb-4 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {installedApps.filter(app => app.installed).length > 0 ? 'Installed Apps' : 'NO APPS ADDED YET'}
        </h3>
        {installedApps.filter(app => app.installed).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {installedApps.filter(app => app.installed).map((app) => (
              <div key={app.name} className={`p-4 border rounded-lg transition-all duration-300 hover:scale-105 ${isDarkMode ? 'border-[#818181]/20 hover:bg-[#818181]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="flex items-center space-x-3 mb-2">
                  <img src={app.icon} alt={app.name} className="w-8 h-8" />
                  <div>
                    <h4 className={`font-medium text-sm transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.name}</h4>
                    <span className={`text-xs transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>{app.category}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full transition-all duration-300 hover:scale-105"
                  onClick={() => handleInstallApp(app.name)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
        <h3 className={`font-medium mb-4 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Available apps</h3>
        <p className="text-sm">View popular apps below and explore more in our App Store</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {installedApps.filter(app => !app.installed).map((app) => (
          <div key={app.name} className={`p-4 border rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'border-[#818181]/20 hover:bg-[#818181]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
            <div className="flex items-center space-x-3 mb-2">
              <img src={app.icon} alt={app.name} className="w-8 h-8" />
              <div>
                <h4 className={`font-medium text-sm transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.name}</h4>
                <span className={`text-xs transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>{app.category}</span>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full transition-all duration-300 hover:scale-105 bg-azure/10 hover:bg-azure/20 text-azure border-azure/30"
              onClick={() => handleInstallApp(app.name)}
            >
              Install
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWorkflows = () => (
    <div className="space-y-6">
      <div className={`text-center py-8 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
        <h3 className={`font-medium mb-4 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Workflows</h3>
        <p className="text-sm mb-6">Automate your scheduling process with custom workflows</p>
        <Button className="bg-azure hover:bg-azure/90 text-white transition-all duration-300 hover:scale-105">
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-2xl font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>24</h3>
          <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>Total Bookings</p>
        </div>
        <div className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-2xl font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3.2h</h3>
          <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>Average Duration</p>
        </div>
        <div className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-2xl font-bold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>89%</h3>
          <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>Completion Rate</p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'setup': return renderEventSetup();
      case 'availability': return renderAvailability();
      case 'limits': return renderLimits();
      case 'apps': return renderApps();
      case 'workflows': return renderWorkflows();
      case 'insights': return renderInsights();
      default: return renderEventSetup();
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className={`transition-all duration-300 hover:scale-110 ${isDarkMode ? 'text-[#818181] hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className={`text-2xl font-semibold transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {eventData.title}
            </h1>
            <p className={`text-sm mt-1 transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
              Configure your event type settings
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleSave}
          className={`transition-all duration-300 hover:scale-105 ${saved ? 'bg-green-600' : 'bg-azure hover:bg-azure/90'} text-white`}
        >
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <div className={`border-b transition-colors duration-500 ${isDarkMode ? 'border-[#818181]/20' : 'border-gray-200'}`}>
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-azure text-azure scale-105'
                    : `border-transparent ${isDarkMode ? 'text-[#818181] hover:text-white' : 'text-gray-500 hover:text-gray-700'} hover:scale-102`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className={`rounded-xl p-6 border transition-all duration-500 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EventTypeDetail;
