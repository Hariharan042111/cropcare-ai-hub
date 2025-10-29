import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, FileText, CheckCircle2, Clock, DollarSign, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorName] = useState("Dr. Sarah Green");

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const pendingCases = [
    {
      id: 1,
      farmer: "John Farmer",
      disease: "Tomato Late Blight",
      date: "2024-03-15",
      confidence: 94.5,
      status: "pending",
    },
    {
      id: 2,
      farmer: "Mary Agriculture",
      disease: "Potato Early Blight",
      date: "2024-03-15",
      confidence: 89.2,
      status: "pending",
    },
  ];

  const stats = [
    {
      title: "Total Cases",
      value: "156",
      icon: FileText,
      color: "text-primary",
    },
    {
      title: "Pending Review",
      value: "12",
      icon: Clock,
      color: "text-accent",
    },
    {
      title: "Approved Cases",
      value: "144",
      icon: CheckCircle2,
      color: "text-primary",
    },
    {
      title: "Total Earnings",
      value: "₹78,000",
      icon: DollarSign,
      color: "text-secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CropCare AI - Doctor Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{doctorName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-hero rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-2">Doctor Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Review cases, validate treatments, and help farmers protect their crops
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription>{stat.title}</CardDescription>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pending Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Cases</CardTitle>
            <CardDescription>Review and approve disease diagnoses from farmers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingCases.map((case_) => (
                <Card key={case_.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{case_.disease}</h3>
                          <Badge variant="outline">{case_.confidence}% confidence</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Farmer: {case_.farmer}</span>
                          <span>•</span>
                          <span>{case_.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => toast.info("Viewing case details...")}
                        >
                          Review
                        </Button>
                        <Button onClick={() => toast.success("Case approved and sent to farmer")}>
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Approved Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { farmer: "James Smith", disease: "Rice Blast", date: "2024-03-14" },
                { farmer: "Emily Johnson", disease: "Corn Smut", date: "2024-03-13" },
                { farmer: "Michael Brown", disease: "Wheat Rust", date: "2024-03-12" },
              ].map((case_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-card border"
                >
                  <div>
                    <p className="font-medium">{case_.disease}</p>
                    <p className="text-sm text-muted-foreground">
                      {case_.farmer} • {case_.date}
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DoctorDashboard;
