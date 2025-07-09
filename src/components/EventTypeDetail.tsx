import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Plus, Settings, Users, Calendar, Globe, Zap, Shield, Target, BarChart3, Bold, Italic, Link, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
    duration: '30',
    allowBookerToSelectDuration: true,
    translateDescription: false,
    locations: ['Google Meet'],
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
    { id: 'advanced', label: 'Advanced', icon: BarChart3 },
    { id: 'recurring', label: 'Recurring', icon: Calendar }
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const renderEventSetup = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Title</label>
        <input 
          type="text" 
          value={eventData.title}
          onChange={(e) => setEventData({...eventData, title: e.target.value})}
          className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Description</label>
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <Button variant="ghost" size="sm"><Bold className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><Italic className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><Link className="w-4 h-4" /></Button>
          </div>
          <textarea 
            value={eventData.description}
            onChange={(e) => setEventData({...eventData, description: e.target.value})}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>
        <div className="flex items-center mt-2 space-x-2">
          <Switch
            checked={eventData.translateDescription}
            onCheckedChange={(checked) => setEventData({...eventData, translateDescription: checked})}
            className="data-[state=checked]:bg-[#007ee5]"
          />
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Translate description to the visitor's browser language using AI
          </span>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>URL</label>
        <div className={`flex items-center border rounded-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <span className={`px-3 py-2 text-sm ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'} border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            cal.id/sanskar/
          </span>
          <input
            type="text"
            value={eventData.url.replace('/', '')}
            onChange={(e) => setEventData({...eventData, url: '/' + e.target.value})}
            className={`flex-1 px-3 py-2 bg-transparent outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Duration</label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={eventData.duration}
              onChange={(e) => setEventData({...eventData, duration: e.target.value})}
              className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
            />
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>minutes</span>
          </div>
        </div>
        
        <div className="flex items-end">
          <div className="flex items-center space-x-2">
            <Switch
              checked={eventData.allowBookerToSelectDuration}
              onCheckedChange={(checked) => setEventData({...eventData, allowBookerToSelectDuration: checked})}
              className="data-[state=checked]:bg-[#007ee5]"
            />
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Allow booker to select duration
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Locations</label>
        <div className={`p-4 border rounded-lg space-y-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          {eventData.locations.map((location, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img src="https://cal.id/app-store/googlevideo/logo.webp" alt="Google Meet" className="w-8 h-8" />
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location}</span>
            </div>
          ))}
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add a location
          </Button>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Can't find the right conferencing app? Visit our <a href="#" className="text-[#007ee5] hover:underline">App Store</a>
          </p>
        </div>
      </div>
    </div>
  );

  const renderAvailability = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Schedule</h3>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
        <Select defaultValue="default">
          <SelectTrigger className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            <SelectValue placeholder="Select schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Working Hours - Default</SelectItem>
            <SelectItem value="custom">Custom Schedule</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="mt-4 space-y-3">
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
                  className="data-[state=checked]:bg-[#007ee5]"
                />
                <span className={`text-sm capitalize ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {day}
                </span>
              </div>
              {hours.enabled && (
                <>
                  <input 
                    type="time" 
                    value={hours.start}
                    className={`px-2 py-1 border rounded text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>-</span>
                  <input 
                    type="time" 
                    value={hours.end}
                    className={`px-2 py-1 border rounded text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLimits = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Before event</label>
          <select className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
            <option>No buffer time</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>After event</label>
          <select className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
            <option>No buffer time</option>
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
          <div key={setting.key} className="space-y-2">
            <div className="flex items-start space-x-3">
              <Switch
                checked={eventData.limits[setting.key as keyof typeof eventData.limits] as boolean}
                onCheckedChange={(checked) => setEventData({
                  ...eventData,
                  limits: { ...eventData.limits, [setting.key]: checked }
                })}
                className="data-[state=checked]:bg-[#007ee5] mt-1"
              />
              <div>
                <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {setting.label}
                </label>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {setting.desc}
                </p>
              </div>
            </div>
            
            {eventData.limits[setting.key as keyof typeof eventData.limits] && (
              <div className="ml-8 space-y-2">
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="1" className="w-20" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {setting.key === 'limitBookingFrequency' ? 'Per day' : 
                     setting.key === 'limitTotalDuration' ? 'Minutes' :
                     setting.key === 'limitFutureBookings' ? 'Days' : ''}
                  </span>
                </div>
                <Button variant="outline" size="sm">Add Limit</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderWorkflows = () => (
    <div className="space-y-6">
      <div>
        <Select>
          <SelectTrigger className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            <SelectValue placeholder="Select workflow" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reminder">Email Reminder</SelectItem>
            <SelectItem value="confirmation">Booking Confirmation</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="mt-2">
          Edit workflows
        </Button>
      </div>
    </div>
  );

  const renderAdvanced = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Requires confirmation
              </label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                The booking needs to be manually confirmed
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-[#007ee5]" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Enable captcha
              </label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Prevent automated bots from booking
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-[#007ee5]" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Requires email verification
              </label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Ensure booker's email verification
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-[#007ee5]" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Hide notes in calendar
              </label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Hide additional inputs in calendar entry
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-[#007ee5]" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Lock timezone
              </label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Lock timezone on booking page
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-[#007ee5]" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Offer seats
              </label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Allow multiple people to book the same slot
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-[#007ee5]" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecurring = () => (
    <div className="space-y-6">
      <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
        <p className={`text-sm font-medium ${isDarkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>
          Experimental: Recurring Events are currently experimental and causes some issues sometimes when checking for availability.
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recurring Event
          </label>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            People can subscribe for recurring events
          </p>
        </div>
        <Switch className="data-[state=checked]:bg-[#007ee5]" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Repeats every</label>
          <select className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
            <option>week</option>
            <option>month</option>
            <option>day</option>
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>For a maximum of</label>
          <div className="flex items-center space-x-2">
            <Input type="number" defaultValue="10" className="w-20" />
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>events</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'setup': return renderEventSetup();
      case 'availability': return renderAvailability();
      case 'limits': return renderLimits();
      case 'apps': return <div className="text-center py-8">Apps configuration coming soon</div>;
      case 'workflows': return renderWorkflows();
      case 'advanced': return renderAdvanced();
      case 'recurring': return renderRecurring();
      default: return renderEventSetup();
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {eventData.title}
              </h1>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Configure your event type settings
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleSave}
            className={`${saved ? 'bg-green-600' : 'bg-[#007ee5] hover:bg-[#0066cc]'} text-white`}
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>

        <div className={`border-b mb-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#007ee5] text-[#007ee5]'
                      : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className={`rounded-xl p-8 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default EventTypeDetail;