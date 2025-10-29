import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Microscope, ShoppingCart, CheckCircle2, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";
import diseaseImage from "@/assets/disease-detection.jpg";
import doctorImage from "@/assets/doctor-consultation.jpg";
import pesticideImage from "@/assets/pesticide-products.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Microscope,
      title: "AI Disease Detection",
      description: "Upload plant images and get instant disease diagnosis powered by advanced CNN algorithms.",
      image: diseaseImage,
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Connect with agricultural doctors for professional validation and treatment recommendations.",
      image: doctorImage,
    },
    {
      icon: ShoppingCart,
      title: "Integrated E-Commerce",
      description: "Purchase verified pesticides and treatments directly with secure home delivery.",
      image: pesticideImage,
    },
  ];

  const benefits = [
    "Automated disease detection using AI",
    "Expert-validated treatment solutions",
    "Direct access to verified pesticides",
    "Reduced diagnosis time and cost",
    "PDF reports for record keeping",
    "SMS/WhatsApp notifications",
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CropCare AI</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container py-20 md:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Protect Your Crops with{" "}
                <span className="text-primary">AI-Powered</span> Disease Detection
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Get instant disease diagnosis, expert-validated treatment recommendations, and access to verified pesticides — all in one platform.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={() => navigate("/signup")} className="text-lg">
                  Start Free Detection
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/signup?role=doctor")}>
                  Join as Doctor
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Modern agriculture technology"
                className="rounded-2xl shadow-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Complete Plant Health Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From detection to treatment, we provide end-to-end solutions for farmers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="overflow-hidden border-2 hover:shadow-elevated transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and accurate disease management in 4 easy steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "Upload Image", desc: "Take a photo of affected plant" },
              { step: "2", title: "AI Analysis", desc: "CNN model detects the disease" },
              { step: "3", title: "Expert Review", desc: "Doctor validates treatment" },
              { step: "4", title: "Get Solution", desc: "Purchase verified pesticides" },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Why Choose CropCare AI?
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform combines cutting-edge AI technology with expert agricultural knowledge to provide the most reliable plant disease management solution.
            </p>
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base">{benefit}</span>
                </div>
              ))}
            </div>
            <Button size="lg" onClick={() => navigate("/signup")}>
              Start Protecting Your Crops Today
            </Button>
          </div>
          <div className="relative">
            <Card className="p-8 bg-gradient-card border-2">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <FileText className="h-12 w-12 text-primary" />
                  <div>
                    <h3 className="text-2xl font-bold">10,000+</h3>
                    <p className="text-muted-foreground">Diseases Detected</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="h-12 w-12 text-secondary" />
                  <div>
                    <h3 className="text-2xl font-bold">500+</h3>
                    <p className="text-muted-foreground">Expert Doctors</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Microscope className="h-12 w-12 text-accent" />
                  <div>
                    <h3 className="text-2xl font-bold">95%+</h3>
                    <p className="text-muted-foreground">Accuracy Rate</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to Protect Your Crops?
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Join thousands of farmers using AI-powered plant disease detection
          </p>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate("/signup")}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="font-bold">CropCare AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered plant disease detection and expert consultation platform
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Disease Detection</li>
                <li>Doctor Consultation</li>
                <li>E-Commerce</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>FAQs</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 CropCare AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
