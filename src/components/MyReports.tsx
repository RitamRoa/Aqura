import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Language, translate } from '@/utils/languageUtils';
import { getUserReports, Report } from '@/utils/mockData';
import { MessageCircle, Calendar, Clock } from 'lucide-react';

interface MyReportsProps {
  language: Language;
}

const MyReports: React.FC<MyReportsProps> = ({ language }) => {
  const reports = getUserReports();

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
            {translate('pending', language)}
          </Badge>
        );
      case 'inProgress':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            {translate('inProgress', language)}
          </Badge>
        );
      case 'resolved':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            {translate('resolved', language)}
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-water-default flex items-center">
          <MessageCircle className="mr-2" size={20} />
          {translate('myReports', language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div 
                key={report.id} 
                className="border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gray-50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{report.issueType}</div>
                    {getStatusBadge(report.status)}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(report.timestamp)}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">{translate('location', language)}:</span> {report.location}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                  
                  {report.comments && report.comments.length > 0 && (
                    <div className="mt-4 border-t pt-3">
                      <h4 className="text-sm font-medium mb-2">Updates:</h4>
                      <div className="space-y-2">
                        {report.comments.map((comment, index) => (
                          <div key={index} className="bg-blue-50 p-2 rounded-lg text-sm">
                            <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                              <span>Water Department</span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatDate(new Date(report.timestamp.getTime() + 3600000 * index))}
                              </span>
                            </div>
                            {comment}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-between">
                    <div className="text-xs text-gray-500 flex items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
                        ID: {report.id}
                      </div>
                    </div>
                    <button className="text-sm text-water hover:underline">View Details</button>
                  </div>
                </div>
                
                {report.status === 'resolved' && (
                  <div className="bg-green-50 p-3 border-t border-green-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-safety-green flex items-center justify-center mr-2">
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm text-green-800">Resolved on {formatDate(new Date(report.timestamp.getTime() + 86400000))}</span>
                    </div>
                    <button className="text-xs text-green-700 hover:underline">Rate Solution</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 animate-fade-in">
            <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <MessageCircle className="h-6 w-6 text-gray-400" />
            </div>
            <p>You don't have any reports yet.</p>
            <button className="mt-3 text-water hover:underline text-sm">Report an Issue</button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyReports;
