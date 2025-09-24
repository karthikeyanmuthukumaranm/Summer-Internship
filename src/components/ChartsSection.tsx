import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, BarChart3, PieChart, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ChartsSection: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for charts
  const skillsData = [
    { skill: 'React', percentage: 92, color: 'bg-primary' },
    { skill: 'TypeScript', percentage: 88, color: 'bg-success' },
    { skill: 'Python', percentage: 76, color: 'bg-warning' },
    { skill: 'AWS', percentage: 68, color: 'bg-destructive' },
    { skill: 'Node.js', percentage: 84, color: 'bg-primary' },
  ];

  const salaryTrends = [
    { year: '2020', salary: 65000 },
    { year: '2021', salary: 72000 },
    { year: '2022', salary: 79000 },
    { year: '2023', salary: 87000 },
    { year: '2024', salary: 95000 },
  ];

  const industryStats = [
    { industry: 'Technology', percentage: 45, jobs: '2.1M' },
    { industry: 'Finance', percentage: 23, jobs: '890K' },
    { industry: 'Healthcare', percentage: 18, jobs: '650K' },
    { industry: 'Education', percentage: 14, jobs: '420K' },
  ];

  const performanceMetrics = [
    { metric: 'Resume Views', value: 1250, increase: '+23%', icon: Users },
    { metric: 'Interview Calls', value: 89, increase: '+45%', icon: TrendingUp },
    { metric: 'Skill Matches', value: 76, increase: '+12%', icon: Award },
    { metric: 'ATS Score', value: 94, increase: '+31%', icon: BarChart3 },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics & Insights
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Data-Driven
            <span className="block text-primary">Career Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leverage powerful analytics to understand your market position, 
            track progress, and make informed career decisions.
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {performanceMetrics.map((metric, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {metric.increase}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">{metric.value.toLocaleString()}</h3>
                <p className="text-muted-foreground text-sm">{metric.metric}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Analysis Chart */}
          <Card className="shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Skills Assessment
              </CardTitle>
              <CardDescription>
                Your technical skills evaluation and market relevance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={animationComplete ? skill.percentage : 0} 
                        className="h-3"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Top Skills Recommendation</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on cloud technologies and DevOps skills to increase your market value by 25-30%.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Salary Trend Chart */}
          <Card className="shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Salary Growth Trend
              </CardTitle>
              <CardDescription>
                Expected salary progression based on your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end justify-between gap-2 mb-6">
                {salaryTrends.map((data, index) => {
                  const height = (data.salary / 100000) * 100; // Normalize to percentage
                  return (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-gradient-success rounded-t-md transition-all duration-1000 ease-out flex items-end justify-center"
                        style={{ 
                          height: animationComplete ? `${height}%` : '0%',
                          transitionDelay: `${index * 0.2}s`
                        }}
                      >
                        <span className="text-xs text-white font-medium mb-2">
                          ${(data.salary / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">{data.year}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <p className="text-lg font-bold text-success">+46%</p>
                  <p className="text-sm text-muted-foreground">5-Year Growth</p>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-lg font-bold text-primary">$95K</p>
                  <p className="text-sm text-muted-foreground">Current Est.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industry Distribution */}
          <Card className="shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-warning" />
                Industry Opportunities
              </CardTitle>
              <CardDescription>
                Job market distribution across industries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryStats.map((industry, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{industry.industry}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{industry.jobs}</span>
                        <span className="text-sm font-medium">{industry.percentage}%</span>
                      </div>
                    </div>
                    <Progress 
                      value={animationComplete ? industry.percentage : 0} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2 text-primary">Market Insight</h4>
                <p className="text-sm text-muted-foreground">
                  Technology sector shows 18% growth in hiring, making it the most promising industry for career advancement.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Career Timeline */}
          <Card className="shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-destructive" />
                Career Roadmap
              </CardTitle>
              <CardDescription>
                Your personalized career progression timeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { period: 'Next 6 months', goal: 'Optimize current role', status: 'active' },
                  { period: '6-12 months', goal: 'Senior position transition', status: 'upcoming' },
                  { period: '1-2 years', goal: 'Lead role opportunities', status: 'future' },
                  { period: '2-3 years', goal: 'Management position', status: 'future' },
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      milestone.status === 'active' ? 'bg-primary border-primary' :
                      milestone.status === 'upcoming' ? 'bg-warning border-warning' :
                      'bg-muted border-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{milestone.period}</p>
                      <p className="text-sm text-muted-foreground">{milestone.goal}</p>
                    </div>
                    {milestone.status === 'active' && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Current
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Next Action</h4>
                <p className="text-sm text-muted-foreground">
                  Complete cloud certification and update resume with recent project achievements.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;