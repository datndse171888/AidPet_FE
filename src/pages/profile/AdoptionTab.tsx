import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, Clock, Check, X } from 'lucide-react';
import { AdoptionResponse, AdoptionStatusUpdateRequest } from '../../types/Adoption';
import { AnimalResponse } from '../../types/Animal';
import { AccountResponse } from '../../types/User';
import { ShelterResponse } from '../../types/Shelter';
import { AdoptionCard } from '../../components/ui/card/AdoptionCard';
import { AdoptionDetailModal } from '../../components/ui/modal/AdoptionDetailModal';
import { useAuth } from '../../hooks/AuthorizationRoute';
import { adoptionApi } from '../../services/api/AdoptionApi';
import { animalApi } from '../../services/api/AnimalApi';
import { shelterApi } from '../../services/api/ShelterApi';
import { authApi } from '../../services/api';

interface AdoptionTabProps {
  onViewDetail?: (adoption: AdoptionResponse) => void;
  onStatusUpdate?: (adoptionId: string, status: 'APPROVE' | 'REJECT') => void;
}

export const AdoptionTab: React.FC<AdoptionTabProps> = ({
  onViewDetail,
  onStatusUpdate
}) => {
  const [adoptions, setAdoptions] = useState<AdoptionResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'PENDING' | 'APPROVE' | 'REJECT' | 'CANCEL'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAdoption, setSelectedAdoption] = useState<AdoptionResponse | null>(null);

  // Related data
  const [animals, setAnimals] = useState<Record<string, AnimalResponse>>({});
  const [users, setUsers] = useState<Record<string, AccountResponse>>({});
  const [shelters, setShelters] = useState<Record<string, ShelterResponse>>({});

  const user = useAuth();
  const userRole = user?.role as 'SHELTER' | 'USER';

  useEffect(() => {
    if (user?.uuid) {
      getAdoptions();
    }
  }, [user?.uuid, userRole]);

  const getAdoptions = async () => {
    if (!user?.uuid) return;

    setIsLoading(true);
    try {
      let response;
      
      if (userRole === 'SHELTER') {
        // Get adoptions for shelter
        // response = await adoptionApi.getByShelter(user.uuid);
      } else {
        // Get adoptions for user
        // response = await adoptionApi.getByUser(user.uuid);
      }
      
    //   const adoptionData = response.data.listData || [];
    //   setAdoptions(adoptionData);

      // Fetch related data
    //   await fetchRelatedData(adoptionData);

    } catch (error) {
      console.error('Failed to fetch adoptions:', error);
      setAdoptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedData = async (adoptionData: AdoptionResponse[]) => {
    const animalIds = new Set<string>();
    const userIds = new Set<string>();
    const shelterIds = new Set<string>();

    // Collect unique IDs
    adoptionData.forEach(adoption => {
      if (adoption.animalUuid) animalIds.add(adoption.animalUuid);
      if (adoption.userId) userIds.add(adoption.userId);
      if (adoption.shelterUuid) shelterIds.add(adoption.shelterUuid);
    });

    // Fetch animals
    const animalPromises = Array.from(animalIds).map(async (id) => {
      try {
        const response = await animalApi.getById(id);
        return { id, data: response.data };
      } catch (error) {
        console.error(`Failed to fetch animal ${id}:`, error);
        return null;
      }
    });

    // Fetch users (for shelter view)
    const userPromises = userRole === 'SHELTER' 
      ? Array.from(userIds).map(async (id) => {
          try {
        //     const response = await authApi.getById(id);
        //     return { id, data: response.data };
          } catch (error) {
            console.error(`Failed to fetch user ${id}:`, error);
            return null;
          }
        })
      : [];

    // Fetch shelters (for user view)
    const shelterPromises = userRole === 'USER'
      ? Array.from(shelterIds).map(async (id) => {
          try {
            // const response = await shelterApi.getById(id);
            // return { id, data: response.data };
          } catch (error) {
            console.error(`Failed to fetch shelter ${id}:`, error);
            return null;
          }
        })
      : [];

    // Wait for all promises
    const [animalResults, userResults, shelterResults] = await Promise.all([
      Promise.all(animalPromises),
      Promise.all(userPromises),
      Promise.all(shelterPromises)
    ]);

    // Process results
    const animalMap: Record<string, AnimalResponse> = {};
    const userMap: Record<string, AccountResponse> = {};
    const shelterMap: Record<string, ShelterResponse> = {};

    animalResults.forEach(result => {
      if (result) animalMap[result.id] = result.data;
    });

    userResults.forEach(result => {
    //   if (result) userMap[result.id] = result.data;
    });

    shelterResults.forEach(result => {
    //   if (result) shelterMap[result.id] = result.data;
    });

    setAnimals(animalMap);
    setUsers(userMap);
    setShelters(shelterMap);
  };

  const filteredAdoptions = adoptions.filter(adoption => {
    const animal = animals[adoption.animalUuid];
    const adoptionUser = users[adoption.userId];
    const shelter = shelters[adoption.shelterUuid];

    const matchesSearch = 
      animal?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal?.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adoptionUser?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter?.shelterName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || adoption.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (adoption: AdoptionResponse) => {
    setSelectedAdoption(adoption);
    setShowDetailModal(true);
    if (onViewDetail) {
      onViewDetail(adoption);
    }
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedAdoption(null);
  };

  const handleApprove = async (adoptionId: string) => {
    if (window.confirm('Are you sure you want to approve this adoption request?')) {
      setIsActionLoading(true);
      try {
        const updateData: AdoptionStatusUpdateRequest = { status: 'APPROVE' };
        // await adoptionApi.updateStatus(adoptionId, updateData);
        
        // Update local state
        setAdoptions(prev =>
          prev.map(adoption =>
            adoption.adoptionId === adoptionId
              ? { ...adoption, status: 'APPROVE', approvalDate: new Date().toISOString() }
              : adoption
          )
        );

        if (onStatusUpdate) {
          onStatusUpdate(adoptionId, 'APPROVE');
        }

        alert('Adoption request approved successfully!');
        
      } catch (error) {
        console.error('Failed to approve adoption:', error);
        alert('Failed to approve adoption request. Please try again.');
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  const handleReject = async (adoptionId: string) => {
    if (window.confirm('Are you sure you want to reject this adoption request?')) {
      setIsActionLoading(true);
      try {
        const updateData: AdoptionStatusUpdateRequest = { status: 'REJECT' };
        // await adoptionApi.updateStatus(adoptionId, updateData);
        
        // Update local state
        setAdoptions(prev =>
          prev.map(adoption =>
            adoption.adoptionId === adoptionId
              ? { ...adoption, status: 'REJECT', approvalDate: new Date().toISOString() }
              : adoption
          )
        );

        if (onStatusUpdate) {
          onStatusUpdate(adoptionId, 'REJECT');
        }

        alert('Adoption request rejected successfully!');
        
      } catch (error) {
        console.error('Failed to reject adoption:', error);
        alert('Failed to reject adoption request. Please try again.');
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  // Calculate stats
  const stats = {
    total: adoptions.length,
    pending: adoptions.filter(a => a.status === 'PENDING').length,
    approved: adoptions.filter(a => a.status === 'APPROVE').length,
    rejected: adoptions.filter(a => a.status === 'REJECT').length
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'APPROVE', label: 'Approved' },
    { value: 'REJECT', label: 'Rejected' },
    { value: 'CANCEL', label: 'Cancelled' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {userRole === 'SHELTER' ? 'Adoption Requests' : 'My Adoption Applications'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {userRole === 'SHELTER' 
              ? 'Review and manage adoption requests for your animals'
              : 'Track the status of your pet adoption applications'
            }
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Applications</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={`Search by ${userRole === 'SHELTER' ? 'animal name, breed, or applicant' : 'animal name, breed, or shelter'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Adoptions Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Loading adoptions...</span>
        </div>
      ) : filteredAdoptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAdoptions.map((adoption) => (
            <AdoptionCard
              key={adoption.adoptionId}
              adoption={adoption}
              animal={animals[adoption.animalUuid]}
              user={users[adoption.userId]}
              shelter={shelters[adoption.shelterUuid]}
              onViewDetail={handleViewDetail}
              onApprove={userRole === 'SHELTER' ? handleApprove : undefined}
              onReject={userRole === 'SHELTER' ? handleReject : undefined}
              userRole={userRole}
              isActionLoading={isActionLoading}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchQuery || statusFilter !== 'all'
              ? 'No adoption requests found matching your criteria'
              : userRole === 'SHELTER' 
                ? 'No adoption requests received yet'
                : 'No adoption applications submitted yet'
            }
          </div>
        </div>
      )}

      {/* Adoption Detail Modal */}
      <AdoptionDetailModal
        isOpen={showDetailModal}
        onClose={handleCloseModal}
        adoption={selectedAdoption}
        animal={selectedAdoption ? animals[selectedAdoption.animalUuid] : undefined}
        user={selectedAdoption ? users[selectedAdoption.userId] : undefined}
        shelter={selectedAdoption ? shelters[selectedAdoption.shelterUuid] : undefined}
        userRole={userRole}
        onApprove={userRole === 'SHELTER' ? handleApprove : undefined}
        onReject={userRole === 'SHELTER' ? handleReject : undefined}
        isActionLoading={isActionLoading}
      />
    </div>
  );
};