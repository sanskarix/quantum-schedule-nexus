import React from 'react';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface AdvancedTabProps {
  eventData: any;
  setEventData: (data: any) => void;
  isDarkMode: boolean;
}

const AdvancedTab: React.FC<AdvancedTabProps> = ({ eventData, setEventData, isDarkMode }) => {
  return (
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
};

export default AdvancedTab;