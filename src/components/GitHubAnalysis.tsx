import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, GitBranch, Users, Award } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GitHubAnalysisProps {
  githubData: {
    profile: string;
    repositories: {
      name: string;
      language: string;
      stars: number;
      description: string;
      isRelevant: boolean;
    }[];
    languageStats: { [key: string]: number };
    totalRepos: number;
    publicRepos: number;
    profileScore: number;
  };
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const GitHubAnalysis: React.FC<GitHubAnalysisProps> = ({ githubData }) => {
  const languageChartData = Object.entries(githubData.languageStats).map(([language, percentage]) => ({
    name: language,
    value: percentage,
  }));

  const repositoryChartData = githubData.repositories.map(repo => ({
    name: repo.name,
    stars: repo.stars,
    relevant: repo.isRelevant ? 1 : 0,
  }));

  const relevantRepos = githubData.repositories.filter(repo => repo.isRelevant);
  const verificationScore = Math.round((relevantRepos.length / githubData.repositories.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* GitHub Profile Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            GitHub Profile Analysis
          </CardTitle>
          <CardDescription>
            Analysis of your GitHub profile and repository alignment with resume claims
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <div className="text-2xl font-bold text-primary">{githubData.totalRepos}</div>
              <div className="text-sm text-muted-foreground">Total Repositories</div>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <div className="text-2xl font-bold text-success">{githubData.publicRepos}</div>
              <div className="text-sm text-muted-foreground">Public Projects</div>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <div className="text-2xl font-bold text-warning">{relevantRepos.length}</div>
              <div className="text-sm text-muted-foreground">Relevant Projects</div>
            </div>
            <div className="text-center p-4 bg-gradient-card rounded-lg">
              <div className="text-2xl font-bold text-info">{githubData.profileScore}%</div>
              <div className="text-sm text-muted-foreground">Profile Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repository Verification */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-success" />
            Resume Verification Score
          </CardTitle>
          <CardDescription>
            How well your GitHub repositories align with projects mentioned in your resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Verification Score</span>
              <span className="text-sm text-muted-foreground">{verificationScore}%</span>
            </div>
            <Progress value={verificationScore} className="h-3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="font-semibold text-success mb-2">✓ Verified Projects</h4>
                <div className="space-y-2">
                  {relevantRepos.map((repo, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-success/10 rounded">
                      <span className="text-sm">{repo.name}</span>
                      <Badge variant="secondary">{repo.language}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-muted-foreground mb-2">Other Repositories</h4>
                <div className="space-y-2">
                  {githubData.repositories.filter(repo => !repo.isRelevant).map((repo, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm">{repo.name}</span>
                      <Badge variant="outline">{repo.language}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Programming Languages</CardTitle>
            <CardDescription>Distribution of languages in your repositories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {languageChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Repository Popularity</CardTitle>
            <CardDescription>Stars received by your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={repositoryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stars" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Repository Details */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Repository Details</CardTitle>
          <CardDescription>Detailed view of your GitHub repositories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {githubData.repositories.map((repo, index) => (
              <Card key={index} className={`p-4 ${repo.isRelevant ? 'border-success' : 'border-muted'}`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{repo.name}</h4>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-warning" />
                    <span className="text-sm">{repo.stars}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant={repo.isRelevant ? "default" : "outline"}>{repo.language}</Badge>
                  {repo.isRelevant && (
                    <Badge variant="secondary" className="text-success">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GitHubAnalysis;