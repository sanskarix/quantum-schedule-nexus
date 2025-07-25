import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

interface WorkflowsTabProps {
  isDarkMode: boolean;
}

const WorkflowsTab: React.FC<WorkflowsTabProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Select>
          <SelectTrigger className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            <SelectValue placeholder="Select workflow" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reminder">Email Reminder</SelectItem>
            <SelectItem value="confirmation">Booking Confirmation</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          Edit workflows
        </Button>
      </div>
    </div>
  );
};

export default WorkflowsTab;