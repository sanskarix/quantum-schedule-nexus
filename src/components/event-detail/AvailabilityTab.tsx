import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

interface AvailabilityTabProps {
  eventData: any;
  setEventData: (data: any) => void;
  isDarkMode: boolean;
}

const AvailabilityTab: React.FC<AvailabilityTabProps> = ({ eventData, setEventData, isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Schedule</Label>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
        <Select defaultValue="working-hours">
          <SelectTrigger className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="working-hours">Working Hours - Default</SelectItem>
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
              {hours.enabled ? (
                <>
                  <Input 
                    type="time" 
                    value={hours.start}
                    className={`w-24 px-2 py-1 text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>-</span>
                  <Input 
                    type="time" 
                    value={hours.end}
                    className={`w-24 px-2 py-1 text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                  />
                </>
              ) : (
                <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Unavailable</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityTab;