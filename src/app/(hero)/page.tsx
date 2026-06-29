
import Cta from '@/components/cta';
import Features from '@/components/features';
import HeroHome from '@/components/hero-home';
import PageIllustration from '@/components/page-illustration';
import Testimonials from '@/components/testimonials';
import Workflows from '@/components/workflows';
import React from 'react'

const Home = () => {
  return (
    <div>
      <PageIllustration/>
      <HeroHome/>
      <Workflows/>
      <Features/>
      <Testimonials/>
      <Cta/>
      
    </div>
  )
}

export default Home