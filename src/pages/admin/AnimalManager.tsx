import React, { useState, useEffect } from 'react';
import { Search, Heart, Clock, Filter } from 'lucide-react';
import { Animal, AnimalResponse, AnimalUpdateStatusRequest } from '../../types/Animal';
import { AdminAnimalCard } from '../../components/ui/card/AdminAnimalCard';
import { AnimalDetailModal } from '../../components/ui/modal/AnimalDetailModal';
import { AnimalApprovalModal } from '../../components/ui/modal/AnimalApprovalModal';
import { animalApi } from '../../services/api/AnimalApi';

export const AnimalManager: React.FC = () => {

  //========================
  // States
  //========================

  const [animals, setAnimals] = useState<AnimalResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'AVAILABLE' | 'ADOPTED' | 'RESCUED' | 'PENDING' | 'REJECT'>('ALL');
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalResponse | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');
  const [approvalLoading, setApprovalLoading] = useState(false);

  //========================
  // Effects
  //========================

  useEffect(() => {
    getAllAnimals();
  }, []);

  const getAllAnimals = async () => {
    setIsLoading(true);
    try {
      const allRes = await animalApi.getAll(100, 0);
      const list = allRes.data.listData || [];
      setAnimals(list);
    } catch (error) {
      console.error('Failed to fetch animals:', error);
      setAnimals([]);
    } finally {
      setIsLoading(false);
    }
  }

  //========================
  // Handlers
  //========================

  const filteredAnimals = animals.filter(animal => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = (animal.name || '').toLowerCase().includes(q) ||
      (animal.breed || '').toLowerCase().includes(q) ||
      (animal.categoryAnimals?.categoryName || '').toLowerCase().includes(q) ||
      (animal.shelter?.shelterName || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'ALL' || animal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (animal: AnimalResponse) => {
    setSelectedAnimal(animal);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedAnimal(null);
  };

  // Approve animal for adoption
  const handleApprove = (animalId: string) => {
    const found = animals.find(a => a.animalUuid === animalId) || null;
    setSelectedAnimal(found);
    setApprovalAction('approve');
    setShowApprovalModal(true);
  };

  const handleReject = (animalId: string) => {
    const found = animals.find(a => a.animalUuid === animalId) || null;
    setSelectedAnimal(found);
    setApprovalAction('reject');
    setShowApprovalModal(true);
  };

  const handleApprovalConfirm = async (message: string) => {
    if (!selectedAnimal) return;
    setApprovalLoading(true);
    try {
      const status = approvalAction === 'approve' ? 'AVAILABLE' : 'REJECT';
      const payload: AnimalUpdateStatusRequest = { status: status as any, message };
      const res = await animalApi.updateStatus(selectedAnimal.animalUuid, payload);
      const updated = res.data;
      // Optimistic update
      setAnimals(prev => prev.map(a => a.animalUuid === selectedAnimal.animalUuid ? { ...a, status: status as any } as any : a));
      setShowApprovalModal(false);
      // Background refresh
      getAllAnimals();
    } catch (e) {
      console.error(`Failed to ${approvalAction} animal`, e);
    } finally {
      setApprovalLoading(false);
    }
  };

  //========================
  // Render
  //========================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Animal Management</h1>
          <p className="text-gray-600 mt-1">
            Review and manage all animals from shelters across the platform
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{animals.length}</h3>
              <p className="text-sm text-gray-600">Total Animals</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">A</div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{animals.filter(a => a.status === 'AVAILABLE').length}</h3>
              <p className="text-sm text-gray-600">Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center text-green-600 text-sm font-bold">P</div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{animals.filter(a => a.status === 'PENDING').length}</h3>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-bold">D</div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{animals.filter(a => a.status === 'ADOPTED').length}</h3>
              <p className="text-sm text-gray-600">Adopted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, breed, category, or shelter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              aria-label="Filter animals by status"
            >
              <option value="ALL">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="PENDING">Pending</option>
              <option value="ADOPTED">Adopted</option>
              <option value="RESCUED">Rescued</option>
              <option value="REJECT">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Animals Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Loading animals...</span>
        </div>
      ) : filteredAnimals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map((animal) => (
            <AdminAnimalCard
              key={animal.animalUuid}
              animal={animal}
              onViewDetail={handleViewDetail}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="text-gray-500 text-lg mb-2">
            {searchQuery
              ? 'No animals found matching your criteria'
              : 'No animals available'
            }
          </div>
          <p className="text-gray-400">
            {searchQuery
              ? 'Try adjusting your search or filter settings'
              : 'Animals from shelters will appear here for review'
            }
          </p>
        </div>
      )}

      {/* Animal Detail Modal */}
      <AnimalDetailModal
        isOpen={showDetailModal}
        animal={selectedAnimal}
        onClose={handleCloseModal}
        onSave={async () => { }} // Admin không cần edit
        showActions={false} // Admin chỉ xem, không edit
      />

      <AnimalApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onConfirm={handleApprovalConfirm}
        action={approvalAction}
        animalName={selectedAnimal?.name || ''}
        isLoading={approvalLoading}
      />
    </div>
  );
};