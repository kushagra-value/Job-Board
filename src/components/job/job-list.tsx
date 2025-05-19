"use client";

import { useState, useEffect } from "react";
import { JobCard } from "@/components/job/job-card";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | number;
  skills: string[];
  postedAt: string;
  applyLink: string;
  description: object;
}

interface JobListProps {
  jobs: Job[];
  title?: string;
}

export function JobList({ jobs, title = "All Jobs" }: JobListProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  // Simulate loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

  // Extract unique companies and locations for filters
  const companies = Array.from(new Set(jobs.map((job) => job.company)));
  const locations = Array.from(new Set(jobs.map((job) => job.location)));

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter((job) => {
    const companyMatch =
      selectedCompanies.length === 0 || selectedCompanies.includes(job.company);
    const locationMatch =
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);
    return companyMatch && locationMatch;
  });

  // Toggle company selection
  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  // Toggle location selection
  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="border rounded-lg p-4 bg-white animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>

      <div className="flex gap-2">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
      </div>

      <div className="flex gap-2">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          {title}
        </h2>
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center"
        >
          <FiFilter className="mr-2" /> Filters
          <FiChevronDown
            className={`ml-2 transition-transform ${
              isFilterOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 overflow-hidden"
          >
            <div className="border rounded-lg p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Companies</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {companies.map((company) => (
                      <div key={company} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`company-${company}`}
                          checked={selectedCompanies.includes(company)}
                          onChange={() => toggleCompany(company)}
                          className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`company-${company}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {company}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Locations</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`location-${location}`}
                          checked={selectedLocations.includes(location)}
                          onChange={() => toggleLocation(location)}
                          className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`location-${location}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCompanies([]);
                    setSelectedLocations([]);
                  }}
                  className="mr-2"
                >
                  Clear Filters
                </Button>
                <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Display skeleton loaders
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : filteredJobs.length > 0 ? (
          // Display job cards
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          // Display no jobs found message
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedCompanies([]);
                setSelectedLocations([]);
                setIsFilterOpen(true);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
