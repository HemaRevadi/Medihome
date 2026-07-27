import { apiRequest } from "./queryClient";
import type { Disease, Remedy, InsertDisease, InsertRemedy } from "@shared/schema";

export const api = {
  diseases: {
    getAll: (): Promise<Disease[]> => 
      fetch("/api/diseases").then(res => res.json()),
    
    getById: (id: number): Promise<Disease> =>
      fetch(`/api/diseases/${id}`).then(res => res.json()),
    
    create: (disease: InsertDisease): Promise<Disease> =>
      apiRequest("POST", "/api/diseases", disease).then(res => res.json()),
  },
  
  remedies: {
    getByDiseaseId: (diseaseId: number): Promise<Remedy[]> =>
      fetch(`/api/remedies/${diseaseId}`).then(res => res.json()),
    
    getAll: (): Promise<Remedy[]> =>
      fetch("/api/remedies").then(res => res.json()),
    
    create: (remedy: InsertRemedy): Promise<Remedy> =>
      apiRequest("POST", "/api/remedies", remedy).then(res => res.json()),
  },
};
