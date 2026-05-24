import { Dumbbell, UtensilsCrossed, Sparkles, Scissors, MonitorPlay, Palette, Music, Coffee } from 'lucide-react';

export const CATEGORIES = [
  { id: 'fitness', name: 'Fitness & Gym', icon: Dumbbell, color: 'from-blue-500 to-cyan-500' },
  { id: 'dining', name: 'Dining & Cafes', icon: UtensilsCrossed, color: 'from-orange-500 to-amber-500' },
  { id: 'spa', name: 'Spa & Wellness', icon: Sparkles, color: 'from-emerald-500 to-teal-500' },
  { id: 'salon', name: 'Salon & Beauty', icon: Scissors, color: 'from-pink-500 to-rose-500' },
  { id: 'entertainment', name: 'Entertainment', icon: MonitorPlay, color: 'from-violet-500 to-purple-500' },
  { id: 'creative', name: 'Creative Workshops', icon: Palette, color: 'from-fuchsia-500 to-pink-500' },
  { id: 'events', name: 'Live Events', icon: Music, color: 'from-indigo-500 to-blue-500' },
  { id: 'coworking', name: 'Coworking Spaces', icon: Coffee, color: 'from-yellow-500 to-orange-500' },
];
