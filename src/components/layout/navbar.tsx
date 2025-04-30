"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion } from "framer-motion"
import { FiMenu, FiX } from "react-icons/fi"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">VueHyre Job Board</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          
          
         
         
        </nav>

        <button
          className="flex md:hidden items-center justify-center rounded-md p-2 text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg md:hidden z-50"
          >
            <div className="container py-4 flex flex-col space-y-4">
             
             
              
             
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}