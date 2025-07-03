
import React from 'react';
import { Workflow, Plus, Play, Pause } from 'lucide-react';
import { Button } from './ui/button';

interface WorkflowsViewProps {
  isDarkMode: boolean;
}

const WorkflowsView: React.FC<WorkflowsViewProps> = ({ isDarkMode }) => {
  const workflows = [
    {
      id: 1,
      name: 'Meeting Confirmation',
      description: 'Send confirmation email and calendar invite',
      trigger: 'Booking Confirmed',
      status: 'active',
      executions: 24
    },
    {
      id: 2,
      name: 'Follow-up Reminder',
      description: 'Send follow-up email 1 day after meeting',
      trigger: 'Meeting Completed',
      status: 'paused',
      executions: 12
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Workflows
        </h1>
        <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
          Automate your scheduling process with custom workflows.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Active Workflows
        </h2>
        <Button className="bg-azure hover:bg-azure/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {workflows.length > 0 ? (
        <div className="space-y-4">
          {workflows.map((workflow) => (
            <div key={workflow.id} className={`p-6 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-100'}`}>
                    <Workflow className={`w-6 h-6 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {workflow.name}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                      {workflow.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                        Trigger: {workflow.trigger}
                      </span>
                      <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                        {workflow.executions} executions
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    workflow.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {workflow.status}
                  </span>
                  <Button variant="outline" size="sm">
                    {workflow.status === 'active' ? (
                      <>
                        <Pause className="w-3 h-3 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 mr-1" />
                        Resume
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
          <Workflow className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No workflows created yet</p>
          <p className="text-sm mt-2">Create your first workflow to automate your scheduling</p>
        </div>
      )}
    </div>
  );
};

export default WorkflowsView;
