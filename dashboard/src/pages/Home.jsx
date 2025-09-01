import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllUsers, getLengthofData } from '../Redux/Reducer/adminReducer';

// Dashboard Layout Component


// Home Page Component
const Home = () => {
  const dispatch = useDispatch();
  const { staticData, users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getLengthofData());
        dispatch(AllUsers());
  },[dispatch])

  const stats = [
    { title: 'Total Members', value: staticData?.userCount,  icon: '👥' },
    { title: 'Total Withdrawals', value: staticData?.withdrawalCount, icon: '💸' },
    { title: 'Total Balance', value: staticData?.totalBalance,  icon: '💰' },
    { title: 'Total Share Wallet', value: staticData?.totalShereWallet, icon: '🚫' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-[#cffff1] rounded-full">
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
    <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#08c18a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Share wallet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.slice(0, 6).map((member, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member?.fname}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.shere_wallet}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member?.created_at ? new Date(member.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === '0' ? 'bg-green-100 text-green-800' : member.status === '1' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {member.status === '0' ? 'Active' : member.status === '1' ? 'Blocked' : 'Pending'}
                      </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;