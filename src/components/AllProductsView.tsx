
import React from 'react';
import { Calendar, Clock, Users, Grid3X3, Route, Layers, BarChart3, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface AllProductsViewProps {
  isDarkMode: boolean;
}

const AllProductsView: React.FC<AllProductsViewProps> = ({ isDarkMode }) => {
  const products = [
    {
      id: 1,
      name: 'Cal.com Scheduling',
      description: 'The core scheduling platform you\'re currently using',
      icon: Calendar,
      status: 'Active',
      category: 'Core'
    },
    {
      id: 2,
      name: 'Cal.com Analytics',
      description: 'Advanced analytics and insights for your scheduling data',
      icon: BarChart3,
      status: 'Available',
      category: 'Analytics'
    },
    {
      id: 3,
      name: 'Cal.com Teams',
      description: 'Advanced team management and collaboration features',
      icon: Users,
      status: 'Active',
      category: 'Collaboration'
    },
    {
      id: 4,
      name: 'Cal.com Workflows',
      description: 'Automation and workflow management tools',
      icon: Layers,
      status: 'Active',
      category: 'Automation'
    },
    {
      id: 5,
      name: 'Cal.com Apps',
      description: 'Extensive app marketplace and integrations',
      icon: Grid3X3,
      status: 'Active',
      category: 'Integrations'
    },
    {
      id: 6,
      name: 'Cal.com Forms',
      description: 'Advanced form building and routing capabilities',
      icon: Route,
      status: 'Active',
      category: 'Forms'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          All Products
        </h1>
        <p className={`text-sm mt-1 transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
          Explore all Cal.com products and features available to you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const Icon = product.icon;
          return (
            <div key={product.id} className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${isDarkMode ? 'bg-[#212124] border-[#818181]/20 hover:border-[#818181]/40' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-azure/20' : 'bg-azure/10'}`}>
                  <Icon className="w-6 h-6 text-azure" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {product.status}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {product.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-[#818181]/20 text-[#818181]' : 'bg-gray-100 text-gray-600'}`}>
                    {product.category}
                  </span>
                </div>
                
                <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#818181]' : 'text-gray-600'}`}>
                  {product.description}
                </p>

                <Button 
                  variant="outline" 
                  className="w-full transition-all duration-200 hover:shadow-sm"
                  disabled={product.status === 'Active'}
                >
                  {product.status === 'Active' ? (
                    'Currently Using'
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Learn More
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProductsView;
