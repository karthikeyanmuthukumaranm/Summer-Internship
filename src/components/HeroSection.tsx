import React from 'react';
import { TrendingUp, Zap, Target, DollarSign, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-banner.jpg';

const HeroSection: React.FC = () => {
  const features = [
    { icon: Zap, text: "AI-Powered Analysis" },
    { icon: Target, text: "ATS Optimization" },
    { icon: DollarSign, text: "Salary Insights" },
    { icon: TrendingUp, text: "Career Growth" }
  ];

  const stats = [
    { value: "10,000+", label: "Resumes Analyzed" },
    { value: "95%", label: "Success Rate" },
    { value: "2.5x", label: "Higher Interview Rate" },
    { value: "30%", label: "Average Salary Increase" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional Resume Analysis Platform" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-background/50" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-glow/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-success-glow/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-warning-glow/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
            <Star className="w-4 h-4 mr-2" />
            #1 AI Resume Optimizer
          </Badge>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-primary-glow to-success-glow bg-clip-text text-transparent">
                Career Journey
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Get AI-powered resume analysis, salary insights, and personalized recommendations 
              to land your dream job with confidence.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button variant="glass" size="xl" className="animate-scale-in">
              <TrendingUp className="mr-2 h-5 w-5" />
              Analyze My Resume
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 animate-scale-in">
              <Users className="mr-2 h-5 w-5" />
              View Success Stories
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-white/80 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;