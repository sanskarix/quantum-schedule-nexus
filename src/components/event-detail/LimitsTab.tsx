import React from 'react';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface LimitsTabProps {
  eventData: any;
  setEventData: (data: any) => void;
  isDarkMode: boolean;
}

const LimitsTab: React.FC<LimitsTabProps> = ({ eventData, setEventData, isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Before event</Label>
          <Select defaultValue="0">
            <SelectTrigger className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No buffer time</SelectItem>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>After event</Label>
          <Select defaultValue="0">
            <SelectTrigger className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No buffer time</SelectItem>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Limit booking frequency */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Switch
              checked={eventData.limits.limitBookingFrequency}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                limits: { ...eventData.limits, limitBookingFrequency: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5] mt-1"
            />
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Limit booking frequency
              </Label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Limit how many times this event can be booked
              </p>
            </div>
          </div>
          
          {eventData.limits.limitBookingFrequency && (
            <div className="ml-8 space-y-2">
              <div className="flex items-center space-x-2">
                <Input type="number" placeholder="1" className="w-20" />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Per day</span>
              </div>
              <Button variant="outline" size="sm">Add Limit</Button>
            </div>
          )}
        </div>

        {/* Only show first slot */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Switch
              checked={eventData.limits.oneSlotPerDay}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                limits: { ...eventData.limits, oneSlotPerDay: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5] mt-1"
            />
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Only show the first slot of each day as available
              </Label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.
              </p>
            </div>
          </div>
        </div>

        {/* Limit total duration */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Switch
              checked={eventData.limits.limitTotalDuration}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                limits: { ...eventData.limits, limitTotalDuration: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5] mt-1"
            />
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Limit total booking duration
              </Label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Limit total amount of time that this event can be booked
              </p>
            </div>
          </div>
          
          {eventData.limits.limitTotalDuration && (
            <div className="ml-8 space-y-2">
              <div className="flex items-center space-x-2">
                <Input type="number" placeholder="1" className="w-20" />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Minutes</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Per day</span>
              </div>
              <Button variant="outline" size="sm">Add Limit</Button>
            </div>
          )}
        </div>

        {/* Limit future bookings */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Switch
              checked={eventData.limits.limitFutureBookings}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                limits: { ...eventData.limits, limitFutureBookings: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5] mt-1"
            />
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Limit future bookings
              </Label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Limit how far in the future this event can be booked
              </p>
            </div>
          </div>
          
          {eventData.limits.limitFutureBookings && (
            <div className="ml-8 space-y-2">
              <div className="flex items-center space-x-2">
                <Input type="number" placeholder="30" className="w-20" />
                <Select defaultValue="days">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="business-days">Business days</SelectItem>
                  </SelectContent>
                </Select>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>into the future</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Always 30 days available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Within a date range</span>
                  <Input type="date" className="w-40" />
                  <span>-</span>
                  <Input type="date" className="w-40" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Offset start times */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Switch
              checked={eventData.limits.offsetStartTimes}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                limits: { ...eventData.limits, offsetStartTimes: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5] mt-1"
            />
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Offset start times
              </Label>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Offset timeslots shown to bookers by a specified number of minutes
              </p>
            </div>
          </div>
          
          {eventData.limits.offsetStartTimes && (
            <div className="ml-8 space-y-2">
              <div className="flex items-center space-x-2">
                <Input type="number" placeholder="0" className="w-20" />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Offset by</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Minutes</span>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                e.g. this will show time slots to your bookers at 9:00 AM instead of 9:00 AM
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LimitsTab;