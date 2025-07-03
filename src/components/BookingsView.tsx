
import React, { useState } from 'react';
import { Calendar, Clock, User, Video, Phone, MapPin, MoreHorizontal, Edit, Trash2, Mail } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

interface BookingsViewProps {
  isDarkMode: boolean;
}

const BookingsView: React.FC<BookingsViewProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const bookings = [
    {
      id: 1,
      title: 'Product Demo',
      attendee: 'John Doe',
      email: 'john.doe@example.com',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '30 mins',
      type: 'Google Meet',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Strategy Session',
      attendee: 'Jane Smith',
      email: 'jane.smith@company.com',
      date: '2024-01-16',
      time: '10:00 AM',
      duration: '60 mins',
      type: 'Zoom',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Interview Session',
      attendee: 'Mike Johnson',
      email: 'mike.j@startup.io',
      date: '2024-01-14',
      time: '3:30 PM',
      duration: '45 mins',
      type: 'Google Meet',
      status: 'completed'
    }
  ];

  const [bookingsList, setBookingsList] = useState(bookings);

  const handleReschedule = (bookingId: number) => {
    console.log('Reschedule booking:', bookingId);
    // Implementation for rescheduling
  };

  const handleCancel = (bookingId: number) => {
    setBookingsList(prev => prev.filter(booking => booking.id !== bookingId));
  };

  const getFilteredBookings = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    switch (activeTab) {
      case 'upcoming':
        return bookingsList.filter(booking => booking.date >= today && booking.status !== 'completed');
      case 'past':
        return bookingsList.filter(booking => booking.date < today || booking.status === 'completed');
      case 'cancelled':
        return bookingsList.filter(booking => booking.status === 'cancelled');
      default:
        return bookingsList;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 p-8">
      {/* Tabs */}
      <div className={`border-b transition-colors duration-500 ${isDarkMode ? 'border-[#818181]/20' : 'border-gray-200'}`}>
        <nav className="flex space-x-8">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'border-azure text-azure scale-105'
                  : `border-transparent ${isDarkMode ? 'text-[#818181] hover:text-white' : 'text-gray-500 hover:text-gray-700'} hover:scale-102`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {getFilteredBookings().map((booking) => (
          <div
            key={booking.id}
            className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-102 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-azure/20 flex items-center justify-center`}>
                  <Calendar className="w-6 h-6 text-azure" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className={`font-semibold text-lg transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {booking.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <User className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                      <span className={`transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                        {booking.attendee}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                      <span className={`transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                        {booking.date} at {booking.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Clock className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                      <span className={`transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                        {booking.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Video className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                      <span className={`transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                        {booking.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {booking.status === 'confirmed' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReschedule(booking.id)}
                      className="transition-all duration-300 hover:scale-105"
                    >
                      Reschedule
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCancel(booking.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50 transition-all duration-300 hover:scale-105"
                    >
                      Cancel
                    </Button>
                  </>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="transition-all duration-300 hover:scale-110">
                      <MoreHorizontal className={`w-5 h-5 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={`transition-colors duration-500 shadow-xl ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
                    <DropdownMenuItem className={`transition-colors duration-500 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className={`transition-colors duration-500 ${isDarkMode ? 'text-white hover:bg-[#818181]/10' : 'text-gray-900 hover:bg-gray-50'}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Reminder
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className={`transition-colors duration-500 ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-200'}`} />
                    <DropdownMenuItem 
                      onClick={() => handleCancel(booking.id)}
                      className={`text-red-600 transition-colors duration-500 ${isDarkMode ? 'hover:bg-[#818181]/10' : 'hover:bg-gray-50'}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Cancel Booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>

      {getFilteredBookings().length === 0 && (
        <div className="text-center py-16">
          <Calendar className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-400'}`} />
          <h3 className={`text-lg font-medium mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            No {activeTab} bookings
          </h3>
          <p className={`transition-colors duration-500 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
            {activeTab === 'upcoming' ? 'No upcoming meetings scheduled' : `No ${activeTab} bookings found`}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingsView;
