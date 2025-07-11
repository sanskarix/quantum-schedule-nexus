
import React, { useState } from 'react';
import EventTypesList from './EventTypesList';
import EventTypeDetail from './EventTypeDetail';
import BookingsView from './BookingsView';
import AvailabilityView from './AvailabilityView';
import TeamsView from './TeamsView';
import AppsView from './AppsView';
import WorkflowsView from './WorkflowsView';
import InsightsView from './InsightsView';
import RoutingFormsView from './RoutingFormsView';
import AllProductsView from './AllProductsView';

interface MainContentProps {
  activeView: string;
  isDarkMode: boolean;
  eventTypes: any[];
  setEventTypes: (events: any[]) => void;
  teams: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  activeView,
  isDarkMode,
  eventTypes,
  setEventTypes,
  teams,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const handleBackToEventTypes = () => {
    setSelectedEvent(null);
  };

  const renderMainContent = () => {
    if (selectedEvent) {
      return (
        <EventTypeDetail
          event={selectedEvent}
          onBack={handleBackToEventTypes}
          isDarkMode={isDarkMode}
        />
      );
    }

    switch (activeView) {
      case 'event-types':
        return (
          <div className="p-6">
            <EventTypesList
              isDarkMode={isDarkMode}
              eventTypes={eventTypes}
              setEventTypes={setEventTypes}
              teams={teams}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onEventClick={handleEventClick}
            />
          </div>
        );
      case 'bookings':
        return <BookingsView isDarkMode={isDarkMode} />;
      case 'availability':
        return <AvailabilityView isDarkMode={isDarkMode} />;
      case 'teams':
        return <TeamsView isDarkMode={isDarkMode} teams={teams} />;
      case 'apps':
        return <AppsView isDarkMode={isDarkMode} />;
      case 'routing-forms':
        return <RoutingFormsView isDarkMode={isDarkMode} />;
      case 'workflows':
        return <WorkflowsView isDarkMode={isDarkMode} />;
      case 'insights':
        return <InsightsView isDarkMode={isDarkMode} />;
      case 'all-products':
        return <AllProductsView isDarkMode={isDarkMode} />;
      default:
        return (
          <div className="p-6">
            <EventTypesList
              isDarkMode={isDarkMode}
              eventTypes={eventTypes}
              setEventTypes={setEventTypes}
              teams={teams}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onEventClick={handleEventClick}
            />
          </div>
        );
    }
  };

  return renderMainContent();
};

export default MainContent;
