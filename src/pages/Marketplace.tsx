import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import pesticideImage from "@/assets/pesticide-products.jpg";

const Marketplace = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Ridomil Gold MZ",
      type: "Copper-based Fungicide",
      price: "₹450",
      rating: 4.8,
      reviews: 124,
      description: "Effective against late blight, early blight, and downy mildew",
      verified: true,
    },
    {
      id: 2,
      name: "Tata Mancozeb",
      type: "Organic Fungicide",
      price: "₹320",
      rating: 4.6,
      reviews: 98,
      description: "Broad spectrum fungicide for multiple crops",
      verified: true,
    },
    {
      id: 3,
      name: "Bayer Luna Experience",
      type: "Systemic Fungicide",
      price: "₹890",
      rating: 4.9,
      reviews: 156,
      description: "Premium fungicide with long-lasting protection",
      verified: true,
    },
    {
      id: 4,
      name: "Neem Oil Concentrate",
      type: "Organic Pesticide",
      price: "₹280",
      rating: 4.5,
      reviews: 87,
      description: "Natural pest control for organic farming",
      verified: true,
    },
  ];

  const handleAddToCart = (productId: number) => {
    setCart([...cart, productId]);
    toast.success("Added to cart");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/farmer-dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Pesticide Marketplace</span>
            </div>
          </div>
          <Button variant="outline" className="relative">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                {cart.length}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 space-y-8">
        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={pesticideImage}
            alt="Pesticide products"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/60 flex items-center">
            <div className="container">
              <h1 className="text-4xl font-bold mb-2">Verified Pesticides & Treatments</h1>
              <p className="text-lg text-muted-foreground">
                Government-approved products with secure home delivery
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Secure Purchasing Process</p>
                <p className="text-sm text-muted-foreground">
                  All purchases require Aadhaar verification and admin approval to ensure safety and authenticity
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col border-2 hover:shadow-elevated transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription className="mt-1">{product.type}</CardDescription>
                  </div>
                  {product.verified && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{product.price}</p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={cart.includes(product.id)}
                >
                  {cart.includes(product.id) ? "Added to Cart" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Checkout Section */}
        {cart.length > 0 && (
          <Card className="bg-gradient-card border-2 sticky bottom-4">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{cart.length} products</p>
                </div>
                <Button size="lg" onClick={() => toast.success("Proceeding to checkout with Aadhaar verification")}>
                  Proceed to Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
