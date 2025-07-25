import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface EventTypeTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isDarkMode: boolean;
}

const EventTypeTabs: React.FC<EventTypeTabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  isDarkMode 
}) => {
  return (
    <div className={`border-b mb-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <nav className="flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-[#007ee5] text-[#007ee5]'
                  : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default EventTypeTabs;