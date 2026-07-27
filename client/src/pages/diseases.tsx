import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronRight, Leaf } from "lucide-react";
import { Link } from "wouter";
import { api } from "@/lib/api";
import type { Disease } from "@shared/schema";

export default function Diseases() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: diseases = [], isLoading } = useQuery<Disease[]>({
    queryKey: ["/api/diseases"],
    queryFn: api.diseases.getAll,
  });

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (disease.description && disease.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Browse Conditions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find natural remedies for common health conditions and ailments.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6">
              <CardContent className="p-0">
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Browse Conditions</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find natural remedies for common health conditions and ailments.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search diseases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>
      </div>

      {/* Diseases Grid */}
      {filteredDiseases.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease) => (
            <Link key={disease.id} href={`/remedies/${disease.id}`}>
              <Card className="disease-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">{disease.name}</h3>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {disease.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <Leaf className="h-4 w-4 mr-2" />
                    <span>View remedies</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No diseases found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
