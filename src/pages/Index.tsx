
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Language, translate, getDefaultLanguage } from '@/utils/languageUtils';
import LanguageSelector from '@/components/LanguageSelector';
import ChatInterface from '@/components/ChatInterface';
import ReportIssue from '@/components/ReportIssue';
import StatusDashboard from '@/components/StatusDashboard';
import MyReports from '@/components/MyReports';
import GetHelp from '@/components/GetHelp';
import InteractiveMap from '@/components/InteractiveMap';
import { Droplet, MessageCircle, MapPin, DropletIcon, Shield, Map } from 'lucide-react';

const Index = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('chat');

  useEffect(() => {
    // Set default language based on browser language
    setLanguage(getDefaultLanguage());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-water">
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-teal-dark to-lavender-dark text-white transition-colors duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between animate-fade-in">
            <div className="flex items-center mb-4 md:mb-0 interactive-hover">
              <Droplet className="h-8 w-8 mr-2 animate-bounce-subtle text-teal-light" />
              <div>
                <h1 className="text-2xl font-bold gradient-text from-teal-light to-lavender-light">
                  {translate('appName', language)}
                </h1>
                <p className="text-sm text-blue-100">{translate('tagline', language)}</p>
              </div>
            </div>
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={setLanguage} 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chatbot Column */}
          <div className="lg:col-span-1 animate-slide-in-right">
            <ChatInterface 
              language={language} 
              onSelectTab={(tab) => {
                setActiveTab(tab);
              }}
            />
          </div>

          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-5 mb-8 bg-white/80 rounded-lg shadow-inner">
                <TabsTrigger value="chat" className="flex gap-2 data-[state=active]:bg-coral-light data-[state=active]:text-white">
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="report" className="flex gap-2 data-[state=active]:bg-sunrise-dark data-[state=active]:text-white">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">{translate('reportIssue', language)}</span>
                </TabsTrigger>
                <TabsTrigger value="status" className="flex gap-2 data-[state=active]:bg-mint-dark data-[state=active]:text-white">
                  <DropletIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{translate('waterStatus', language)}</span>
                </TabsTrigger>
                <TabsTrigger value="map" className="flex gap-2 data-[state=active]:bg-teal-dark data-[state=active]:text-white">
                  <Map className="h-4 w-4" />
                  <span className="hidden sm:inline">Map</span>
                </TabsTrigger>
                <TabsTrigger value="help" className="flex gap-2 data-[state=active]:bg-lavender-dark data-[state=active]:text-white">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">{translate('getHelp', language)}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="animate-fade-slide-up">
                <StatusDashboard language={language} />
              </TabsContent>

              <TabsContent value="report" className="animate-fade-slide-up">
                <ReportIssue language={language} />
              </TabsContent>

              <TabsContent value="status" className="animate-fade-slide-up">
                <StatusDashboard language={language} />
              </TabsContent>

              <TabsContent value="map" className="animate-fade-slide-up">
                <InteractiveMap language={language} />
              </TabsContent>

              <TabsContent value="help" className="animate-fade-slide-up">
                <GetHelp language={language} />
              </TabsContent>
            </Tabs>

            {/* My Reports Section */}
            <div className="mt-8 animate-fade-in">
              <MyReports language={language} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer with gradient */}
      <footer className="bg-gradient-to-r from-teal-light/20 to-lavender-light/20 border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0 interactive-hover">
              <Droplet className="h-5 w-5 mr-2 text-teal-dark" />
              <span className="text-sm text-gray-600">{translate('appName', language)} © 2025</span>
            </div>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-lavender-dark hover:text-lavender transition-colors duration-200">About</a>
              <a href="#" className="text-teal-dark hover:text-teal transition-colors duration-200">Privacy</a>
              <a href="#" className="text-coral-dark hover:text-coral transition-colors duration-200">Terms</a>
              <a href="#" className="text-mint-dark hover:text-mint transition-colors duration-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
