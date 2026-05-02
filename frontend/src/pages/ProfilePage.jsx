import { useState } from 'react';
import MainNavbar from '../components/Layout/MainNavbar';
import SettingsSidebar from '../components/Profile/SettingsSidebar';
import RegionalDefaults from '../components/Profile/RegionalDefaults';
import PreferencesCard from '../components/Profile/PreferencesCard';
import Footer from '../components/Layout/Footer';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('preferences');
  const [preferences, setPreferences] = useState({
    country: 'United States',
    degree: 'Computer Science (STEM)',
    darkMode: false,
    emailInsights: true,
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving preferences:', preferences);
    // TODO: Connect to backend API to persist preferences
  };

  const handleDiscard = () => {
    console.log('Discarding changes');
    setPreferences({
      country: 'United States',
      degree: 'Computer Science (STEM)',
      darkMode: false,
      emailInsights: true,
    });
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <MainNavbar userName="JD" />

      <main className="max-w-7xl mx-auto px-8 py-12 flex-grow">
        {/* Editorial Header */}
        <header className="mb-12">
          <h1 className="text-[2.75rem] font-extrabold text-on-surface leading-tight tracking-tighter mb-2">
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
              <div className="flex items-center justify-end gap-4 pt-8">
                <button
                  onClick={handleDiscard}
                  className="px-6 py-2.5 text-sm font-bold text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all"
                >
                  DISCARD CHANGES
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-bold rounded-lg shadow-lg hover:shadow-primary/20 active:scale-95 transition-all tracking-wider uppercase"
                >
                  SAVE PREFERENCES
                </button>
              </div>
            </section>
          )}

          {/* Account Info Tab */}
          {activeTab === 'account' && (
            <section className="flex-grow">
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_24px_rgba(0,35,111,0.04)]">
                <h2 className="text-xl font-bold text-on-surface mb-4">Account Information</h2>
                <p className="text-on-surface-variant">Coming soon: Account details and management.</p>
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

      <Footer />
    </div>
  );
}
