"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { formatSalary } from "@/lib/utils"
import { FiMapPin, FiClock, FiBriefcase, FiDollarSign } from "react-icons/fi"
import { useState } from "react"

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    salary: string | number
    skills: string[]
    postedAt: string
    applyLink: string
    description: string
  }
}

export function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card card-hover overflow-hidden"
    >
      <div className="relative">
        <Link href={`/jobs/${job.id}`} className="block p-5">
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
            </div>
          </div>
        </Link>
        <button 
          onClick={() => setIsSaved(!isSaved)} 
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isSaved ? "Unsave job" : "Save job"}
        >
          {/* <FiBookmark 
            className={`h-5 w-5 ${isSaved ? "fill-primary-500 text-primary-500" : "text-gray-400"}`} 
          /> */}
        </button>
      </div>
      <div className="flex border-t p-4 justify-end items-center">
        <Link 
          href={`/jobs/${job.id}`}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}