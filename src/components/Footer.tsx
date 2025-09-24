import React from 'react';
import { FileText, Mail, Phone, MapPin, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Resume Analyzer", href: "#" },
        { label: "Salary Insights", href: "#" },
        { label: "ATS Checker", href: "#" },
        { label: "Career Roadmap", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "#" },
        { label: "Career Tips", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Success Stories", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Privacy Policy", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Status", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" }
  ];

  return (
    <footer className="bg-gradient-to-br from-background to-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ProfilePro Optimizer</span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Transform your career with AI-powered resume analysis, salary insights, 
                and personalized recommendations. Join thousands of professionals who 
                have already optimized their career trajectory.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@profilepro.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-muted/50 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Get the latest career insights and product updates delivered to your inbox.
              </p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>© 2024 ProfilePro Optimizer. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for career growth.</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;