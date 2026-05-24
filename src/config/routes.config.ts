export const APP_ROUTES = {
  PUBLIC: {
    LOGIN: '/login',
  },
  PROTECTED: {
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    OFFERS: '/offers',
    CREATE_OFFER: '/offers/create',
    OFFER_DETAILS: (id: string) => `/offers/${id}`,
    SLOTS: '/slots',
    BOOKINGS: '/bookings',
    ANALYTICS: '/analytics',
    SETTINGS: '/settings',
  },
} as const;
