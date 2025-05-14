"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatSalary } from "@/lib/utils";
import { FiMapPin, FiClock, FiBriefcase, FiDollarSign } from "react-icons/fi";
import { useState } from "react";
import slugify from "slugify";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string | number;
    skills: string[];
    postedAt: string;
    applyLink: string;
    description: string;
  };
}

export function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const companySlug = slugify(job.company, { lower: true, strict: true });
  const titleSlug = slugify(job.title, { lower: true, strict: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card card-hover overflow-hidden"
    >
      <div className="relative">
        <Link
          href={`/jobs/${companySlug}/${titleSlug}/${job.id}`}
          className="block p-5"
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-500 transition-colors">
                {job.title}
              </h3>
            </div>
            <div className="flex items-center text-gray-700 mb-1">
              <FiBriefcase className="mr-2 h-4 w-4 text-gray-500" />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <FiMapPin className="mr-1 h-4 w-4 text-gray-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <FiDollarSign className="mr-1 h-4 w-4 text-gray-500" />
                <span>{formatSalary(job.salary)}</span>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-1 h-4 w-4 text-gray-500" />
                <span>{job.postedAt}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.skills && job.skills.length > 0 ? (
                <>
                  {job.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex border-t p-4 justify-end items-center">
        <Link
          href={`/jobs/${companySlug}/${titleSlug}/${job.id}`}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
