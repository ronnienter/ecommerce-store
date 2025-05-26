const Order = require('../models/Order');

const getOrderAnalytics = async (req, res) => {
  try {
    // Basic metrics
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find().select('totalPrice status isPaid isDelivered createdAt');
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.isPaid ? order.totalPrice : 0);
    }, 0);

    // Status distribution
    const statusDistribution = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Daily orders for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailyOrders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          revenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Payment and delivery metrics
    const paymentMetrics = {
      paid: await Order.countDocuments({ isPaid: true }),
      unpaid: await Order.countDocuments({ isPaid: false })
    };

    const deliveryMetrics = {
      delivered: await Order.countDocuments({ isDelivered: true }),
      pending: await Order.countDocuments({ isDelivered: false })
    };

    res.json({
      totalOrders,
      totalRevenue,
      statusDistribution: statusDistribution.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      dailyOrders,
      paymentMetrics,
      deliveryMetrics,
      averageOrderValue: totalOrders ? totalRevenue / totalOrders : 0
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
};

module.exports = {
  getOrderAnalytics
};