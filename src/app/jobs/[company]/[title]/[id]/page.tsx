"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { JobDetails } from "@/components/job/job-details";
import { Job } from "@/data/jobs";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function JobDetailPage() {
  const params = useParams();
  const { id } = params as { company: string; title: string; id: string };
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch job by ID from API
  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`/api/jobs?id=${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Job not found");
          }
          throw new Error("Failed to fetch job");
        }
        const foundJob: Job = await response.json();
        setJob(foundJob);
      } catch (err: any) {
        console.error("Error fetching job:", err);
        setError(err.message || "Failed to load job details.");
      }
    }
    fetchJob();
  }, [id]);

  if (error) {
    return (
      <PageLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
          <p className="text-gray-600 mb-6">
            Please try again or return to the job listings.
          </p>
          <Link
            href="/jobs"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            <FiArrowLeft className="inline mr-2" /> Back to all jobs
          </Link>
        </div>
      </PageLayout>
    );
  }

  if (!job) {
    return (
      <PageLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bg-gray-50 py-4">
        <div className="container">
          <Link
            href="/jobs"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <FiArrowLeft className="mr-2" /> Back to all jobs
          </Link>
        </div>
      </div>
      <JobDetails job={job} />
    </PageLayout>
  );
}
