import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Language, translate } from '@/utils/languageUtils';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Upload, Check } from 'lucide-react';

interface ReportIssueProps {
  language: Language;
}

const ReportIssue: React.FC<ReportIssueProps> = ({ language }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    issueType: '',
    location: '',
    description: '',
    image: null as File | null,
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const issueTypes = [
    'Contamination',
    'No Supply',
    'Leakage',
    'Low Pressure',
    'Flooding',
    'Other',
  ];

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      setIsSubmitting(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          });
          setIsSubmitting(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: 'Location Error',
            description: 'Unable to get your current location. Please enter manually.',
            variant: 'destructive',
          });
          setIsSubmitting(false);
        }
      );
    } else {
      toast({
        title: 'Location Not Supported',
        description: 'Geolocation is not supported by your browser. Please enter location manually.',
        variant: 'destructive',
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: translate('reportSubmitted', language),
        description: 'Your water issue report has been submitted successfully. You can track its status in My Reports.',
        duration: 5000,
      });
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          issueType: '',
          location: '',
          description: '',
          image: null,
        });
      }, 3000);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-water-default flex items-center">
          <MapPin className="mr-2" size={20} />
          {translate('reportIssue', language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="py-8 text-center animate-scale-in">
            <div className="mx-auto h-12 w-12 rounded-full bg-safety-green/10 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-safety-green" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {translate('reportSubmitted', language)}
            </h3>
            <p className="text-sm text-gray-500">
              Thank you for reporting the issue. You can track its progress in the My Reports section.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium mb-1">
                {translate('issueType', language)}
              </label>
              <Select
                value={formData.issueType}
                onValueChange={(value) => handleChange('issueType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`${translate('issueType', language)}...`} />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                {translate('location', language)}
              </label>
              <div className="flex gap-2">
                <Input
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder={`${translate('location', language)}...`}
                  className="flex-1"
                  required
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleLocationDetect}
                  disabled={isSubmitting}
                >
                  <MapPin className="mr-1" size={16} />
                  {translate('useCurrentLocation', language)}
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                {translate('description', language)}
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder={`${translate('description', language)}...`}
                className="min-h-[100px]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                {translate('uploadImage', language)}
              </label>
              <div className="border rounded-md p-4 border-dashed text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {formData.image 
                        ? formData.image.name 
                        : 'Click to upload image (optional)'}
                    </span>
                  </div>
                </label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-water-default hover:bg-water-dark transition-colors duration-300" 
              disabled={isSubmitting || !formData.issueType || !formData.location || !formData.description}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                  {translate('submit', language)}...
                </div>
              ) : (
                translate('submit', language)
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportIssue;
