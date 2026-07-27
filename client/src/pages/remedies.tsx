import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, List, Wrench, Lightbulb, Check } from "lucide-react";
import { Link, useParams } from "wouter";
import { api } from "@/lib/api";
import type { Disease, Remedy } from "@shared/schema";

export default function Remedies() {
  const params = useParams();
  const diseaseId = parseInt(params.id || "0");

  const { data: disease, isLoading: diseaseLoading } = useQuery<Disease>({
    queryKey: ["/api/diseases", diseaseId],
    queryFn: () => api.diseases.getById(diseaseId),
    enabled: !!diseaseId,
  });

  const { data: remedies = [], isLoading: remediesLoading } = useQuery<Remedy[]>({
    queryKey: ["/api/remedies", diseaseId],
    queryFn: () => api.remedies.getByDiseaseId(diseaseId),
    enabled: !!diseaseId,
  });

  const isLoading = diseaseLoading || remediesLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <Skeleton className="h-10 w-32 mb-8" />
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-full mb-12" />
        <div className="space-y-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="p-8">
              <CardContent className="p-0">
                <Skeleton className="h-6 w-48 mb-6" />
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Skeleton className="h-5 w-32 mb-4" />
                    <div className="space-y-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-5 w-32 mb-4" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Disease not found</h2>
        <Link href="/diseases">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Diseases
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      {/* Back Button */}
      <Link href="/diseases">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Diseases
        </Button>
      </Link>

      {/* Disease Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-4">{disease.name} Remedies</h1>
        <p className="text-lg text-muted-foreground">{disease.description}</p>
      </div>

      {/* Remedies List */}
      {remedies.length > 0 ? (
        <div className="space-y-8">
          {remedies.map((remedy) => (
            <Card key={remedy.id} className="remedy-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">{remedy.title}</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <List className="h-5 w-5 mr-2 text-secondary" />
                      Ingredients
                    </h3>
                    <ul className="space-y-2">
                      {remedy.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center text-muted-foreground">
                          <Check className="h-4 w-4 mr-3 text-secondary flex-shrink-0" />
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Preparation */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <Wrench className="h-5 w-5 mr-2 text-accent" />
                      Preparation
                    </h3>
                    <div className="bg-background rounded-lg p-4 border border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {remedy.preparation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                {remedy.tips && (
                  <div className="mt-8 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border-l-4 border-primary">
                    <h3 className="text-lg font-semibold text-primary mb-2 flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2" />
                      Tips & Recommendations
                    </h3>
                    <p className="text-muted-foreground">{remedy.tips}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-foreground mb-2">No remedies available</h3>
          <p className="text-muted-foreground mb-4">
            There are currently no remedies available for this condition.
          </p>
          <Link href="/admin">
            <Button>Add Remedy</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
