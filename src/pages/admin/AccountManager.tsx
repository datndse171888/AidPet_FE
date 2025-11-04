import React, { useEffect, useMemo, useState } from 'react';
import { Search, CheckCircle2, Circle, ArrowUpDown, Filter, KeyRound, LockOpen, LockKeyholeOpen, LockKeyhole, Ban, Lock } from 'lucide-react';
import { adminUserApi } from '../../services/api/AdminUserApi';

interface AdminUserSummary {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
}

export const AccountManager: React.FC = () => {
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'role' | 'status'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      // Attempt to fetch; gracefully fallback to empty list
      const res = await adminUserApi.getAllUsers?.(0, 50);
      const list = (res?.data?.listData as AdminUserSummary[]) || [];
      setUsers(list);
    } catch (e) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    let data = users.filter(u =>
      `${u.fullName} ${u.email} ${u.role}`.toLowerCase().includes(query.toLowerCase())
    );
    if (roleFilter !== 'ALL') {
      data = data.filter(u => u.role === roleFilter);
    }
    if (statusFilter !== 'ALL') {
      data = data.filter(u => u.status === statusFilter);
    }
    const dir = sortDir === 'asc' ? 1 : -1;
    data = [...data].sort((a, b) => {
      const av = sortBy === 'name' ? a.fullName : sortBy === 'email' ? a.email : sortBy === 'role' ? a.role : a.status;
      const bv = sortBy === 'name' ? b.fullName : sortBy === 'email' ? b.email : sortBy === 'role' ? b.role : b.status;
      return av.localeCompare(bv) * dir;
    });
    return data;
  }, [users, query, roleFilter, statusFilter, sortBy, sortDir]);

  const toggleSort = (key: 'name' | 'email' | 'role' | 'status') => {
    if (sortBy === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Management</h1>
        <p className="text-gray-600 mt-1">View and manage platform user accounts</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by title, category, or author ID..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <KeyRound className="h-5 w-5 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as 'ALL' | 'ADMIN' | 'SHELTER' | 'USER')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Filter posts by status"
              >
                <option value="ALL">All</option>
                <option value="ADMIN">Admin</option>
                <option value="SHELTER">Shelter</option>
                <option value="USER">User</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {statusFilter === 'ALL' ? <LockOpen className="h-5 w-5 text-gray-400" /> :
                statusFilter === 'ACTIVE' ? <LockKeyholeOpen className="h-5 w-5 text-green-500" /> :
                  statusFilter === 'INACTIVE' ? <LockKeyhole className="h-5 w-5 text-gray-400" /> :
                    <Lock className="h-5 w-5 text-red-500" />}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE' | 'BANNED')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                aria-label="Filter posts by status"
              >
                <option value="ALL">All</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="BANNED">Banned</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Loading accounts...</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-gray-600 text-sm font-semibold">
            <button onClick={() => toggleSort('name')} className="col-span-3 flex items-center gap-1 hover:text-gray-800">
              <span>Name</span>
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <button onClick={() => toggleSort('email')} className="col-span-4 flex items-center gap-1 hover:text-gray-800">
              <span>Email</span>
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <button onClick={() => toggleSort('role')} className="col-span-2 flex items-center gap-1 hover:text-gray-800">
              <span>Role</span>
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <button onClick={() => toggleSort('status')} className="col-span-2 flex items-center gap-1 hover:text-gray-800">
              <span>Status</span>
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <div className="col-span-1 text-right">Actions</div>
          </div>
          <div>
            {filtered.length === 0 ? (
              <div className="px-6 py-10 text-center text-gray-500">No accounts found</div>
            ) : (
              filtered.map(u => (
                <div key={u.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-t border-gray-100 items-center">
                  <div className="col-span-3 font-medium text-gray-900">{u.fullName}</div>
                  <div className="col-span-4 text-gray-700">{u.email}</div>
                  <div className="col-span-2">
                    <span className="px-2 py-1 rounded bg-orange-50 text-orange-700 text-xs font-semibold">
                      {u.role}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    {u.status === 'ACTIVE' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${u.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {u.status}
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <button className="text-orange-600 hover:text-orange-700 text-sm font-semibold">View</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManager;


