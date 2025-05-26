import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    statusDistribution: {}
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/analytics/orders');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold">${stats.totalRevenue?.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Average Order Value</h3>
          <p className="text-2xl font-bold">
            ${stats.averageOrderValue?.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(stats.statusDistribution || {}).map(([status, count]) => (
            <div key={status} className="text-center">
              <h4 className="text-gray-500 capitalize">{status}</h4>
              <p className="text-xl font-bold">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.dailyOrders?.slice(0, 5).map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2 text-center">{order._id}</td>
                  <td className="px-4 py-2 text-center">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-center capitalize">{order.orders}</td>
                  <td className="px-4 py-2 text-center">${order.revenue?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;