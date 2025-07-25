import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface EventTypeHeaderProps {
  eventTitle: string;
  saved: boolean;
  isDarkMode: boolean;
  onBack: () => void;
  onSave: () => void;
}

const EventTypeHeader: React.FC<EventTypeHeaderProps> = ({ 
  eventTitle, 
  saved, 
  isDarkMode, 
  onBack, 
  onSave 
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {eventTitle}
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Configure your event type settings
          </p>
        </div>
      </div>
      
      <Button 
        onClick={onSave}
        className={`${saved ? 'bg-green-600' : 'bg-[#007ee5] hover:bg-[#0066cc]'} text-white`}
      >
        {saved ? 'Saved!' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default EventTypeHeader;