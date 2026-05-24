import React from 'react';
import { Bell, Moon, ShieldCheck, User, Database, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Demo-ready account, appearance, and system information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center">
            <User size={20} className="mr-2 text-indigo-500" />
            Admin Account
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
              <p className="text-xs text-slate-500 mb-1">Name</p>
              <p className="font-semibold text-slate-900 dark:text-white">{user?.name || 'Admin User'}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
              <p className="text-xs text-slate-500 mb-1">Role</p>
              <p className="font-semibold text-slate-900 dark:text-white">{user?.role || 'Admin'}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 sm:col-span-2">
              <p className="text-xs text-slate-500 mb-1">Demo Login</p>
              <p className="font-mono text-sm text-slate-900 dark:text-white">admin@willovate.com / Admin@123</p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center">
            <Moon size={20} className="mr-2 text-indigo-500" />
            Appearance
          </h3>
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Theme</p>
              <p className="text-sm text-slate-500 capitalize">{theme} mode</p>
            </div>
            <Button variant="outline" onClick={toggleTheme}>
              Toggle
            </Button>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center">
            <ShieldCheck size={20} className="mr-2 text-emerald-500" />
            Hackathon Checklist
          </h3>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>React + TypeScript frontend</p>
            <p>.NET 8 Web API backend</p>
            <p>Swagger enabled at API startup</p>
            <p>Public booking and admin management flows</p>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center">
            <Database size={20} className="mr-2 text-indigo-500" />
            Demo Data
          </h3>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>12 curated sample offers</p>
            <p>2 future slots for each sample offer</p>
            <p>12 sample bookings with varied statuses</p>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center">
            <Bell size={20} className="mr-2 text-amber-500" />
            Notifications
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Mock notification center is enabled for demo interactions.
          </p>
          <a
            href="/"
            className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View public offers <ExternalLink size={14} className="ml-1" />
          </a>
        </section>
      </div>
    </div>
  );
};
