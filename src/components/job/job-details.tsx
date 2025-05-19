"use client";

import { useState } from "react";
import { formatSalary } from "@/lib/utils";
import { FiMapPin, FiClock, FiBriefcase, FiDollarSign } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
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
    applyLink?: string;
    description: string | Record<string, any>;
    requirements?: string[];
    responsibilities?: string[];
    aboutCompany?: string;
    experience?: string;
    about_the_role?: string;
  };
}

// Utility to turn snake_case or camelCase into Title Case
function formatTitle(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function JobDetails({ job }: JobDetailsProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Normalize description object if not string
  const descObj = typeof job.description === "object" ? job.description : {};

  return (
    <>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">
                  {job.title}
                </h1>
                <div className="mt-2 flex items-center text-gray-700">
                  <FiBriefcase className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <ImProfile className="mr-1.5 h-4 w-4 text-gray-500" />
                    <span>{job.experience}</span>
                  </div>
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
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description with dynamic sub-sections */}
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Job Description
                </h2>
                <div className="prose max-w-none">
                  {typeof job.description === "string" ? (
                    <p className="text-gray-700 whitespace-pre-line">
                      {job.description}
                    </p>
                  ) : (
                    Object.entries(descObj).map(([key, val]) => (
                      <div key={key} className="mb-4">
                        <h3 className="text-md font-semibold text-gray-800 mb-2">
                          {formatTitle(key)}
                        </h3>
                        {Array.isArray(val) ? (
                          <ul className="list-disc list-inside text-gray-700">
                            {val.map((item: any, i: number) => (
                              <li key={i} className="whitespace-pre-line">
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-700 whitespace-pre-line">
                            {val}
                          </p>
                        )}
                      </div>
                    ))
                  )}

                  {/* If about_the_role not in description, render fallback */}
                  {job.about_the_role && !descObj["aboutTheRole"] && (
                    <div className="mb-4">
                      <h3 className="text-md font-semibold text-gray-800 mt-6 mb-2">
                        About The Role
                      </h3>
                      <p className="text-gray-700 whitespace-pre-line">
                        {job.about_the_role}
                      </p>
                    </div>
                  )}

                  {/* If responsibilities not in description, render fallback
                  {job.responsibilities && !descObj["keyResponsibilities"] && (
                    <div className="mb-4">
                      <h3 className="text-md font-semibold text-gray-800 mt-6 mb-2">
                        Key Responsibilities
                      </h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {job.responsibilities.map((r, i) => (
                          <li key={i} className="whitespace-pre-line">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply card */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Apply for this job
                </h2>
                <Button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full mb-3 h-11"
                >
                  Check Compatibility
                </Button>
                {job.applyLink ? (
                  <Link
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full" variant="outline">
                      Apply Now
                    </Button>
                  </Link>
                ) : (
                  <Button className="w-full" disabled>
                    Apply Now (Unavailable)
                  </Button>
                )}
              </div>
            </div>

            {/* Company info */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  About the company
                </h2>
                <p className="text-gray-700 mb-4">{job.aboutCompany}</p>
                <Link
                  href={`https://www.linkedin.com/company/${job.company
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View company profile
                </Link>
              </div>
            </div>

            {/* Similar jobs placeholder */}
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Similar Jobs
                </h2>
                <div>Coming Soon...</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ResumeUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        jobTitle={job.title}
        skills={job.skills}
        jobDescription={
          typeof job.description === "string"
            ? job.description
            : JSON.stringify(job.description)
        }
        requiredExperience={job.experience || "0 years"}
      />
    </>
  );
}
