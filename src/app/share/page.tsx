'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { Upload, FileText, Image, File, CheckCircle, AlertCircle, Code, MessageSquare, Type, Tag, X, Plus, Eye, RefreshCw, Clock, Heart, Bookmark } from 'lucide-react'
import { HelpTooltip } from '@/components/Tooltip'

export default function SharePage() {
  const [files, setFiles] = useState<File[]>([])
  const [textNarrative, setTextNarrative] = useState('')
  const [inputMethod, setInputMethod] = useState<'files' | 'text'>('files')
  const [step, setStep] = useState(1)
  const [generating, setGenerating] = useState(false)
  const [pcReviewRequested, setPcReviewRequested] = useState(false)
  const [shareCustomTool, setShareCustomTool] = useState(false)
  const [sharePrompt, setSharePrompt] = useState(false)
  const [suggestedTags] = useState(['Claude API', 'Document Processing', 'Automation', 'Time Savings'])
  const [customTags, setCustomTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [lessonData, setLessonData] = useState({
    title: 'Fixed Document Review Bottlenecks Using Claude',
    quickSummary: 'Eliminated 4-6 hour manual document reviews by implementing Claude API automation, reducing review time by 80%.',
    problem: 'Manual document review was taking 4-6 hours per document, creating bottlenecks in our workflow.',
    solution: 'Integrated Claude API with custom prompts for structured extraction of key information from documents.',
    impact: '80% time reduction, improved accuracy, scalable to 1000+ documents with consistent quality.'
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const addCustomTag = () => {
    if (newTag.trim() && !customTags.includes(newTag.trim()) && !suggestedTags.includes(newTag.trim())) {
      setCustomTags([...customTags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeCustomTag = (tagToRemove: string) => {
    setCustomTags(customTags.filter(tag => tag !== tagToRemove))
  }

  const generateLesson = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setStep(2)
    }, 3000)
  }

  const updateLesson = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      // Simulate updated content
      setLessonData({
        ...lessonData,
        title: 'Streamlined Document Reviews Using AI Automation',
        quickSummary: 'Transformed manual 4-6 hour document reviews into 30-minute automated processes using Claude API, achieving 85% time savings.'
      })
    }, 2000)
  }

  const requestPcReview = () => {
    setPcReviewRequested(true)
    setTimeout(() => {
      alert('P&C review request submitted! You will receive an email confirmation within 24 hours.')
    }, 500)
  }

  const publishLesson = () => {
    alert('Lesson published successfully! It will appear in the community feed shortly.')
    setFiles([])
    setTextNarrative('')
    setCustomTags([])
    setStep(1)
    setPcReviewRequested(false)
    setShareCustomTool(false)
    setSharePrompt(false)
    setShowPreview(false)
  }

  const getFileIcon = (file: File) => {
    if (file.type.includes('image')) return <Image className="w-4 h-4" />
    if (file.type.includes('pdf')) return <FileText className="w-4 h-4" />
    return <File className="w-4 h-4" />
  }

  const canGenerate = inputMethod === 'files' ? files.length > 0 : textNarrative.trim().length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amazon-blue mb-4">Share Your AI Success</h1>
          <p className="text-gray-600">Upload documents or share your story directly to create a structured lesson</p>
        </div>

        {step === 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-amazon-blue mb-6">Share Your Materials</h2>
            
            {/* Input Method Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-lg flex">
                <button
                  onClick={() => setInputMethod('files')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2 ${
                    inputMethod === 'files' 
                      ? 'bg-white text-amazon-blue shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Files</span>
                </button>
                <button
                  onClick={() => setInputMethod('text')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2 ${
                    inputMethod === 'text' 
                      ? 'bg-white text-amazon-blue shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  <span>Type Story</span>
                </button>
              </div>
            </div>

            {inputMethod === 'files' ? (
              <>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">Drop files here or click to upload</h3>
                    <HelpTooltip content="Upload project documentation, summaries, white papers, presentations, or any files that describe your AI implementation" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Support: PDF, Word, Excel, PowerPoint, Visio, Images
                    <br />
                    Max: 50MB per file, 200MB total
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    💡 Include: Project docs, summaries, white papers, presentations, architecture diagrams
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.vsd,.vsdx,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="bg-amazon-orange hover:bg-amazon-orange-dark text-white font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer inline-block">
                    Choose Files
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Uploaded Files ({files.length})</h4>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          {getFileIcon(file)}
                          <span className="flex-1 text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="mb-6">
                <div className="border-2 border-gray-300 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Type className="w-6 h-6 text-amazon-orange mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Tell Your Story</h3>
                    <HelpTooltip content="Type or paste your AI project narrative directly - describe the problem, solution, and impact" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Describe your AI implementation experience. Include the problem you faced, solution you implemented, and the impact achieved.
                  </p>
                  <textarea
                    value={textNarrative}
                    onChange={(e) => setTextNarrative(e.target.value)}
                    placeholder="Example: We had a problem with manual document reviews taking 4-6 hours each. I implemented Claude API with custom prompts to automate the extraction of key information. This reduced review time by 80% and improved accuracy..."
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {textNarrative.length} characters
                    </span>
                    <span className="text-xs text-gray-400">
                      AI will structure this into a proper lesson format
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700">Generate Lesson</span>
                <HelpTooltip content="AI will analyze your content and create a structured lesson with problem, solution, and impact sections" />
              </div>
              <button
                onClick={generateLesson}
                disabled={!canGenerate || generating}
                className="bg-amazon-orange hover:bg-amazon-orange-dark disabled:bg-gray-300 text-white font-medium px-8 py-3 rounded-lg transition-colors"
              >
                {generating ? 'Generating Lesson...' : 'Generate AI Lesson'}
              </button>
            </div>
          </div>
        )}

        {step === 2 && !showPreview && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <h2 className="text-xl font-semibold text-amazon-blue">AI Lesson Generated</h2>
              </div>
              <button
                onClick={updateLesson}
                disabled={generating}
                className="flex items-center space-x-2 px-6 py-3 bg-amazon-orange hover:bg-amazon-orange-dark disabled:bg-gray-300 text-white rounded-lg transition-colors font-medium"
              >
                <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
                <span>{generating ? 'Regenerating...' : 'Regenerate Lesson'}</span>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title (8 words max)</label>
                <input
                  type="text"
                  value={lessonData.title}
                  onChange={(e) => setLessonData({...lessonData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Summary (50 words max)</label>
                <textarea
                  rows={3}
                  value={lessonData.quickSummary}
                  onChange={(e) => setLessonData({...lessonData, quickSummary: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Problem (100 words max)</label>
                  <textarea
                    rows={4}
                    value={lessonData.problem}
                    onChange={(e) => setLessonData({...lessonData, problem: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Solution (100 words max)</label>
                  <textarea
                    rows={4}
                    value={lessonData.solution}
                    onChange={(e) => setLessonData({...lessonData, solution: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Impact (100 words max)</label>
                  <textarea
                    rows={4}
                    value={lessonData.impact}
                    onChange={(e) => setLessonData({...lessonData, impact: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                  />
                </div>
              </div>

              {/* Tags Section */}
              <div>
                <div className="flex items-center mb-3">
                  <Tag className="w-5 h-5 text-amazon-orange mr-2" />
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <HelpTooltip content="Tags help others discover your lesson. AI suggests relevant tags, but you can add custom ones too." position="right" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">AI suggested tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amazon-orange bg-opacity-10 text-amazon-orange border border-amazon-orange border-opacity-20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {customTags.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Your additional tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {customTags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
                          >
                            {tag}
                            <button
                              onClick={() => removeCustomTag(tag)}
                              className="ml-2 hover:text-blue-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Add more tags:</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                        placeholder="Enter a tag..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-orange text-sm"
                      />
                      <button
                        onClick={addCustomTag}
                        disabled={!newTag.trim()}
                        className="px-4 py-2 bg-amazon-orange hover:bg-amazon-orange-dark disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Sharing Sections */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Optional: Share Additional Resources</h3>
                
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="share-custom-tool"
                      checked={shareCustomTool}
                      onChange={(e) => setShareCustomTool(e.target.checked)}
                      className="mr-2"
                    />
                    <Code className="w-5 h-5 text-blue-600 mr-2" />
                    <label htmlFor="share-custom-tool" className="font-medium text-gray-700">
                      Share Custom AI Tool Details
                    </label>
                    <HelpTooltip content="Share any custom AI tools, scripts, or internal applications you built or used in this implementation." position="right" />
                  </div>
                  
                  {shareCustomTool && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tool Name</label>
                        <input
                          type="text"
                          placeholder="e.g., Document Analyzer Pro"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          placeholder="Brief description of your custom tool..."
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL (optional)</label>
                          <input
                            type="url"
                            placeholder="https://github.com/..."
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Documentation URL (optional)</label>
                          <input
                            type="url"
                            placeholder="https://wiki.amazon.com/..."
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="share-prompt"
                      checked={sharePrompt}
                      onChange={(e) => setSharePrompt(e.target.checked)}
                      className="mr-2"
                    />
                    <MessageSquare className="w-5 h-5 text-green-600 mr-2" />
                    <label htmlFor="share-prompt" className="font-medium text-gray-700">
                      Share AI Prompt Used
                    </label>
                    <HelpTooltip content="Share the specific prompts that worked well for your AI implementation. Others can copy and adapt them." position="right" />
                  </div>
                  
                  {sharePrompt && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prompt Title</label>
                        <input
                          type="text"
                          placeholder="e.g., Document Analysis Prompt"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prompt Content</label>
                        <textarea
                          rows={4}
                          placeholder="Paste your AI prompt here..."
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usage Notes (optional)</label>
                        <textarea
                          rows={2}
                          placeholder="Any tips or notes about using this prompt..."
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">P&C Review Recommended</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your content mentions API integration. Consider P&C review before publishing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex space-x-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={requestPcReview}
                      disabled={pcReviewRequested}
                      className="bg-white hover:bg-gray-50 disabled:bg-gray-100 text-amazon-blue border border-gray-300 font-medium px-6 py-3 rounded-lg transition-colors"
                    >
                      {pcReviewRequested ? 'P&C Review Requested' : 'Request P&C Review'}
                    </button>
                    <HelpTooltip content="Optional privacy and confidentiality check to ensure your lesson meets Amazon's sharing guidelines" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowPreview(true)}
                      className="bg-white hover:bg-gray-50 text-amazon-blue border border-amazon-blue font-medium px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    <HelpTooltip content="See exactly how your lesson will appear to other users before publishing" />
                  </div>
                </div>
                <button 
                  onClick={publishLesson}
                  className="bg-amazon-orange hover:bg-amazon-orange-dark text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Publish Lesson
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && showPreview && (
          <div className="space-y-6">
            {/* Preview Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-amazon-blue">Lesson Preview</h2>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">This is exactly how your lesson will appear in search results</p>
            </div>

            {/* Authentic Lesson Card Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-amazon-blue line-clamp-2">
                  {lessonData.title}
                </h3>
                <span className="text-xs bg-amazon-orange text-white px-2 py-1 rounded-full">
                  Intermediate
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {lessonData.quickSummary}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {[...suggestedTags, ...customTags].slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
                {([...suggestedTags, ...customTags].length > 3) && (
                  <span className="text-xs text-gray-500">+{[...suggestedTags, ...customTags].length - 3} more</span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>0</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>0</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bookmark className="w-3 h-3" />
                    <span>0</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>2-4 hours</span>
                </div>
              </div>
            </div>

            {/* Preview Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between">
                <button 
                  onClick={() => setShowPreview(false)}
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Back to Edit
                </button>
                <button 
                  onClick={publishLesson}
                  className="bg-amazon-orange hover:bg-amazon-orange-dark text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Publish Lesson
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}