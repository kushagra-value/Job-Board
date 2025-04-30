"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FiUpload, FiX, FiCheckCircle, FiFileText, FiAlertCircle } from "react-icons/fi"
import { useDropzone } from "react-dropzone"

interface ResumeUploadModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
  skills: string[]
}

interface SkillScore {
  skill: string
  match: number
}

export function ResumeUploadModal({ isOpen, onClose, jobTitle, skills }: ResumeUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [overallScore, setOverallScore] = useState(0)
  const [skillScores, setSkillScores] = useState<SkillScore[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const modalRef = useRef<HTMLDivElement>(null)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0])
    },
  })

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  const handleAnalyzeResume = () => {
    if (!file) return
    
    setAnalyzing(true)
    
    // Simulate analysis process
    setTimeout(() => {
      // Simulate skill analysis - in a real app this would be an API call
      const simulatedSkillScores: SkillScore[] = skills.map(skill => ({
        skill,
        match: Math.floor(Math.random() * 101)
      })).sort((a, b) => b.match - a.match)
      
      const avgScore = Math.floor(
        simulatedSkillScores.reduce((sum, skill) => sum + skill.match, 0) / skills.length
      )
      
      setSkillScores(simulatedSkillScores)
      setOverallScore(avgScore)
      
      // Generate suggestions based on low scoring skills
      const lowScoringSkills = simulatedSkillScores
        .filter(skill => skill.match < 50)
        .map(skill => skill.skill)
      
      const sampleSuggestions = [
        `Add more experience with ${lowScoringSkills.join(', ')} to your resume.`,
        "Include specific projects that demonstrate your technical abilities.",
        "Quantify your achievements with metrics and results.",
        "Tailor your resume summary to match the job description.",
        "Use more industry-specific keywords throughout your resume."
      ]
      
      setSuggestions(sampleSuggestions.slice(0, 3 + Math.floor(Math.random() * 3)))
      
      setAnalyzing(false)
      setAnalyzed(true)
    }, 2000)
  }

  const resetAnalysis = () => {
    setFile(null)
    setAnalyzed(false)
    setSkillScores([])
    setOverallScore(0)
    setSuggestions([])
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto"
        >
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Resume Compatibility Check
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="p-6">
            {!analyzed ? (
              <>
                <p className="text-gray-700 mb-6">
                  Upload your resume to check compatibility with the <span className="font-medium">{jobTitle}</span> position.
                </p>
                
                {!file ? (
                  <div 
                    {...getRootProps()} 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
                  >
                    <input {...getInputProps()} />
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-700">Drag and drop your resume, or click to select a file</p>
                    <p className="mt-2 text-sm text-gray-500">Supports PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FiFileText className="h-8 w-8 text-primary-500" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>
                        <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        className="ml-4 text-gray-400 hover:text-gray-500"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="mr-3"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAnalyzeResume}
                    disabled={!file || analyzing}
                  >
                    {analyzing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing Resume...
                      </>
                    ) : (
                      'Analyze Resume'
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div 
                    className={`inline-flex items-center justify-center h-24 w-24 rounded-full ${
                      overallScore >= 80 ? 'bg-green-100' : overallScore >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                    }`}
                  >
                    <span 
                      className={`text-3xl font-bold ${
                        overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}
                    >
                      {overallScore}%
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {overallScore >= 80 
                      ? 'Excellent Match!' 
                      : overallScore >= 60 
                        ? 'Good Match' 
                        : 'Needs Improvement'}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {overallScore >= 80 
                      ? 'Your profile is an excellent match for this role!' 
                      : overallScore >= 60 
                        ? 'Your profile is a good match, but could be improved.' 
                        : 'Your profile needs some work to be competitive for this role.'}
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Match Analysis</h3>
                  <div className="space-y-4">
                    {skillScores.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                          <span 
                            className={`text-sm font-medium ${
                              skill.match >= 80 ? 'text-green-600' : skill.match >= 60 ? 'text-yellow-600' : 'text-red-600'
                            }`}
                          >
                            {skill.match}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              skill.match >= 80 ? 'bg-green-500' : skill.match >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${skill.match}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Suggestions</h3>
                  <ul className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <FiAlertCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-2" />
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-6 flex justify-between">
                  <Button
                    onClick={resetAnalysis}
                    variant="outline"
                  >
                    Check Another Resume
                  </Button>
                  <a
                    href="#" // In a real app, this would be the job apply link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Apply for Job
                  </a>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}