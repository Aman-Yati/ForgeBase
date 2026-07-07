'use client'
import React from 'react'
import {motion} from 'motion/react'
import { SignUp } from '@clerk/nextjs'
import { pageIllustration } from '@/lib/images'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
const clerkAppearance = {
  theme: [],
  variables: {
    colorPrimary: '#15004e',
  },
}

const SignUpPage = () => {
  const bgImage = pageIllustration
  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100">
      <div
        className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${bgImage}')`,
          filter: 'saturate(1.1) contrast(1.1)',
        }}
      />
      <Link
        href="/"
        className="absolute left-6 top-6 z-50 inline-flex items-center gap-2 border border-white/15 bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 , ease: 'easeIn'}}
        className="relative flex min-h-screen items-center justify-center px-4"
      >
        <SignUp appearance={clerkAppearance} />
      </motion.div>
    </div>
  )
}

export default SignUpPage