export type Language = 'en' | 'hi' | 'kn';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    kn: string;
  };
}

export const translations: Translations = {
  appName: {
    en: 'Jal Saathi Seva',
    hi: 'जल साथी सेवा',
    kn: 'ಜಲ ಸಾಥಿ ಸೇವೆ',
  },
  tagline: {
    en: 'Community Water Watch',
    hi: 'सामुदायिक जल निगरानी',
    kn: 'ಸಮುದಾಯ ನೀರು ನಿಗಾ',
  },
  reportIssue: {
    en: 'Report Issue',
    hi: 'समस्या बताएं',
    kn: 'ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ',
  },
  waterStatus: {
    en: 'Water Status',
    hi: 'जल स्थिति',
    kn: 'ನೀರಿನ ಸ್ಥಿತಿ',
  },
  myReports: {
    en: 'My Reports',
    hi: 'मेरी रिपोर्ट्स',
    kn: 'ನನ್ನ ವರದಿಗಳು',
  },
  getHelp: {
    en: 'Get Help',
    hi: 'सहायता प्राप्त करें',
    kn: 'ಸಹಾಯ ಪಡೆಯಿರಿ',
  },
  welcomeMessage: {
    en: 'Welcome to Jal Saathi Seva. How can I assist you today?',
    hi: 'जल साथी सेवा में आपका स्वागत है। आज मैं आपकी कैसे सहायता कर सकता हूँ?',
    kn: 'ಜಲ ಸಾಥಿ ಸೇವೆಗೆ ಸುಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಇಂದು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
  },
  chatPlaceholder: {
    en: 'Type your message...',
    hi: 'अपना संदेश टाइप करें...',
    kn: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...',
  },
  send: {
    en: 'Send',
    hi: 'भेजें',
    kn: 'ಕಳುಹಿಸಿ',
  },
  waterQuality: {
    en: 'Water Quality',
    hi: 'जल गुणवत्ता',
    kn: 'ನೀರಿನ ಗುಣಮಟ್ಟ',
  },
  floodRisk: {
    en: 'Flood Risk',
    hi: 'बाढ़ का खतरा',
    kn: 'ಪ್ರವಾಹದ ಅಪಾಯ',
  },
  rainfall: {
    en: 'Rainfall',
    hi: 'वर्षा',
    kn: 'ಮಳೆ',
  },
  waterSupply: {
    en: 'Water Supply',
    hi: 'जलापूर्ति',
    kn: 'ನೀರಿನ ಸರಬರಾಜು',
  },
  issueType: {
    en: 'Issue Type',
    hi: 'समस्या का प्रकार',
    kn: 'ಸಮಸ್ಯೆಯ ಪ್ರಕಾರ',
  },
  location: {
    en: 'Location',
    hi: 'स्थान',
    kn: 'ಸ್ಥಳ',
  },
  description: {
    en: 'Description',
    hi: 'विवरण',
    kn: 'ವಿವರಣೆ',
  },
  submit: {
    en: 'Submit',
    hi: 'जमा करें',
    kn: 'ಸಲ್ಲಿಸಿ',
  },
  pending: {
    en: 'Pending',
    hi: 'लंबित',
    kn: 'ಬಾಕಿ ಇದೆ',
  },
  inProgress: {
    en: 'In Progress',
    hi: 'प्रगति पर',
    kn: 'ಪ್ರಗತಿಯಲ್ಲಿದೆ',
  },
  resolved: {
    en: 'Resolved',
    hi: 'हल किया गया',
    kn: 'ಬಗೆಹರಿಸಲಾಗಿದೆ',
  },
  emergency: {
    en: 'Emergency',
    hi: 'आपातकाल',
    kn: 'ತುರ್ತು',
  },
  safe: {
    en: 'Safe',
    hi: 'सुरक्षित',
    kn: 'ಸುರಕ್ಷಿತ',
  },
  caution: {
    en: 'Caution',
    hi: 'सावधानी',
    kn: 'ಎಚ್ಚರಿಕೆ',
  },
  danger: {
    en: 'Danger',
    hi: 'खतरा',
    kn: 'ಅಪಾಯ',
  },
  useCurrentLocation: {
    en: 'Use Current Location',
    hi: 'वर्तमान स्थान का उपयोग करें',
    kn: 'ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಬಳಸಿ',
  },
  uploadImage: {
    en: 'Upload Image',
    hi: 'छवि अप���ोड करें',
    kn: 'ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
  },
  reportSubmitted: {
    en: 'Report Submitted',
    hi: 'रिपोर्ट जमा की गई',
    kn: 'ವರದಿ ಸಲ್ಲಿಸಲಾಗಿದೆ',
  },
  contactEmergency: {
    en: 'Contact Emergency Services',
    hi: 'आपातकालीन सेवाओं से संपर्क करें',
    kn: 'ತುರ್ತು ಸೇವೆಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ',
  },
  emergencyNumber: {
    en: 'Emergency Number',
    hi: 'आपातकालीन नंबर',
    kn: 'ತುರ್ತು ಸಂಖ್ಯೆ',
  },
  boilWater: {
    en: 'Boil Water Advisory',
    hi: 'पानी उबालने की सलाह',
    kn: 'ನೀರು ಕುದಿಸುವ ಸಲಹೆ',
  },
  avoidTapWater: {
    en: 'Avoid Tap Water',
    hi: 'नल के पानी से बचें',
    kn: 'ನಲ್ಲಿಯ ನೀರನ್ನು ತಪ್ಪಿಸಿ',
  },
  mapView: {
    en: 'Map View',
    hi: 'मानचित्र दृश्य',
    kn: 'ನಕ್ಷೆ ವೀಕ್ಷಣೆ',
  },
  satelliteView: {
    en: 'Satellite View',
    hi: 'उपग्रह दृश्य',
    kn: 'ಉಪಗ್ರಹ ನೋಟ',
  },
  mapLayers: {
    en: 'Map Layers',
    hi: 'मानचित्र परतें',
    kn: 'ನಕ್ಷೆ ಪದರಗಳು',
  },
  reportedIssues: {
    en: 'Reported Issues',
    hi: 'रिपोर्ट की गई समस्याएं',
    kn: 'ವರದಿ ಮಾಡಿದ ಸಮಸ್ಯೆಗಳು',
  },
  floodZones: {
    en: 'Flood Zones',
    hi: 'बाढ़ क्षेत्र',
    kn: 'ಪ್ರವಾಹ ವಲಯಗಳು',
  },
  groundwaterLevels: {
    en: 'Groundwater Levels',
    hi: 'भूजल स्तर',
    kn: 'ಅಂತರ್ಜಲ ಮಟ್ಟಗಳು',
  },
  bwssbOffices: {
    en: 'BWSSB Offices',
    hi: 'BWSSB कार्यालय',
    kn: 'BWSSB ಕಚೇರಿಗಳು',
  },
  clickMapToSelectLocation: {
    en: 'Click map to select a location',
    hi: 'स्थान चुनने के लिए मानचित्र पर क्लिक करें',
    kn: 'ಸ್ಥಳವನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ನಕ್ಷೆಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ',
  },
  viewReportDetails: {
    en: 'View Report Details',
    hi: 'रिपोर्ट विवरण देखें',
    kn: 'ವರದಿ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
  },
  chatWithBot: {
    en: 'Chat with water assistant',
    hi: 'जल सहायक के साथ चैट करें',
    kn: 'ನೀರಿನ ಸಹಾಯಕದೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ',
  },
};

export const translate = (key: string, language: Language): string => {
  if (translations[key] && translations[key][language]) {
    return translations[key][language];
  }
  return key;
};

export const getDefaultLanguage = (): Language => {
  // Check if browser language is available in our translations
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'hi' || browserLang === 'kn') {
    return browserLang as Language;
  }
  return 'en';
};
