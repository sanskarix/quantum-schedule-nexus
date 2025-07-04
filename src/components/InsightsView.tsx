import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, Calendar, Clock, Eye, MousePointer } from 'lucide-react';
interface InsightsViewProps {
  isDarkMode: boolean;
}
const InsightsView: React.FC<InsightsViewProps> = ({
  isDarkMode
}) => {
  const metrics = [{
    title: 'Total Bookings',
    value: '156',
    change: '+23%',
    trend: 'up',
    icon: Calendar,
    color: 'text-blue-500'
  }, {
    title: 'Total Hours',
    value: '89h',
    change: '+15%',
    trend: 'up',
    icon: Clock,
    color: 'text-green-500'
  }, {
    title: 'Conversion Rate',
    value: '68%',
    change: '-5%',
    trend: 'down',
    icon: TrendingUp,
    color: 'text-purple-500'
  }, {
    title: 'Avg. Meeting Duration',
    value: '42m',
    change: '+8%',
    trend: 'up',
    icon: BarChart3,
    color: 'text-orange-500'
  }];
  const popularEvents = [{
    name: 'Product Demo',
    bookings: 45,
    percentage: 85,
    color: 'bg-blue-500'
  }, {
    name: 'Interviews',
    bookings: 32,
    percentage: 65,
    color: 'bg-green-500'
  }, {
    name: 'Strategy Session',
    bookings: 28,
    percentage: 55,
    color: 'bg-purple-500'
  }, {
    name: 'Product Hunt Chats',
    bookings: 25,
    percentage: 50,
    color: 'bg-orange-500'
  }];
  const recentActivity = [{
    type: 'booking',
    message: 'New booking for Product Demo',
    time: '2 minutes ago',
    color: 'bg-green-500'
  }, {
    type: 'reschedule',
    message: 'Meeting rescheduled',
    time: '1 hour ago',
    color: 'bg-blue-500'
  }, {
    type: 'cancellation',
    message: 'Booking cancelled',
    time: '3 hours ago',
    color: 'bg-red-500'
  }, {
    type: 'booking',
    message: 'Strategy Session booked',
    time: '5 hours ago',
    color: 'bg-green-500'
  }, {
    type: 'view',
    message: 'Event type viewed 12 times',
    time: '1 day ago',
    color: 'bg-purple-500'
  }];
  return <div className="space-y-8">
      <div>
        
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(metric => {
        const Icon = metric.icon;
        return <div key={metric.title} className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-100'} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
                  <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <p className={`text-3xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {metric.value}
              </p>
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                {metric.title}
              </p>
            </div>;
      })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Popular Events */}
        <div className={`p-8 rounded-xl border transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-azure/20' : 'bg-azure/10'} flex items-center justify-center`}>
              <BarChart3 className="w-5 h-5 text-azure" />
            </div>
            <h3 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Most Popular Events
            </h3>
          </div>
          <div className="space-y-6">
            {popularEvents.map((event, index) => <div key={event.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full ${event.color} text-white text-xs flex items-center justify-center font-semibold`}>
                      {index + 1}
                    </span>
                    <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {event.name}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    {event.bookings} bookings
                  </span>
                </div>
                <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-200'} overflow-hidden`}>
                  <div className={`h-3 rounded-full transition-all duration-700 ${event.color}`} style={{
                width: `${event.percentage}%`
              }}></div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`p-8 rounded-xl border transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-pulse/20' : 'bg-pulse/10'} flex items-center justify-center`}>
              <Clock className="w-5 h-5 text-pulse" />
            </div>
            <h3 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => <div key={index} className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-200 hover:scale-105 ${isDarkMode ? 'bg-[#161618] hover:bg-[#818181]/10' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className={`w-3 h-3 rounded-full ${activity.color} mt-2 shadow-sm`}></div>
                <div className="flex-1 space-y-1">
                  <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {activity.message}
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                    {activity.time}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg`}>
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                2,847
              </p>
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                Profile Views
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg`}>
              <MousePointer className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                73%
              </p>
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                Click-through Rate
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg`}>
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                94
              </p>
              <p className={`text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                Unique Visitors
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default InsightsView;