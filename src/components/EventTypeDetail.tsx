
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
    { name: 'Basecamp3', category: 'Other', icon: 'https://cal.id/app-store/basecamp3/icon-dark.svg' },
    { name: 'Close.com', category: 'CRM', icon: 'https://cal.id/app-store/closecom/icon.svg' },
    { name: 'Fathom', category: 'Analytics', icon: 'https://cal.id/app-store/fathom/icon.svg' },
    { name: 'Google Analytics', category: 'Analytics', icon: 'https://cal.id/app-store/ga4/icon.svg' },
    { name: 'Stripe', category: 'Payment', icon: 'https://cal.id/app-store/stripepayment/icon.svg' },
    { name: 'Razorpay', category: 'Payment', icon: 'https://cal.id/app-store/razorpay/icon.png' }
  ];

  const renderEventSetup = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Title</label>
        <input 
          type="text" 
          value={eventData.title}
          onChange={(e) => setEventData({...eventData, title: e.target.value})}
          className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure`}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Description</label>
        <textarea 
          value={eventData.description}
          onChange={(e) => setEventData({...eventData, description: e.target.value})}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure`}
        />
        <div className="flex items-center mt-2 space-x-2">
          <Switch
            checked={eventData.translateDescription}
            onCheckedChange={(checked) => setEventData({...eventData, translateDescription: checked})}
            className="data-[state=checked]:bg-azure"
          />
          <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
            Translate description to the visitor's browser language using AI
          </span>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>URL</label>
        <div className={`px-3 py-2 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/10 border-[#818181]/20 text-[#818181]' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>
          cal.id/sanskar/{eventData.url.split('/').pop()}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Available durations</label>
        <div className="flex space-x-2">
          {eventData.durations.map((duration: string) => (
            <span key={duration} className={`px-3 py-1 border rounded-lg text-sm transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/10 border-[#818181]/20 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'}`}>
              {duration}
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Default duration</label>
        <select 
          value={eventData.defaultDuration}
          onChange={(e) => setEventData({...eventData, defaultDuration: e.target.value})}
          className={`px-3 py-2 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
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
          <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
            Allow booker to select duration
          </span>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Location</label>
        <div className={`p-4 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'border-[#818181]/20' : 'border-gray-300'}`}>
          <div className="flex items-center space-x-3 mb-3">
            <img src="https://cal.id/app-store/googlevideo/logo.webp" alt="Google Meet" className="w-8 h-8" />
            <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Google Meet</span>
          </div>
          <Button variant="outline" size="sm">
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
        <h3 className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Working Hours - Default</h3>
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
                <span className={`text-sm capitalize transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
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
                    className={`px-2 py-1 border rounded text-sm transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                  />
                  <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>-</span>
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
                    className={`px-2 py-1 border rounded text-sm transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
            Time zone - {eventData.timezone}
          </span>
        </div>
      </div>
    </div>
  );

  const renderApps = () => (
    <div className="space-y-6">
      <div className={`text-center py-8 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
        <p className="mb-4">NO APPS ADDED YET</p>
        <h3 className={`font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Available apps</h3>
        <p className="text-sm">View popular apps below and explore more in our App Store</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => (
          <div key={app.name} className={`p-4 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'border-[#818181]/20 hover:bg-[#818181]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
            <div className="flex items-center space-x-3 mb-2">
              <img src={app.icon} alt={app.name} className="w-8 h-8" />
              <div>
                <h4 className={`font-medium text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.name}</h4>
                <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>{app.category}</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full">Add</Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'setup':
        return renderEventSetup();
      case 'availability':
        return renderAvailability();
      case 'apps':
        return renderApps();
      case 'limits':
        return <div className={`text-center py-8 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>Limits configuration coming soon...</div>;
      case 'workflows':
        return <div className={`text-center py-8 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>Workflows configuration coming soon...</div>;
      case 'insights':
        return <div className={`text-center py-8 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>Insights coming soon...</div>;
      default:
        return renderEventSetup();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className={`transition-colors duration-300 ${isDarkMode ? 'text-[#818181] hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {eventData.title}
            </h1>
            <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
              Configure your event type settings
            </p>
          </div>
        </div>
        
        <Button className="bg-azure hover:bg-azure/90 text-white">
          Save Changes
        </Button>
      </div>

      {/* Tabs */}
      <div className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-[#818181]/20' : 'border-gray-200'}`}>
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'border-azure text-azure'
                    : `border-transparent ${isDarkMode ? 'text-[#818181] hover:text-white' : 'text-gray-500 hover:text-gray-700'}`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className={`rounded-xl p-6 border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EventTypeDetail;
