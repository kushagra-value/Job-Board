"use client"

import { PageLayout } from "@/components/layout/page-layout";
import { JobTabs } from "@/components/job/job-tabs";
import { JobList } from "@/components/job/job-list";
import { Job } from "@/data/jobs";
import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';

// Utility function to slugify collection names
function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function CollectionPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const slug = params.collection as string;

  useEffect(() => {
    async function loadJobs() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const fetchedJobs: Job[] = await response.json();
        setJobs(fetchedJobs);

        const derivedCollections = Array.from(
          new Set(fetchedJobs.map(job => job.collection))
        );
        setCollections(derivedCollections);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    }
    loadJobs();
  }, []);

  // Find the original collection name from the slug
  const originalCollection = collections.find(col => slugify(col) === slug);
  const filteredJobs = originalCollection 
    ? jobs.filter(job => job.collection === originalCollection) 
    : [];

  // Categories for tabs
  const jobTabs = [
    { id: "all", label: "All Jobs", count: jobs.length },
    ...collections.map(col => ({
      id: col,
      label: col,
      count: jobs.filter(job => job.collection === col).length,
    }))
  ];

  const handleTabChange = (tabId: string) => {
    if (tabId === "all") {
      router.push("/");
    } else {
      const slugifiedTabId = slugify(tabId);
      router.push(`/${slugifiedTabId}`);
    }
  };

  return (
    <PageLayout>
      <JobTabs tabs={jobTabs} onChange={handleTabChange} />
      <JobList
        jobs={filteredJobs}
        title={originalCollection ? `${originalCollection} Jobs` : "Loading..."}
        isLoading={isLoading}
      />
    </PageLayout>
  );
}