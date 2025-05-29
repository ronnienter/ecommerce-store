import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    recentOrders: [],
    statusDistribution: {},
    paymentMetrics: { paid: 0, unpaid: 0 },
    deliveryMetrics: { delivered: 0, pending: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get('/api/analytics/orders');
      setStats(data);
    } catch (error) {
      setError('Failed to fetch dashboard data. Please try again.');
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={fetchStats}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={fetchStats}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm">Total Revenue</h2>
          <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm">Average Order Value</h2>
          <p className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm">Orders Today</h2>
          <p className="text-2xl font-bold">{stats.recentOrders.length}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Payment Status */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm mb-4">Payment Status</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-500">Paid Orders</p>
              <p className="text-2xl font-bold">{stats.paymentMetrics.paid}</p>
            </div>
            <div>
              <p className="text-red-500">Unpaid Orders</p>
              <p className="text-2xl font-bold">{stats.paymentMetrics.unpaid}</p>
            </div>
          </div>
        </div>

        {/* Delivery Status */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm mb-4">Delivery Status</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-500">Delivered</p>
              <p className="text-2xl font-bold">{stats.deliveryMetrics.delivered}</p>
            </div>
            <div>
              <p className="text-yellow-500">Pending</p>
              <p className="text-2xl font-bold">{stats.deliveryMetrics.pending}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-gray-500 text-sm mb-4">Order Status Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats.statusDistribution).map(([status, count]) => (
            <div key={status} className="text-center">
              <p className="text-gray-600 capitalize">{status}</p>
              <p className="text-xl font-bold">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-gray-500 text-sm mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">${order.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper function for status colors
const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

export default Admin;