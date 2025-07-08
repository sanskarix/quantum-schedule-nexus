
import React from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Users, TrendingUp, Calendar, Eye, ChevronDown, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface DashboardProps {
  isDarkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const customers = [
    { name: 'Gladyce', avatar: '🧑‍💼' },
    { name: 'Elbert', avatar: '👨‍💻' },
    { name: 'Joyce', avatar: '👩‍🦱' },
  ];

  const products = [
    { 
      name: 'One-on-One Meeting', 
      price: '$2,453.80', 
      status: 'Active',
      statusColor: 'text-green-600',
      bgColor: 'bg-orange-100',
      icon: '🤝'
    },
    { 
      name: 'Team Standup', 
      price: '$105.60', 
      status: 'Inactive',
      statusColor: 'text-red-500',
      bgColor: 'bg-purple-100',
      icon: '🔄'
    },
    { 
      name: 'Product Demo', 
      price: '$648.60', 
      status: 'Active',
      statusColor: 'text-green-600',
      bgColor: 'bg-blue-100',
      icon: '⚡'
    },
    { 
      name: 'Client Consultation', 
      price: '$648.60', 
      status: 'Active',
      statusColor: 'text-green-600',
      bgColor: 'bg-amber-100',
      icon: '💼'
    },
  ];

  const chartData = [
    { day: 'Mon', value: 27, color: 'bg-green-300' },
    { day: 'Tue', value: 22, color: 'bg-orange-300' },
    { day: 'Wed', value: 30, color: 'bg-blue-500', highlighted: true, date: '24 September', percentage: '20k' },
    { day: 'Thu', value: 20, color: 'bg-green-300' },
    { day: 'Fri', value: 28, color: 'bg-green-300' },
    { day: 'Sat', value: 16, color: 'bg-orange-300' },
    { day: 'Sun', value: 24, color: 'bg-green-300' },
  ];

  return (
    <div className={`p-6 space-y-6 ${isDarkMode ? 'bg-[#0f0f0f] text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Dashboard
        </h1>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Overview and Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Section */}
          <Card className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-6 bg-orange-400 rounded-sm"></div>
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Overview
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>All time</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customers */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bookings</span>
                    <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-600">i</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">1024</span>
                    <div className="flex items-center text-red-500">
                      <ArrowDown className="w-4 h-4" />
                      <span className="text-sm">37.8%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Income */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Revenue</span>
                    <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-600">i</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">256k</span>
                    <div className="flex items-center text-green-500">
                      <ArrowUp className="w-4 h-4" />
                      <span className="text-sm">37.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mt-6 flex items-center justify-between">
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Welcome <span className="font-semibold">857 customers</span> with a personal message 😊
              </div>
              <Button variant="outline" size="sm">
                Send message
              </Button>
            </div>

            {/* Customer Avatars */}
            <div className="mt-4 flex items-center space-x-4">
              {customers.map((customer, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl mb-2">
                    {customer.avatar}
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {customer.name}
                  </span>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="ml-4">
                View all
              </Button>
            </div>
          </Card>

          {/* Event Type Views Chart */}
          <Card className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-6 bg-purple-400 rounded-sm"></div>
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Event type views
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Last 7 days</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Chart */}
            <div className="relative">
              <div className="flex items-end justify-between h-48 px-4">
                {chartData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center relative">
                    <div 
                      className={`w-8 ${item.color} rounded-t-sm relative`}
                      style={{ height: `${(item.value / 30) * 100}%` }}
                    >
                      {item.highlighted && (
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {item.date}
                          <br />
                          <span className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                            {item.percentage}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-400">
                <span>30</span>
                <span>25</span>
                <span>20</span>
                <span>15</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Popular Event Types */}
          <Card className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-6 bg-blue-400 rounded-sm"></div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Popular event types
                </h3>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Event Types</span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Bookings</span>
              </div>
            </div>

            <div className="space-y-3">
              {products.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${product.bgColor} rounded-lg flex items-center justify-center text-lg`}>
                      {product.icon}
                    </div>
                    <div>
                      <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {product.name}
                      </div>
                      <div className={`text-xs ${product.statusColor}`}>
                        {product.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4 text-sm">
              All event types
            </Button>
          </Card>

          {/* Comments */}
          <Card className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-6 bg-yellow-400 rounded-sm"></div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">
                  🧑‍💼
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Ethel
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      @ethel
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      1h
                    </span>
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                    Booked <span className="font-medium">Product Demo</span>
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                    Great work 😊
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
