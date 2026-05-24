import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { DashboardLayout } from '../layout/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { BusinessProfile } from '../pages/BusinessProfile';
import { ManageOffers } from '../pages/ManageOffers';
import { CreateOffer } from '../pages/CreateOffer';
import { EditOffer } from '../pages/EditOffer';
import { OfferDetails } from '../pages/OfferDetails';
import { SlotManagement } from '../pages/SlotManagement';
import { ManageBookings } from '../pages/ManageBookings';
import { BookingDetails } from '../pages/BookingDetails';
import { AnalyticsDashboard } from '../pages/AnalyticsDashboard';
import { BusinessInsights } from '../pages/BusinessInsights';
import { Settings } from '../pages/Settings';
import { PublicLayout } from '../layout/PublicLayout';
import { PublicOffers } from '../pages/PublicOffers';
import { SearchResults } from '../pages/SearchResults';
import { OfferDetail } from '../pages/OfferDetail';
import { BookingPage } from '../pages/BookingPage';
import { BookingConfirmation } from '../pages/BookingConfirmation';
import { BookingFailed } from '../pages/BookingFailed';
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Facing Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PublicOffers />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/offer/:id" element={<OfferDetail />} />
        <Route path="/book/:offerId" element={<BookingPage />} />
        <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
        <Route path="/booking-failed" element={<BookingFailed />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<BusinessProfile />} />
          <Route path="/offers" element={<ManageOffers />} />
          <Route path="/offers/create" element={<CreateOffer />} />
          <Route path="/offers/:id" element={<OfferDetails />} />
          <Route path="/offers/:id/edit" element={<EditOffer />} />
          <Route path="/slots" element={<SlotManagement />} />
          <Route path="/offers/:id/slots" element={<SlotManagement />} />
          <Route path="/bookings" element={<ManageBookings />} />
          <Route path="/bookings/:id" element={<BookingDetails />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/analytics/insights" element={<BusinessInsights />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
