import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, GitBranch, TrendingUp, Users, Award, Lightbulb, Code } from 'lucide-react';

const ProjectConcept: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Resume Analysis",
      description: "Uses TF-IDF and NLP techniques for keyword extraction and content analysis",
      technologies: ["TF-IDF", "Cosine Similarity", "NLP", "BERT"],
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Job Matching Algorithm",
      description: "Compares resume content with job descriptions using similarity metrics",
      technologies: ["Jaccard Similarity", "Semantic Analysis", "Vector Comparison"],
      color: "text-success"
    },
    {
      icon: GitBranch,
      title: "GitHub Integration",
      description: "Analyzes repositories to verify projects mentioned in resume",
      technologies: ["GitHub API", "Repository Analysis", "Language Detection"],
      color: "text-warning"
    },
    {
      icon: TrendingUp,
      title: "Scoring Algorithm",
      description: "Weighted scoring system for skills, experience, and education",
      technologies: ["Machine Learning", "Weight Assignment", "Performance Metrics"],
      color: "text-info"
    }
  ];

  const technicalArchitecture = [
    {
      layer: "Frontend",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
      description: "Modern UI with responsive charts and animations"
    },
    {
      layer: "Backend Processing",
      technologies: ["Supabase Edge Functions", "Natural Language Processing", "PDF Processing"],
      description: "Serverless functions for AI analysis and data processing"
    },
    {
      layer: "AI & ML",
      technologies: ["TF-IDF", "BERT", "spaCy", "Cosine Similarity"],
      description: "Advanced algorithms for resume analysis and job matching"
    },
    {
      layer: "Data Storage",
      technologies: ["Supabase Database", "File Storage", "User Management"],
      description: "Secure data storage with user authentication and history"
    }
  ];

  const algorithmDetails = [
    {
      name: "TF-IDF (Term Frequency-Inverse Document Frequency)",
      purpose: "Keyword Extraction",
      explanation: "Identifies important keywords by analyzing their frequency in the resume vs. their rarity across documents"
    },
    {
      name: "Cosine Similarity",
      purpose: "Job Matching",
      explanation: "Measures similarity between resume and job description by calculating the angle between their vector representations"
    },
    {
      name: "Jaccard Similarity",
      purpose: "Keyword Overlap",
      explanation: "Compares the overlap of keywords between resume and job description as a ratio of shared vs. total unique terms"
    },
    {
      name: "BERT Classification",
      purpose: "Domain Classification",
      explanation: "Uses pre-trained BERT model to classify resumes into professional domains (IT, Finance, Marketing, etc.)"
    }
  ];

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/* Project Overview */}
      <Card className="shadow-elegant bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="h-8 w-8 text-primary" />
            Profile Pro Optimizer - Complete Project Concept
          </CardTitle>
          <CardDescription className="text-base">
            An AI-powered resume analysis platform combining advanced NLP techniques, machine learning algorithms, 
            and GitHub integration to provide comprehensive career insights and optimization recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-semibold">AI Analysis</div>
              <div className="text-sm text-muted-foreground">NLP & ML</div>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <Target className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="font-semibold">Job Matching</div>
              <div className="text-sm text-muted-foreground">Similarity Analysis</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <GitBranch className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="font-semibold">GitHub Verification</div>
              <div className="text-sm text-muted-foreground">Project Analysis</div>
            </div>
            <div className="text-center p-4 bg-info/10 rounded-lg">
              <TrendingUp className="h-8 w-8 text-info mx-auto mb-2" />
              <div className="font-semibold">Career Insights</div>
              <div className="text-sm text-muted-foreground">Salary & Growth</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Features */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-warning" />
            Core Features & Technologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-4 border-l-4" style={{ borderLeftColor: `hsl(var(--${feature.color.split('-')[1]}))` }}>
                <div className="flex items-start gap-3">
                  <feature.icon className={`h-6 w-6 ${feature.color} mt-1`} />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {feature.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Explanations */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            Algorithm Deep Dive
          </CardTitle>
          <CardDescription>
            Detailed explanation of the AI and ML algorithms powering the analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {algorithmDetails.map((algorithm, index) => (
              <Card key={index} className="p-4 bg-gradient-card">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{algorithm.name}</h3>
                  <Badge variant="outline">{algorithm.purpose}</Badge>
                </div>
                <p className="text-muted-foreground">{algorithm.explanation}</p>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Architecture */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-success" />
            Technical Architecture
          </CardTitle>
          <CardDescription>
            Multi-layered architecture ensuring scalability and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {technicalArchitecture.map((layer, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gradient-card rounded-lg">
                <div className="w-24 flex-shrink-0">
                  <Badge variant="default" className="w-full justify-center">
                    {layer.layer}
                  </Badge>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">{layer.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {layer.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Value Proposition */}
      <Card className="shadow-elegant bg-gradient-professional text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Award className="h-6 w-6" />
            Project Value Proposition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-80" />
              <h3 className="font-semibold mb-2">Career Advancement</h3>
              <p className="text-sm opacity-90">
                Helps professionals optimize their resumes and identify skill gaps for career growth
              </p>
            </div>
            <div className="text-center">
              <Brain className="h-12 w-12 mx-auto mb-3 opacity-80" />
              <h3 className="font-semibold mb-2">AI-Driven Insights</h3>
              <p className="text-sm opacity-90">
                Leverages cutting-edge AI to provide actionable recommendations and market insights
              </p>
            </div>
            <div className="text-center">
              <Target className="h-12 w-12 mx-auto mb-3 opacity-80" />
              <h3 className="font-semibold mb-2">Job Market Alignment</h3>
              <p className="text-sm opacity-90">
                Ensures resumes are aligned with current job market demands and ATS requirements
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Enhancements */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-warning" />
            Future Enhancement Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-success">Phase 1 (Current)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• PDF resume parsing and analysis</li>
                <li>• GitHub repository verification</li>
                <li>• Basic AI keyword extraction</li>
                <li>• Job description matching</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-warning">Phase 2 (Planned)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• LinkedIn profile integration</li>
                <li>• Advanced BERT model implementation</li>
                <li>• Real-time salary data integration</li>
                <li>• Industry-specific recommendations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-info">Phase 3 (Future)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI-powered resume generation</li>
                <li>• Video interview preparation</li>
                <li>• Career path prediction</li>
                <li>• Skill gap analysis with learning paths</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">Phase 4 (Vision)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Company culture matching</li>
                <li>• Automated job application</li>
                <li>• Performance prediction models</li>
                <li>• Global market expansion</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectConcept;