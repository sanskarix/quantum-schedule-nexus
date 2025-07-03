
import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, Calendar, Clock } from 'lucide-react';

interface InsightsViewProps {
  isDarkMode: boolean;
}

const InsightsView: React.FC<InsightsViewProps> = ({ isDarkMode }) => {
  const metrics = [
    { title: 'Total Bookings', value: '156', change: '+23%', trend: 'up', icon: Calendar },
    { title: 'Total Hours', value: '89h', change: '+15%', trend: 'up', icon: Clock },
    { title: 'Conversion Rate', value: '68%', change: '-5%', trend: 'down', icon: TrendingUp },
    { title: 'Avg. Meeting Duration', value: '42m', change: '+8%', trend: 'up', icon: BarChart3 }
  ];

  const popularEvents = [
    { name: 'Product Demo', bookings: 45, percentage: 65 },
    { name: 'Interviews', bookings: 32, percentage: 45 },
    { name: 'Strategy Session', bookings: 28, percentage: 40 },
    { name: 'Product Hunt Chats', bookings: 25, percentage: 35 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Insights
        </h1>
        <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
          Track your scheduling performance and analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className={`p-6 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <p className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {metric.value}
              </p>
              <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                {metric.title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Most Popular Events
          </h3>
          <div className="space-y-4">
            {popularEvents.map((event) => (
              <div key={event.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {event.name}
                  </span>
                  <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    {event.bookings} bookings
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-200'}`}>
                  <div 
                    className="bg-azure h-2 rounded-full transition-all duration-300"
                    style={{ width: `${event.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  New booking for Product Demo
                </p>
                <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                  2 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Meeting rescheduled
                </p>
                <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                  1 hour ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div>
                <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Booking cancelled
                </p>
                <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                  3 hours ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsView;
