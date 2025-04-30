"use client"

import { PageLayout } from "@/components/layout/page-layout";
import { JobSearch } from "@/components/job/job-search";
import { JobTabs } from "@/components/job/job-tabs";
import { JobList } from "@/components/job/job-list";
import { Job } from "@/data/jobs";
import { useState, useEffect } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [collections, setCollections] = useState<string[]>([]);

  // Fetch jobs and collections from API
  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const fetchedJobs: Job[] = await response.json();
        setJobs(fetchedJobs);

        // Optionally fetch collections if needed for tabs
        // For simplicity, derive collections from job titles or add an API endpoint
        const derivedCollections = Array.from(
          new Set(fetchedJobs.map(job => job.collection))
        );
        setCollections(derivedCollections);
        if (derivedCollections.length > 0) {
          setActiveTab(derivedCollections[0]);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
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
      job.location.toLowerCase().includes(query) ||
      job.skills.some(skill => skill.toLowerCase().includes(query))
    );
  });

  // Recent jobs (last 7 days)
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const recentJobs = filteredJobs.filter(job => new Date(job.postedAt) >= sevenDaysAgo);

  // Popular jobs (randomized for demo)
  const popularJobs = [...filteredJobs]
    .sort(() => 0.5 - Math.random())
    .slice(0, filteredJobs.length > 6 ? 6 : filteredJobs.length);

  // Collection-based jobs
  const collectionJobs = collections.map(collection => ({
    id: collection,
    label: collection,
    count: filteredJobs.filter(job => job.collection === collection).length,
  }));

  // Categories for tabs
  const jobTabs = [
    { id: "all", label: "All Jobs", count: filteredJobs.length },
    ...collectionJobs,
  ];

  // Get jobs based on active tab
  const getJobsByTab = () => {
    if (collections.includes(activeTab)) {
      return filteredJobs.filter(job => job.title.toLowerCase().includes(activeTab.toLowerCase()));
    }
    switch (activeTab) {
      case "recent":
        return recentJobs;
      case "popular":
        return popularJobs;
      case "fulltime":
        return filteredJobs.filter(job => job.type === "full-time");
      case "remote":
        return filteredJobs.filter(job => job.location.toLowerCase().includes("remote"));
      default:
        return filteredJobs;
    }
  };

  const activeJobs = getJobsByTab();

  return (
    <PageLayout>
      <JobSearch onSearch={(query) => setSearchQuery(query)} />
      <JobTabs tabs={jobTabs} onChange={(tabId) => setActiveTab(tabId)} />
      <JobList
        jobs={activeJobs}
        title={
          searchQuery
            ? `Search Results for "${searchQuery}"`
            : jobTabs.find(tab => tab.id === activeTab)?.label || "All Jobs"
        }
      />
    </PageLayout>
  );
}