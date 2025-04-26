
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Language, translate } from '@/utils/languageUtils';
import { getEmergencyContacts, EmergencyContact } from '@/utils/mockData';
import { Shield, AlertTriangle, Info } from 'lucide-react';

interface GetHelpProps {
  language: Language;
}

const GetHelp: React.FC<GetHelpProps> = ({ language }) => {
  const emergencyContacts = getEmergencyContacts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-water flex items-center">
          <Shield className="mr-2" size={20} />
          {translate('getHelp', language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Emergency Contact Cards */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                <AlertTriangle className="h-6 w-6 text-safety-red" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {translate('emergency', language)}
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  If you are experiencing a water-related emergency, please contact the appropriate authorities immediately.
                </p>
                
                <div className="space-y-3">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="bg-white rounded-md p-3 border border-gray-200 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{contact.name}</h4>
                        <p className="text-sm text-gray-500">{contact.type} emergency</p>
                      </div>
                      <Button 
                        variant="destructive" 
                        className="rounded-full bg-safety-red hover:bg-red-600"
                        onClick={() => window.location.href = `tel:${contact.number}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-1">
                          <path d="M15.5 11.7c0 0.2-0.1 0.4-0.2 0.6s-0.3 0.4-0.5 0.5c-0.4 0.2-0.8 0.4-1.2 0.5s-0.8 0.1-1.3 0.1c-0.7 0-1.3-0.1-2-0.3C9.6 12.8 9 12.4 8.3 12c-1.1-0.7-2.1-1.5-3-2.4S3.7 7.7 3 6.6C2.6 6 2.3 5.4 2 4.7S1.6 3.4 1.6 2.7c0-0.4 0-0.9 0.1-1.3S1.9 0.6 2.2 0.2C2.5-0.1 2.8-0.1 3.1 0.1c0.1 0 0.2 0.1 0.3 0.1c0.1 0.1 0.2 0.1 0.2 0.2l2.4 4.5c0.1 0.2 0.1 0.4 0.1 0.5c0 0.2-0.1 0.3-0.2 0.5L4.7 7.1C4.7 7.2 4.6 7.3 4.6 7.4c0 0.1 0 0.2 0 0.3c0.1 0.2 0.2 0.4 0.4 0.6c0.1 0.2 0.3 0.4 0.5 0.6c0.4 0.4 0.7 0.8 1.1 1.1c0.4 0.4 0.8 0.7 1.2 1c0.2 0.1 0.4 0.3 0.6 0.4s0.4 0.2 0.5 0.3c0.1 0 0.2 0.1 0.3 0.1s0.2 0 0.3-0.1l1.2-1.2c0.2-0.2 0.5-0.3 0.8-0.3c0.2 0 0.4 0 0.5 0.1h0l4.3 2.5c0.3 0.2 0.5 0.4 0.5 0.7v0.2H15.5z" fill="currentColor"/>
                        </svg>
                        {contact.number}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Water Safety Advisories */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-water p-3 text-white">
              <h3 className="font-medium flex items-center">
                <Info className="mr-2" size={18} />
                Current Water Safety Advisories
              </h3>
            </div>
            
            <div className="p-0">
              <div className="border-b p-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-safety-yellow mr-2"></div>
                  <h4 className="font-medium">{translate('boilWater', language)}</h4>
                </div>
                <p className="mt-2 text-sm">
                  Residents in Northern District should boil water for at least 1 minute before 
                  consumption due to potential contamination from recent pipe repairs.
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Issued: April 22, 2025</span>
                  <span>Expected resolution: April 29, 2025</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-safety-red mr-2"></div>
                  <h4 className="font-medium">{translate('avoidTapWater', language)}</h4>
                </div>
                <p className="mt-2 text-sm">
                  Due to high levels of contaminants detected, residents in Riverside area should avoid using 
                  tap water for drinking or cooking. Bottled water distribution points have been set up.
                </p>
                <div className="mt-3 text-sm">
                  <Button variant="outline" className="text-water border-water hover:bg-water/10">
                    View Distribution Points
                  </Button>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Issued: April 24, 2025</span>
                  <span>Expected resolution: April 30, 2025</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4">
              <h3 className="font-medium">Frequently Asked Questions</h3>
            </div>
            
            <div className="divide-y">
              <div className="p-4">
                <h4 className="font-medium text-water">What should I do if my water appears cloudy?</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Cloudy water is often caused by air bubbles. Let the water stand for a few minutes to clear. 
                  If it doesn't clear, report it through the app for testing.
                </p>
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-water">How do I know if there's a water supply interruption in my area?</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Check the Water Status tab for real-time updates on scheduled maintenance and supply interruptions 
                  in your area. You can also set up notifications for your location.
                </p>
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-water">What does a "Boil Water Advisory" mean?</h4>
                <p className="mt-2 text-sm text-gray-600">
                  It means you should bring water to a rolling boil for at least one minute before drinking, 
                  cooking, brushing teeth, or washing dishes to kill any potential bacteria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GetHelp;
