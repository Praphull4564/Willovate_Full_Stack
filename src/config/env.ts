export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Smart Offer Slot Booking System',
  ENABLE_LOGS: import.meta.env.VITE_ENABLE_LOGS === 'true',
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || 'smart_offer_token',
} as const;

// Validation at load time
if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn('VITE_API_BASE_URL is not defined in the environment variables. Using fallback.');
}
