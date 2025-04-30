"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface JobTabsProps {
  tabs: {
    id: string
    label: string
    count: number
  }[]
  onChange: (tabId: string) => void
}

export function JobTabs({ tabs, onChange }: JobTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "")

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onChange(tabId)
  }

  return (
    <div className="border-b">
      <div className="container">
        <nav className="flex space-x-4 overflow-x-auto py-2 -mb-px scrollbar-hide" aria-label="Job categories">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "inline-flex whitespace-nowrap items-center px-1 py-3 border-b-2 text-sm font-medium",
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300"
              )}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
              <span
                className={cn(
                  "ml-2 rounded-full text-xs px-2 py-0.5",
                  activeTab === tab.id
                    ? "bg-primary-100 text-primary-800"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {tab.count}
              </span>
              
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}