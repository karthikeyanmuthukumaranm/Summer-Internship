import React from 'react';
import { Brain, Zap, TrendingUp, Shield, Target, DollarSign, BarChart3, FileCheck, Users, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FeatureSection: React.FC = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced natural language processing analyzes your resume content, structure, and formatting to provide comprehensive insights.",
      features: ["Content optimization", "Structure analysis", "Keyword extraction", "Industry benchmarking"],
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: DollarSign,
      title: "Smart Salary Estimation",
      description: "Get accurate salary predictions based on your skills, experience, location, and current market trends.",
      features: ["Market rate analysis", "Location-based estimates", "Skill value assessment", "Growth projections"],
      gradient: "from-success to-success-glow"
    },
    {
      icon: Target,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems with our advanced ATS compatibility checker.",
      features: ["Keyword optimization", "Format validation", "Parsing simulation", "Score improvement"],
      gradient: "from-warning to-warning-glow"
    }
  ];

  const additionalFeatures = [
    { icon: BarChart3, title: "Performance Analytics", description: "Track your resume's performance with detailed metrics" },
    { icon: FileCheck, title: "Multi-format Support", description: "Support for PDF, DOC, and TXT resume formats" },
    { icon: Users, title: "Industry Insights", description: "Tailored recommendations based on your target industry" },
    { icon: Shield, title: "Privacy First", description: "Your data is encrypted and never shared with third parties" },
    { icon: Sparkles, title: "Real-time Updates", description: "Get instant feedback as you make changes to your resume" },
    { icon: TrendingUp, title: "Career Roadmap", description: "Personalized career progression recommendations" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to 
            <span className="block text-primary">Optimize Your Career</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools helps you create the perfect resume, 
            understand your market value, and accelerate your career growth.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 animate-slide-up group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <CardHeader className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative">
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-card transition-all duration-300 hover:scale-105 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-hero border-0 shadow-glow max-w-4xl mx-auto animate-glow-pulse">
            <CardContent className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Career?
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Join thousands of professionals who have already optimized their resumes and landed their dream jobs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30">
                  Start Free Analysis
                </button>
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                  View Pricing Plans
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;