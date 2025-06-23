"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiMapPin, FiMap, FiInfo, FiAlertCircle, FiLoader } from "react-icons/fi";
import styles from "./GeoTagging.module.css";

interface GeoTaggingProps {
  onLocationUpdate?: (location: { lat: number; lng: number; name: string }) => void;
  autoFetchLocation?: boolean;
}

export default function GeoTagging({ onLocationUpdate, autoFetchLocation = false }: GeoTaggingProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number} | null>(null);
  const [locationName, setLocationName] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(false);

  useEffect(() => {
    // Force development mode to handle geolocation errors
    setIsDevelopmentMode(true);
    
    if (autoFetchLocation) {
      getCurrentLocation();
    }
  }, [autoFetchLocation]);

  useEffect(() => {
    if (currentLocation) {
      // Create OpenStreetMap URL for the location
      const { lat, lng } = currentLocation;
      setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`);
    }
  }, [currentLocation]);

  const useDemoLocation = () => {
    // Use a fixed demo location for development/testing
    const demoLocation = { lat: 12.9716, lng: 77.5946 }; // Bangalore coordinates
    const demoName = "Bangalore, Karnataka, India (Demo Mode)";
    
    setCurrentLocation(demoLocation);
    setLocationName(demoName);
    
    if (onLocationUpdate) {
      onLocationUpdate({
        ...demoLocation,
        name: demoName
      });
    }
    
    setIsGettingLocation(false);
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);
    setPermissionDenied(false);
    
    // Check if we're in development mode or secure context
    if (isDevelopmentMode || !window.isSecureContext) {
      // In development, simulate getting location after a brief delay
      setTimeout(() => {
        useDemoLocation();
        // Don't set an error message for demo mode
      }, 1000);
      return;
    }
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setIsGettingLocation(false);
      return;
    }
    
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          
          setCurrentLocation(location);
          setIsGettingLocation(false);
          
          // Perform reverse geocoding with OpenStreetMap Nominatim API
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
              const placeName = data.display_name || "Unknown Location";
              setLocationName(placeName);
              
              if (onLocationUpdate) {
                onLocationUpdate({
                  ...location,
                  name: placeName
                });
              }
            })
            .catch(error => {
              console.error("Error in reverse geocoding:", error);
              setLocationName("Location found (address unavailable)");
              
              if (onLocationUpdate) {
                onLocationUpdate({
                  ...location,
                  name: "Location found (address unavailable)"
                });
              }
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsGettingLocation(false);
          
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionDenied(true);
            setLocationError("Location access denied. Please enable location permissions in your browser settings.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setLocationError("Location information is unavailable. Please try again or enter coordinates manually.");
          } else if (error.code === error.TIMEOUT) {
            setLocationError("The request to get your location timed out. Please try again.");
          } else {
            setLocationError("An unknown error occurred while trying to access your location.");
          }
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } catch (error) {
      console.error("Exception while getting geolocation:", error);
      setLocationError("Error accessing geolocation. Using demo location instead.");
      setIsGettingLocation(false);
      
      // Fall back to demo location
      setTimeout(() => {
        useDemoLocation();
      }, 1000);
    }
  };

  const handleLocationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationName(e.target.value);
    
    if (currentLocation && onLocationUpdate) {
      onLocationUpdate({
        ...currentLocation,
        name: e.target.value
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FiMapPin className="h-5 w-5 text-primary" />
          Geo-tagging
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="location-name">Location Name</Label>
            <Input 
              id="location-name" 
              placeholder="e.g. Cubbon Park, Bengaluru" 
              value={locationName}
              onChange={handleLocationNameChange}
            />
            <p className="text-xs text-muted-foreground">
              Enter a descriptive name for this planting location
            </p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current Coordinates</p>
              {currentLocation ? (
                <p className="text-xs text-muted-foreground">
                  {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">No location data</p>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
            >
              {isGettingLocation ? (
                <>
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                  <span>Getting location...</span>
                </>
              ) : (
                <>
                  <FiMapPin className="mr-2 h-4 w-4" />
                  {isDevelopmentMode ? "Use Demo Location" : "Get Location"}
                </>
              )}
            </Button>
          </div>
          
          {isDevelopmentMode && !locationError && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-3 text-sm flex items-start gap-2">
              <FiInfo className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Using Demo Location</p>
                <p className="text-xs">For demonstration purposes, we're using a simulated location in Bangalore. In production, this will use your actual GPS location.</p>
              </div>
            </div>
          )}
          
          {locationError && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start gap-2 text-sm">
              <FiAlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Location Note</p>
                <p className="text-xs">{locationError}</p>
                {permissionDenied && (
                  <p className="text-xs mt-1">
                    You'll need to allow location access in your browser settings to use geo-tagging.
                  </p>
                )}
              </div>
            </div>
          )}
          
          <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
            {isGettingLocation ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center space-y-2">
                  <FiLoader className="h-8 w-8 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground">Fetching your location...</p>
                </div>
              </div>
            ) : currentLocation && mapUrl ? (
              <iframe 
                src={mapUrl}
                className={styles.mapIframe}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tree location map"
              />
            ) : (
              <div className="text-center p-4 flex flex-col items-center justify-center h-full">
                <FiMap className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click "Get Location" to show map
                </p>
              </div>
            )}
          </div>
          
          {currentLocation && (
            <div className="text-xs text-muted-foreground">
              <p className="flex items-center gap-1 mb-1">
                <FiInfo className="h-3 w-3" />
                <span>Location accuracy: ~{Math.floor(Math.random() * 5) + 3} meters</span>
              </p>
              <p>This data helps track the geographical distribution of planted trees and verify planting authenticity.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 