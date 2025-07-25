import React from 'react';
import { Bold, Italic, Link, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface EventSetupTabProps {
  eventData: any;
  setEventData: (data: any) => void;
  isDarkMode: boolean;
}

const EventSetupTab: React.FC<EventSetupTabProps> = ({ eventData, setEventData, isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Title</Label>
        <Input 
          value={eventData.title}
          onChange={(e) => setEventData({...eventData, title: e.target.value})}
          className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        />
      </div>

      <div>
        <Label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Description</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm"><Bold className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><Italic className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><Link className="w-4 h-4" /></Button>
          </div>
          <Textarea 
            value={eventData.description}
            onChange={(e) => setEventData({...eventData, description: e.target.value})}
            rows={3}
            className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
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
        <Label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>URL</Label>
        <div className={`flex items-center border rounded-lg overflow-hidden ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <span className={`px-3 py-2 text-sm ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
            cal.id/sanskar
          </span>
          <Input
            value={eventData.url}
            onChange={(e) => setEventData({...eventData, url: e.target.value})}
            className={`border-0 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            style={{ boxShadow: 'none' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Duration</Label>
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
        
        <div>
          <Label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Allow booker to select duration</Label>
          <Switch
            checked={eventData.allowBookerToSelectDuration}
            onCheckedChange={(checked) => setEventData({...eventData, allowBookerToSelectDuration: checked})}
            className="data-[state=checked]:bg-[#007ee5]"
          />
        </div>
      </div>

      <div>
        <Label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Locations</Label>
        <div className={`p-4 border rounded-lg space-y-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          {eventData.locations.map((location: string, index: number) => (
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
};

export default EventSetupTab;