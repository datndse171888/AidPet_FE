import React, { useEffect, useMemo, useState } from 'react';
import { orderApi } from '../../services/api/OrderApi';
import { OrderResponse } from '../../types/Order';
import { DataResponse } from '../../types/DataResponse';
import { Search, RefreshCw, CreditCard, CheckCircle2, Truck, Clock, Ban } from 'lucide-react';
import { formatDate, formatPrice } from '../../utils/FormatUtil';
import { adminUserApi } from '../../services/api/AdminUserApi';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'all' | 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED'>('all');
  const [userNameById, setUserNameById] = useState<Record<string, string>>({});

  const statusChip = (status: string) => {
    const map: Record<string, string> = {
      PENDING: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      CONFIRMED: 'bg-blue-50 text-blue-800 border-blue-200',
      SHIPPING: 'bg-purple-50 text-purple-800 border-purple-200',
      COMPLETED: 'bg-green-50 text-green-800 border-green-200',
      CANCELED: 'bg-red-50 text-red-800 border-red-200',
      CANCELLED: 'bg-red-50 text-red-800 border-red-200',
    };
    return map[status] || 'bg-gray-50 text-gray-800 border-gray-200';
  };

  const paymentChip = (status: string) => {
    const s = (status === 'SUCCESS' ? 'PAID' : status) as string;
    const map: Record<string, string> = {
      PAID: 'bg-green-50 text-green-800 border-green-200',
      PENDING: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      FAILED: 'bg-red-50 text-red-800 border-red-200',
      CANCELLED: 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return map[s] || 'bg-gray-50 text-gray-800 border-gray-200';
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle2 className="h-3.5 w-3.5 mr-1" />;
      case 'SHIPPING': return <Truck className="h-3.5 w-3.5 mr-1" />;
      case 'PENDING': return <Clock className="h-3.5 w-3.5 mr-1" />;
      case 'CANCELLED': return <Ban className="h-3.5 w-3.5 mr-1" />;
      default: return null;
    }
  };

  const initials = (name?: string) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    const i1 = parts[0]?.[0] || '';
    const i2 = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (i1 + i2).toUpperCase();
  };

  useEffect(() => {
    fetchOrders(page, size);
  }, [page, size]);

  const fetchOrders = async (p = 0, s = 10) => {
    setLoading(true);
    try {
      const res = await orderApi.getAllOrders(p, s);
      const data: DataResponse<OrderResponse> = res.data;
      const list = (data?.listData || []).map((o) => ({
        ...o,
        // normalize if BE returns SUCCESS
        paymentStatus: (o as any).paymentStatus === 'SUCCESS' ? 'PAID' : o.paymentStatus
      }));
      setOrders(list);
      setTotalPages(data?.totalPages || 0);
      setTotalElements(data?.totalElements || 0);

      // Map userId -> userName
      const uniqueUserIds = Array.from(new Set(list.map(o => o.userId).filter(Boolean)));
      const nameMap: Record<string, string> = {};
      await Promise.all(uniqueUserIds.map(async (uid) => {
        try {
          const r = await adminUserApi.getUserById(uid!);
          const u = r.data as any;
          nameMap[uid!] = u.fullName || u.userName || u.email || uid!;
        } catch { /* ignore */ }
      }));
      setUserNameById(prev => ({ ...prev, ...nameMap }));
    } catch (e) {
      setOrders([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter(o =>
      (o.orderId || '').toLowerCase().includes(q) ||
      (userNameById[o.userId] || o.userId || '').toLowerCase().includes(q)
    ).filter(o => statusFilter === 'all' || o.status === statusFilter);
  }, [orders, search, statusFilter, userNameById]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">All Orders</h2>
          <p className="text-sm text-gray-600 mt-1">Manage all user orders</p>
        </div>
        <button
          onClick={() => fetchOrders(page, size)}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order ID or User..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              aria-label="Order status filter"
              value={statusFilter}
              onChange={(e) => { setPage(0); setStatusFilter(e.target.value as typeof statusFilter); }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="SHIPPING">Shipping</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <select
              aria-label="Page size"
              value={size}
              onChange={(e) => { setPage(0); setSize(parseInt(e.target.value, 10)); }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {[10, 20, 50].map(n => <option key={n} value={n}>{n} / page</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {!loading && filtered.map(o => (
                <tr key={o.orderId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-sm text-gray-900">{o.orderId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-semibold">
                        {initials(userNameById[o.userId])}
                      </div>
                      <div>
                        <div className="text-sm text-gray-900">{userNameById[o.userId] || '—'}</div>
                        <div className="text-xs text-gray-500 font-mono">{o.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{formatDate(o.orderDateTime)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatPrice(o.totalAmount)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${statusChip(o.status)}`}>
                      {statusIcon(o.status)}
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${paymentChip(o.paymentStatus as any)}`}>
                      <CreditCard className="h-3.5 w-3.5 mr-1" />
                      {o.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {loading && (
                <tr><td className="px-4 py-6 text-center text-gray-500 text-sm" colSpan={6}>Loading...</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-gray-500 text-sm" colSpan={6}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Total: <span className="font-medium">{totalElements}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 0}
              onClick={() => setPage(p => Math.max(0, p - 1))}
              className="px-3 py-1.5 text-sm rounded border disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">Page {page + 1} / {Math.max(1, totalPages)}</span>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 text-sm rounded border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


