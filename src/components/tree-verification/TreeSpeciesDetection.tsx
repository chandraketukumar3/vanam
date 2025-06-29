"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiLoader, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { RiPlantLine } from "react-icons/ri";
import { geminiService, type PlantDetectionResult } from "@/lib/gemini";
import styles from "./TreeSpeciesDetection.module.css";

interface TreeSpeciesDetectionProps {
  imageUrl: string | null;
  imageFile?: File | null;
  onDetectionComplete?: (results: PlantDetectionResult) => void;
}

export default function TreeSpeciesDetection({ 
  imageUrl, 
  imageFile,
  onDetectionComplete 
}: TreeSpeciesDetectionProps) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResults, setDetectionResults] = useState<PlantDetectionResult | null>(null);

  const detectSpecies = async () => {
    if (!imageUrl && !imageFile) return;
    
    setIsDetecting(true);
    setDetectionResults(null);
    
    try {
      let results: PlantDetectionResult;
      
      if (imageFile) {
        // Use the File object directly for better quality
        results = await geminiService.detectPlantSpecies(imageFile);
      } else if (imageUrl) {
        // Use the image URL
        results = await geminiService.detectPlantSpecies(imageUrl);
      } else {
        throw new Error('No image provided');
      }
      
      setDetectionResults(results);
      
      if (onDetectionComplete) {
        onDetectionComplete(results);
      }
    } catch (error) {
      console.error('Detection failed:', error);
      const errorResult: PlantDetectionResult = {
        species: {
          name: "Detection Failed",
          scientificName: "Unknown",
          confidence: 0,
          family: "Unknown",
          nativeRegions: [],
          characteristics: [],
          description: error instanceof Error ? error.message : 'Unknown error occurred'
        },
        alternativePossibilities: [],
        isPlant: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
      setDetectionResults(errorResult);
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RiPlantLine className="h-5 w-5 text-primary" />
          Tree Species Detection
          {!geminiService.isConfigured() && (
            <FiAlertCircle className="h-4 w-4 text-amber-500" title="Gemini AI not configured" />
          )}
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
                <div className="flex items-center gap-2">
                  {detectionResults.isPlant ? (
                    <FiCheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <FiAlertCircle className="h-4 w-4 text-amber-500" />
                  )}
                  <h3 className={`font-medium text-lg ${
                    detectionResults.isPlant ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {detectionResults.species.name}
                  </h3>
                </div>
                
                {detectionResults.isPlant && (
                  <>
                    <p className="text-xs text-muted-foreground">
                      Scientific name: <span className="italic">{detectionResults.species.scientificName}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-2 bg-muted rounded-full w-24 overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${detectionResults.species.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{detectionResults.species.confidence.toFixed(1)}% confidence</span>
                    </div>
                  </>
                )}
                
                {detectionResults.error && (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded text-xs">
                    <FiAlertCircle className="h-3 w-3" />
                    <span>{detectionResults.error}</span>
                  </div>
                )}
                
                {detectionResults.alternativePossibilities.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">Alternative possibilities:</p>
                    <div className="space-y-1 mt-1">
                      {detectionResults.alternativePossibilities.map((alt, index: number) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="truncate">{alt.name}</span>
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
                  disabled={(!imageUrl && !imageFile) || !geminiService.isConfigured()}
                  className="w-full"
                >
                  <RiPlantLine className="mr-2 h-4 w-4" />
                  Detect Species
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {!geminiService.isConfigured() 
                    ? "Please configure Gemini API key in .env.local"
                    : "Our AI will analyze the image to identify the tree species"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
        
        {detectionResults && detectionResults.isPlant && (
          <div className="bg-muted/30 rounded-lg p-3 text-sm space-y-2">
            <h4 className="font-medium mb-1">About this species:</h4>
            
            {detectionResults.species.description && (
              <p className="text-xs text-muted-foreground">
                {detectionResults.species.description}
              </p>
            )}
            
            <ul className="text-xs space-y-1 text-muted-foreground">
              {detectionResults.species.family && detectionResults.species.family !== "Unknown" && (
                <li><span className="font-medium">Family:</span> {detectionResults.species.family}</li>
              )}
              {detectionResults.species.nativeRegions.length > 0 && (
                <li><span className="font-medium">Native to:</span> {detectionResults.species.nativeRegions.join(", ")}</li>
              )}
              {detectionResults.species.characteristics.length > 0 && (
                <li><span className="font-medium">Key features:</span> {detectionResults.species.characteristics.join(", ")}</li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 