import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Upload, FileText, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DiseaseDetection = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleDetection = async () => {
    if (!selectedFile) return;

    setDetecting(true);

    // Simulate AI detection
    setTimeout(() => {
      setResult({
        disease: "Tomato Late Blight",
        confidence: 94.5,
        causes: [
          "High humidity and moisture",
          "Cool temperatures (60-70°F)",
          "Poor air circulation",
          "Infected plant material nearby",
        ],
        symptoms: [
          "Dark brown spots on leaves",
          "White fungal growth on leaf undersides",
          "Rapid leaf death and decay",
          "Fruit rot with dark lesions",
        ],
        treatment: {
          pesticide: "Copper-based fungicide (Ridomil Gold)",
          application: "Apply every 7-10 days, especially after rain",
          preventive: "Remove infected plants, improve air circulation, avoid overhead watering",
        },
      });
      setDetecting(false);
      toast.success("Disease detected successfully!");
    }, 2500);
  };

  const handleSendToDoctor = () => {
    toast.success("Report sent to doctor for review");
    navigate("/consultation");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/farmer-dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Disease Detection</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 max-w-4xl space-y-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Plant Image</CardTitle>
            <CardDescription>
              Take a clear photo of the affected plant for accurate diagnosis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="mb-2 text-sm font-medium">Click to upload plant image</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 10MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden border-2">
                  <img src={preview} alt="Plant preview" className="w-full h-auto" />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setPreview(null);
                      setSelectedFile(null);
                      setResult(null);
                    }}
                  >
                    Change Image
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleDetection}
                    disabled={detecting || !!result}
                  >
                    {detecting ? "Analyzing..." : result ? "Analysis Complete" : "Detect Disease"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            <Card className="border-primary/50 shadow-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Detection Results</CardTitle>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {result.confidence}% Confidence
                  </span>
                </div>
                <CardDescription className="text-lg font-medium text-foreground">
                  {result.disease}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Causes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.causes.map((cause: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Symptoms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.symptoms.map((symptom: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-2">
              <CardHeader>
                <CardTitle>Recommended Treatment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pesticide</p>
                  <p className="font-medium text-lg">{result.treatment.pesticide}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Application</p>
                  <p>{result.treatment.application}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prevention</p>
                  <p>{result.treatment.preventive}</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => toast.success("Report downloaded")}>
                <FileText className="h-5 w-5 mr-2" />
                Download Report
              </Button>
              <Button className="flex-1" onClick={handleSendToDoctor}>
                <Send className="h-5 w-5 mr-2" />
                Send to Doctor
              </Button>
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => navigate("/marketplace")}
            >
              Buy Recommended Pesticide
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DiseaseDetection;
