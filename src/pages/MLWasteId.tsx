import { useState } from "react";
import { Camera, Upload, Scan, Recycle, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock ML results for demonstration
const mockResults = [
  {
    id: 1,
    item: "Plastic Water Bottle",
    confidence: 95,
    category: "Recyclable Plastic",
    instructions: "Remove cap and label. Rinse bottle. Place in recycling bin marked for plastics.",
    environmentalImpact: "Recycling this bottle saves 0.5L of oil and prevents 2kg of CO2 emissions.",
    color: "success"
  },
  {
    id: 2,
    item: "Pizza Box",
    confidence: 87,
    category: "Compostable/Mixed",
    instructions: "If heavily soiled with grease, remove clean parts for recycling and compost the rest.",
    environmentalImpact: "Proper disposal prevents methane emissions and supports soil health.",
    color: "warning"
  },
  {
    id: 3,
    item: "Electronics Component",
    confidence: 92,
    category: "E-Waste",
    instructions: "Take to designated e-waste collection center. Contains valuable metals for recovery.",
    environmentalImpact: "Proper e-waste recycling recovers rare earth metals and prevents toxic leaching.",
    color: "earth"
  }
];

export default function MLWasteId() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<typeof mockResults[0] | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const simulateML = () => {
    setIsScanning(true);
    setTimeout(() => {
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setIsScanning(false);
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateML();
      };
      reader.readAsDataURL(file);
    }
  };

  const resetScan = () => {
    setResult(null);
    setUploadedImage(null);
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-earth text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI Waste Identifier
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Upload or scan waste items to get instant recycling and disposal guidance
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Scanner Interface */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Scan className="w-6 h-6" />
              Waste Identification Scanner
            </CardTitle>
            <CardDescription>
              Take a photo or upload an image of waste items for AI-powered disposal guidance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!uploadedImage && !isScanning && !result ? (
              // Upload Interface
              <div className="text-center space-y-6">
                <div className="border-2 border-dashed border-muted rounded-lg p-12 transition-colors hover:border-primary/50">
                  <Camera className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Waste Image</h3>
                  <p className="text-muted-foreground mb-6">
                    Take a clear photo of the waste item for accurate identification
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="hero" className="relative">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </Button>
                    <Button variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Use Camera
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Results Interface
              <div className="space-y-6">
                {uploadedImage && (
                  <div className="text-center">
                    <img
                      src={uploadedImage}
                      alt="Uploaded waste item"
                      className="max-w-md mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {isScanning && (
                  <Card className="p-6 text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold mb-2">Analyzing Image...</h3>
                    <p className="text-muted-foreground">
                      Our AI is identifying the waste item and determining the best disposal method
                    </p>
                  </Card>
                )}

                {result && (
                  <div className="space-y-4">
                    <Card className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-2">{result.item}</h3>
                          <Badge variant={result.color as any} className="mb-2">
                            {result.category}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            Confidence: {result.confidence}%
                          </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-success" />
                      </div>

                      <div className="space-y-4">
                        <Alert>
                          <Recycle className="h-4 w-4" />
                          <AlertDescription className="font-medium">
                            Disposal Instructions
                          </AlertDescription>
                        </Alert>
                        <p className="text-sm bg-muted p-4 rounded-lg">
                          {result.instructions}
                        </p>

                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="font-medium">
                            Environmental Impact
                          </AlertDescription>
                        </Alert>
                        <p className="text-sm bg-success/10 border border-success/20 p-4 rounded-lg">
                          {result.environmentalImpact}
                        </p>
                      </div>
                    </Card>

                    <div className="flex gap-4 justify-center">
                      <Button onClick={resetScan} variant="hero">
                        Scan Another Item
                      </Button>
                      <Button variant="outline">
                        Save to History
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center p-6">
            <Scan className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="font-semibold mb-2">AI-Powered Recognition</h3>
            <p className="text-sm text-muted-foreground">
              Advanced machine learning identifies waste items with high accuracy
            </p>
          </Card>
          <Card className="text-center p-6">
            <Recycle className="w-12 h-12 mx-auto text-success mb-4" />
            <h3 className="font-semibold mb-2">Proper Disposal</h3>
            <p className="text-sm text-muted-foreground">
              Get specific instructions for recycling, composting, or safe disposal
            </p>
          </Card>
          <Card className="text-center p-6">
            <AlertCircle className="w-12 h-12 mx-auto text-earth mb-4" />
            <h3 className="font-semibold mb-2">Environmental Impact</h3>
            <p className="text-sm text-muted-foreground">
              Learn how proper disposal helps protect our environment
            </p>
          </Card>
        </div>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How AI Waste Identification Works</CardTitle>
            <CardDescription>
              Our machine learning model has been trained on thousands of waste items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">1. Capture</h4>
                <p className="text-sm text-muted-foreground">
                  Take a clear photo of the waste item
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Scan className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">2. Analyze</h4>
                <p className="text-sm text-muted-foreground">
                  AI identifies the material and item type
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Recycle className="w-8 h-8 text-success" />
                </div>
                <h4 className="font-semibold mb-2">3. Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Receive specific disposal instructions
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-earth/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-earth" />
                </div>
                <h4 className="font-semibold mb-2">4. Impact</h4>
                <p className="text-sm text-muted-foreground">
                  Learn about environmental benefits
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}