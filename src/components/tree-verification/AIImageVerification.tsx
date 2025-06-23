"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIBadge } from "@/components/ui/ai-badge";
import { toast } from "sonner";
import { 
  FiCheck, 
  FiX, 
  FiLoader, 
  FiInfo, 
  FiAlertCircle, 
  FiShield, 
  FiGlobe,
  FiImage,
  FiMapPin,
  FiSun
} from "react-icons/fi";

interface AIImageVerificationProps {
  imageUrl: string | null;
  imageFile: File | null;
  locationData: { lat: number; lng: number; name: string } | null;
  onVerificationComplete?: (results: any) => void;
}

export default function AIImageVerification({
  imageUrl,
  imageFile,
  locationData,
  onVerificationComplete
}: AIImageVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<any>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Reset results when image changes
  useEffect(() => {
    setVerificationResults(null);
    setVerificationError(null);
  }, [imageUrl, imageFile]);

  const verifyImage = async () => {
    if (!imageUrl || !imageFile || !locationData) {
      toast.error("Image and location data are required for verification");
      return;
    }
    
    setIsVerifying(true);
    setVerificationError(null);
    
    try {
      // Create a FormData object to send the image and location data
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("latitude", locationData.lat.toString());
      formData.append("longitude", locationData.lng.toString());
      
      // Call the API endpoint
      const response = await fetch("/api/verify-image", {
        method: "POST",
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to verify image");
      }
      
      const results = await response.json();
      
      // Check if the image failed verification
      if (!results.isPassing) {
        if (results.flags.isFromInternet) {
          toast.error("This image appears to be downloaded or reused. Please upload a genuine photo of your planted tree.", {
            duration: 6000
          });
        } else if (results.flags.isManipulated) {
          toast.error("This image appears to be edited or manipulated. Please upload an unedited photo.", {
            duration: 6000
          });
        } else {
          toast.error("Image verification failed. Please ensure you're uploading a genuine photo of a freshly planted tree.", {
            duration: 6000
          });
        }
      }
      
      setVerificationResults(results);
      
      if (onVerificationComplete) {
        onVerificationComplete(results);
      }
    } catch (error) {
      console.error("Error verifying image:", error);
      setVerificationError(error instanceof Error ? error.message : "Failed to verify image");
      toast.error("Error verifying image. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const renderVerificationStatus = () => {
    if (!verificationResults) return null;
    
    const { authenticityScore, flags } = verificationResults;
    
    let statusColor = "bg-green-500";
    let statusIcon = <FiCheck className="h-3 w-3 text-white" />;
    let statusText = "Verified";
    
    if (authenticityScore < 70) {
      statusColor = "bg-red-500";
      statusIcon = <FiX className="h-3 w-3 text-white" />;
      statusText = "Failed";
    } else if (authenticityScore < 85) {
      statusColor = "bg-yellow-500";
      statusIcon = <FiInfo className="h-3 w-3 text-white" />;
      statusText = "Suspicious";
    }
    
    return (
      <div className="flex items-center gap-2">
        <div className={`h-4 w-4 rounded-full ${statusColor} flex items-center justify-center`}>
          {statusIcon}
        </div>
        <span className="font-medium">{statusText}</span>
        <Badge variant={authenticityScore >= 70 ? "outline" : "destructive"} className="ml-auto">
          {authenticityScore.toFixed(1)}% authentic
        </Badge>
      </div>
    );
  };

  const renderCheckItem = (passed: boolean, name: string, details?: string) => (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        {passed ? (
          <FiCheck className="h-4 w-4 text-green-500" />
        ) : (
          <FiX className="h-4 w-4 text-red-500" />
        )}
        <span>{name}</span>
      </div>
      {details && (
        <span className="text-xs text-muted-foreground">
          {details}
        </span>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FiShield className="h-5 w-5 text-primary" />
          AI Anti-Cheat Verification
        </CardTitle>
        <AIBadge variant="outline" />
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
                  <p className="text-sm font-medium">Verifying authenticity...</p>
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
                {renderVerificationStatus()}
                
                <div className="space-y-2">
                  {renderCheckItem(
                    !verificationResults.flags.isFromInternet,
                    "Original Image",
                    verificationResults.flags.isFromInternet ? "Failed" : "Passed"
                  )}
                  
                  {renderCheckItem(
                    verificationResults.results.freshPlantingAnalysis.isLikelyFreshPlanting,
                    "Fresh Planting",
                    `${verificationResults.results.freshPlantingAnalysis.soilFreshness.toFixed(1)}%`
                  )}
                  
                  {renderCheckItem(
                    !verificationResults.results.manipulationDetection.isManipulated,
                    "No Manipulation",
                    verificationResults.results.manipulationDetection.isManipulated ? "Detected" : "Clean"
                  )}
                  
                  {renderCheckItem(
                    verificationResults.results.exifData.hasExif,
                    "EXIF Metadata",
                    verificationResults.results.exifData.hasExif ? "Present" : "Missing"
                  )}
                  
                  {renderCheckItem(
                    !verificationResults.results.locationValidation.possibleSpoof,
                    "Location Authentic",
                    `${verificationResults.results.locationValidation.locationLikelihood}%`
                  )}
                </div>
              </div>
            ) : verificationError ? (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start gap-2 text-sm">
                <FiAlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Verification Error</p>
                  <p className="text-xs">{verificationError}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Button 
                  onClick={verifyImage} 
                  disabled={!imageUrl || !locationData}
                  className="w-full"
                >
                  <FiShield className="mr-2 h-4 w-4" />
                  Verify Authenticity
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Our AI will verify this is a genuine, freshly planted tree
                </p>
              </div>
            )}
          </div>
        </div>
        
        {verificationResults && (
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-3 text-sm">
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <FiInfo className="h-4 w-4 text-primary" />
                Verification Details
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-background/50 p-2 rounded-md">
                  <h5 className="text-xs font-medium flex items-center gap-1 mb-1">
                    <FiGlobe className="h-3 w-3" /> Internet Search
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {verificationResults.results.reverseImageSearch.isFromInternet 
                      ? `Found ${verificationResults.results.reverseImageSearch.similarImages} similar images online` 
                      : "No matches found online"}
                  </p>
                </div>
                
                <div className="bg-background/50 p-2 rounded-md">
                  <h5 className="text-xs font-medium flex items-center gap-1 mb-1">
                    <FiImage className="h-3 w-3" /> Image Analysis
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {verificationResults.results.manipulationDetection.isManipulated
                      ? "Possible manipulation detected"
                      : "No manipulation detected"}
                  </p>
                </div>
                
                <div className="bg-background/50 p-2 rounded-md">
                  <h5 className="text-xs font-medium flex items-center gap-1 mb-1">
                    <FiMapPin className="h-3 w-3" /> Location Check
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {verificationResults.results.locationValidation.possibleSpoof
                      ? "Location may be spoofed"
                      : "Location appears authentic"}
                  </p>
                </div>
                
                <div className="bg-background/50 p-2 rounded-md">
                  <h5 className="text-xs font-medium flex items-center gap-1 mb-1">
                    <FiSun className="h-3 w-3" /> Planting Analysis
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {verificationResults.results.freshPlantingAnalysis.isLikelyFreshPlanting
                      ? "Fresh planting confirmed"
                      : "Not a fresh planting"}
                  </p>
                </div>
              </div>
            </div>
            
            {verificationResults.isPassing ? (
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-300 rounded-md p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <FiCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium">Verification Successful</h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    This image has passed our AI anti-cheat verification
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 rounded-md p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <FiX className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="font-medium">Verification Failed</h4>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {verificationResults.flags.isFromInternet 
                      ? "This image appears to be downloaded from the internet."
                      : verificationResults.flags.isManipulated
                      ? "This image appears to be edited or manipulated."
                      : "This image doesn't meet our verification requirements."}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 