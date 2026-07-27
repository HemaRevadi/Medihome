import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Plus, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { insertDiseaseSchema, insertRemedySchema } from "@shared/schema";
import type { Disease, InsertDisease, InsertRemedy } from "@shared/schema";
import { z } from "zod";

type TabType = "disease" | "remedy";

const remedyFormSchema = insertRemedySchema.extend({
  ingredientsText: z.string().min(1, "Ingredients are required"),
});

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabType>("disease");
  const { toast } = useToast();

  const { data: diseases = [] } = useQuery<Disease[]>({
    queryKey: ["/api/diseases"],
    queryFn: api.diseases.getAll,
  });

  // Disease form
  const diseaseForm = useForm<InsertDisease>({
    resolver: zodResolver(insertDiseaseSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Remedy form
  const remedyForm = useForm<z.infer<typeof remedyFormSchema>>({
    resolver: zodResolver(remedyFormSchema),
    defaultValues: {
      diseaseId: 0,
      title: "",
      ingredientsText: "",
      preparation: "",
      tips: "",
      imageUrl: "",
      ingredients: [],
    },
  });

  const createDiseaseMutation = useMutation({
    mutationFn: api.diseases.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/diseases"] });
      toast({
        title: "Success!",
        description: "Disease added successfully.",
      });
      diseaseForm.reset();
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "Failed to add disease. Please try again.",
        variant: "destructive",
      });
    },
  });

  const createRemedyMutation = useMutation({
    mutationFn: api.remedies.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/remedies"] });
      toast({
        title: "Success!",
        description: "Remedy added successfully.",
      });
      remedyForm.reset();
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "Failed to add remedy. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onDiseaseSubmit = (data: InsertDisease) => {
    createDiseaseMutation.mutate(data);
  };

  const onRemedySubmit = (data: z.infer<typeof remedyFormSchema>) => {
    const ingredients = data.ingredientsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const remedyData: InsertRemedy = {
      diseaseId: data.diseaseId,
      title: data.title,
      ingredients,
      preparation: data.preparation,
      tips: data.tips || null,
      imageUrl: data.imageUrl || null,
    };

    createRemedyMutation.mutate(remedyData);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Admin Panel</h2>
        <p className="text-lg text-muted-foreground">Add new diseases and remedies to the database</p>
      </div>

      {/* Tab Navigation */}
      <Card className="mb-8">
        <CardContent className="p-2">
          <div className="flex space-x-2">
            <Button
              variant={activeTab === "disease" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setActiveTab("disease")}
            >
              Add Disease
            </Button>
            <Button
              variant={activeTab === "remedy" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setActiveTab("remedy")}
            >
              Add Remedy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Disease Form */}
      {activeTab === "disease" && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Disease</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...diseaseForm}>
              <form onSubmit={diseaseForm.handleSubmit(onDiseaseSubmit)} className="space-y-6">
                <FormField
                  control={diseaseForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disease Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cold and Cough" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={diseaseForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Brief description of the condition..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={createDiseaseMutation.isPending}
                  >
                    {createDiseaseMutation.isPending ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Add Disease
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => diseaseForm.reset()}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Add Remedy Form */}
      {activeTab === "remedy" && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Remedy</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...remedyForm}>
              <form onSubmit={remedyForm.handleSubmit(onRemedySubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={remedyForm.control}
                    name="diseaseId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Disease *</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a disease..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {diseases.map((disease) => (
                              <SelectItem key={disease.id} value={disease.id.toString()}>
                                {disease.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={remedyForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remedy Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Ginger Tea" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={remedyForm.control}
                  name="ingredientsText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredients *</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Enter each ingredient on a new line..."
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">Enter each ingredient on a separate line</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={remedyForm.control}
                  name="preparation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preparation Steps *</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="Detailed preparation instructions..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={remedyForm.control}
                  name="tips"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tips (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Additional tips and recommendations..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={remedyForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={createRemedyMutation.isPending}
                  >
                    {createRemedyMutation.isPending ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Add Remedy
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => remedyForm.reset()}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
