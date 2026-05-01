import { useState } from 'react';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';

export default function ApplicationTracker() {
  const [applications] = useState([
    {
      id: 1,
      university: 'Stanford University',
      program: 'MS in Computer Science',
      status: 'accepted',
      appliedDate: '2025-09-15',
      deadline: '2026-04-15',
      decision: '2026-03-20',
      decision_date: new Date('2026-03-20'),
    },
    {
      id: 2,
      university: 'MIT',
      program: 'MEng Computer Science',
      status: 'pending',
      appliedDate: '2025-10-01',
      deadline: '2026-01-01',
      decision: null,
      decision_date: null,
    },
    {
      id: 3,
      university: 'University of Toronto',
      program: 'MSc Applied Computing',
      status: 'rejected',
      appliedDate: '2025-08-20',
      deadline: '2026-04-01',
      decision: '2026-02-15',
      decision_date: new Date('2026-02-15'),
    },
    {
      id: 4,
      university: 'UC Berkeley',
      program: 'MS in Computer Science',
      status: 'pending',
      appliedDate: '2025-11-10',
      deadline: '2026-12-15',
      decision: null,
      decision_date: null,
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return 'check_circle';
      case 'rejected':
        return 'cancel';
      case 'pending':
        return 'schedule';
      default:
        return 'help';
    }
  };

  const acceptedCount = applications.filter((app) => app.status === 'accepted').length;
  const pendingCount = applications.filter((app) => app.status === 'pending').length;
  const rejectedCount = applications.filter((app) => app.status === 'rejected').length;

  return (
    <div className="bg-[#f9f9ff] min-h-screen flex flex-col">
      <MainNavbar userName="JD" />

      <main className="max-w-7xl mx-auto px-8 py-10 flex-grow">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-4">
            Application Tracker
          </h1>
          <p className="text-on-surface-variant text-lg mb-8">
            Track your university applications and decisions
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-on-surface-variant text-sm font-medium">Accepted</p>
                  <p className="text-3xl font-bold text-green-600">{acceptedCount}</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-green-600 opacity-30">check_circle</span>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-on-surface-variant text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-yellow-600 opacity-30">schedule</span>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-on-surface-variant text-sm font-medium">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-red-600 opacity-30">cancel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-container-low border-b border-outline-variant/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">
                    University
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">
                    Program
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">
                    Applied Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">
                    Decision Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-on-surface">
                      {app.university}
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">
                      {app.program}
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">
                      {app.decision
                        ? new Date(app.decision).toLocaleDateString()
                        : 'Pending'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                          app.status
                        )}`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {getStatusIcon(app.status)}
                        </span>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4 block">
              description
            </span>
            <h3 className="text-xl font-bold text-on-surface mb-2">No Applications Yet</h3>
            <p className="text-on-surface-variant">Start adding your university applications to track them here.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
