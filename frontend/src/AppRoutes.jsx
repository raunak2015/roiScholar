import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/Layout/ProtectedRoute';

// Lazy loading pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/Dashboard'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const ROISimulatorPage = lazy(() => import('./pages/ROISimulatorPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CompareUniversitiesPage = lazy(() => import('./pages/CompareUniversities'));
const CompareDetailPage = lazy(() => import('./pages/CompareDetailPage'));
const ApplicationTrackerPage = lazy(() => import('./pages/ApplicationTracker'));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <Routes>
                {/* Landing Page as the root entry point */}
                <Route path="/" element={<LandingPage />} />

                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected App Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/calculator" element={<CalculatorPage />} />
                    <Route path="/roi-simulator" element={<ROISimulatorPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/compare" element={<CompareUniversitiesPage />} />
                    <Route path="/compare-detail" element={<CompareDetailPage />} />
                    <Route path="/apply-now" element={<ApplicationTrackerPage />} />
                    <Route path="/applications" element={<ApplicationsPage />} />
                </Route>

                {/* 404 Not Found Page */}
                <Route path="/not-found" element={<NotFoundPage />} />
                
                {/* Fallback to 404 Page */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
