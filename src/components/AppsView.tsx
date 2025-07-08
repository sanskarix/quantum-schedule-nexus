
import React, { useState } from 'react';
import { Search, Zap, Plus, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface AppsViewProps {
  isDarkMode: boolean;
}

const AppsView: React.FC<AppsViewProps> = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCategories = [
    {
      name: 'Conferencing',
      count: 25,
      icon: '🎥',
      description: 'Video conferencing integrations'
    },
    {
      name: 'Calendar',
      count: 12,
      icon: '📅',
      description: 'Calendar sync and management'
    },
    {
      name: 'Automation',
      count: 10,
      icon: '⚡',
      description: 'Workflow automation tools'
    },
    {
      name: 'Analytics',
      count: 9,
      icon: '📊',
      description: 'Analytics and reporting'
    },
    {
      name: 'Other',
      count: 8,
      icon: '🔧',
      description: 'Other useful integrations'
    }
  ];

  const mostPopularApps = [
    {
      name: 'Google Calendar',
      description: 'Google Calendar is a time management and scheduling service developed by Google. Allows users to create and edit events, with options available for type and time.',
      icon: '📅',
      category: 'Calendar',
      installed: false,
      featured: true
    },
    {
      name: 'Google Meet',
      description: 'Google Meet is Google\'s web-based video conferencing platform, designed to compete with major conferencing platforms.',
      icon: '🎥',
      category: 'Conferencing',
      installed: true,
      featured: true
    },
    {
      name: 'Zoom Video',
      description: 'Zoom is a secure and reliable video platform that supports all of your online communication needs. It can provide everything from one on one meetings.',
      icon: '💻', 
      category: 'Conferencing',
      installed: false,
      featured: true,
      badge: 'Default'
    }
  ];

  const recentlyAdded = [
    {
      name: 'Razorpay',
      description: 'Razorpay is the only payments solution in India that allows businesses to accept, process and disburse payments with its product suite.',
      icon: '💳',
      category: 'Payment',
      installed: false
    },
    {
      name: 'ViaSocket',
      description: 'ViaSocket is a no-code, AI-powered workflow automation platform that helps users connect their favorite tools and automate repetitive tasks.',
      icon: '🔌',
      category: 'Automation',
      installed: false
    },
    {
      name: 'OneHash Chat',
      description: 'Integrate your Cal account with OneHash Chat',
      icon: '💬',
      category: 'Communication',
      installed: false
    }
  ];

  const installedApps = [
    {
      name: 'Google Meet',
      category: 'Video Conferencing',
      icon: '🎥',
      status: 'active'
    },
    {
      name: 'Zoom',
      category: 'Video Conferencing', 
      icon: '💻',
      status: 'active'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          App Store
        </h1>
        <p className={`text-base mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Connecting people, technology and the workplace.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-[#1a1a1a] border-gray-800 text-white placeholder-gray-400' 
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
        />
      </div>

      <Tabs defaultValue="store" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
          <TabsTrigger value="store">App Store</TabsTrigger>
          <TabsTrigger value="installed">Installed Apps</TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="space-y-8">
          {/* Featured Categories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Featured Categories
              </h2>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {featuredCategories.map((category) => (
                <Card 
                  key={category.name}
                  className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                    isDarkMode ? 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h3 className={`font-semibold text-base mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {category.count} Apps
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Most Popular */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Most Popular
              </h2>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mostPopularApps.map((app) => (
                <Card 
                  key={app.name}
                  className={`transition-all duration-200 hover:shadow-md ${
                    isDarkMode ? 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{app.icon}</div>
                        <div>
                          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {app.name}
                          </h3>
                          {app.badge && (
                            <Badge variant="secondary" className="mt-1">
                              {app.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {app.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {app.category}
                      </span>
                      {app.installed ? (
                        <Button variant="outline" size="sm" disabled>
                          Installed
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Details
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recently Added */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Recently added
              </h2>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyAdded.map((app) => (
                <Card 
                  key={app.name}
                  className={`transition-all duration-200 hover:shadow-md ${
                    isDarkMode ? 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-2xl">{app.icon}</div>
                      <div>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {app.name}
                        </h3>
                      </div>
                    </div>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {app.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {app.category}
                      </span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="installed" className="space-y-4">
          {installedApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {installedApps.map((app) => (
                <Card 
                  key={app.name} 
                  className={`transition-colors duration-300 ${
                    isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-2xl">{app.icon}</div>
                      <div>
                        <h3 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {app.name}
                        </h3>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {app.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        app.status === 'active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {app.status}
                      </span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No apps installed yet</p>
              <p className="text-sm mt-2">Browse the App Store to find integrations</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppsView;
