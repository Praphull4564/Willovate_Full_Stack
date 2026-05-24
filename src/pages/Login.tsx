import React from 'react';
import { motion } from 'framer-motion';
import { CalendarRange } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 dark:bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/20 dark:bg-violet-600/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1000px] flex rounded-3xl overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 shadow-2xl">
        
        {/* Left side: Branding/Visuals */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between bg-gradient-to-br from-indigo-600/90 to-violet-700/90 text-white relative overflow-hidden">
          {/* Subtle overlay pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3 mb-12"
            >
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <CalendarRange size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">SmartOffer</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold leading-tight mb-6">
                Manage your booking slots with elegance.
              </h1>
              <p className="text-indigo-100/80 text-lg max-w-md leading-relaxed">
                Streamline your administrative tasks, manage offers, and oversee slots in one centralized, beautiful dashboard.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-10 flex items-center space-x-4 text-sm font-medium text-indigo-200"
          >
            <span>&copy; {new Date().getFullYear()} SmartOffer Inc.</span>
            <span>&bull;</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </motion.div>
        </div>

        {/* Right side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 text-center lg:text-left"
            >
              {/* Mobile logo */}
              <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <CalendarRange size={24} className="text-primary" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SmartOffer</span>
              </div>

              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h2>
              <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in.</p>
            </motion.div>

            <LoginForm />

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
                Create Admin Account
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
