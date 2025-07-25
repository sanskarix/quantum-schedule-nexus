import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

interface RecurringTabProps {
  isDarkMode: boolean;
}

const RecurringTab: React.FC<RecurringTabProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-lg border flex items-start space-x-3 ${isDarkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>
            Experimental: Recurring Events are currently experimental and causes some issues sometimes when checking for availability.
          </p>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>
            We are working on fixing this.
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recurring Event
          </Label>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            People can subscribe for recurring events
          </p>
        </div>
        <Switch className="data-[state=checked]:bg-[#007ee5]" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Repeats every</Label>
          <Select defaultValue="week">
            <SelectTrigger className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">day</SelectItem>
              <SelectItem value="week">week</SelectItem>
              <SelectItem value="month">month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>For a maximum of</Label>
          <div className="flex items-center space-x-2">
            <Input type="number" defaultValue="10" className="w-20" />
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>events</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringTab;