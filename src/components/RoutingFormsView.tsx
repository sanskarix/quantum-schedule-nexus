import React from 'react';
import { Route, Plus, Eye, Settings, Copy } from 'lucide-react';
import { Button } from './ui/button';
interface RoutingFormsViewProps {
  isDarkMode: boolean;
}
const RoutingFormsView: React.FC<RoutingFormsViewProps> = ({
  isDarkMode
}) => {
  const routingForms = [{
    id: 1,
    name: 'Contact Sales Form',
    description: 'Route visitors to appropriate sales representatives',
    responses: 45,
    status: 'active'
  }, {
    id: 2,
    name: 'Support Intake Form',
    description: 'Direct support requests to the right team',
    responses: 23,
    status: 'active'
  }];
  return <div className="space-y-6">
      <div>
        
        
      </div>

      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Your Forms
        </h2>
        <Button className="bg-azure hover:bg-azure/90 text-white transition-all duration-200 hover:shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Create Form
        </Button>
      </div>

      {routingForms.length > 0 ? <div className="space-y-4">
          {routingForms.map(form => <div key={form.id} className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-md ${isDarkMode ? 'bg-[#212124] border-[#818181]/20 hover:border-[#818181]/40' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#818181]/20' : 'bg-gray-100'}`}>
                    <Route className={`w-6 h-6 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {form.name}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                      {form.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                        {form.responses} responses
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${form.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {form.status}
                  </span>
                  <Button variant="outline" size="sm" className="transition-all duration-200 hover:shadow-sm">
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="transition-all duration-200 hover:shadow-sm">
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Link
                  </Button>
                  <Button variant="outline" size="sm" className="transition-all duration-200 hover:shadow-sm">
                    <Settings className="w-3 h-3 mr-1" />
                    Configure
                  </Button>
                </div>
              </div>
            </div>)}
        </div> : <div className={`text-center py-12 ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
          <Route className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No routing forms created yet</p>
          <p className="text-sm mt-2">Create your first form to route visitors to the right event type</p>
        </div>}
    </div>;
};
export default RoutingFormsView;