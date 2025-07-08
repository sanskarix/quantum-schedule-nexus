import React, { useState } from 'react';
import { Search, Zap, Plus, Star, Clock, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AppsViewProps {
  isDarkMode: boolean;
}

const AppsView: React.FC<AppsViewProps> = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Apps', count: 45 },
    { id: 'conferencing', name: 'Conferencing', count: 8 },
    { id: 'calendar', name: 'Calendar', count: 6 },
    { id: 'payment', name: 'Payment', count: 4 },
    { id: 'messaging', name: 'Messaging', count: 7 },
    { id: 'automation', name: 'Automation', count: 5 },
    { id: 'analytics', name: 'Analytics', count: 6 },
    { id: 'crm', name: 'CRM', count: 4 },
    { id: 'others', name: 'Others', count: 5 }
  ];

  const installedApps = [
    { name: 'Google Meet', category: 'Conferencing', icon: 'https://cal.id/app-store/googlevideo/logo.webp', status: 'active', rating: 4.8 },
    { name: 'Zoom', category: 'Conferencing', icon: 'https://cal.id/app-store/zoom/icon.svg', status: 'active', rating: 4.7 },
    { name: 'Stripe', category: 'Payment', icon: 'https://cal.id/app-store/stripepayment/icon.svg', status: 'active', rating: 4.9 }
  ];

  const mostPopularApps = [
    { name: 'Google Meet', category: 'Conferencing', icon: 'https://cal.id/app-store/googlevideo/logo.webp', description: 'Video conferencing made easy', rating: 4.8, installs: '10k+', installed: true },
    { name: 'Zoom', category: 'Conferencing', icon: 'https://cal.id/app-store/zoom/icon.svg', description: 'Professional video meetings', rating: 4.7, installs: '8k+', installed: true },
    { name: 'Stripe', category: 'Payment', icon: 'https://cal.id/app-store/stripepayment/icon.svg', description: 'Accept payments seamlessly', rating: 4.9, installs: '5k+', installed: true },
    { name: 'Calendly', category: 'Calendar', icon: 'https://cal.id/app-store/calendly/icon.svg', description: 'Schedule meetings effortlessly', rating: 4.6, installs: '7k+', installed: false }
  ];

  const recentlyAddedApps = [
    { name: 'Notion', category: 'Others', icon: 'https://cal.id/app-store/notion/icon.svg', description: 'All-in-one workspace', rating: 4.5, installs: '2k+', installed: false },
    { name: 'Slack', category: 'Messaging', icon: 'https://cal.id/app-store/slack/icon.svg', description: 'Team communication hub', rating: 4.4, installs: '3k+', installed: false },
    { name: 'HubSpot', category: 'CRM', icon: 'https://cal.id/app-store/hubspot/icon.svg', description: 'CRM and marketing platform', rating: 4.6, installs: '1.5k+', installed: false }
  ];

  const allApps = [
    ...mostPopularApps,
    ...recentlyAddedApps,
    { name: 'Basecamp3', category: 'Others', icon: 'https://cal.id/app-store/basecamp3/icon-dark.svg', description: 'Project management and team collaboration', rating: 4.3, installs: '1k+', installed: false },
    { name: 'Close.com', category: 'CRM', icon: 'https://cal.id/app-store/closecom/icon.svg', description: 'Inside sales CRM for startups and SMBs', rating: 4.2, installs: '800+', installed: false },
    { name: 'Fathom', category: 'Analytics', icon: 'https://cal.id/app-store/fathom/icon.svg', description: 'Privacy-focused website analytics', rating: 4.4, installs: '600+', installed: false },
    { name: 'Google Analytics', category: 'Analytics', icon: 'https://cal.id/app-store/ga4/icon.svg', description: 'Web analytics and tracking', rating: 4.5, installs: '4k+', installed: false },
    { name: 'Razorpay', category: 'Payment', icon: 'https://cal.id/app-store/razorpay/icon.png', description: 'Indian payment gateway solution', rating: 4.3, installs: '2k+', installed: false }
  ];

  const filteredApps = selectedCategory === 'all' 
    ? allApps 
    : allApps.filter(app => app.category.toLowerCase() === selectedCategory);

  const handleInstallApp = (appName: string) => {
    console.log('Installing/Removing app:', appName);
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <input
          type="text"
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
        />
      </div>

      {/* Featured Categories */}
      <div>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border text-center transition-all duration-200 hover:shadow-md ${
                selectedCategory === category.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                  : `border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`
              }`}
            >
              <div className="text-sm font-medium mb-1">{category.name}</div>
              <div className={`text-xs ${selectedCategory === category.id ? 'text-blue-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {category.count} apps
              </div>
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <TabsTrigger value="browse">Browse Apps</TabsTrigger>
          <TabsTrigger value="installed">Installed Apps ({installedApps.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-8">
          {/* Most Popular Apps */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Most Popular
              </h2>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View all
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mostPopularApps.slice(0, 4).map((app) => (
                <div key={app.name} className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-lg hover:scale-105 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={app.icon} alt={app.name} className="w-10 h-10 rounded" />
                    <div className="flex-1">
                      <h3 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {app.name}
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {app.category}
                      </p>
                    </div>
                  </div>
                  <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {app.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {renderStarRating(app.rating)}
                      <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {app.rating}
                      </span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {app.installs}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant={app.installed ? "outline" : "default"}
                    className={`w-full ${app.installed ? '' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    onClick={() => handleInstallApp(app.name)}
                  >
                    {app.installed ? 'Installed' : 'Install'}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Added */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Recently Added
              </h2>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View all
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentlyAddedApps.map((app) => (
                <div key={app.name} className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-lg hover:scale-105 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={app.icon} alt={app.name} className="w-10 h-10 rounded" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {app.name}
                        </h3>
                        <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">
                          New
                        </span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {app.category}
                      </p>
                    </div>
                  </div>
                  <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {app.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {renderStarRating(app.rating)}
                      <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {app.rating}
                      </span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {app.installs}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleInstallApp(app.name)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Install
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* All Apps */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                All Apps
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredApps.map((app) => (
                <div key={app.name} className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-lg hover:scale-105 ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={app.icon} alt={app.name} className="w-10 h-10 rounded" />
                    <div className="flex-1">
                      <h3 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {app.name}
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {app.category}
                      </p>
                    </div>
                  </div>
                  <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {app.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {renderStarRating(app.rating)}
                      <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {app.rating}
                      </span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {app.installs}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant={app.installed ? "outline" : "default"}
                    className={`w-full ${app.installed ? '' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    onClick={() => handleInstallApp(app.name)}
                  >
                    {app.installed ? 'Installed' : <><Plus className="w-3 h-3 mr-1" />Install</>}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="installed" className="space-y-4">
          {installedApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {installedApps.map((app) => (
                <div key={app.name} className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={app.icon} alt={app.name} className="w-10 h-10 rounded" />
                    <div className="flex-1">
                      <h3 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {app.name}
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {app.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {renderStarRating(app.rating)}
                      <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {app.rating}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${app.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleInstallApp(app.name)}
                    >
                      Configure
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 text-red-600 hover:text-red-700"
                      onClick={() => handleInstallApp(app.name)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No apps installed yet</p>
              <p className="text-sm mb-4">Browse the App Store to find integrations</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Browse Apps
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppsView;
