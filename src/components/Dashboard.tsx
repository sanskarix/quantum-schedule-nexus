
import React, { useState } from 'react';
import { Calendar, Clock, Users, TrendingUp, CheckCircle, Settings, Palette, Zap, ArrowRight, Plus, MoreHorizontal, BarChart3, Target, Sparkles, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface DashboardProps {
  isDarkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const [widgetVisibility, setWidgetVisibility] = useState({
    upcomingMeetings: true,
    meetingStats: true,
    setupProgress: true,
    recentActivity: true
  });

  const toggleWidget = (widget: keyof typeof widgetVisibility) => {
    setWidgetVisibility(prev => ({ ...prev, [widget]: !prev[widget] }));
  };

  const upcomingMeetings = [
    {
      title: 'Product Demo',
      time: 'Today, 2:00 PM',
      attendee: 'John Doe',
      duration: '30 min',
      type: 'video',
      status: 'confirmed'
    },
    {
      title: 'Team Standup',
      time: 'Tomorrow, 9:00 AM', 
      attendee: 'Design Team',
      duration: '15 min',
      type: 'video',
      status: 'pending'
    },
    {
      title: 'Client Consultation',
      time: 'Friday, 3:00 PM',
      attendee: 'Sarah Wilson', 
      duration: '60 min',
      type: 'phone',
      status: 'confirmed'
    }
  ];

  const meetingStats = [
    { label: 'Today', count: 3, color: '#007ee5', progress: 75 },
    { label: 'This Week', count: 12, color: '#008c44', progress: 60 },
    { label: 'This Month', count: 45, color: '#f9a400', progress: 85 }
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

  const recentActivity = [
    { action: 'New booking', detail: 'Product Demo scheduled', time: '2 min ago', color: '#008c44' },
    { action: 'Calendar synced', detail: 'Google Calendar connected', time: '1 hour ago', color: '#007ee5' },
    { action: 'Event updated', detail: 'Team Standup rescheduled', time: '3 hours ago', color: '#f9a400' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      {/* Hero Section with 3D Elements */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-gray-900/50 to-transparent' : 'bg-gradient-to-r from-white/50 to-transparent'}`} />
        
        {/* Floating 3D Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl transform rotate-12 shadow-2xl" 
               style={{ transform: 'perspective(1000px) rotateX(20deg) rotateY(-20deg)' }} />
        </div>
        <div className="absolute top-40 right-60 w-24 h-24 opacity-15">
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-xl transform -rotate-6 shadow-xl"
               style={{ transform: 'perspective(800px) rotateX(-15deg) rotateY(25deg)' }} />
        </div>
        <div className="absolute top-10 right-40 w-16 h-16 opacity-25">
          <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg transform rotate-45 shadow-lg"
               style={{ transform: 'perspective(600px) rotateX(30deg) rotateY(-30deg)' }} />
        </div>

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${isDarkMode ? 'from-white to-gray-300' : 'from-gray-900 to-gray-600'} bg-clip-text text-transparent`}>
                Good afternoon
              </h1>
              <p className={`text-lg mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Tuesday, Jul 8 • 10:23 AM
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} backdrop-blur-sm`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage widgets
            </Button>
          </div>

          {/* Featured Card */}
          <div className={`relative p-8 rounded-3xl mb-8 overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80' : 'bg-gradient-to-br from-white/80 to-gray-50/80'} backdrop-blur-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: '#007ee5', color: 'white' }}>
                    Scheduling
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Your scheduling performance
                  </h2>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Track your meetings and optimize your schedule
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    87%
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Efficiency
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats and Setup */}
          <div className="lg:col-span-2 space-y-6">
            {/* Meeting Stats */}
            {widgetVisibility.meetingStats && (
              <Card className={`p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700' : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'} backdrop-blur-xl`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Meeting Overview
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWidget('meetingStats')}
                    className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {meetingStats.map((stat, index) => (
                    <div key={index} className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50/80'} backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
                      <div className="text-center">
                        <div 
                          className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                          style={{ backgroundColor: stat.color }}
                        >
                          {stat.count}
                        </div>
                        <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {stat.label}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ width: `${stat.progress}%`, backgroundColor: stat.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Setup Progress */}
            {widgetVisibility.setupProgress && (
              <Card className={`p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700' : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'} backdrop-blur-xl`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Complete your setup
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWidget('setupProgress')}
                    className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {completedSteps} of {setupSteps.length} completed
                    </span>
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {setupSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${step.completed ? (isDarkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200') : (isDarkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200')}`}>
                        <div className="flex items-start space-x-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: step.completed ? step.color : (isDarkMode ? '#374151' : '#f3f4f6') }}
                          >
                            {step.completed ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <Icon className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {step.title}
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Meetings */}
            {widgetVisibility.upcomingMeetings && (
              <Card className={`p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700' : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'} backdrop-blur-xl`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Upcoming Meetings
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWidget('upcomingMeetings')}
                    className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingMeetings.map((meeting, index) => (
                    <div key={index} className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50/80 border-gray-200'} backdrop-blur-sm`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {meeting.title}
                          </h3>
                          <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {meeting.time}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            with {meeting.attendee}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                            {meeting.duration}
                          </span>
                          <div className={`text-xs mt-1 ${meeting.status === 'confirmed' ? 'text-green-500' : 'text-yellow-500'}`}>
                            {meeting.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6" style={{ backgroundColor: '#007ee5' }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule new meeting
                </Button>
              </Card>
            )}

            {/* Recent Activity */}
            {widgetVisibility.recentActivity && (
              <Card className={`p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700' : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'} backdrop-blur-xl`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Recent Activity
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWidget('recentActivity')}
                    className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: activity.color }}
                      />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {activity.action}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {activity.detail}
                        </p>
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Hidden Widgets Toggle */}
        <div className="mt-8">
          <details className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <summary className="cursor-pointer text-sm font-medium mb-4">
              Show hidden widgets ({Object.values(widgetVisibility).filter(v => !v).length})
            </summary>
            <div className="flex flex-wrap gap-2">
              {Object.entries(widgetVisibility).map(([key, visible]) => (
                !visible && (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleWidget(key as keyof typeof widgetVisibility)}
                    className="capitalize"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </Button>
                )
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

