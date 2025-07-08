import React, { useState } from 'react';
import { Play, Pause, Edit, Plus, Settings, Zap, Clock, Bell, Mail } from 'lucide-react';
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
    name: 'Welcome Email Sequence',
    description: 'Send a welcome email to new clients after booking',
    status: 'active',
    trigger: 'booking_confirmed',
    actions: 3,
    lastRun: '2 hours ago'
  }, {
    id: 2,
    name: 'Reminder Notifications',
    description: 'Send SMS reminders 24 hours before meetings',
    status: 'paused',
    trigger: 'event_scheduled',
    actions: 2,
    lastRun: '1 day ago'
  }, {
    id: 3,
    name: 'Follow-up Survey',
    description: 'Send feedback survey after meeting completion',
    status: 'active',
    trigger: 'event_completed',
    actions: 1,
    lastRun: '5 minutes ago'
  }]);
  const handleToggleWorkflow = (id: number) => {
    setWorkflows(workflows.map(workflow => workflow.id === id ? {
      ...workflow,
      status: workflow.status === 'active' ? 'paused' : 'active'
    } : workflow));
  };
  const handleEditWorkflow = (id: number) => {
    console.log('Editing workflow:', id);
  };
  const handleCreateWorkflow = () => {
    const newWorkflow = {
      id: Date.now(),
      name: 'New Workflow',
      description: 'Configure your automation workflow',
      status: 'paused',
      trigger: 'manual',
      actions: 0,
      lastRun: 'Never'
    };
    setWorkflows([...workflows, newWorkflow]);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
        }}>Your Workflows</h2>
          <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`}>
            {workflows.filter(w => w.status === 'active').length} active
          </span>
        </div>
        <Button onClick={handleCreateWorkflow} className="bg-azure hover:bg-azure/90 text-white transition-all duration-300 hover:scale-105">
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="grid gap-4">
        {workflows.map(workflow => <div key={workflow.id} className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-102 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20 hover:border-[#818181]/40' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${workflow.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'} transition-all duration-300`}>
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-semibold text-base transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
              }}>
                    {workflow.name}
                  </h3>
                  <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    {workflow.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={workflow.status === 'active'} onCheckedChange={() => handleToggleWorkflow(workflow.id)} className="data-[state=checked]:bg-azure" />
                <Button variant="ghost" size="icon" onClick={() => handleEditWorkflow(workflow.id)} className="transition-all duration-300 hover:scale-110">
                  <Edit className={`w-4 h-4 ${isDarkMode ? 'text-[#818181] hover:text-white' : 'text-gray-500 hover:text-gray-700'}`} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-[#161618]' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <Bell className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    Trigger
                  </span>
                </div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {workflow.trigger.replace('_', ' ')}
                </p>
              </div>

              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-[#161618]' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <Settings className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    Actions
                  </span>
                </div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {workflow.actions} configured
                </p>
              </div>

              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-[#161618]' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className={`w-4 h-4 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`} />
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                    Last Run
                  </span>
                </div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {workflow.lastRun}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs ${workflow.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                  {workflow.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleToggleWorkflow(workflow.id)} className="transition-all duration-300 hover:scale-105">
                  {workflow.status === 'active' ? <>
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </> : <>
                      <Play className="w-3 h-3 mr-1" />
                      Resume
                    </>}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEditWorkflow(workflow.id)} className="transition-all duration-300 hover:scale-105">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          </div>)}
      </div>

      {workflows.length === 0 && <div className={`text-center py-12 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
          <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No workflows yet</p>
          <p className="text-sm mb-4">Create your first automation workflow to get started</p>
          <Button onClick={handleCreateWorkflow} className="bg-azure hover:bg-azure/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Workflow
          </Button>
        </div>}
    </div>;
};
export default WorkflowsView;