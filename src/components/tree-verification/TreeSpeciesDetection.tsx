"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiLoader } from "react-icons/fi";
import { RiPlantLine } from "react-icons/ri";

interface TreeSpeciesDetectionProps {
  imageUrl: string | null;
  onDetectionComplete?: (results: any) => void;
}

export default function TreeSpeciesDetection({ 
  imageUrl, 
  onDetectionComplete 
}: TreeSpeciesDetectionProps) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResults, setDetectionResults] = useState<any>(null);

  const detectSpecies = () => {
    if (!imageUrl) return;
    
    setIsDetecting(true);
    
    // Simulate API call for species detection
    setTimeout(() => {
      // Mock detection results
      const results = {
        species: {
          name: "Neem Tree (Azadirachta indica)",
          scientificName: "Azadirachta indica",
          confidence: 92.5,
          family: "Meliaceae",
          nativeRegions: ["India", "Southeast Asia"],
          characteristics: [
            "Evergreen tree",
            "Compound leaves",
            "Small white flowers",
            "Medicinal properties"
          ]
        },
        alternativePossibilities: [
          {
            name: "Indian Lilac",
            confidence: 4.2
          },
          {
            name: "Mahogany",
            confidence: 2.1
          }
        ]
      };
      
      setDetectionResults(results);
      setIsDetecting(false);
      
      if (onDetectionComplete) {
        onDetectionComplete(results);
      }
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RiPlantLine className="h-5 w-5 text-primary" />
          Tree Species Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Tree image"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">No image uploaded</p>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {isDetecting ? (
              <div className="flex flex-col items-center justify-center h-full">
                <FiLoader className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm">Analyzing tree species...</p>
              </div>
            ) : detectionResults ? (
              <div className="space-y-2">
                <h3 className="font-medium text-lg text-primary">
                  {detectionResults.species.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Scientific name: <span className="italic">{detectionResults.species.scientificName}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-2 bg-primary rounded-full w-24 overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${detectionResults.species.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{detectionResults.species.confidence.toFixed(1)}% match</span>
                </div>
                
                {detectionResults.alternativePossibilities.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">Alternative matches:</p>
                    <div className="space-y-1 mt-1">
                      {detectionResults.alternativePossibilities.map((alt: any, index: number) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span>{alt.name}</span>
                          <span>{alt.confidence.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Button 
                  onClick={detectSpecies} 
                  disabled={!imageUrl}
                  className="w-full"
                >
                  <RiPlantLine className="mr-2 h-4 w-4" />
                  Detect Species
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Our AI will analyze the image to identify the tree species
                </p>
              </div>
            )}
          </div>
        </div>
        
        {detectionResults && (
          <div className="bg-muted/30 rounded-lg p-3 text-sm">
            <h4 className="font-medium mb-1">About this species:</h4>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>Native to: {detectionResults.species.nativeRegions.join(", ")}</li>
              <li>Family: {detectionResults.species.family}</li>
              <li>Characteristics: {detectionResults.species.characteristics.join(", ")}</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 