
import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import MainContent from '../components/MainContent';
import AppSidebar from '../components/layout/AppSidebar';
import AppHeader from '../components/layout/AppHeader';
import SettingsDialog from '../components/SettingsDialog';
import { useAppData } from '../hooks/useAppData';
import { getViewTitle, getViewDescription } from '../utils/viewHelpers';

const Index = () => {
  const [activeView, setActiveView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  const { eventTypes, setEventTypes, teams, notifications } = useAppData();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const renderMainContent = () => {
    if (activeView === 'home') {
      return <Dashboard isDarkMode={isDarkMode} />;
    }
    return (
      <MainContent 
        activeView={activeView} 
        isDarkMode={isDarkMode} 
        eventTypes={eventTypes} 
        setEventTypes={setEventTypes} 
        teams={teams} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-[#0f0f0f]' : 'bg-gray-50'}`}>
      <AppSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setShowSettings={setShowSettings}
      />

      <div className="ml-64">
        <AppHeader
          activeView={activeView}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setShowSettings={setShowSettings}
          getViewTitle={() => getViewTitle(activeView)}
          getViewDescription={() => getViewDescription(activeView)}
          notifications={notifications}
        />

        {renderMainContent()}
      </div>

      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} isDarkMode={isDarkMode} />
    </div>
  );
};

export default Index;
