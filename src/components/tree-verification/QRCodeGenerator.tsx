"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiQrCodeLine } from "react-icons/ri";
import { FiInfo, FiDownload, FiLoader } from "react-icons/fi";

interface QRCodeGeneratorProps {
  treeData?: {
    id?: string;
    species?: string;
    location?: { lat: number; lng: number; name: string };
    plantedDate?: string;
  };
  onQRGenerated?: (qrData: any) => void;
}

export default function QRCodeGenerator({
  treeData,
  onQRGenerated
}: QRCodeGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCodeData, setQRCodeData] = useState<any>(null);

  const generateQRCode = () => {
    setIsGenerating(true);
    
    // Simulate API call for QR code generation
    setTimeout(() => {
      // Mock QR code data
      const qrData = {
        id: treeData?.id || `tree-${Math.random().toString(36).substring(2, 10)}`,
        url: `https://vanam.org/trees/${treeData?.id || 'demo-tree'}`,
        generatedAt: new Date().toISOString(),
        imageUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMTAgMjEwIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMCAwaDIxMHYyMTBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTYwIDMwaDMwdjMwSDYwek05MCAzMGgzMHYzMEg5MHpNMTUwIDMwaDMwdjMwSDE1MHpNMzAgNjBoMzB2MzBIMzB6TTEyMCA2MGgzMHYzMEgxMjB6TTE1MCA2MGgzMHYzMEgxNTB6TTMwIDkwaDMwdjMwSDMwek02MCA5MGgzMHYzMEg2MHpNOTAgOTBoMzB2MzBIOTB6TTEyMCA5MGgzMHYzMEgxMjB6TTE1MCA5MGgzMHYzMEgxNTB6TTMwIDEyMGgzMHYzMEgzMHpNNjAgMTIwaDMwdjMwSDYwek0xNTAgMTIwaDMwdjMwSDE1MHpNMzAgMTUwaDMwdjMwSDMwek05MCAxNTBoMzB2MzBIOTB6TTEyMCAxNTBoMzB2MzBIMTIweiIgZmlsbD0iIzEwYjk4MSIvPjwvc3ZnPg=="
      };
      
      setQRCodeData(qrData);
      setIsGenerating(false);
      
      if (onQRGenerated) {
        onQRGenerated(qrData);
      }
    }, 1500);
  };

  const downloadQRCode = () => {
    if (!qrCodeData?.imageUrl) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = qrCodeData.imageUrl;
    link.download = `vanam-tree-qr-${qrCodeData.id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RiQrCodeLine className="h-5 w-5 text-primary" />
          QR Code Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Generate a unique QR code for this tree that can be used for future scanning and tracking.
        </div>
        
        <div className="flex justify-center">
          {isGenerating ? (
            <div className="w-40 h-40 bg-muted/50 rounded-lg flex items-center justify-center">
              <FiLoader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : qrCodeData ? (
            <div className="relative w-40 h-40 bg-white rounded-lg overflow-hidden border">
              {/* This would be a real QR code in production */}
              <img 
                src={qrCodeData.imageUrl} 
                alt="QR Code for tree" 
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="w-40 h-40 bg-muted/30 rounded-lg flex flex-col items-center justify-center border border-dashed border-muted-foreground/25">
              <RiQrCodeLine className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-xs text-center text-muted-foreground">
                No QR code generated yet
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-center gap-4">
          {!qrCodeData ? (
            <Button 
              onClick={generateQRCode} 
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RiQrCodeLine className="mr-2 h-4 w-4" />
                  Generate QR Code
                </>
              )}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={downloadQRCode}
            >
              <FiDownload className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          )}
        </div>
        
        {qrCodeData && (
          <div className="bg-muted/30 rounded-lg p-3 text-xs">
            <h4 className="font-medium mb-1 flex items-center gap-1">
              <FiInfo className="h-3 w-3 text-primary" />
              QR Code Information
            </h4>
            <div className="space-y-1 text-muted-foreground">
              <p>ID: {qrCodeData.id}</p>
              <p>URL: {qrCodeData.url}</p>
              <p>Generated: {new Date(qrCodeData.generatedAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 