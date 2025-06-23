"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AIBadge } from "@/components/ui/ai-badge";
import GeoTagging from "@/components/tree-verification/GeoTagging";
import { toast } from "sonner";
import { FiMapPin, FiCheck, FiX, FiLoader } from "react-icons/fi";

// Define a list of tree species for random selection
const treeSpecies = [
  { 
    name: "Neem Tree (Azadirachta indica)", 
    confidence: 92.5,
    nativeRegion: "India, Southeast Asia",
    co2Absorption: "0.02 tons/year",
    lifespan: "50+ years"
  },
  { 
    name: "Banyan Tree (Ficus benghalensis)", 
    confidence: 95.2,
    nativeRegion: "India, Pakistan",
    co2Absorption: "0.05 tons/year",
    lifespan: "100+ years"
  },
  { 
    name: "Peepal Tree (Ficus religiosa)", 
    confidence: 91.8,
    nativeRegion: "India, Southeast Asia",
    co2Absorption: "0.04 tons/year",
    lifespan: "80+ years"
  },
  { 
    name: "Teak (Tectona grandis)", 
    confidence: 89.3,
    nativeRegion: "India, Myanmar",
    co2Absorption: "0.03 tons/year",
    lifespan: "60+ years"
  },
  { 
    name: "Ashoka Tree (Saraca asoca)", 
    confidence: 87.6,
    nativeRegion: "India, Sri Lanka",
    co2Absorption: "0.025 tons/year",
    lifespan: "40+ years"
  },
  { 
    name: "Gulmohar (Delonix regia)", 
    confidence: 94.1,
    nativeRegion: "Madagascar, naturalized in India",
    co2Absorption: "0.035 tons/year",
    lifespan: "30+ years"
  },
  { 
    name: "Mango Tree (Mangifera indica)", 
    confidence: 96.3,
    nativeRegion: "India, Southeast Asia",
    co2Absorption: "0.04 tons/year",
    lifespan: "70+ years"
  }
];

