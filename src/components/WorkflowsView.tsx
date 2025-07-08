
import React, { useState } from 'react';
import { Play, Pause, Edit, Plus, Settings, Zap, Clock, Bell, Mail, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';

interface WorkflowsViewProps {
  isDarkMode: boolean;
}

const WorkflowsView: React.FC<WorkflowsViewProps> = ({ isDarkMode }) => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Untitled (Send email to attendees)',
      description: 'Send email reminder to attendees',
      status: 'active',
      trigger: '24 hours before event starts',
      actions: 1,
      lastRun: '2 hours ago',
      activeEventTypes: 0
    },
    {
      id: 2,
      name: 'Untitled (Send email to attendees)', 
      description: 'Send email reminder to attendees',
      status: 'paused',
      trigger: '24 hours before event starts',
      actions: 1,
      lastRun: '1 day ago',
      activeEventTypes: 0
    }
  ]);

  const workflowExamples = [
    {
      title: 'Send SMS reminder 24 hours before event starts to attendee',
      icon: MessageSquare,
      color: 'text-blue-500'
    },
    {
      title: 'Send custom SMS when event is rescheduled to attendee',
      icon: MessageSquare,
      color: 'text-green-500'
    },
    {
      title: 'Send custom email when new event is booked to host',
      icon: Mail,
      color: 'text-purple-500'
    },
    {
      title: 'Send email reminder 1 hour before events starts to attendee',
      icon: Mail,
      color: 'text-orange-500'
    },
    {
      title: 'Send custom email when event is rescheduled to host',
      icon: Mail,
      color: 'text-red-500'
    },
    {
      title: 'Send custom SMS when new event is booked to host',
      icon: MessageSquare,
      color: 'text-indigo-500'
    }
  ];

  const handleToggleWorkflow = (id: number) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === id 
        ? { ...workflow, status: workflow.status === 'active' ? 'paused' : 'active' }
        : workflow
    ));
  };

  const handleCreateWorkflow = () => {
    console.log('Creating new workflow...');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Workflows
          </h1>
          <p className={`text-base mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Create workflows to automate notifications and reminders
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
            New
          </span>
          <Button onClick={handleCreateWorkflow} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Examples Section */}
      <div className="space-y-4">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Here are a few examples of how you can automate tasks using workflows.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workflowExamples.map((example, index) => (
            <div 
              key={index}
              className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors duration-200 ${
                isDarkMode ? 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'
              } hover:shadow-sm cursor-pointer`}
            >
              <example.icon className={`w-5 h-5 ${example.color}`} />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {example.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Your Workflows Section */}
      <div className="space-y-4">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Your Workflows
        </h2>
        
        <div className="space-y-4">
          {workflows.map(workflow => (
            <Card 
              key={workflow.id} 
              className={`transition-all duration-200 hover:shadow-md ${
                isDarkMode ? 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      workflow.status === 'active' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {workflow.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Triggers
                          </span>
                          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {workflow.trigger}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <span className={`${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
                          No active event types
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch 
                      checked={workflow.status === 'active'} 
                      onCheckedChange={() => handleToggleWorkflow(workflow.id)}
                      className="data-[state=checked]:bg-blue-600" 
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ArrowRight className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty state if no workflows */}
      {workflows.length === 0 && (
        <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No workflows yet</p>
          <p className="text-sm mb-4">Create your first automation workflow to get started</p>
          <Button onClick={handleCreateWorkflow} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Workflow
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkflowsView;
