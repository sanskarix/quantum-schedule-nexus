
import React, { useState } from 'react';
import { Clock, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

interface AvailabilityViewProps {
  isDarkMode: boolean;
}

const AvailabilityView: React.FC<AvailabilityViewProps> = ({ isDarkMode }) => {
  const [workingHours, setWorkingHours] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '09:00', end: '17:00' },
    sunday: { enabled: false, start: '09:00', end: '17:00' }
  });

  const schedules = [
    {
      id: 1,
      name: 'Working Hours',
      description: 'Default schedule for regular meetings',
      isDefault: true,
      timezone: 'Asia/Calcutta'
    },
    {
      id: 2,
      name: 'After Hours',
      description: 'Schedule for urgent meetings',
      isDefault: false,
      timezone: 'Asia/Calcutta'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Availability
        </h1>
        <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
          Configure when you're available for meetings.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Schedules
          </h2>
        </div>
        <Button className="bg-azure hover:bg-azure/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Schedule
        </Button>
      </div>

      <div className="grid gap-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className={`p-6 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {schedule.name}
                  </h3>
                  {schedule.isDefault && (
                    <span className="px-2 py-1 bg-azure/10 text-azure text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                  {schedule.description}
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                  Timezone: {schedule.timezone}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                </Button>
                {!schedule.isDefault && (
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(workingHours).map(([day, hours]: [string, any]) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 w-32">
                    <Switch
                      checked={hours.enabled}
                      onCheckedChange={(checked) => setWorkingHours({
                        ...workingHours,
                        [day]: { ...hours, enabled: checked }
                      })}
                      className="data-[state=checked]:bg-azure"
                    />
                    <span className={`text-sm capitalize transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                      {day}
                    </span>
                  </div>
                  {hours.enabled && (
                    <div className="flex items-center space-x-2">
                      <input 
                        type="time" 
                        value={hours.start}
                        onChange={(e) => setWorkingHours({
                          ...workingHours,
                          [day]: { ...hours, start: e.target.value }
                        })}
                        className={`px-2 py-1 border rounded text-sm transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                      />
                      <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>-</span>
                      <input 
                        type="time" 
                        value={hours.end}
                        onChange={(e) => setWorkingHours({
                          ...workingHours,
                          [day]: { ...hours, end: e.target.value }
                        })}
                        className={`px-2 py-1 border rounded text-sm transition-colors duration-300 ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
                      />
                    </div>
                  )}
                  {!hours.enabled && (
                    <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                      Unavailable
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityView;
