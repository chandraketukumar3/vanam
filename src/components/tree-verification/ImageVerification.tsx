"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiCheck, FiX, FiLoader, FiInfo } from "react-icons/fi";

interface ImageVerificationProps {
  imageUrl: string | null;
  onVerificationComplete?: (results: any) => void;
}

export default function ImageVerification({
  imageUrl,
  onVerificationComplete
}: ImageVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<any>(null);

  const verifyImage = () => {
    if (!imageUrl) return;
    
    setIsVerifying(true);
    
    // Simulate API call for image verification
    setTimeout(() => {
      // Mock verification results
      const results = {
        isAuthentic: true,
        checks: [
          { name: "Real tree detection", passed: true, confidence: 98.2 },
          { name: "Natural soil background", passed: true, confidence: 95.7 },
          { name: "Natural lighting/shadows", passed: true, confidence: 92.1 },
          { name: "EXIF metadata validation", passed: true, details: "Timestamp: Today, 12:45 PM" },
          { name: "Image manipulation check", passed: true, confidence: 99.5 },
        ],
        metadata: {
          captureDate: new Date().toLocaleDateString(),
          captureTime: new Date().toLocaleTimeString(),
          deviceModel: "Simulated Device",
          coordinates: "Available from geo-tagging"
        }
      };
      
      setVerificationResults(results);
      setIsVerifying(false);
      
      if (onVerificationComplete) {
        onVerificationComplete(results);
      }
    }, 2500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FiCheck className="h-5 w-5 text-primary" />
          Image Verification
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
            
            {isVerifying && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <FiLoader className="h-8 w-8 animate-spin text-primary mb-2" />
                  <p className="text-sm font-medium">Verifying image...</p>
                </div>
              </div>
            )}
          </div>
          
          <div>
            {isVerifying ? (
              <div className="space-y-4">
                <div className="h-4 bg-muted/50 rounded animate-pulse"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-2/3"></div>
              </div>
            ) : verificationResults ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {verificationResults.isAuthentic ? (
                    <div className="bg-green-100 text-green-700 p-1 rounded-full">
                      <FiCheck className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="bg-red-100 text-red-700 p-1 rounded-full">
                      <FiX className="h-4 w-4" />
                    </div>
                  )}
                  <span className="font-medium">
                    {verificationResults.isAuthentic 
                      ? "Image verified successfully" 
                      : "Verification failed"}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {verificationResults.checks.map((check: any, index: number) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {check.passed ? (
                          <FiCheck className="h-4 w-4 text-green-500" />
                        ) : (
                          <FiX className="h-4 w-4 text-red-500" />
                        )}
                        <span>{check.name}</span>
                      </div>
                      {check.confidence && (
                        <span className="text-xs text-muted-foreground">
                          {check.confidence.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Button 
                  onClick={verifyImage} 
                  disabled={!imageUrl}
                  className="w-full"
                >
                  <FiCheck className="mr-2 h-4 w-4" />
                  Verify Image
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Our AI will verify the authenticity of your tree image
                </p>
              </div>
            )}
          </div>
        </div>
        
        {verificationResults && (
          <div className="bg-muted/30 rounded-lg p-3 text-sm">
            <h4 className="font-medium mb-1 flex items-center gap-1">
              <FiInfo className="h-4 w-4 text-primary" />
              Image Metadata
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Date: </span>
                {verificationResults.metadata.captureDate}
              </div>
              <div>
                <span className="font-medium">Time: </span>
                {verificationResults.metadata.captureTime}
              </div>
              <div>
                <span className="font-medium">Device: </span>
                {verificationResults.metadata.deviceModel}
              </div>
              <div>
                <span className="font-medium">Location: </span>
                {verificationResults.metadata.coordinates}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 