
import { translate } from './languageUtils';

export interface WaterStatus {
  id: string;
  type: 'quality' | 'flood' | 'rainfall' | 'supply';
  status: 'safe' | 'caution' | 'danger';
  value: number | string;
  unit?: string;
  location: string;
  timestamp: Date;
  advisory?: string;
}

export interface Report {
  id: string;
  userId: string;
  issueType: string;
  location: string;
  description: string;
  status: 'pending' | 'inProgress' | 'resolved';
  timestamp: Date;
  imageUrl?: string;
  comments?: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: string;
}

export const getWaterStatuses = (): WaterStatus[] => {
  return [
    {
      id: '1',
      type: 'quality',
      status: 'caution',
      value: 'Moderate',
      location: 'Central District',
      timestamp: new Date(Date.now() - 3600000),
      advisory: 'Boil water before consumption',
    },
    {
      id: '2',
      type: 'flood',
      status: 'danger',
      value: 'High',
      location: 'Riverside Area',
      timestamp: new Date(),
      advisory: 'Evacuation advised for low-lying areas',
    },
    {
      id: '3',
      type: 'rainfall',
      status: 'safe',
      value: 25,
      unit: 'mm',
      location: 'City Center',
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: '4',
      type: 'supply',
      status: 'safe',
      value: 'Normal',
      location: 'All Districts',
      timestamp: new Date(Date.now() - 1800000),
    },
  ];
};

export const getUserReports = (): Report[] => {
  return [
    {
      id: '1',
      userId: 'user1',
      issueType: 'Contamination',
      location: 'Gandhi Nagar',
      description: 'Water appears brown with unusual smell',
      status: 'inProgress',
      timestamp: new Date(Date.now() - 86400000),
      comments: ['Water department notified', 'Testing in progress'],
    },
    {
      id: '2',
      userId: 'user1',
      issueType: 'No Supply',
      location: 'Jayanagar',
      description: 'No water supply since yesterday evening',
      status: 'resolved',
      timestamp: new Date(Date.now() - 172800000),
      comments: ['Pipe leak fixed', 'Supply restored'],
    },
    {
      id: '3',
      userId: 'user1',
      issueType: 'Leakage',
      location: 'Indiranagar',
      description: 'Water leaking from main pipe on 5th main',
      status: 'pending',
      timestamp: new Date(Date.now() - 3600000),
    },
  ];
};

export const getEmergencyContacts = (): EmergencyContact[] => {
  return [
    {
      id: '1',
      name: 'Water Emergency Helpline',
      number: '1800-425-2255',
      type: 'water',
    },
    {
      id: '2',
      name: 'Flood Control Room',
      number: '1800-233-4567',
      type: 'flood',
    },
    {
      id: '3',
      name: 'Water Quality Complaints',
      number: '1800-498-7890',
      type: 'quality',
    },
  ];
};

export const getChatbotSuggestions = (language: 'en' | 'hi' | 'kn') => {
  return [
    {
      text: translate('reportIssue', language),
      action: 'report',
    },
    {
      text: translate('waterStatus', language),
      action: 'status',
    },
    {
      text: translate('getHelp', language),
      action: 'help',
    },
  ];
};
