import { GoogleGenerativeAI } from "@google/generative-ai";

export interface PlantDetectionResult {
  species: {
    name: string;
    scientificName: string;
    confidence: number;
    family: string;
    nativeRegions: string[];
    characteristics: string[];
    description: string;
  };
  alternativePossibilities: Array<{
    name: string;
    confidence: number;
    scientificName?: string;
  }>;
  isPlant: boolean;
  error?: string;
}

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    this.initializeGemini();
  }

  private initializeGemini() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.warn('Gemini API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local');
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
    }
  }

  private async fileToGenerativePart(file: File): Promise<{
    inlineData: {
      data: string;
      mimeType: string;
    };
  }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = (reader.result as string).split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private async urlToGenerativePart(imageUrl: string): Promise<{
    inlineData: {
      data: string;
      mimeType: string;
    };
  }> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Data = (reader.result as string).split(',')[1];
          resolve({
            inlineData: {
              data: base64Data,
              mimeType: blob.type || 'image/jpeg',
            },
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error(`Failed to process image from URL: ${error}`);
    }
  }

  async detectPlantSpecies(input: File | string): Promise<PlantDetectionResult> {
    if (!this.model) {
      return {
        species: {
          name: "Unknown",
          scientificName: "Unknown",
          confidence: 0,
          family: "Unknown",
          nativeRegions: [],
          characteristics: [],
          description: "Gemini AI not configured. Please check your API key."
        },
        alternativePossibilities: [],
        isPlant: false,
        error: "Gemini AI service not initialized. Please check your API key configuration."
      };
    }

    try {
      let imagePart;
      
      if (input instanceof File) {
        imagePart = await this.fileToGenerativePart(input);
      } else {
        imagePart = await this.urlToGenerativePart(input);
      }

      const prompt = `
        Analyze this image and provide detailed information about the plant/tree species shown. 
        Please respond in the following JSON format (no additional text):

        {
          "isPlant": boolean,
          "species": {
            "name": "Common name of the species",
            "scientificName": "Scientific binomial name",
            "confidence": number (0-100),
            "family": "Plant family name",
            "nativeRegions": ["region1", "region2"],
            "characteristics": ["characteristic1", "characteristic2", "characteristic3"],
            "description": "Brief description of the plant and its key features"
          },
          "alternativePossibilities": [
            {
              "name": "Alternative species name",
              "scientificName": "Scientific name",
              "confidence": number (0-100)
            }
          ]
        }

        Instructions:
        - If this is not a plant/tree, set isPlant to false and provide minimal species info
        - Focus on trees, shrubs, and significant plants
        - Provide confidence scores based on visible features
        - Include 2-3 alternative possibilities if uncertain
        - Be as accurate as possible with scientific names
        - Include native regions and key identifying characteristics
        - If the image quality is poor or unclear, reduce confidence accordingly
      `;

      const result = await this.model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      // Clean up the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini AI');
      }

      const detectionResult = JSON.parse(jsonMatch[0]) as PlantDetectionResult;
      
      // Validate and sanitize the result
      return this.validateAndSanitizeResult(detectionResult);

    } catch (error) {
      console.error('Error detecting plant species:', error);
      
      return {
        species: {
          name: "Detection Failed",
          scientificName: "Unknown",
          confidence: 0,
          family: "Unknown",
          nativeRegions: [],
          characteristics: [],
          description: `Failed to analyze image: ${error instanceof Error ? error.message : 'Unknown error'}`
        },
        alternativePossibilities: [],
        isPlant: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private validateAndSanitizeResult(result: any): PlantDetectionResult {
    // Ensure all required fields exist with defaults
    return {
      isPlant: result.isPlant ?? false,
      species: {
        name: result.species?.name || "Unknown Species",
        scientificName: result.species?.scientificName || "Unknown",
        confidence: Math.min(100, Math.max(0, result.species?.confidence || 0)),
        family: result.species?.family || "Unknown",
        nativeRegions: Array.isArray(result.species?.nativeRegions) 
          ? result.species.nativeRegions 
          : [],
        characteristics: Array.isArray(result.species?.characteristics) 
          ? result.species.characteristics 
          : [],
        description: result.species?.description || "No description available"
      },
      alternativePossibilities: Array.isArray(result.alternativePossibilities) 
        ? result.alternativePossibilities.map((alt: any) => ({
            name: alt.name || "Unknown",
            scientificName: alt.scientificName || "Unknown",
            confidence: Math.min(100, Math.max(0, alt.confidence || 0))
          }))
        : [],
      error: result.error
    };
  }

  isConfigured(): boolean {
    return this.model !== null;
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();
