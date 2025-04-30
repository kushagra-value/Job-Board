export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | number;
  skills: string[];
  postedAt: string;
  applyLink: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  type: string; // full-time, part-time, contract, etc.
  experience: string; // 0-1 years, 1-3 years, 3-5 years, 5+ years
  aboutCompany?: string; // Optional field
  collection: string; // Optional field for collection-based jobs
}