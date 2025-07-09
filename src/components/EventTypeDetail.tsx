
import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Plus, Settings, Users, Calendar, Globe, Zap, Shield, Target, BarChart3, Bold, Italic, Link, ExternalLink, ChevronDown, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import BookingQuestionsForm from './BookingQuestionsForm';

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
      offsetStartTimes: false
    },
    advanced: {
      requiresConfirmation: false,
      enableCaptcha: false,
      requiresEmailVerification: false,
      hideNotesInCalendar: false,
      disableCancelReschedule: false,
      hideCalendarDetails: false,
      redirectOnBooking: false,
      privateLinks: false,
      offerSeats: false,
      lockTimezone: false,
      eventTypeColor: '#007ee5'
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

  const renderLimits = () => (
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

  const renderWorkflows = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Select>
          <SelectTrigger className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            <SelectValue placeholder="Select workflow" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reminder">Email Reminder</SelectItem>
            <SelectItem value="confirmation">Booking Confirmation</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          Edit workflows
        </Button>
      </div>
    </div>
  );

  const renderAdvanced = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Requires confirmation */}
          <div className="flex items-start justify-between">
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Requires confirmation
              </Label>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                The booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.
              </p>
            </div>
            <Switch
              checked={eventData.advanced.requiresConfirmation}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                advanced: { ...eventData.advanced, requiresConfirmation: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5]"
            />
          </div>

          {/* Enable captcha */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Enable captcha on Booking page
                </Label>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  By enabling captcha, you'll prevent automated bots from booking you.
                </p>
              </div>
              <Switch
                checked={eventData.advanced.enableCaptcha}
                onCheckedChange={(checked) => setEventData({
                  ...eventData,
                  advanced: { ...eventData.advanced, enableCaptcha: checked }
                })}
                className="data-[state=checked]:bg-[#007ee5]"
              />
            </div>
            {eventData.advanced.enableCaptcha && (
              <div className="ml-0">
                <Label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select captcha strength</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-32 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Email verification */}
          <div className="flex items-start justify-between">
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Requires booker email verification
              </Label>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                To ensure booker's email verification before scheduling events
              </p>
            </div>
            <Switch
              checked={eventData.advanced.requiresEmailVerification}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                advanced: { ...eventData.advanced, requiresEmailVerification: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5]"
            />
          </div>

          {/* Hide notes */}
          <div className="flex items-start justify-between">
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Hide notes in calendar
              </Label>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                For privacy reasons, additional inputs and notes will be hidden in the calendar entry. They will still be sent to your email.
              </p>
            </div>
            <Switch
              checked={eventData.advanced.hideNotesInCalendar}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                advanced: { ...eventData.advanced, hideNotesInCalendar: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5]"
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Disable cancel/reschedule */}
          <div className="flex items-start justify-between">
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Disable Cancel and Reschedule options for this event type
              </Label>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Attendees will not be able to cancel or reschedule their bookings
              </p>
            </div>
            <Switch
              checked={eventData.advanced.disableCancelReschedule}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                advanced: { ...eventData.advanced, disableCancelReschedule: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5]"
            />
          </div>

          {/* Hide calendar details */}
          <div className="flex items-start justify-between">
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Hide calendar event details on shared calendars
              </Label>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                When a calendar is shared, events are visible to readers but their details are hidden from those without write access.
              </p>
            </div>
            <Switch
              checked={eventData.advanced.hideCalendarDetails}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                advanced: { ...eventData.advanced, hideCalendarDetails: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5]"
            />
          </div>

          {/* Redirect on booking */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Redirect on booking
                </Label>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Redirect to a custom URL after a successful booking
                </p>
              </div>
              <Switch
                checked={eventData.advanced.redirectOnBooking}
                onCheckedChange={(checked) => setEventData({
                  ...eventData,
                  advanced: { ...eventData.advanced, redirectOnBooking: checked }
                })}
                className="data-[state=checked]:bg-[#007ee5]"
              />
            </div>
            {eventData.advanced.redirectOnBooking && (
              <div className="space-y-2">
                <Input placeholder="https://example.com" className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`} />
                <div className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Forward parameters such as ?email=...&name=.... and more
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Private Links */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Private Links
                </Label>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Generate private URLs without exposing the username, which will be destroyed once used
                </p>
              </div>
              <Switch
                checked={eventData.advanced.privateLinks}
                onCheckedChange={(checked) => setEventData({
                  ...eventData,
                  advanced: { ...eventData.advanced, privateLinks: checked }
                })}
                className="data-[state=checked]:bg-[#007ee5]"
              />
            </div>
            {eventData.advanced.privateLinks && (
              <Button variant="outline" size="sm">
                Add new link
              </Button>
            )}
          </div>

          {/* Offer seats */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Offer seats
                </Label>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Offer seats for booking. This automatically disables guest & opt-in bookings.
                </p>
              </div>
              <Switch
                checked={eventData.advanced.offerSeats}
                onCheckedChange={(checked) => setEventData({
                  ...eventData,
                  advanced: { ...eventData.advanced, offerSeats: checked }
                })}
                className="data-[state=checked]:bg-[#007ee5]"
              />
            </div>
            {eventData.advanced.offerSeats && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="2" className="w-20" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>seats</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Share attendee information between guests
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Show the number of available seats
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lock timezone */}
          <div className="flex items-start justify-between">
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Lock timezone on booking page
              </Label>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                To lock the timezone on booking page, useful for in-person events.
              </p>
            </div>
            <Switch
              checked={eventData.advanced.lockTimezone}
              onCheckedChange={(checked) => setEventData({
                ...eventData,
                advanced: { ...eventData.advanced, lockTimezone: checked }
              })}
              className="data-[state=checked]:bg-[#007ee5]"
            />
          </div>

          {/* Event type color */}
          <div className="space-y-3">
            <div>
              <Label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Event type color
              </Label>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                This is only used for event type & booking differentiation within the app. It is not displayed to bookers.
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <Label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Event Type Color (Light Theme)</Label>
                <Input type="color" value={eventData.advanced.eventTypeColor} className="w-20 h-10" />
              </div>
              <div>
                <Label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Event Type Color (Dark Theme)</Label>
                <Input type="color" value={eventData.advanced.eventTypeColor} className="w-20 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecurring = () => (
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
