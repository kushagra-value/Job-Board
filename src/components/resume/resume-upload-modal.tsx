"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FiUpload, FiX, FiCheckCircle, FiFileText, FiAlertCircle } from "react-icons/fi"
import { useDropzone } from "react-dropzone"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

interface ResumeUploadModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
  skills: string[]
  jobDescription: string
  requiredExperience: string
}

export function ResumeUploadModal({ isOpen, onClose, jobTitle, skills, jobDescription, requiredExperience }: ResumeUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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

  const parseExperienceToYears = (exp: string): number => {
    const match = exp.match(/(\d+)-(\d+) years/) || exp.match(/(\d+) years/)
    if (match) {
      return parseInt(match[1])
    }
    return 0
  }

  const handleAnalyzeResume = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    const formData = new FormData()
    formData.append('resume', file)
    formData.append('job_description', jobDescription)
    formData.append('required_experience', parseExperienceToYears(requiredExperience).toString())
    formData.append('skills', skills.join(','))

    try {
      const response = await fetch('https://hrm-on-chat.skunkworkz.in/job-board', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to analyze resume')
      }

      const data = await response.json()
      setAnalysisResult(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setFile(null)
    setAnalysisResult(null)
    setError(null)
  }

  if (!isOpen) return null

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {isAnalyzing && (
          <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        )}

        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Resume Compatibility Check</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!analysisResult ? (
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
                <div className="bg-gray-50 rounded-lg p-6 flex items-center">
                  <FiFileText className="h-8 w-8 text-primary-500" />
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>
                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button onClick={() => setFile(null)} className="text-gray-400 hover:text-gray-500">
                    <FiX size={20} />
                  </button>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <Button onClick={onClose} variant="outline">Cancel</Button>
                <Button onClick={handleAnalyzeResume} disabled={!file || isAnalyzing}>
                  Analyze Resume
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Overall Score */}
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto">
                  <CircularProgressbar
                    value={analysisResult.overall_assessment.overall_score}
                    text={`${analysisResult.overall_assessment.overall_score}%`}
                    styles={buildStyles({
                      textColor: "#000",
                      pathColor: analysisResult.overall_assessment.overall_score >= 80 ? "#22c55e" : 
                               analysisResult.overall_assessment.overall_score >= 60 ? "#facc15" : "#ef4444",
                      trailColor: "#d1d5db",
                    })}
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Overall Match</h3>
                <p className="mt-2 text-gray-600">{analysisResult.overall_assessment.remarks}</p>
              </div>

              {/* Scoring Details */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Scoring Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Resume Score</p>
                    <Progress value={analysisResult.scoring.resume_score} className="w-full" />
                    <p className="text-sm text-gray-600 mt-1">{analysisResult.scoring.resume_score}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Knowledge Score</p>
                    <Progress value={analysisResult.scoring.knowledge_score} className="w-full" />
                    <p className="text-sm text-gray-600 mt-1">{analysisResult.scoring.knowledge_score}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">JD Compatibility Score</p>
                    <Progress value={analysisResult.scoring.jd_compatibility_score} className="w-full" />
                    <p className="text-sm text-gray-600 mt-1">{analysisResult.scoring.jd_compatibility_score}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Overall Score</p>
                    <Progress value={analysisResult.scoring.overall_score} className="w-full" />
                    <p className="text-sm text-gray-600 mt-1">{analysisResult.scoring.overall_score}%</p>
                  </div>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Summary</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {analysisResult.quick_summary.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Selection Decision */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Selection Decision</h3>
                <p className="text-gray-700">
                  <strong>Selected:</strong> {analysisResult.selection_decision.selected ? 'Yes' : 'No'}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Reason:</strong> {analysisResult.selection_decision.reason}
                </p>
              </div>

              {/* Accordion for Detailed Analysis */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="skills">
                  <AccordionTrigger>Skill Evaluation</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Skill Scores</h4>
                      {analysisResult.skill_evaluation.skills.map((skill: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{skill.skill_name}</span>
                            <span className="text-sm">{skill.match_score}%</span>
                          </div>
                          <Progress value={skill.match_score} className="w-full" />
                          <p className="text-sm text-gray-600 mt-1">{skill.remark}</p>
                        </div>
                      ))}
                      <p className="mt-2 text-sm">
                        <strong>Missing Skills:</strong> {analysisResult.skill_evaluation.top_missing_skills.join(', ')}
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Overall Skill Score:</strong> {analysisResult.skill_evaluation.overall_skill_score}%
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Remarks:</strong> {analysisResult.skill_evaluation.Overall_remarks}
                      </p>
                      <h4 className="font-semibold text-gray-900 mt-4">Validated Skills</h4>
                      <div className="space-y-2">
                        <p><strong>Technical:</strong> {analysisResult.validated_skills.technical.join(', ') || 'None'}</p>
                        <p><strong>Functional:</strong> {analysisResult.validated_skills.functional.join(', ') || 'None'}</p>
                        <p><strong>Leadership:</strong> {analysisResult.validated_skills.leadership.join(', ') || 'None'}</p>
                      </div>
                      <h4 className="font-semibold text-gray-900 mt-4">Unverified Skills</h4>
                      <p>{analysisResult.unverified_skills.join(', ') || 'None'}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="projects">
                  <AccordionTrigger>Key Projects</AccordionTrigger>
                  <AccordionContent>
                    {analysisResult.key_projects.length > 0 ? (
                      <div className="space-y-4">
                        {analysisResult.key_projects.map((project: any, index: number) => (
                          <div key={index} className="border-l-4 border-primary-500 pl-4">
                            <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                            <p className="text-sm text-gray-600"><strong>Duration:</strong> {project.duration}</p>
                            <p className="text-sm text-gray-600"><strong>Scope:</strong> {project.scope}</p>
                            <p className="text-sm text-gray-600"><strong>Contribution:</strong> {project.contribution}</p>
                            <p className="text-sm text-gray-600"><strong>Impact:</strong> {project.impact}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No key projects identified.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="flags">
                  <AccordionTrigger>Strengths & Concerns</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                        {Object.values(analysisResult.green_flags).flat().length > 0 ? (
                          <ul className="space-y-2">
                            {Object.values(analysisResult.green_flags).flat().map((flag: any, index: number) => (
                              <li key={index} className="flex items-start">
                                <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                                <span className="text-gray-700">{flag.details} </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No notable strengths identified.</p>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">Concerns</h4>
                        {Object.values(analysisResult.red_flags).flat().length > 0 ? (
                          <ul className="space-y-2">
                            {Object.values(analysisResult.red_flags).flat().map((flag: any, index: number) => (
                              <li key={index} className="flex items-start">
                                <FiAlertCircle className="text-red-500 mt-1 mr-2" />
                                <div>
                                  <p className="text-gray-700"><strong>{flag.type}</strong> {flag.reason}</p>
                                  </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No notable concerns identified.</p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Buttons */}
              <div className="mt-6 flex justify-between">
                <Button onClick={resetAnalysis} variant="outline">Check Another Resume</Button>
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Apply for Job
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
