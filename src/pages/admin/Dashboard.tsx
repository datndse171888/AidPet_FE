import React, { useState, useEffect } from "react";
import { Users, FileText, TrendingUp, MessageSquare } from "lucide-react";
import { getDashboardStats, DashboardStats } from "../../services/api/AdminDashboardApi";
// removed incorrect `data` import from react-router-dom which conflicted with expected shape

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    feedbackCount: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // ✅ Hàm định dạng số
  const formatNumber = (num?: number) => {
    if (typeof num !== "number" || isNaN(num)) return "0";
    return num.toLocaleString("vi-VN");
  };

  // 🚀 Lấy dữ liệu dashboard
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      const data = await getDashboardStats();
      setStats(data);
      setIsLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: formatNumber(stats.totalUsers),
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: formatNumber(stats.totalOrders),
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "Feedback",
      value: formatNumber(stats.feedbackCount),
      icon: MessageSquare,
      color: "bg-yellow-500",
    },
    {
      title: "Revenue",
      value: `${formatNumber(stats.totalRevenue)} ₫`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here’s the latest summary of your AidPet system.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md border p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
