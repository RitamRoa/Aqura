
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Language, translate } from '@/utils/languageUtils';
import { 
  Map as MapIcon, 
  Layers, 
  MapPin, 
  Droplet,
  CloudRain, 
  Building
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Placeholder for where you would store your Mapbox token
// In production, this should come from environment variables
const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN_HERE';  // Replace with actual token or env var

interface InteractiveMapProps {
  language: Language;
  center?: [number, number]; // Longitude, latitude
  zoom?: number;
}

interface MapLayer {
  id: string;
  name: {
    en: string;
    hi: string;
    kn: string;
  };
  icon: React.ReactNode;
  color: string;
  visible: boolean;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  language, 
  center = [77.5946, 12.9716], // Default to Bangalore
  zoom = 11 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [viewMode, setViewMode] = useState<'standard' | 'satellite'>('standard');
  
  const [layers, setLayers] = useState<MapLayer[]>([
    {
      id: 'issues',
      name: {
        en: 'Reported Issues',
        hi: 'रिपोर्ट की गई समस्याएं',
        kn: 'ವರದಿ ಮಾಡಿದ ಸಮಸ್ಯೆಗಳು'
      },
      icon: <MapPin size={16} />,
      color: 'bg-coral-light',
      visible: true
    },
    {
      id: 'flood',
      name: {
        en: 'Flood Zones',
        hi: 'बाढ़ क्षेत्र',
        kn: 'ಪ್ರವಾಹ ವಲಯಗಳು'
      },
      icon: <CloudRain size={16} />,
      color: 'bg-lavender-light',
      visible: true
    },
    {
      id: 'groundwater',
      name: {
        en: 'Groundwater Levels',
        hi: 'भूजल स्तर',
        kn: 'ಅಂತರ್ಜಲ ಮಟ್ಟಗಳು'
      },
      icon: <Droplet size={16} />,
      color: 'bg-teal-light',
      visible: true
    },
    {
      id: 'offices',
      name: {
        en: 'BWSSB Offices',
        hi: 'BWSSB कार्यालय',
        kn: 'BWSSB ಕಚೇರಿಗಳು'
      },
      icon: <Building size={16} />,
      color: 'bg-mint-light',
      visible: true
    }
  ]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: viewMode === 'satellite' 
        ? 'mapbox://styles/mapbox/satellite-v9' 
        : 'mapbox://styles/mapbox/light-v11',
      center: center,
      zoom: zoom,
      projection: 'mercator'
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }), 'top-right');
    
    map.current.on('load', () => {
      setMapReady(true);
      
      // Example: Add a heatmap layer for groundwater levels
      // In a real app, this would pull from your backend API
      if (map.current) {
        map.current.addSource('groundwater', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [] // This would be populated with real data
          }
        });
        
        map.current.addLayer({
          id: 'groundwater-heat',
          type: 'heatmap',
          source: 'groundwater',
          paint: {
            'heatmap-weight': ['get', 'level'],
            'heatmap-intensity': 0.8,
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(0,0,255,0)',
              0.2, '#B2EBF2',
              0.4, '#4DD0E1',
              0.6, '#00ACC1',
              0.8, '#00838F'
            ],
            'heatmap-radius': 15,
            'heatmap-opacity': 0.9
          },
          layout: {
            visibility: layers.find(l => l.id === 'groundwater')?.visible ? 'visible' : 'none'
          }
        });
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Handle view mode toggle
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(
        viewMode === 'satellite' 
          ? 'mapbox://styles/mapbox/satellite-v9' 
          : 'mapbox://styles/mapbox/light-v11'
      );
    }
  }, [viewMode]);

  // Handle layer visibility
  useEffect(() => {
    if (!mapReady || !map.current) return;
    
    // Update layer visibility based on state
    layers.forEach(layer => {
      if (map.current?.getLayer(layer.id + '-layer')) {
        map.current.setLayoutProperty(
          layer.id + '-layer',
          'visibility',
          layer.visible ? 'visible' : 'none'
        );
      }
      
      // For heatmap layers
      if (map.current?.getLayer(layer.id + '-heat')) {
        map.current.setLayoutProperty(
          layer.id + '-heat',
          'visibility',
          layer.visible ? 'visible' : 'none'
        );
      }
    });
  }, [layers, mapReady]);

  const toggleLayer = (layerId: string) => {
    setLayers(prevLayers => 
      prevLayers.map(layer => 
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover-effect">
      <div className="p-4 bg-gradient-mint text-foreground flex justify-between items-center">
        <div className="flex items-center">
          <MapIcon className="mr-2 animate-pulse-soft" size={20} />
          <h3 className="font-medium">{translate(
            viewMode === 'satellite' ? 'satelliteView' : 'mapView', 
            language
          )}</h3>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className={viewMode === 'standard' ? "bg-white" : ""}
            onClick={() => setViewMode('standard')}
          >
            <MapIcon size={16} className="mr-1" />
            <span className="hidden sm:inline">Standard</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={viewMode === 'satellite' ? "bg-white" : ""}
            onClick={() => setViewMode('satellite')}
          >
            <Layers size={16} className="mr-1" />
            <span className="hidden sm:inline">Satellite</span>
          </Button>
        </div>
      </div>
      
      <div className="relative h-[400px] w-full">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Map is initializing overlay */}
        {!mapReady && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <div className="animate-pulse text-water">
              <Droplet className="w-10 h-10 mx-auto mb-2 animate-bounce-subtle" />
              <p>Loading map...</p>
            </div>
          </div>
        )}
        
        {/* Layer toggles */}
        <div className="absolute top-2 left-2 z-10 bg-white/90 rounded-md p-2 shadow-md max-w-xs">
          <div className="text-xs font-medium mb-1 text-gray-500">
            <Layers size={12} className="inline mr-1" />
            {translate('mapLayers', language) || 'Map Layers'}
          </div>
          <div className="flex flex-wrap gap-2">
            {layers.map((layer) => (
              <Badge
                key={layer.id}
                className={`cursor-pointer transition-all ${layer.color} ${
                  layer.visible ? 'opacity-100' : 'opacity-50'
                } hover:opacity-100`}
                onClick={() => toggleLayer(layer.id)}
              >
                {layer.icon}
                <span className="ml-1">{layer.name[language]}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t flex justify-between items-center text-xs text-gray-500">
        <span>
          {userLocation 
            ? `${userLocation[1].toFixed(4)}, ${userLocation[0].toFixed(4)}`
            : translate('clickMapToSelectLocation', language) || 'Click map to select a location'}
        </span>
        <span className="flex items-center">
          <MapPin size={12} className="mr-1" />
          <span>Bangalore, Karnataka</span>
        </span>
      </div>
    </div>
  );
};

export default InteractiveMap;
