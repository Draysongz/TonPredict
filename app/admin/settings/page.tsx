"use client";

import Link from "next/link";
import { AdminHeader } from "../components/AdminHeader";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="Settings" subtitle="System configuration and preferences" />

      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl space-y-6 lg:space-y-8">
        {/* Contract & System Section */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Contract & System</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Link
              href="/admin/factory"
              className="bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-4 hover:shadow-lg hover:border-blue-500/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-50 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-icons-round text-purple-600 text-2xl">precision_manufacturing</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-1">Factory Contract</h3>
                <p className="text-sm text-slate-500">View contract state & deployments</p>
              </div>
              <span className="material-icons-round text-slate-400 group-hover:text-blue-500 transition-colors text-2xl">chevron_right</span>
            </Link>

            <Link
              href="/admin/deploy"
              className="bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-4 hover:shadow-lg hover:border-blue-500/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-icons-round text-blue-600 text-2xl">rocket_launch</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-1">Deploy Market</h3>
                <p className="text-sm text-slate-500">Create new prediction market</p>
              </div>
              <span className="material-icons-round text-slate-400 group-hover:text-blue-500 transition-colors text-2xl">chevron_right</span>
            </Link>
          </div>
        </div>

        {/* Platform Settings */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Platform Settings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <span className="material-icons-round text-emerald-600">monetization_on</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Platform Fee</h3>
                    <p className="text-xs text-slate-500">Fee taken per trade</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-bold text-slate-900">2.5%</span>
                <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-semibold">
                  Edit
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                    <span className="material-icons-round text-cyan-600">toll</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Creation Fee</h3>
                    <p className="text-xs text-slate-500">Fee to deploy market</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-bold text-slate-900">5 TON</span>
                <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-semibold">
                  Edit
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                    <span className="material-icons-round text-orange-600">schedule</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Min Duration</h3>
                    <p className="text-xs text-slate-500">Minimum market lifespan</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-bold text-slate-900">1 hour</span>
                <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-semibold">
                  Edit
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                    <span className="material-icons-round text-rose-600">timer</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Max Duration</h3>
                    <p className="text-xs text-slate-500">Maximum market lifespan</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-2xl font-bold text-slate-900">30 days</span>
                <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-semibold">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Account</h2>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
                <span className="material-icons-round text-slate-600 text-2xl">person</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-1">Admin Account</h3>
                <p className="text-sm text-slate-500">Signed in via Firebase Auth</p>
              </div>
              <div className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-700">Active</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <button type="button" className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:bg-slate-100 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-blue-500">key</span>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Change Password</div>
                    <div className="text-xs text-slate-500">Update your credentials</div>
                  </div>
                </div>
              </button>
              
              <button type="button" className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:bg-slate-100 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-blue-500">notifications</span>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Notifications</div>
                    <div className="text-xs text-slate-500">Configure alerts</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h2 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4">Danger Zone</h2>
          <div className="bg-white border border-red-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center">
                  <span className="material-icons-round text-red-600 text-2xl">warning</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-1">Emergency Stop</h3>
                  <p className="text-sm text-slate-500">Pause all platform operations</p>
                </div>
              </div>
              <button type="button" className="px-6 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors">
                Activate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
