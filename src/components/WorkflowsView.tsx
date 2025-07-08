import React, { useState } from 'react';
import { Play, Pause, Edit, Plus, Settings, Zap, Clock, Bell, Mail, ArrowRight, Trash2, Info, X } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';

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

  const [showEditor, setShowEditor] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<any>(null);
  const [showVariablesHelp, setShowVariablesHelp] = useState(false);

  const exampleWorkflows = [
    'Send SMS reminder 24 hours before event starts to attendee',
    'Send custom SMS when event is rescheduled to attendee', 
    'Send custom email when new event is booked to host',
    'Send email reminder 1 hour before events starts to attendee',
    'Send custom email when event is rescheduled to host',
    'Send custom SMS when new event is booked to host'
  ];

  const handleToggleWorkflow = (id: number) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === id ? {
        ...workflow,
        status: workflow.status === 'active' ? 'paused' : 'active'
      } : workflow
    ));
  };

  const handleCreateWorkflow = () => {
    setEditingWorkflow(null);
    setShowEditor(true);
  };

  const handleEditWorkflow = (workflow: any) => {
    setEditingWorkflow(workflow);
    setShowEditor(true);
  };

  const handleDeleteWorkflow = (id: number) => {
    setWorkflows(workflows.filter(w => w.id !== id));
  };

  const renderWorkflowEditor = () => (
    <Dialog open={showEditor} onOpenChange={setShowEditor}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <DialogHeader>
          <DialogTitle className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {editingWorkflow ? editingWorkflow.name : 'untitled'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* Workflow Name */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Workflow name:
            </label>
            <input
              type="text"
              defaultValue={editingWorkflow?.name || ''}
              className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>

          {/* Event Type Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Which event type will this apply to?
            </label>
            <select className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
              <option>Select...</option>
              <option>Product Hunt Chats</option>
              <option>Team Meeting</option>
            </select>
            <div className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Apply to all, including future event types
              </span>
            </div>
          </div>

          {/* Delete Workflow Button */}
          <Button variant="destructive" className="text-red-600 border-red-600">
            Delete Workflow
          </Button>

          {/* Trigger Section */}
          <div className={`border rounded-lg p-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Trigger</h3>
            </div>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              When something happens
            </p>
            
            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>When</label>
                <select className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
                  <option>Before event starts</option>
                  <option>After event starts</option>
                  <option>After event ends</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How long before event starts?</label>
                <div className="flex items-center space-x-2">
                  <input type="number" defaultValue="24" className={`px-3 py-2 border rounded-lg w-20 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>hours</span>
                </div>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  When testing this workflow, be aware that Emails and SMS can only be scheduled at least 1 hour in advance
                </p>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className={`border rounded-lg p-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Action</h3>
            </div>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              An action is performed
            </p>
            
            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Do this</label>
                <select className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
                  <option>Send email to attendees</option>
                  <option>Send SMS to attendees</option>
                  <option>Send email to host</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sender name</label>
                <input type="text" className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Message template</label>
                <select className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
                  <option>Reminder</option>
                  <option>Custom</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email subject</label>
                <div className="flex items-center space-x-2">
                  <input type="text" className={`flex-1 px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`} />
                  <Button variant="outline" size="sm">Add variable</Button>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email body</label>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Normal</Button>
                    <Button variant="outline" size="sm">Add variable</Button>
                  </div>
                </div>
                <Textarea 
                  className={`w-full min-h-32 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                  defaultValue="Hi {ATTENDEE},

This is a reminder about your upcoming event.

Event: {EVENT_NAME}
Date & Time: {EVENT_DATE_ddd, MMM D, YYYY h:mma} - {EVENT_END_TIME} ({TIMEZONE})
Attendees: You & {ORGANIZER}
Location: {LOCATION} {MEETING_URL}

This reminder was triggered by a Workflow in OneHash Cal."
                />
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Include calendar event
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowVariablesHelp(true)}
                  className="text-blue-600 p-0 h-auto"
                >
                  <Info className="w-4 h-4 mr-1" />
                  How do I use booking questions as variables?
                </Button>
              </div>
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Add action
          </Button>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowEditor(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Save Workflow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderVariablesHelp = () => (
    <Dialog open={showVariablesHelp} onOpenChange={setShowVariablesHelp}>
      <DialogContent className={`max-w-2xl ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              How to use booking questions as variables?
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowVariablesHelp(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 p-6">
          <div>
            <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Format</h3>
            <ul className={`space-y-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Use uppercase for all letters</li>
              <li>• Replace whitespaces with underscores</li>
              <li>• Ignore special characters in your booking question identifier. Use only letters and numbers</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Example 1</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Booking Question Identifier</span>
                  <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Company size</p>
                </div>
                <div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Variable</span>
                  <p className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'{COMPANY_SIZE}'}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Example 2</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Booking Question Identifier</span>
                  <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What do you need help with?</p>
                </div>
                <div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Variable</span>
                  <p className={`font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'{WHAT_DO_YOU_NEED_HELP_WITH}'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={() => setShowVariablesHelp(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-8">
      {/* New Workflow Button */}
      <div className="flex justify-end">
        <Button onClick={handleCreateWorkflow} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New
        </Button>
      </div>

      {/* Examples Section - Only show when no workflows */}
      {workflows.length === 0 && (
        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Here are a few examples of how you can automate tasks using workflows.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {exampleWorkflows.map((example, index) => (
              <div key={index} className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-600 hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`} />
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing Workflows */}
      {workflows.length > 0 && (
        <div className="space-y-6">
          {workflows.map(workflow => (
            <div key={workflow.id} className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
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
                  <Switch 
                    checked={workflow.status === 'active'} 
                    onCheckedChange={() => handleToggleWorkflow(workflow.id)} 
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditWorkflow(workflow)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteWorkflow(workflow.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
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
            </div>
          ))}
        </div>
      )}

      {/* Your Workflows Section */}
      {workflows.length === 0 && (
        <div className="mt-12">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Workflows
          </h2>
          
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No workflows yet</p>
            <p className="text-sm mb-4">Create your first automation workflow to get started</p>
            <Button onClick={handleCreateWorkflow} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Workflow
            </Button>
          </div>
        </div>
      )}

      {renderWorkflowEditor()}
      {renderVariablesHelp()}
    </div>
  );
};

export default WorkflowsView;
