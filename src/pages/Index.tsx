import { useState, useEffect } from 'react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ModulesSection } from '@/components/ModulesSection';
import { DashboardPreview } from '@/components/DashboardPreview';
import { APISection } from '@/components/APISection';
import { PricingSection } from '@/components/PricingSection';
import { DeveloperSection } from '@/components/DeveloperSection';
import { Footer } from '@/components/Footer';
import { VoiceGuide } from '@/components/VoiceGuide';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LoadingScreen } from '@/components/LoadingScreen';

const Index = () => {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated Neural Background */}
      <NeuralBackground />

      {/* Navigation */}
      <Navbar />

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Voice Guide */}
      <VoiceGuide enabled={voiceEnabled} onToggle={setVoiceEnabled} />

      {/* Main Content */}
      <main>
        <HeroSection />
        <ModulesSection />
        <DashboardPreview />
        <APISection />
        <PricingSection />
        <DeveloperSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
