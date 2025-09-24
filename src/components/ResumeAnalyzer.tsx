import React, { useState, useCallback } from 'react';
import { Upload, FileText, Loader2, Download, TrendingUp, DollarSign, Target, Award, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
}

const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
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
    
    // Simulate AI analysis with realistic data
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        overallScore: 78,
        salaryEstimate: {
          min: 75000,
          max: 95000,
          currency: 'USD'
        },
        strengths: [
          'Strong technical skills in React and TypeScript',
          'Excellent project management experience',
          'Good educational background',
          'Clear career progression'
        ],
        improvements: [
          'Add more quantifiable achievements',
          'Include relevant certifications',
          'Optimize keywords for ATS systems',
          'Add soft skills examples'
        ],
        skills: [
          { name: 'React', level: 90, inDemand: true },
          { name: 'TypeScript', level: 85, inDemand: true },
          { name: 'Python', level: 70, inDemand: true },
          { name: 'Project Management', level: 80, inDemand: false },
          { name: 'SQL', level: 65, inDemand: true },
          { name: 'AWS', level: 60, inDemand: true }
        ],
        atsScore: 82,
        readabilityScore: 88,
        keywordMatch: 75,
        recommendations: [
          'Increase quantifiable metrics by 30% to improve impact',
          'Add cloud certifications to boost technical profile',
          'Include leadership examples in project descriptions',
          'Optimize resume for senior-level positions'
        ]
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete!",
        description: "Your resume has been analyzed successfully",
      });
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  const getScoreVariant = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <Card className="shadow-card bg-gradient-card">
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
                ? 'border-primary bg-primary/5 shadow-glow'
                : 'border-muted-foreground/25 hover:border-primary/50'
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
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              
              {file ? (
                <div className="space-y-2">
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
                  <p className="text-xs text-muted-foreground">PDF files only</p>
                </div>
              )}
            </div>
          </div>

          {file && (
            <div className="mt-6 flex justify-center">
              <Button
                onClick={analyzeResume}
                disabled={isAnalyzing}
                variant="hero"
                size="lg"
                className="animate-scale-in"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-card bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                    <p className="text-2xl font-bold text-foreground">{analysis.overallScore}%</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <Progress value={analysis.overallScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Salary Range</p>
                    <p className="text-lg font-bold text-foreground">
                      ${analysis.salaryEstimate.min.toLocaleString()} - ${analysis.salaryEstimate.max.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ATS Score</p>
                    <p className="text-2xl font-bold text-foreground">{analysis.atsScore}%</p>
                  </div>
                  <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-warning" />
                  </div>
                </div>
                <Progress value={analysis.atsScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Readability</p>
                    <p className="text-2xl font-bold text-foreground">{analysis.readabilityScore}%</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <Progress value={analysis.readabilityScore} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="salary">Salary Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-success">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-warning">Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Skills Analysis</CardTitle>
                  <CardDescription>
                    Your skills evaluation and market demand analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{skill.name}</span>
                          {skill.inDemand && (
                            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                              In Demand
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24">
                            <Progress value={skill.level} />
                          </div>
                          <span className="text-sm font-medium min-w-[3rem]">{skill.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>
                    Personalized suggestions to enhance your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.recommendations.map((recommendation, index) => (
                      <Alert key={index}>
                        <TrendingUp className="h-4 w-4" />
                        <AlertDescription>{recommendation}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="salary" className="space-y-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Salary Insights</CardTitle>
                  <CardDescription>
                    Market-based salary estimation for your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">
                        ${analysis.salaryEstimate.min.toLocaleString()} - ${analysis.salaryEstimate.max.toLocaleString()}
                      </p>
                      <p className="text-muted-foreground">Estimated annual salary range</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-lg font-semibold">${(analysis.salaryEstimate.min).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Minimum</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-primary/10">
                        <p className="text-lg font-semibold text-primary">
                          ${((analysis.salaryEstimate.min + analysis.salaryEstimate.max) / 2).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Average</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-lg font-semibold">${analysis.salaryEstimate.max.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Maximum</p>
                      </div>
                    </div>

                    <Alert>
                      <DollarSign className="h-4 w-4" />
                      <AlertDescription>
                        This estimate is based on your skills, experience level, and current market trends. 
                        Actual salaries may vary based on location, company size, and specific role requirements.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button variant="hero" size="lg">
              Get Optimization Tips
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;