"use client"

import { PageLayout } from "@/components/layout/page-layout";
import { JobSearch } from "@/components/job/job-search";
import { JobTabs } from "@/components/job/job-tabs";
import { JobList } from "@/components/job/job-list";
import { Job } from "@/data/jobs";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

// Utility function to slugify collection names
function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch jobs and collections from API
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

        // Get unique collections
        const derivedCollections = Array.from(
          new Set(fetchedJobs.map(job => job.collection))
        );
        setCollections(derivedCollections);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    }
    loadJobs();
  }, []);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      (typeof job.location === 'string' && job.location.toLowerCase().includes(query)) ||
      job.skills.some(skill => skill.toLowerCase().includes(query))
    );
  });

  // Categories for tabs
  const jobTabs = [
    { id: "all", label: "All Jobs", count: filteredJobs.length },
    ...collections.map(collection => ({
      id: collection,
      label: collection,
      count: filteredJobs.filter(job => job.collection === collection).length,
    }))
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "all") {
      router.push("/");
    } else {
      const slugifiedTabId = slugify(tabId);
      router.push(`/${slugifiedTabId}`);
    }
  };

  return (
    <PageLayout>
      <JobSearch onSearch={(query) => setSearchQuery(query)} />
      <JobTabs tabs={jobTabs} onChange={handleTabChange} />
      <JobList
        jobs={filteredJobs}
        title={
          searchQuery
            ? `Search Results for "${searchQuery}"`
            : "All Jobs"
        }
        isLoading={isLoading}
      />
    </PageLayout>
  );
}