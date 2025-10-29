import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, ArrowLeft, User, Star, MessageSquare, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Consultation = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialty: "Plant Pathology",
      rating: 4.8,
      patients: 250,
      fee: 300,
      experience: "12 years",
      available: true,
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialty: "Crop Disease Management",
      rating: 4.9,
      patients: 320,
      fee: 350,
      experience: "15 years",
      available: true,
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      specialty: "Agricultural Sciences",
      rating: 4.7,
      patients: 180,
      fee: 250,
      experience: "8 years",
      available: false,
    },
  ];

  const handleConsultation = (doctorId: number, fee: number) => {
    setSelectedDoctor(doctorId);
    toast.success(`Proceeding to payment of ₹${fee}`);
    // In production, this would navigate to payment gateway
    setTimeout(() => {
      toast.success("Report sent to doctor for review");
      navigate("/farmer-dashboard");
    }, 1500);
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
            <span className="text-xl font-bold">Consult Experts</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 max-w-6xl space-y-8">
        <div className="bg-gradient-hero rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-2">Agricultural Experts</h1>
          <p className="text-muted-foreground text-lg">
            Get professional advice and treatment validation from certified doctors
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="group hover:shadow-elevated transition-all duration-300 border-2"
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{doctor.name}</CardTitle>
                <CardDescription>{doctor.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-muted-foreground">
                      ({doctor.patients} patients)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-muted-foreground">Consultation Fee</span>
                    <span className="font-bold text-primary">₹{doctor.fee}</span>
                  </div>
                </div>

                {doctor.available ? (
                  <Button
                    className="w-full"
                    onClick={() => handleConsultation(doctor.id, doctor.fee)}
                    disabled={selectedDoctor === doctor.id}
                  >
                    {selectedDoctor === doctor.id ? "Processing..." : "Consult Now"}
                  </Button>
                ) : (
                  <Button className="w-full" variant="secondary" disabled>
                    Currently Unavailable
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-card border-2">
          <CardHeader>
            <CardTitle>How Consultation Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Select Your Doctor</p>
                <p className="text-sm text-muted-foreground">
                  Choose from our list of certified agricultural experts
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Complete Payment</p>
                <p className="text-sm text-muted-foreground">
                  Pay the consultation fee securely online
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Get Expert Review</p>
                <p className="text-sm text-muted-foreground">
                  Doctor reviews your case and provides verified treatment plan
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                4
              </div>
              <div>
                <p className="font-medium">Receive Notification</p>
                <p className="text-sm text-muted-foreground">
                  Get SMS/WhatsApp notification with verified treatment PDF
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Consultation;
