
import Cta from '@/components/cta';
import Features from '@/components/features';
import HeroHome from '@/components/hero-home';
import PageIllustration from '@/components/page-illustration';
import Testimonials from '@/components/testimonials';
import Workflows from '@/components/workflows';
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import React from 'react'
import FAQSection from '@/components/faq';

const Home = () => {
  return (
    <div>
      <Header />
      <PageIllustration/>
      <HeroHome/>
      <Workflows/>
      <Features/>
      <Testimonials/>
      <FAQSection/>
      <Cta/>
      <Footer />
      
    </div>
  )
}

export default Home