// Function to generate a unique hash from an image URL
function generateImageHash(imageUrl: string): number {
  let hash = 0;
  for (let i = 0; i < imageUrl.length; i++) {
    const char = imageUrl.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export default function UploadVerifyPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [locationData, setLocationData] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [isUploadingToServer, setIsUploadingToServer] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    
    // Reset analysis results and upload status when a new image is uploaded
    setAnalysisResults(null);
    setUploadSuccess(false);
  };

  // Handle location update from GeoTagging component
  const handleLocationUpdate = (location: { lat: number; lng: number; name: string }) => {
    setLocationData(location);
  };

  // Simulate AI analysis using Gemini 2.5 Flash
  const analyzeImage = () => {
    if (!uploadedImage) return;

    if (!locationData) {
      toast.error("Location data is required. Please enable location access.", {
        description: "We need your current location to geo-tag the tree.",
        duration: 5000,
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call delay to Gemini 2.5 Flash
    setTimeout(() => {
      try {
        // Use the image URL to deterministically select a tree species
        const imageHash = generateImageHash(uploadedImage);
        const selectedSpecies = treeSpecies[imageHash % treeSpecies.length];
        
        // Slightly randomize confidence for variety
        const confidence = selectedSpecies.confidence + (Math.random() * 2 - 1);
        
        // Mock analysis results from Gemini 2.5 Flash with geo-tagging data
        const results = {
          model: "Gemini 2.5 Flash",
          species: {
            name: selectedSpecies.name,
            confidence: parseFloat(confidence.toFixed(1)),
            nativeRegion: selectedSpecies.nativeRegion
          },
          verification: {
            isRealTree: true,
            soilDetected: true,
            naturalShadows: true,
            metadataValid: true,
          },
          environmentalImpact: {
            co2Absorption: selectedSpecies.co2Absorption,
            lifespan: selectedSpecies.lifespan,
          },
          geoData: locationData // Include location data in results
        };

        setAnalysisResults(results);
      } catch (error) {
        console.error("Error analyzing image:", error);
        toast.error("Error analyzing image", {
          description: "Please try again with a clearer image.",
        });
      } finally {
        setIsAnalyzing(false);
      }
    }, 2000);
  };

  // Submit verified tree data to backend
  const submitTreeData = () => {
    if (!analysisResults || !uploadedImage || !locationData) return;

    setIsUploadingToServer(true);

    // Simulate API call to backend
    setTimeout(() => {
      try {
        // In a real implementation, you would create a FormData object
        // and send the image file along with metadata to your API
        
        // Mock API call to /api/trees/upload
        console.log("Submitting tree data to backend:", {
          species: analysisResults.species.name,
          confidence: analysisResults.species.confidence,
          location: {
            latitude: locationData.lat,
            longitude: locationData.lng,
            locationName: locationData.name
          },
          // In real implementation, you would include the actual file
          // imageFile: file
        });

        setUploadSuccess(true);
        toast.success("Tree verified and uploaded successfully!", {
          description: "Your tree has been added to your profile and the community database.",
        });
      } catch (error) {
        console.error("Error uploading tree data:", error);
        toast.error("Error uploading tree data", {
          description: "Please try again. If the problem persists, contact support.",
        });
      } finally {
        setIsUploadingToServer(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Upload & Verify Trees</h1>
          <p className="text-muted-foreground">
            Upload images of your planted trees for verification and tracking.
          </p>
        </div>
        <AIBadge variant="secondary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Tree Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              {uploadedImage ? (
                <div className="relative w-full h-64">
                  <Image 
                    src={uploadedImage} 
                    alt="Uploaded tree" 
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <h3 className="text-lg font-medium mb-2">Drag and drop your image here</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse files (JPG, PNG)
                  </p>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                title="Upload tree image"
                aria-label="Upload tree image"
                onChange={handleFileUpload}
              />
              
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="mt-4"
              >
                Browse Files
              </Button>
            </div>

            {/* Geo-tagging component */}
            {uploadedImage && (
              <div className="border-t border-border pt-4 mt-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <FiMapPin className="h-4 w-4 text-primary" />
                  Tree Location
                </h3>
                <GeoTagging onLocationUpdate={handleLocationUpdate} autoFetchLocation={true} />
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-medium">Image Requirements:</h3>
              <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
                <li>Clear view of the entire tree</li>
                <li>Good lighting and visibility</li>
                <li>Include surrounding soil/ground</li>
                <li className="font-medium text-primary">Allow location access for geo-tagging</li>
              </ul>
            </div>

            <div className="bg-primary/5 rounded-lg p-4 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-primary">🔍</span>
                <span>Your image will be analyzed by Google's Gemini 2.5 Flash AI model for accurate species identification and verification.</span>
              </p>
            </div>

            <Button 
              onClick={analyzeImage} 
              disabled={!uploadedImage || isAnalyzing || !locationData}
              className="w-full"
            >
              {isAnalyzing ? "Analyzing with Gemini 2.5 Flash..." : "Verify Tree"}
            </Button>
            {uploadedImage && !locationData && (
              <p className="text-xs text-destructive text-center">Location data required for verification</p>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Verification Results
              {analysisResults && <AIBadge variant="outline" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-muted-foreground">Analyzing image with Gemini 2.5 Flash AI...</p>
              </div>
            ) : analysisResults ? (
              <div className="space-y-6">
                <div className="bg-primary/5 rounded-lg p-3 text-sm">
                  <p>Analyzed by: <span className="font-medium">{analysisResults.model}</span></p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Species Identification</h3>
                  <p className="text-primary font-medium">
                    {analysisResults.species.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Confidence: {analysisResults.species.confidence}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Native to: {analysisResults.species.nativeRegion}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Verification Checks</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <FiCheck className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">Real Tree</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <FiCheck className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">Soil Detected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <FiCheck className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">Natural Lighting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                        <FiCheck className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">Valid Metadata</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Geo-Location Data</h3>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-xs text-muted-foreground">Latitude:</span>
                        <p>{analysisResults.geoData.lat.toFixed(6)}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Longitude:</span>
                        <p>{analysisResults.geoData.lng.toFixed(6)}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-xs text-muted-foreground">Location:</span>
                        <p>{analysisResults.geoData.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Environmental Impact</h3>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-xs text-muted-foreground">CO₂ Absorption:</span>
                        <p>{analysisResults.environmentalImpact.co2Absorption}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Average Lifespan:</span>
                        <p>{analysisResults.environmentalImpact.lifespan}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {!uploadSuccess ? (
                  <Button 
                    onClick={submitTreeData} 
                    className="w-full" 
                    disabled={isUploadingToServer}
                  >
                    {isUploadingToServer ? (
                      <>
                        <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                        Saving tree data...
                      </>
                    ) : (
                      "Submit Tree Data"
                    )}
                  </Button>
                ) : (
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-300 rounded-md p-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <FiCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Tree data successfully submitted</h4>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Your tree has been verified and added to the database
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                  <FiMapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No tree verified yet</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Upload an image of your tree and enable location access to verify your tree planting and receive credit.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 