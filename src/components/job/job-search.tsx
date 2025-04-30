"use client"

import { useState } from "react"
import { FiSearch, FiX } from "react-icons/fi"
import { motion } from "framer-motion"

interface JobSearchProps {
  onSearch: (query: string) => void
}

export function JobSearch({ onSearch }: JobSearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className="w-full px-4 py-6 md:py-8 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="container">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-white/90 mb-6">
          Search through thousands of jobs from top companies
        </p>
        <form onSubmit={handleSearch} className="relative">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job title, company, or skill"
                className="w-full pl-10 pr-10 py-3 rounded-md border-0 shadow-sm focus:ring-2 focus:ring-primary-500 text-gray-900"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <FiX className="text-gray-500 hover:text-gray-700" />
                </button>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-6 py-3 rounded-md bg-accent-500 text-white font-medium shadow-sm hover:bg-accent-600 transition-colors"
            >
              Search Jobs
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  )
}