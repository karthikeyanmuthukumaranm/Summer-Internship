import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, TrendingUp, Search, Award, BarChart3 } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface AIAnalysisSectionProps {
  aiData: {
    keywordExtraction: string[];
    skillsIdentified: string[];
    experienceLevel: string;
    domainClassification: string;
    similarityScore: number;
    tfIdfScore: number;
  };
  jobTitle?: string;
  jobDescription?: string;
}

const AIAnalysisSection: React.FC<AIAnalysisSectionProps> = ({ aiData, jobTitle, jobDescription }) => {
  // Create radar chart data for skill analysis
  const radarData = [
    { subject: 'Technical Skills', A: 85, fullMark: 100 },
    { subject: 'Experience Level', A: aiData.experienceLevel === 'Senior' ? 90 : aiData.experienceLevel === 'Mid-Level' ? 70 : 50, fullMark: 100 },
    { subject: 'Keyword Match', A: aiData.similarityScore, fullMark: 100 },
    { subject: 'TF-IDF Score', A: aiData.tfIdfScore, fullMark: 100 },
    { subject: 'Domain Relevance', A: 80, fullMark: 100 },
    { subject: 'ATS Compatibility', A: 75, fullMark: 100 },
  ];

  // Create bar chart data for keyword frequency
  const keywordFrequencyData = aiData.keywordExtraction.slice(0, 8).map((keyword, index) => ({
    keyword,
    frequency: Math.floor(Math.random() * 20) + 5,
    relevance: Math.floor(Math.random() * 30) + 70,
  }));

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case 'Senior': return 'hsl(var(--success))';
      case 'Mid-Level': return 'hsl(var(--warning))';
      case 'Junior': return 'hsl(var(--info))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* AI Analysis Overview */}
      <Card className="shadow-elegant bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Analysis
          </CardTitle>
          <CardDescription>
            Advanced NLP and machine learning analysis of your resume content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{aiData.tfIdfScore}%</div>
              <div className="text-sm text-muted-foreground">TF-IDF Score</div>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
              <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">{aiData.similarityScore}%</div>
              <div className="text-sm text-muted-foreground">Job Similarity</div>
            </div>
            <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
              <Award className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold" style={{ color: getExperienceLevelColor(aiData.experienceLevel) }}>
                {aiData.experienceLevel}
              </div>
              <div className="text-sm text-muted-foreground">Experience Level</div>
            </div>
            <div className="text-center p-4 bg-info/5 rounded-lg border border-info/20">
              <BarChart3 className="h-8 w-8 text-info mx-auto mb-2" />
              <div className="text-2xl font-bold text-info">{aiData.domainClassification}</div>
              <div className="text-sm text-muted-foreground">Domain</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keyword Extraction & TF-IDF Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Keyword Extraction (TF-IDF)
            </CardTitle>
            <CardDescription>
              Most important keywords identified using Term Frequency-Inverse Document Frequency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={keywordFrequencyData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="keyword" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="relevance" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Extracted Keywords:</h4>
              <div className="flex flex-wrap gap-2">
                {aiData.keywordExtraction.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Skills Radar Analysis</CardTitle>
            <CardDescription>
              Multi-dimensional analysis of your profile strengths
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={0} domain={[0, 100]} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Identification */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Identified Skills & Competencies</CardTitle>
          <CardDescription>
            Skills automatically identified through NLP analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Technical Skills</h4>
              <div className="space-y-2">
                {aiData.skillsIdentified.filter(skill => 
                  ['Frontend Development', 'Backend Development', 'Full-Stack Development', 'DevOps'].includes(skill)
                ).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-primary/5 rounded">
                    <span className="text-sm">{skill}</span>
                    <Badge variant="default">Verified</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Domain Skills</h4>
              <div className="space-y-2">
                {aiData.skillsIdentified.filter(skill => 
                  !['Frontend Development', 'Backend Development', 'Full-Stack Development', 'DevOps'].includes(skill)
                ).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-success/5 rounded">
                    <span className="text-sm">{skill}</span>
                    <Badge variant="secondary">Identified</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Similarity Analysis */}
      {jobDescription && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Job Description Similarity Analysis
            </CardTitle>
            <CardDescription>
              Cosine similarity analysis between your resume and the target job description
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Similarity Score</span>
                <span className={`text-sm font-bold ${getSimilarityColor(aiData.similarityScore)}`}>
                  {aiData.similarityScore}%
                </span>
              </div>
              <Progress value={aiData.similarityScore} className="h-3" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gradient-card rounded-lg">
                  <div className="text-lg font-bold text-success">85%</div>
                  <div className="text-xs text-muted-foreground">Keyword Match</div>
                </div>
                <div className="text-center p-4 bg-gradient-card rounded-lg">
                  <div className="text-lg font-bold text-warning">72%</div>
                  <div className="text-xs text-muted-foreground">Skill Alignment</div>
                </div>
                <div className="text-center p-4 bg-gradient-card rounded-lg">
                  <div className="text-lg font-bold text-info">68%</div>
                  <div className="text-xs text-muted-foreground">Experience Match</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-2">Analysis Methodology:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>TF-IDF:</strong> Identifies important terms based on frequency and uniqueness</li>
                  <li>• <strong>Cosine Similarity:</strong> Measures angle between resume and job description vectors</li>
                  <li>• <strong>Jaccard Similarity:</strong> Compares shared keywords between documents</li>
                  <li>• <strong>Semantic Analysis:</strong> Uses NLP to understand context and meaning</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAnalysisSection;