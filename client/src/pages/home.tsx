import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Leaf, Heart, Clock, Home as HomeIcon } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const features = [
    {
      icon: <Leaf className="h-6 w-6 text-secondary" />,
      title: "100% Natural",
      description: "All remedies use natural ingredients with no harmful chemicals or side effects."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Time-Tested",
      description: "Remedies passed down through generations and proven effective over time."
    },
    {
      icon: <HomeIcon className="h-6 w-6 text-accent" />,
      title: "Easy to Make",
      description: "Simple recipes using common household ingredients you likely already have."
    }
  ];

  const popularConditions = [
    { icon: "🌬️", name: "Cold & Cough" },
    { icon: "🤕", name: "Headache" },
    { icon: "🍽️", name: "Indigestion" },
    { icon: "😴", name: "Insomnia" }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="healthcare-gradient text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Natural Healing at Your Fingertips
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Discover time-tested home remedies for common ailments. Safe, natural, and effective solutions from traditional medicine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/diseases">
                <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90">
                  <Search className="h-4 w-4 mr-2" />
                  Explore Remedies
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Natural Remedies?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our curated collection of home remedies combines traditional wisdom with modern understanding.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Remedies Preview */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Popular Remedies</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularConditions.map((condition, index) => (
                  <div
                    key={index}
                    className="bg-muted p-4 rounded-lg text-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    <div className="text-2xl mb-2">{condition.icon}</div>
                    <p className="font-medium">{condition.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
