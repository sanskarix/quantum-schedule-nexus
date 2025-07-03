
import React, { useState } from 'react';
import { Calendar, Clock, User, Filter, Search, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface BookingsViewProps {
  isDarkMode: boolean;
}

const BookingsView: React.FC<BookingsViewProps> = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const bookings = [
    {
      id: 1,
      title: 'Product Demo',
      attendee: 'John Doe',
      email: 'john@example.com',
      date: '2024-01-15',
      time: '14:00',
      duration: '30 mins',
      status: 'confirmed',
      type: 'Google Meet'
    },
    {
      id: 2,
      title: 'Interview',
      attendee: 'Jane Smith',
      email: 'jane@example.com',
      date: '2024-01-16',
      time: '10:00',
      duration: '60 mins',
      status: 'pending',
      type: 'In Person'
    },
    {
      id: 3,
      title: 'Strategy Session',
      attendee: 'Mike Johnson',
      email: 'mike@example.com',
      date: '2024-01-17',
      time: '15:30',
      duration: '45 mins',
      status: 'cancelled',
      type: 'Zoom'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Bookings
        </h1>
        <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
          Manage your scheduled meetings and appointments.
        </p>
      </div>

      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20 text-white placeholder-[#818181]' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure`}
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
        <Button className="bg-azure hover:bg-azure/90 text-white">
          Export
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className={`grid w-full grid-cols-4 ${isDarkMode ? 'bg-[#212124]' : 'bg-gray-100'}`}>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {bookings.filter(b => b.status !== 'cancelled').map((booking) => (
            <div key={booking.id} className={`p-4 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-100'}`}>
                    <User className={`w-6 h-6 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {booking.title}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                      {booking.attendee} • {booking.email}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                        <span className={`text-xs ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                          {booking.date}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                        <span className={`text-xs ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                          {booking.time} • {booking.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="past">
          <div className={`text-center py-12 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No past bookings to show</p>
          </div>
        </TabsContent>

        <TabsContent value="cancelled">
          <div className={`text-center py-12 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No cancelled bookings</p>
          </div>
        </TabsContent>

        <TabsContent value="recurring">
          <div className={`text-center py-12 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recurring bookings</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingsView;
