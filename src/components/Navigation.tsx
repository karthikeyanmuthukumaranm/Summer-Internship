import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, BarChart3, Users, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Analyze', href: '#analyze', icon: FileText },
    { label: 'Features', href: '#features', icon: BarChart3 },
    { label: 'Insights', href: '#insights', icon: Users },
    { label: 'Pricing', href: '#pricing', icon: Settings }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-elegant border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}>
              ProfilePro
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-primary ${
                  isScrolled ? 'text-foreground/70' : 'text-white/80'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant={isScrolled ? "outline" : "glass"} 
              size="sm"
            >
              Sign In
            </Button>
            <Button 
              variant={isScrolled ? "hero" : "glass"} 
              size="sm"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-elegant animate-fade-in">
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center gap-3 w-full text-left py-2 text-foreground/80 hover:text-primary transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-border/50 space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                  <Button variant="hero" size="sm" className="w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;