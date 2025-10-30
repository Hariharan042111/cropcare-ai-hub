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
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload only image files (JPG, PNG, or WEBP)");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }

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
    if (!selectedFile || !preview) return;

    setDetecting(true);

    try {
      // Call the backend AI detection
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/detect-plant-disease`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageData: preview }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to analyze image");
      }

      const data = await response.json();

      // Check if it's a valid plant image
      if (!data.isPlantImage) {
        toast.error(data.error || "Please upload an image of a plant or leaf");
        setDetecting(false);
        return;
      }

      // Check if disease was detected
      if (!data.diseaseDetected) {
        toast.success(data.message || "Plant appears healthy!");
        setResult({
          disease: "No Disease Detected",
          confidence: 100,
          causes: [],
          symptoms: [],
          treatment: {
            pesticide: "No treatment needed",
            application: "Continue regular care",
            preventive: "Monitor plant regularly for any changes",
          },
        });
        setDetecting(false);
        return;
      }

      // Format the result for display
      setResult({
        disease: data.diseaseName,
        confidence: data.confidence,
        causes: data.causes || [],
        symptoms: data.symptoms || [],
        treatment: {
          pesticide: data.treatment?.pesticides?.join(", ") || "Consult agricultural expert",
          application: data.treatment?.description || "",
          preventive: data.treatment?.organicAlternatives?.join(", ") || "",
        },
      });
      
      toast.success("Disease detected successfully!");
    } catch (error) {
      console.error("Detection error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze image. Please try again.");
    } finally {
      setDetecting(false);
    }
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
                  accept="image/jpeg,image/jpg,image/png,image/webp"
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
