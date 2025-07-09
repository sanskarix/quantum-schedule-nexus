
import React from 'react';
import { Bell, Settings, Sun, Moon, User, Map, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface AppHeaderProps {
  activeView: string;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  setShowSettings: (value: boolean) => void;
  getViewTitle: () => string;
  getViewDescription: () => string;
  notifications: any[];
}

const AppHeader: React.FC<AppHeaderProps> = ({
  activeView,
  isDarkMode,
  setIsDarkMode,
  setShowSettings,
  getViewTitle,
  getViewDescription,
  notifications
}) => {
  if (activeView === 'home') return null;

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${isDarkMode ? 'bg-[#1a1a1a]/80 backdrop-blur-xl border-gray-800/50' : 'bg-white/80 backdrop-blur-xl border-gray-200/50'} border-b`}>
      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <h1 className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
            {getViewTitle()}
          </h1>
          <p className={`text-base mt-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
            {getViewDescription()}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative w-12 h-12">
                <Bell className={`w-6 h-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-80 p-0 shadow-xl rounded-2xl ${isDarkMode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'}`} align="end">
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <h3 className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto p-2 space-y-2">
                {notifications.map(notification => (
                  <div key={notification.id} className={`p-4 rounded-xl cursor-pointer ${isDarkMode ? 'bg-[#151515] hover:bg-gray-800 border border-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-100'} ${notification.unread ? 'shadow-sm' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-medium text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        {notification.title}
                      </h4>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                        {notification.time}
                      </span>
                    </div>
                    <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-semibold text-lg" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>S</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`w-56 shadow-xl rounded-2xl ${isDarkMode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'}`}>
              <DropdownMenuItem className={`rounded-xl m-1 text-base ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                <User className="w-5 h-5 mr-3" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem className={`rounded-xl m-1 text-base ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                <Moon className="w-5 h-5 mr-3" />
                Out of Office
              </DropdownMenuItem>
              <DropdownMenuItem className={`rounded-xl m-1 text-base ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                <Map className="w-5 h-5 mr-3" />
                Roadmap
              </DropdownMenuItem>
              <DropdownMenuItem className={`rounded-xl m-1 text-base ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                <HelpCircle className="w-5 h-5 mr-3" />
                Help
              </DropdownMenuItem>
              <DropdownMenuSeparator className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              <DropdownMenuItem className={`rounded-xl m-1 text-base ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
