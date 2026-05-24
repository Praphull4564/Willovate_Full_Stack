export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
  },
  BUSINESS: {
    CREATE: '/business',
    GET: '/business',
    UPDATE: (id: string) => `/business/${id}`,
  },
  OFFERS: {
    CREATE: '/offers',
    GET_ALL: '/offers',
    GET_BY_ID: (id: string) => `/offers/${id}`,
    UPDATE: (id: string) => `/offers/${id}`,
    DELETE: (id: string) => `/offers/${id}`,
  },
  SLOTS: {
    CREATE: '/slots',
    GET_ALL: '/slots',
    GET_BY_OFFER: (offerId: string) => `/offers/${offerId}/slots`,
    UPDATE: (id: string) => `/slots/${id}`,
    DELETE: (id: string) => `/slots/${id}`,
  },
  BOOKINGS: {
    CREATE: '/bookings',
    GET_ALL: '/bookings',
    UPDATE_STATUS: (id: string) => `/bookings/${id}/status`,
  },
  DASHBOARD: {
    SUMMARY: '/dashboard/summary',
  },
} as const;
