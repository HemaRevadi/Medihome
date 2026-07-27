import { Card, CardContent } from "@/components/ui/card";
import { Shield, BookOpen, Users, AlertTriangle } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Safe & Natural",
      description: "All remedies use natural ingredients with proven safety records."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-secondary" />,
      title: "Research-Based",
      description: "Our remedies are backed by traditional knowledge and modern research."
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Community-Driven",
      description: "Built on shared knowledge from generations of natural healing practices."
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">About MEDIHOME</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your trusted source for natural healing and traditional remedies.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            MEDIHOME bridges the gap between traditional wisdom and modern convenience. We believe that nature provides powerful healing solutions that have been used for centuries to treat common ailments safely and effectively.
          </p>
          <div className="space-y-4">
            {values.map((value, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">{value.icon}</div>
                <div>
                  <h4 className="font-semibold text-foreground">{value.title}</h4>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h4 className="text-xl font-semibold text-foreground mb-4">Traditional Wisdom</h4>
          <p className="text-muted-foreground">
            Our remedies are carefully curated from centuries of traditional healing practices, 
            ensuring both authenticity and effectiveness.
          </p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
        <CardContent className="p-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Important Disclaimer</h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  The information provided on MEDIHOME is for educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
                <p className="leading-relaxed">
                  While natural remedies have been used traditionally for centuries, individual results may vary. If you have severe symptoms, chronic conditions, or are pregnant or nursing, please consult with a healthcare professional before trying any home remedies.
                </p>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium text-center">
                    ⚠️ Always consult with a healthcare professional for serious medical conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
