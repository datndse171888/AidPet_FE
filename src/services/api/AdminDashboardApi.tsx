import { api } from "../../utils/Axios";

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  feedbackCount: number;
}

// ✅ Hàm gọi API backend để lấy dữ liệu dashboard
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const res = await api.get("/admin/dashboard/stats");

    // Lấy dữ liệu: Giả định dữ liệu nằm ở res.data hoặc res.data.data
    const apiData =
      (res as any)?.data?.data && typeof (res as any).data.data === "object"
        ? (res as any).data.data
        : (res as any).data;
    
    // 💡 SỬ DỤNG NULLISH COALESCING (??) để đảm bảo giá trị 0 nếu thuộc tính thiếu
    // Hoặc kiểm tra thuộc tính trước khi gán
    const data: DashboardStats = {
      totalUsers: apiData.totalUsers ?? 0,
      totalOrders: apiData.totalOrders ?? 0,
      totalRevenue: apiData.totalRevenue ?? 0,
      feedbackCount: apiData.feedbackCount ?? 0,
    };

    return data;

  } catch (err) {
    console.error("❌ Failed to fetch dashboard stats:", err);
    // Nếu API thất bại, trả về đối tượng rỗng (0)
    return {
      totalUsers: 0,
      totalOrders: 0,
      totalRevenue: 0,
      feedbackCount: 0,
    };
  }
};

// Named API wrapper to align with services/api/index.ts re-exports
export const adminDashboardApi = {
  getStats: getDashboardStats,
};