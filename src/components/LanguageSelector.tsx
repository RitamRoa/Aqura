
import React from 'react';
import { Button } from '@/components/ui/button';
import { Language } from '@/utils/languageUtils';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? 'default' : 'outline'}
          size="sm"
          onClick={() => onLanguageChange(lang.code as Language)}
          className={`transition-all duration-300 ${
            currentLanguage === lang.code 
              ? 'bg-gradient-to-r from-teal to-lavender text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-gray-700 border-white/50'
          }`}
        >
          <span className={`${currentLanguage === lang.code ? 'animate-pulse-soft' : ''}`}>
            {lang.name}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
