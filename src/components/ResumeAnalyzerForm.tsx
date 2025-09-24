import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Loader2, TrendingUp, Briefcase, FileSearch } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface AnalysisResult {
  overallScore: number;
  salaryEstimate: {
    min: number;
    max: number;
    currency: string;
  };
  strengths: string[];
  improvements: string[];
  skills: { name: string; level: number; inDemand: boolean }[];
  atsScore: number;
  readabilityScore: number;
  keywordMatch: number;
  recommendations: string[];
  jobTitle?: string;
  jobDescription?: string;
  fileName: string;
}

const ResumeAnalyzerForm: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith('.pdf')) {
        setFile(selectedFile);
        toast({
          title: "File uploaded",
          description: `${selectedFile.name} is ready for analysis`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File uploaded",
        description: `${selectedFile.name} is ready for analysis`,
      });
    }
  };

  const analyzeResume = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with enhanced data including job matching
    setTimeout(() => {
      const baseKeywordMatch = jobTitle ? Math.floor(Math.random() * 30) + 60 : Math.floor(Math.random() * 20) + 70;
      const adjustedAtsScore = jobDescription ? Math.min(95, baseKeywordMatch + Math.floor(Math.random() * 15)) : Math.floor(Math.random() * 30) + 70;
      
      const mockAnalysis: AnalysisResult = {
        overallScore: Math.floor(Math.random() * 25) + 70,
        salaryEstimate: {
          min: 75000 + (jobTitle ? 10000 : 0),
          max: 95000 + (jobTitle ? 15000 : 0),
          currency: 'USD'
        },
        strengths: [
          'Strong technical skills in modern frameworks',
          'Excellent project management experience',
          'Good educational background with relevant degree',
          'Clear career progression shown',
          ...(jobTitle ? [`Experience aligns well with ${jobTitle} requirements`] : [])
        ],
        improvements: [
          'Add more quantifiable achievements and metrics',
          'Include relevant industry certifications',
          'Optimize keywords for better ATS compatibility',
          'Add examples of soft skills and leadership',
          ...(jobDescription ? ['Tailor experience descriptions to match job requirements'] : [])
        ],
        skills: [
          { name: 'React', level: 90, inDemand: true },
          { name: 'TypeScript', level: 85, inDemand: true },
          { name: 'Python', level: 70, inDemand: true },
          { name: 'Project Management', level: 80, inDemand: false },
          { name: 'SQL', level: 65, inDemand: true },
          { name: 'AWS', level: 60, inDemand: true },
          ...(jobTitle?.toLowerCase().includes('senior') ? [{ name: 'Leadership', level: 75, inDemand: true }] : [])
        ],
        atsScore: adjustedAtsScore,
        readabilityScore: Math.floor(Math.random() * 20) + 80,
        keywordMatch: baseKeywordMatch,
        recommendations: [
          'Increase quantifiable metrics by 30% to improve impact',
          'Add cloud certifications to boost technical profile',
          'Include leadership examples in project descriptions',
          'Optimize resume format for senior-level positions',
          ...(jobTitle ? [`Emphasize ${jobTitle} relevant experience more prominently`] : []),
          ...(jobDescription ? ['Add specific keywords from the job description'] : [])
        ],
        jobTitle: jobTitle || undefined,
        jobDescription: jobDescription || undefined,
        fileName: file.name
      };

      setIsAnalyzing(false);
      toast({
        title: "Analysis complete!",
        description: "Your resume has been analyzed successfully",
      });

      // Navigate to results page with analysis data
      navigate('/results', { state: { analysis: mockAnalysis } });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <Card className="shadow-card bg-gradient-card animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Your Resume
          </CardTitle>
          <CardDescription>
            Upload your resume in PDF format for comprehensive AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragActive
                ? 'border-primary bg-primary/5 shadow-glow scale-105'
                : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className={`mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center transition-all duration-300 ${
                dragActive ? 'scale-110 bg-primary/20' : ''
              }`}>
                <FileText className="h-8 w-8 text-primary" />
              </div>
              
              {file ? (
                <div className="space-y-2 animate-scale-in">
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your resume here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">PDF files only • Max 10MB</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Details Section */}
      <Card className="shadow-card bg-gradient-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Target Job Details (Optional)
          </CardTitle>
          <CardDescription>
            Provide job details for personalized analysis and better salary estimates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="e.g., Senior Frontend Developer, Product Manager"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="transition-all duration-200 focus:scale-105"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here for better keyword matching and analysis..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="transition-all duration-200 focus:scale-105"
            />
            <p className="text-xs text-muted-foreground">
              Including job details will improve analysis accuracy and provide better keyword matching
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Button */}
      {file && (
        <div className="flex justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <Button
            onClick={analyzeResume}
            disabled={isAnalyzing}
            variant="hero"
            size="xl"
            className="shadow-elegant hover:shadow-glow transition-all duration-300"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <FileSearch className="mr-2 h-5 w-5" />
                Analyze My Resume
              </>
            )}
          </Button>
        </div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Advanced algorithms analyze your resume structure, content, and ATS compatibility
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold mb-2">Job Matching</h3>
            <p className="text-sm text-muted-foreground">
              Compare your resume against specific job requirements for better targeting
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileSearch className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-semibold mb-2">Detailed Insights</h3>
            <p className="text-sm text-muted-foreground">
              Get actionable recommendations and salary estimates based on your profile
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeAnalyzerForm;