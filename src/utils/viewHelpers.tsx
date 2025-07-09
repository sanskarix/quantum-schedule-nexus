
export const getViewTitle = (activeView: string) => {
  switch (activeView) {
    case 'home': return 'Dashboard';
    case 'event-types': return 'Event Types';
    case 'bookings': return 'Bookings';
    case 'availability': return 'Availability';
    case 'teams': return 'Teams';
    case 'apps': return 'Apps';
    case 'routing-forms': return 'Routing Forms';
    case 'workflows': return 'Workflows';
    case 'insights': return 'Insights';
    case 'all-products': return 'All Products';
    default: return 'Dashboard';
  }
};

export const getViewDescription = (activeView: string) => {
  switch (activeView) {
    case 'home': return 'Overview of your scheduling analytics and performance.';
    case 'event-types': return 'Create events to share for people to book on your calendar.';
    case 'bookings': return 'Manage your scheduled meetings and appointments.';
    case 'availability': return 'Configure when you\'re available for meetings.';
    case 'teams': return 'Manage your teams and collaborate with colleagues.';
    case 'apps': return 'Enhance your scheduling with powerful integrations.';
    case 'routing-forms': return 'Create forms to route visitors to the right event type.';
    case 'workflows': return 'Automate your scheduling process with custom workflows.';
    case 'insights': return 'Track your scheduling performance and analytics.';
    case 'all-products': return 'Explore all Cal.com products and features.';
    default: return 'Overview of your scheduling analytics and performance.';
  }
};
