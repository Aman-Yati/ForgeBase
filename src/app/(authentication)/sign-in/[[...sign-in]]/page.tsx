'use client'
import React from 'react'
import {motion} from 'motion/react'
import { neobrutalism } from '@clerk/ui/themes'
import { dark} from '@clerk/ui/themes'
import { SignIn } from '@clerk/nextjs'
import { loginBackground } from '@/lib/images'

const clerkAppearance = {
  theme: [dark],
  variables: {
    colorPrimary: '#8B5CF6',
  },
}

const SignInPage = () => {
  const bgImage = loginBackground
  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100">
      <div
        className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${bgImage}')`,
          filter: 'saturate(1.1) contrast(1.1)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 , ease: 'easeIn'}}
        className="relative flex min-h-screen items-center justify-center px-4"
      >
        <SignIn appearance={clerkAppearance} />
      </motion.div>
    </div>
  )
}

export default SignInPage