import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, TrendingUp, DollarSign, Target, Award, AlertCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis as AnalysisResult;

  if (!analysis) {
    navigate('/');
    return null;
  }

  const handleDownloadReport = () => {
    // Mock download functionality
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `resume-analysis-${Date.now()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Resume Analysis Results',
        text: `I got a ${analysis.overallScore}% overall score on my resume analysis!`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header Section */}
        <section className="py-12 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="animate-fade-in"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Analyzer
              </Button>
            </div>
            
            <div className="text-center space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Analysis Results
                </h1>
                <p className="text-xl text-muted-foreground">
                  For resume: <span className="font-semibold text-foreground">{analysis.fileName}</span>
                </p>
                {analysis.jobTitle && (
                  <p className="text-lg text-primary font-medium">
                    Target Position: {analysis.jobTitle}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" onClick={handleDownloadReport} className="animate-scale-in">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" onClick={handleShare} className="animate-scale-in">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-8 animate-fade-in">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-card bg-gradient-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                        <p className="text-3xl font-bold text-foreground">{analysis.overallScore}%</p>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <Progress value={analysis.overallScore} className="mt-3" />
                  </CardContent>
                </Card>

                <Card className="shadow-card bg-gradient-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
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

                <Card className="shadow-card bg-gradient-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">ATS Score</p>
                        <p className="text-3xl font-bold text-foreground">{analysis.atsScore}%</p>
                      </div>
                      <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                        <Target className="h-6 w-6 text-warning" />
                      </div>
                    </div>
                    <Progress value={analysis.atsScore} className="mt-3" />
                  </CardContent>
                </Card>

                <Card className="shadow-card bg-gradient-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Readability</p>
                        <p className="text-3xl font-bold text-foreground">{analysis.readabilityScore}%</p>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <Progress value={analysis.readabilityScore} className="mt-3" />
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analysis Tabs */}
              <Tabs defaultValue="overview" className="w-full animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="recommendations">Tips</TabsTrigger>
                  <TabsTrigger value="salary">Salary</TabsTrigger>
                  <TabsTrigger value="job-match">Job Match</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="text-success flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {analysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-3 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                              <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="text-warning flex items-center gap-2">
                          <AlertCircle className="h-5 w-5" />
                          Areas for Improvement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {analysis.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start gap-3 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                              <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6 mt-6">
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
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors animate-slide-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{skill.name}</span>
                              {skill.inDemand && (
                                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                                  In Demand
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-32">
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

                <TabsContent value="recommendations" className="space-y-6 mt-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>AI Recommendations</CardTitle>
                      <CardDescription>
                        Personalized suggestions to enhance your resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysis.recommendations.map((recommendation, index) => (
                          <Alert key={index} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <TrendingUp className="h-4 w-4" />
                            <AlertDescription className="leading-relaxed">{recommendation}</AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="salary" className="space-y-6 mt-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Salary Insights</CardTitle>
                      <CardDescription>
                        Market-based salary estimation for your profile
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div className="text-center animate-scale-in">
                          <p className="text-4xl font-bold text-primary mb-2">
                            ${analysis.salaryEstimate.min.toLocaleString()} - ${analysis.salaryEstimate.max.toLocaleString()}
                          </p>
                          <p className="text-muted-foreground">Estimated annual salary range</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-6 rounded-lg bg-muted/50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <p className="text-2xl font-semibold">${(analysis.salaryEstimate.min).toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground mt-1">Minimum</p>
                          </div>
                          <div className="text-center p-6 rounded-lg bg-primary/10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <p className="text-2xl font-semibold text-primary">
                              ${((analysis.salaryEstimate.min + analysis.salaryEstimate.max) / 2).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">Average</p>
                          </div>
                          <div className="text-center p-6 rounded-lg bg-muted/50 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            <p className="text-2xl font-semibold">${analysis.salaryEstimate.max.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground mt-1">Maximum</p>
                          </div>
                        </div>

                        <Alert className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
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

                <TabsContent value="job-match" className="space-y-6 mt-6">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>Job Match Analysis</CardTitle>
                      <CardDescription>
                        How well your resume matches the target job requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {analysis.jobTitle && (
                          <div className="text-center p-6 bg-primary/5 rounded-lg animate-fade-in">
                            <h3 className="text-xl font-semibold mb-2">Target Position</h3>
                            <p className="text-lg text-primary font-medium">{analysis.jobTitle}</p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 rounded-lg border animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <p className="text-2xl font-bold text-primary">{analysis.keywordMatch}%</p>
                            <p className="text-sm text-muted-foreground">Keyword Match</p>
                          </div>
                          <div className="text-center p-4 rounded-lg border animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <p className="text-2xl font-bold text-success">{analysis.atsScore}%</p>
                            <p className="text-sm text-muted-foreground">ATS Compatibility</p>
                          </div>
                          <div className="text-center p-4 rounded-lg border animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            <p className="text-2xl font-bold text-warning">{analysis.overallScore}%</p>
                            <p className="text-sm text-muted-foreground">Overall Match</p>
                          </div>
                        </div>

                        {analysis.jobDescription && (
                          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <h4 className="font-semibold mb-3">Job Description Analysis</h4>
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {analysis.jobDescription.substring(0, 300)}...
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Results;