import { Leaf, Mail, Phone, MapPin, Heart } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Leaf className="h-6 w-6 mr-2 text-secondary" />
              MEDIHOME
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted source for natural home remedies and traditional healing wisdom. 
              Empowering healthier lives through nature's pharmacy.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-background transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/diseases" className="hover:text-background transition-colors duration-300">
                  Diseases
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-background transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-background transition-colors duration-300">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                hello@medihome.com
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Natural Health Center
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-muted-foreground">
          <p>
            © 2024 MEDIHOME. All rights reserved. | Made with{" "}
            <Heart className="h-4 w-4 inline text-destructive" /> for natural healing.
          </p>
        </div>
      </div>
    </footer>
  );
}
