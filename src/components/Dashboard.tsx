
import React from 'react';
import { Calendar, Clock, Users, TrendingUp, CheckCircle, Settings, Palette, Zap, ArrowRight, Plus, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface DashboardProps {
  isDarkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const upcomingMeetings = [
    {
      title: 'Product Demo',
      time: 'Today, 2:00 PM',
      attendee: 'John Doe',
      duration: '30 min',
      type: 'video'
    },
    {
      title: 'Team Standup',
      time: 'Tomorrow, 9:00 AM',
      attendee: 'Design Team',
      duration: '15 min',
      type: 'video'
    },
    {
      title: 'Client Consultation',
      time: 'Friday, 3:00 PM',
      attendee: 'Sarah Wilson',
      duration: '60 min',
      type: 'phone'
    }
  ];

  const meetingStats = [
    { label: 'Today', count: 3, color: '#007ee5' },
    { label: 'This Week', count: 12, color: '#008c44' },
    { label: 'This Month', count: 45, color: '#f9a400' }
  ];

  const setupSteps = [
    { 
      title: 'Set Availability', 
      description: 'Configure when you\'re available for meetings',
      completed: true,
      icon: Clock,
      color: '#008c44'
    },
    { 
      title: 'Sync Calendars', 
      description: 'Connect your external calendars',
      completed: true,
      icon: Calendar,
      color: '#007ee5'
    },
    { 
      title: 'Integrate Apps', 
      description: 'Add your favorite tools and integrations',
      completed: false,
      icon: Settings,
      color: '#f9a400'
    },
    { 
      title: 'Add Branding', 
      description: 'Customize your booking page appearance',
      completed: false,
      icon: Palette,
      color: '#f1352c'
    },
    { 
      title: 'Automate Workflows', 
      description: 'Set up automated notifications and reminders',
      completed: false,
      icon: Zap,
      color: '#007ee5'
    }
  ];

  const completedSteps = setupSteps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / setupSteps.length) * 100;

  return (
    <div className={`p-6 space-y-6 ${isDarkMode ? 'bg-[#0f0f0f] text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Good afternoon,
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Tuesday, Jul 8 10:23
          </p>
        </div>
        <Button variant="ghost" size="sm" className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Settings className="w-4 h-4 mr-2" />
          Manage widgets
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Complete Setup */}
          <Card className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Complete your setup
              </h2>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {completedSteps} of {setupSteps.length} completed
                </span>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="space-y-3">
              {setupSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: step.completed ? step.color : (isDarkMode ? '#374151' : '#f3f4f6') }}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Icon className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                    </div>
                    {!step.completed && (
                      <ArrowRight className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Meeting Stats */}
          <Card className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Meeting Overview
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {meetingStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: stat.color }}
                  >
                    {stat.count}
                  </div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Meetings */}
          <Card className={`p-6 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Upcoming Meetings
              </h2>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingMeetings.map((meeting, index) => (
                <div key={index} className={`p-3 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-[#151515]' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {meeting.title}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {meeting.time}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        with {meeting.attendee}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                      {meeting.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-4" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Schedule new meeting
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
