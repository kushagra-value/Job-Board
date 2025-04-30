"use client";

import { useState } from "react";
import { formatSalary } from "@/lib/utils";
import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiDollarSign,
  FiDownload,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ResumeUploadModal } from "@/components/resume/resume-upload-modal";
import Link from "next/link";

interface JobDetailsProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string | number;
    skills: string[];
    postedAt: string;
    applyLink?: string; // Made optional
    description: string;
    requirements?: string[];
    responsibilities?: string[];
    aboutCompany?: string;
  };
}

export function JobDetails({ job }: JobDetailsProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  
                </div>
                <div className="mt-2 flex items-center text-gray-700">
                  <FiBriefcase className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiMapPin className="mr-1.5 h-4 w-4 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="mr-1.5 h-4 w-4 text-gray-500" />
                    <span>{formatSalary(job.salary)}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-1.5 h-4 w-4 text-gray-500" />
                    <span>{job.postedAt}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Job Description
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Responsibilities
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-gray-700">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action card */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Apply for this job
                </h2>
                <div className="space-y-3">
                  <Button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="w-full mb-3"
                    variant="outline"
                  >
                    Check Compatibility
                  </Button>
                  {job.applyLink ? (
                    <Link
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full">Apply Now</Button>
                    </Link>
                  ) : (
                    <Button className="w-full" disabled>
                      Apply Now (Link Unavailable)
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Company card */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  About the company
                </h2>
                <p className="text-gray-700 mb-4">{job.aboutCompany}</p>
                <Link
                  href={`https://www.linkedin.com/company/${job.company}/posts/?feedView=all
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View company profile
                </Link>
              </div>
            </div>

            {/* Similar jobs */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Similar Jobs
                </h2>
                <div className="space-y-4">
                  {[1].map((i) => (
                    // <div
                    //   key={i}
                    //   className="border-b pb-4 last:border-0 last:pb-0"
                    // >
                    //   <h3 className="font-medium text-gray-900 hover:text-primary-600">
                    //     <Link href={`/jobs/${i}`}>Senior {job.title}</Link>
                    //   </h3>
                    //   <p className="text-sm text-gray-600 mt-1">
                    //     {job.company}
                    //   </p>
                    //   <div className="flex items-center text-sm text-gray-600 mt-1">
                    //     <FiMapPin className="mr-1 h-3 w-3" />
                    //     <span>{job.location}</span>
                    //   </div>
                    // </div>
                    <div>
                      Coming Soon...
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume upload modal */}
      <ResumeUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        jobTitle={job.title}
        skills={job.skills}
      />
    </>
  );
}
