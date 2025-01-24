import React, { useState } from 'react';
import { DollarSign, Calendar, PieChart, Building } from 'lucide-react';

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState('March 2024');

  const payments = [
    { id: 1, date: '2024-03-01', amount: 1200, status: 'paid' },
    { id: 2, date: '2024-04-01', amount: 1200, status: 'upcoming' },
    { id: 3, date: '2024-05-01', amount: 1200, status: 'upcoming' }
  ];

  const subsidies = [
    { id: 1, name: 'Section 8 Voucher', amount: 800, status: 'active' },
    { id: 2, name: 'Utility Assistance', amount: 100, status: 'pending' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-[#0D1B2A]" />
            <span className="ml-2 text-lg font-medium text-gray-500">Monthly Rent</span>
          </div>
          <p className="mt-4 text-3xl font-bold">$1,200</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Building className="w-8 h-8 text-[#0D1B2A]" />
            <span className="ml-2 text-lg font-medium text-gray-500">Subsidies</span>
          </div>
          <p className="mt-4 text-3xl font-bold">$900</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-[#0D1B2A]" />
            <span className="ml-2 text-lg font-medium text-gray-500">Next Payment</span>
          </div>
          <p className="mt-4 text-3xl font-bold">Apr 1</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <PieChart className="w-8 h-8 text-[#0D1B2A]" />
            <span className="ml-2 text-lg font-medium text-gray-500">Your Share</span>
          </div>
          <p className="mt-4 text-3xl font-bold">$300</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
          <div className="mt-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-[#0D1B2A] focus:border-transparent"
            >
              <option>March 2024</option>
              <option>February 2024</option>
              <option>January 2024</option>
            </select>
          </div>
          <div className="mt-4 space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">{new Date(payment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                  <p className="text-sm text-gray-500">Monthly Rent</p>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-900">${payment.amount}</span>
                  <span className={`ml-4 px-2 py-1 text-sm rounded-full ${
                    payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payment.status === 'paid' ? 'Paid' : 'Upcoming'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">Active Subsidies</h2>
          <div className="mt-6 space-y-4">
            {subsidies.map((subsidy) => (
              <div key={subsidy.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">{subsidy.name}</p>
                  <p className="text-sm text-gray-500">{subsidy.status === 'active' ? 'Active' : 'Pending Approval'}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-900">${subsidy.amount}</span>
                  <span className={`ml-4 px-2 py-1 text-sm rounded-full ${
                    subsidy.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {subsidy.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Subsidy Calculator</h3>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Annual Household Income</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0D1B2A] focus:ring-[#0D1B2A]"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Household Size</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0D1B2A] focus:ring-[#0D1B2A]">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
                <button className="w-full bg-[#0D1B2A] text-white px-4 py-2 rounded-md hover:bg-[#0D1B2A]">
                  Calculate Eligibility
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
