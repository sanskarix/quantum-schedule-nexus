
import React from 'react';
import { Users, Plus, Settings, Copy } from 'lucide-react';
import { Button } from './ui/button';

interface TeamsViewProps {
  isDarkMode: boolean;
  teams: any[];
}

const TeamsView: React.FC<TeamsViewProps> = ({ isDarkMode, teams }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">{/* Removed duplicate header */}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Teams
          </h2>
        </div>
        <Button className="bg-azure hover:bg-azure/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className={`p-6 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20 hover:border-[#818181]/40' : 'bg-white border-gray-200 hover:border-gray-300'} hover:shadow-md transition-all duration-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg`} style={{ backgroundColor: `var(--${team.color})`, color: 'white' }}>
                  {team.logo}
                </div>
                <div>
                  <h3 className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {team.name}
                  </h3>
                  <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    {team.eventTypes.length} event types
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  // Manage team settings
                  console.log('Managing team:', team.name);
                }}
              >
                <Settings className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
              </Button>
            </div>

            <div className="space-y-3">
              <div className={`p-3 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#161618]' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    Team Link
                  </span>
                  <button
                    onClick={() => copyToClipboard(team.slug)}
                    className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300`}
                  >
                    <Copy className={`w-3 h-3 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                  </button>
                </div>
                <p className={`text-xs font-mono transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {team.slug}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                  Members
                </span>
                <div className="flex items-center space-x-1">
                  <Users className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                  <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    3
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  // Manage team logic
                  console.log('Managing team:', team.name);
                }}
              >
                Manage Team
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsView;
