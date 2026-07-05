
import Cta from '@/components/cta';
import Features from '@/components/features';
import HeroHome from '@/components/hero-home';
import PageIllustration from '@/components/page-illustration';
import HowItWorks from '@/components/howitworks';
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
      <section id="hero" className="scroll-mt-24" ><HeroHome/></section>
      <section id="about" className="scroll-mt-24" ><Workflows/></section>
      <section id="features" className="scroll-mt-24" ><Features/></section>
      <section id="how-it-works" ><HowItWorks/></section>
      <section id="faq" ><FAQSection/></section>
      <Cta/>
      <Footer />
    </div>
  )
}

export default Home