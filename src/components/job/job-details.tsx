"use client";

import { useState } from "react";
import { formatSalary } from "@/lib/utils";
import { FiMapPin, FiClock, FiBriefcase, FiDollarSign } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ResumeUploadModal } from "@/components/resume/resume-upload-modal";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // Ensure Supabase client is configured here
import { v4 as uuidv4 } from "uuid";

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

// New ApplyResumeModal Component
interface ApplyResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

function ApplyResumeModal({
  isOpen,
  onClose,
  onSubmit,
}: ApplyResumeModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setUploadError(null); // Clear any previous errors
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      setUploadError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    // Validate file size (5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Generate a unique file name
      const fileName = `${uuidv4()}-${selectedFile.name}`;
      const { data, error } = await supabase.storage
        .from("applicants-resume")
        .upload(fileName, selectedFile);

      if (error) throw error;

      // Upload successful, proceed to onSubmit
      onSubmit();
    } catch (err) {
      setUploadError("Failed to upload resume. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Upload Your Resume</h2>
        <p className="text-gray-600 mb-6">
          Please upload your resume to proceed with the application.
        </p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="mb-6 w-full"
        />
        {/* {selectedFile && <p className="text-green-600 mt-2">Uploaded</p>} */}
        {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Submit and Apply"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function JobDetails({ job }: JobDetailsProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
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
                {/* <Button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full mb-3 h-11"
                >
                  Check Compatibility
                </Button> */}
                {job.applyLink ? (
                  <Button
                    onClick={() => setIsApplyModalOpen(true)}
                    className="w-full"
                    variant="outline"
                  >
                    Apply Now
                  </Button>
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

      {/* Existing ResumeUploadModal */}
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

      {/* New ApplyResumeModal */}
      <ApplyResumeModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSubmit={() => {
          setIsApplyModalOpen(false);
          if (job.applyLink) {
            window.open(job.applyLink, "_blank");
          }
        }}
      />
    </>
  );
}
