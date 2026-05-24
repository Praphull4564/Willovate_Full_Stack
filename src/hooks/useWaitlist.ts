import { useState } from 'react';
import toast from 'react-hot-toast';

export const useWaitlist = () => {
  const [isLoading, setIsLoading] = useState(false);

  const joinWaitlist = async (_offerId: string, _slotId: string, _data: { name: string; email: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('Successfully joined the waitlist!');
      return true;
    } catch (error) {
      toast.error('Failed to join waitlist. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getWaitlistCount = async (_slotId: string) => {
    // Simulate API call to get number of people on waitlist
    await new Promise(resolve => setTimeout(resolve, 400));
    return Math.floor(Math.random() * 15) + 1; // Return random count 1-15
  };

  return {
    joinWaitlist,
    getWaitlistCount,
    isLoading
  };
};
