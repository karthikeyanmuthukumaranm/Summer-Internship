import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import ResumeAnalyzerForm from '@/components/ResumeAnalyzerForm';
import ChartsSection from '@/components/ChartsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <section id="analyze" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Analyze Your Resume
                <span className="block text-primary">Get Instant Insights</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Upload your resume and get comprehensive AI-powered analysis including 
                salary estimates, ATS optimization, and personalized recommendations.
              </p>
            </div>
            <ResumeAnalyzerForm />
          </div>
        </section>
        <section id="features">
          <FeatureSection />
        </section>
        <section id="insights">
          <ChartsSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
