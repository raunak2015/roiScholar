import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MainNavbar from '../components/Layout/MainNavbar';
import SettingsSidebar from '../components/Profile/SettingsSidebar';
import RegionalDefaults from '../components/Profile/RegionalDefaults';
import PreferencesCard from '../components/Profile/PreferencesCard';
import Footer from '../components/Layout/Footer';
import authService from '../services/authService';

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth || {});
  const [activeTab, setActiveTab] = useState('preferences');
  const [preferences, setPreferences] = useState({
    country: 'United States',
    degree: 'Computer Science (STEM)',
    darkMode: false,
    emailInsights: true,
  });

  // Password Change State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast.success('Preferences saved successfully');
    // TODO: Connect to backend API to persist preferences
  };

  const handleDiscard = () => {
    setPreferences({
      country: 'United States',
      degree: 'Computer Science (STEM)',
      darkMode: false,
      emailInsights: true,
    });
    toast.info('Changes discarded');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error('New passwords do not match');
    }

    if (passwordData.newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    try {
      setPasswordLoading(true);
      await authService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success('Password updated successfully');
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <MainNavbar userName={user?.name || "JD"} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-28 md:pb-12 flex-grow">
        {/* Editorial Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-on-surface leading-tight tracking-tighter mb-2">
            Settings & Identity
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
            Manage your educational trajectory preferences, global lender visibility, and security protocols here.
          </p>
        </header>

        {/* Main Settings Interface */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Navigation */}
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Preferences Content */}
          {activeTab === 'preferences' && (
            <section className="flex-grow space-y-8">
              {/* Regional & Educational Defaults */}
              <RegionalDefaults
                country={preferences.country}
                degree={preferences.degree}
                onCountryChange={(val) => handlePreferenceChange('country', val)}
                onDegreeChange={(val) => handlePreferenceChange('degree', val)}
              />

              {/* Interface & Notifications - Bento Style */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dark Mode Toggle */}
                <PreferencesCard
                  title="Dark Mode"
                  description="Reduce eye strain for late-night planning."
                  icon="dark_mode"
                  status={preferences.darkMode ? 'Enabled' : 'Disabled'}
                  isToggled={preferences.darkMode}
                  onToggle={() =>
                    handlePreferenceChange('darkMode', !preferences.darkMode)
                  }
                />

                {/* Email Insights Toggle */}
                <PreferencesCard
                  title="Email Insights"
                  description="Weekly STEM ROI updates and rate changes."
                  icon="alternate_email"
                  status={preferences.emailInsights ? 'Enabled' : 'Disabled'}
                  isToggled={preferences.emailInsights}
                  onToggle={() =>
                    handlePreferenceChange('emailInsights', !preferences.emailInsights)
                  }
                />
              </div>

              {/* Action Bar */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-8">
                <button
                  onClick={handleDiscard}
                  className="px-6 py-2.5 text-sm font-bold text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all w-full sm:w-auto"
                >
                  DISCARD CHANGES
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-bold rounded-lg shadow-lg hover:shadow-primary/20 active:scale-95 transition-all tracking-wider uppercase w-full sm:w-auto"
                >
                  SAVE PREFERENCES
                </button>
              </div>
            </section>
          )}

          {/* Account Info Tab */}
          {activeTab === 'account' && (
            <section className="flex-grow">
              <div className="bg-surface-container-lowest rounded-2xl p-8 sm:p-10 border border-outline-variant/10 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-4xl">person</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-on-surface tracking-tight">Account Information</h2>
                    <p className="text-on-surface-variant">Update your primary identity and security details.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-primary tracking-widest uppercase mb-2">Full Name</label>
                      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 text-on-surface font-medium">
                        {user?.name || 'Not available'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary tracking-widest uppercase mb-2">Primary Email</label>
                      <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 text-on-surface font-medium">
                        {user?.email || 'Not available'}
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined">security</span>
                      Security Status
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                        <span className="material-symbols-outlined text-secondary">check_circle</span>
                        Email verified
                      </li>
                      <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                        <span className="material-symbols-outlined text-secondary">check_circle</span>
                        2FA protection active
                      </li>
                    </ul>
                    <button 
                      onClick={() => setShowPasswordModal(true)}
                      className="mt-8 w-full py-3 bg-on-surface text-surface text-sm font-bold rounded-xl hover:bg-on-surface/90 transition-all active:scale-95"
                    >
                      CHANGE PASSWORD
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Saved Data Tab */}
          {activeTab === 'saved' && (
            <section className="flex-grow">
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_24px_rgba(0,35,111,0.04)]">
                <h2 className="text-xl font-bold text-on-surface mb-4">Saved Data</h2>
                <p className="text-on-surface-variant">Coming soon: View and manage your saved scenarios and data.</p>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-surface-container-lowest rounded-2xl p-8 max-w-md w-full shadow-2xl border border-outline-variant/10 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-on-surface tracking-tight">Update Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-primary tracking-widest uppercase mb-2">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary tracking-widest uppercase mb-2">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary tracking-widest uppercase mb-2">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-3 text-sm font-bold text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 py-3 bg-primary text-on-primary text-sm font-bold rounded-xl shadow-lg hover:shadow-primary/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  {passwordLoading ? 'UPDATING...' : 'UPDATE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
