
import React, { useState } from 'react';
import { Clock, Settings, Calendar, Zap, Shield, Target, BarChart3 } from 'lucide-react';
import EventTypeHeader from './event-detail/EventTypeHeader';
import EventTypeTabs from './event-detail/EventTypeTabs';
import EventSetupTab from './event-detail/EventSetupTab';
import AvailabilityTab from './event-detail/AvailabilityTab';
import LimitsTab from './event-detail/LimitsTab';
import WorkflowsTab from './event-detail/WorkflowsTab';
import AdvancedTab from './event-detail/AdvancedTab';
import RecurringTab from './event-detail/RecurringTab';
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







  const renderTabContent = () => {
    switch (activeTab) {
      case 'setup': 
        return <EventSetupTab eventData={eventData} setEventData={setEventData} isDarkMode={isDarkMode} />;
      case 'availability': 
        return <AvailabilityTab eventData={eventData} setEventData={setEventData} isDarkMode={isDarkMode} />;
      case 'limits': 
        return <LimitsTab eventData={eventData} setEventData={setEventData} isDarkMode={isDarkMode} />;
      case 'apps': 
        return <div className="text-center py-8">Apps configuration coming soon</div>;
      case 'workflows': 
        return <WorkflowsTab isDarkMode={isDarkMode} />;
      case 'advanced': 
        return <AdvancedTab eventData={eventData} setEventData={setEventData} isDarkMode={isDarkMode} />;
      case 'recurring': 
        return <RecurringTab isDarkMode={isDarkMode} />;
      default: 
        return <EventSetupTab eventData={eventData} setEventData={setEventData} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <EventTypeHeader
          eventTitle={eventData.title}
          saved={saved}
          isDarkMode={isDarkMode}
          onBack={onBack}
          onSave={handleSave}
        />

        <EventTypeTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isDarkMode={isDarkMode}
        />

        <div className={`rounded-xl p-8 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default EventTypeDetail;
