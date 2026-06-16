import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import StorySection from '../components/StorySection';
import ComingSoon from '../components/ComingSoon';
import WaitlistForm from '../components/WaitlistForm';
import Footer from '../components/Footer';
import { recordVisit } from '../utils/api';

export default function Landing() {
  useEffect(() => {
    recordVisit();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <StorySection />
      <ComingSoon />
      <WaitlistForm />
      <Footer />
    </div>
  );
}
