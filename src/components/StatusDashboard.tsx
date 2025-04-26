
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Language, translate } from '@/utils/languageUtils';
import { getWaterStatuses, WaterStatus } from '@/utils/mockData';
import { Droplet, AlertTriangle, Umbrella, DropletIcon } from 'lucide-react';

interface StatusDashboardProps {
  language: Language;
}

const StatusDashboard: React.FC<StatusDashboardProps> = ({ language }) => {
  const waterStatuses = getWaterStatuses();

  const getStatusColor = (status: WaterStatus['status']) => {
    switch (status) {
      case 'safe':
        return 'bg-safety-green';
      case 'caution':
        return 'bg-safety-yellow';
      case 'danger':
        return 'bg-safety-red';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (type: WaterStatus['type']) => {
    switch (type) {
      case 'quality':
        return <DropletIcon className="h-5 w-5" />;
      case 'flood':
        return <AlertTriangle className="h-5 w-5" />;
      case 'rainfall':
        return <Umbrella className="h-5 w-5" />;
      case 'supply':
        return <Droplet className="h-5 w-5" />;
      default:
        return <DropletIcon className="h-5 w-5" />;
    }
  };

  const getStatusTitle = (type: WaterStatus['type']) => {
    switch (type) {
      case 'quality':
        return translate('waterQuality', language);
      case 'flood':
        return translate('floodRisk', language);
      case 'rainfall':
        return translate('rainfall', language);
      case 'supply':
        return translate('waterSupply', language);
      default:
        return type;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-water-default flex items-center">
            <DropletIcon className="mr-2 animate-bounce" size={20} />
            {translate('waterStatus', language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {waterStatuses.map((status, index) => (
              <div 
                key={status.id}
                className="border rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:scale-102 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${status.status === 'safe' ? 'bg-green-100' : status.status === 'caution' ? 'bg-yellow-100' : 'bg-red-100'} mr-3`}>
                      {getStatusIcon(status.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {getStatusTitle(status.type)}
                      </h4>
                      <p className="text-sm text-gray-600">{status.location}</p>
                    </div>
                  </div>
                  <div className={`h-3 w-3 rounded-full ${getStatusColor(status.status)}`} />
                </div>
                
                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <div className="text-xl font-bold">
                      {status.value}
                      {status.unit && <span className="text-sm ml-1">{status.unit}</span>}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTimestamp(status.timestamp)}
                    </div>
                  </div>
                  
                  {status.advisory && (
                    <div className={`mt-2 p-2 rounded text-sm ${
                      status.status === 'danger' ? 'bg-red-50 text-red-800' : 
                      status.status === 'caution' ? 'bg-yellow-50 text-yellow-800' : 
                      'bg-blue-50 text-blue-800'
                    }`}>
                      <AlertTriangle className="inline h-4 w-4 mr-1" />
                      {status.advisory}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-water-light/10 transition-all duration-300 hover:bg-water-light/20">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <DropletIcon className="h-6 w-6 text-water" />
              </div>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-safety-green border-2 border-white" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Water Supply Status</h3>
              <p className="text-sm text-gray-600">Next scheduled maintenance: May 2, 2025</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <h4 className="text-sm font-medium text-gray-500">Reservoir Level</h4>
              <p className="text-2xl font-bold mt-1">78%</p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-2 rounded-full bg-water" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <h4 className="text-sm font-medium text-gray-500">Supply Hours Today</h4>
              <p className="text-2xl font-bold mt-1">18 hours</p>
              <p className="text-xs text-gray-500 mt-2">5:00 AM - 11:00 PM</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <h4 className="text-sm font-medium text-gray-500">Water Quality</h4>
              <p className="text-2xl font-bold mt-1 flex items-center">
                Normal
                <span className="ml-2 h-3 w-3 rounded-full bg-safety-green"></span>
              </p>
              <p className="text-xs text-gray-500 mt-2">Last tested: 3 hours ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusDashboard;
