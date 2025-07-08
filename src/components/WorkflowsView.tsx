import React, { useState } from 'react';
import { Play, Pause, Edit, Plus, Settings, Zap, Clock, Bell, Mail, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
interface WorkflowsViewProps {
  isDarkMode: boolean;
}
const WorkflowsView: React.FC<WorkflowsViewProps> = ({
  isDarkMode
}) => {
  const [workflows, setWorkflows] = useState([{
    id: 1,
    name: 'Untitled (Send email to attendees)',
    description: 'Send email reminder to attendees',
    status: 'active',
    trigger: '24 hours before event starts',
    actions: 1,
    lastRun: '2 hours ago',
    activeEventTypes: 0
  }]);
  const exampleWorkflows = ['Send SMS reminder 24 hours before event starts to attendee', 'Send custom SMS when event is rescheduled to attendee', 'Send custom email when new event is booked to host', 'Send email reminder 1 hour before events starts to attendee', 'Send custom email when event is rescheduled to host', 'Send custom SMS when new event is booked to host'];
  const handleToggleWorkflow = (id: number) => {
    setWorkflows(workflows.map(workflow => workflow.id === id ? {
      ...workflow,
      status: workflow.status === 'active' ? 'paused' : 'active'
    } : workflow));
  };
  const handleCreateWorkflow = () => {
    const newWorkflow = {
      id: Date.now(),
      name: 'New Workflow',
      description: 'Configure your automation workflow',
      status: 'paused',
      trigger: 'manual',
      actions: 0,
      lastRun: 'Never',
      activeEventTypes: 0
    };
    setWorkflows([...workflows, newWorkflow]);
  };
  return <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Workflows
          </h1>
          <p className={`text-lg mt-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Create workflows to automate notifications and reminders
          </p>
        </div>
        <div className="flex items-center space-x-3">
          
          <Button onClick={handleCreateWorkflow} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>
      </div>

      {/* Examples Section */}
      <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Here are a few examples of how you can automate tasks using workflows.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {exampleWorkflows.map((example, index) => <div key={index} className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-600 hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`} />
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {example}
                </p>
              </div>
            </div>)}
        </div>
      </div>

      {/* Existing Workflows */}
      <div className="space-y-6">
        {workflows.map(workflow => <div key={workflow.id} className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${workflow.status === 'active' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-700'}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {workflow.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {workflow.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={workflow.status === 'active'} onCheckedChange={() => handleToggleWorkflow(workflow.id)} />
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Triggers
                  </span>
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {workflow.trigger}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Settings className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                  </span>
                </div>
                <span className={`text-sm ${workflow.activeEventTypes === 0 ? 'text-orange-500' : 'text-green-500'}`}>
                  {workflow.activeEventTypes === 0 ? 'No active event types' : `${workflow.activeEventTypes} active event types`}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${workflow.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                    {workflow.status}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View details
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>)}
      </div>

      {/* Your Workflows Section */}
      <div className="mt-12">
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Your Workflows
        </h2>
        
        {workflows.length === 0 ? <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No workflows yet</p>
            <p className="text-sm mb-4">Create your first automation workflow to get started</p>
            <Button onClick={handleCreateWorkflow} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Workflow
            </Button>
          </div> : <div className="grid gap-4">
            {workflows.map(workflow => <div key={workflow.id} className={`p-4 rounded-lg border transition-all hover:shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${workflow.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {workflow.name}
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {workflow.trigger}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${workflow.activeEventTypes === 0 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                      {workflow.activeEventTypes === 0 ? 'No active event types' : `${workflow.activeEventTypes} active`}
                    </span>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>)}
          </div>}
      </div>
    </div>;
};
export default WorkflowsView;