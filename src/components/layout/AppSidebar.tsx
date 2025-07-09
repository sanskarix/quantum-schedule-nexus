
import React from 'react';
import { Home, Calendar, Clock, Users, Grid3X3, Route, Layers, BarChart3, Menu, Settings, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

interface AppSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  setShowSettings: (value: boolean) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  activeView,
  setActiveView,
  isDarkMode,
  setIsDarkMode,
  setShowSettings
}) => {
  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'event-types', icon: Calendar, label: 'Event Types' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'availability', icon: Clock, label: 'Availability' },
    { id: 'teams', icon: Users, label: 'Teams' },
    { id: 'apps', icon: Grid3X3, label: 'Apps' },
    { id: 'routing-forms', icon: Route, label: 'Routing Forms' },
    { id: 'workflows', icon: Layers, label: 'Workflows' },
    { id: 'insights', icon: BarChart3, label: 'Insights' },
    { id: 'all-products', icon: Menu, label: 'All Products' }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full w-64 border-r z-40 transition-all duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'} flex flex-col`}>
      {/* Logo */}
      <div className={`p-6 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center space-x-4">
          <img src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" alt="Cal ID" className="w-12 h-12" />
          <span className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
            Cal ID
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 flex-1">
        {sidebarItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeView === id 
                ? `${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'} transform scale-[1.02]`
                : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} hover:scale-[1.01]`
            }`}
            style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4">
        <div className={`flex items-center justify-between p-4 rounded-xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Button variant="ghost" size="icon" className="w-10 h-10" onClick={() => setShowSettings(true)}>
            <Settings className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <Sun className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={setIsDarkMode} 
              className="data-[state=checked]:bg-[#007ee5] transition-all duration-200" 
            />
            <Moon className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
