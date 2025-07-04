
import React, { useState } from 'react';
import { Search, Zap, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AppsViewProps {
  isDarkMode: boolean;
}

const AppsView: React.FC<AppsViewProps> = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const installedApps = [
    { name: 'Google Meet', category: 'Video Conferencing', icon: 'https://cal.id/app-store/googlevideo/logo.webp', status: 'active' },
    { name: 'Zoom', category: 'Video Conferencing', icon: 'https://cal.id/app-store/zoom/icon.svg', status: 'active' }
  ];

  const availableApps = [
    { name: 'Basecamp3', category: 'Other', icon: 'https://cal.id/app-store/basecamp3/icon-dark.svg', description: 'Project management and team collaboration' },
    { name: 'Close.com', category: 'CRM', icon: 'https://cal.id/app-store/closecom/icon.svg', description: 'Inside sales CRM for startups and SMBs' },
    { name: 'Fathom', category: 'Analytics', icon: 'https://cal.id/app-store/fathom/icon.svg', description: 'Privacy-focused website analytics' },
    { name: 'Google Analytics', category: 'Analytics', icon: 'https://cal.id/app-store/ga4/icon.svg', description: 'Web analytics and tracking' },
    { name: 'Stripe', category: 'Payment', icon: 'https://cal.id/app-store/stripepayment/icon.svg', description: 'Payment processing for events' },
    { name: 'Razorpay', category: 'Payment', icon: 'https://cal.id/app-store/razorpay/icon.png', description: 'Indian payment gateway solution' }
  ];

  return (
    <div className="space-y-6">{/* Removed duplicate header */}

      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20 text-white placeholder-[#818181]' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure`}
        />
      </div>

      <Tabs defaultValue="installed" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 ${isDarkMode ? 'bg-[#212124]' : 'bg-gray-100'}`}>
          <TabsTrigger value="installed">Installed Apps</TabsTrigger>
          <TabsTrigger value="available">App Store</TabsTrigger>
        </TabsList>

        <TabsContent value="installed" className="space-y-4">
          {installedApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {installedApps.map((app) => (
                <div key={app.name} className={`p-4 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={app.icon} alt={app.name} className="w-10 h-10 rounded" />
                    <div>
                      <h3 className={`font-medium text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {app.name}
                      </h3>
                      <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                        {app.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs ${app.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {app.status}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        // Configure app logic
                        console.log('Configuring app:', app.name);
                      }}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
              <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No apps installed yet</p>
              <p className="text-sm mt-2">Browse the App Store to find integrations</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableApps.map((app) => (
              <div key={app.name} className={`p-4 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20 hover:border-[#818181]/40' : 'bg-white border-gray-200 hover:border-gray-300'} hover:shadow-md transition-all duration-200`}>
                <div className="flex items-center space-x-3 mb-3">
                  <img src={app.icon} alt={app.name} className="w-10 h-10 rounded" />
                  <div>
                    <h3 className={`font-medium text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {app.name}
                    </h3>
                    <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                      {app.category}
                    </p>
                  </div>
                </div>
                <p className={`text-xs mb-3 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                  {app.description}
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-azure hover:bg-azure/90 text-white"
                  onClick={() => {
                    // Install app logic
                    console.log('Installing app:', app.name);
                  }}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Install
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppsView;
