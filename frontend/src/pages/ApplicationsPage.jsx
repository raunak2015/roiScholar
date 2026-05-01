import React, { useState } from 'react';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';

const APPLICATION_STATUSES = [
  { id: 'applied', label: 'Applied', color: 'bg-primary/10 text-primary', icon: 'send' },
  { id: 'review', label: 'Under Review', color: 'bg-tertiary/10 text-tertiary', icon: 'find_in_page' },
  { id: 'accepted', label: 'Accepted', color: 'bg-success/10 text-success', icon: 'verified' },
  { id: 'rejected', label: 'Rejected', color: 'bg-error/10 text-error', icon: 'cancel' },
];

const INITIAL_APPLICATIONS = [
  {
    id: 1,
    university: 'Stanford University',
    program: 'MS in Computer Science',
    status: 'review',
    deadline: '2024-12-15',
    logo: 'https://www.google.com/s2/favicons?sz=64&domain=stanford.edu',
    documentsCount: 4,
  },
  {
    id: 2,
    university: 'MIT',
    program: 'MS in Data Science',
    status: 'applied',
    deadline: '2024-11-01',
    logo: 'https://www.google.com/s2/favicons?sz=64&domain=mit.edu',
    documentsCount: 2,
  },
  {
    id: 3,
    university: 'Carnegie Mellon',
    program: 'MS in Artificial Intelligence',
    status: 'accepted',
    deadline: '2024-10-20',
    logo: 'https://www.google.com/s2/favicons?sz=64&domain=cmu.edu',
    documentsCount: 6,
  },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

  const getStatusLabel = (statusId) => APPLICATION_STATUSES.find(s => s.id === statusId);

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <MainNavbar userName="JD" />

      <main className="max-w-7xl mx-auto px-8 py-12 flex-grow w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
              Application Tracker
            </h1>
            <p className="text-on-surface-variant text-lg">
              Manage your university applications and track their ROI status in real-time.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold shadow-lg hover:bg-primary/90 transition-all active:scale-95">
            <span className="material-symbols-outlined">add</span>
            Add New Application
          </button>
        </div>

        {/* Kanban-style Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {APPLICATION_STATUSES.map((status) => (
            <div key={status.id} className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${status.color}`}>
                    <span className="material-symbols-outlined text-xl">{status.icon}</span>
                  </div>
                  <h3 className="font-bold text-on-surface">{status.label}</h3>
                </div>
                <span className="text-xs font-black px-2 py-1 bg-surface-container-highest rounded-lg text-on-surface-variant">
                  {applications.filter(a => a.status === status.id).length}
                </span>
              </div>

              <div className="space-y-4">
                {applications
                  .filter((a) => a.status === status.id)
                  .map((app) => (
                    <div 
                      key={app.id} 
                      className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <img src={app.logo} alt="" className="w-10 h-10 rounded-lg object-contain bg-white p-1" />
                        <div>
                          <h4 className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">
                            {app.university}
                          </h4>
                          <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                            {app.program}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/5">
                        <div className="flex items-center gap-1.5 text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                          <span className="material-symbols-outlined text-sm">event</span>
                          {new Date(app.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1.5 text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                          <span className="material-symbols-outlined text-sm">attachment</span>
                          {app.documentsCount} docs
                        </div>
                      </div>
                    </div>
                  ))}
                
                {applications.filter(a => a.status === status.id).length === 0 && (
                  <div className="py-8 text-center text-on-surface-variant/30 flex flex-col items-center">
                    <span className="material-symbols-outlined text-3xl mb-2">inbox</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">No entries</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed List View Section */}
        <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
            <h3 className="font-bold text-on-surface">Application History</h3>
            <button className="text-primary text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low/20">
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">University & Program</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Deadline</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">ROI Analysis</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-primary/5 transition-colors cursor-pointer group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={app.logo} alt="" className="w-10 h-10 rounded-xl bg-white p-1.5 shadow-sm border border-outline-variant/10" />
                        <div>
                          <div className="font-bold text-on-surface group-hover:text-primary transition-colors">{app.university}</div>
                          <div className="text-xs text-on-surface-variant">{app.program}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusLabel(app.status).color}`}>
                        {getStatusLabel(app.status).label}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-on-surface-variant font-medium">
                      {app.deadline}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-primary rounded-full"></div>
                        </div>
                        <span className="text-[10px] font-bold text-on-surface-variant">75% Ready</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                        <span className="material-symbols-outlined text-xl">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
