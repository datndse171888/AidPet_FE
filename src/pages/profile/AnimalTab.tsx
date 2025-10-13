import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Animal, AnimalRequest, AnimalResponse } from '../../types/Animal';
import { CreateAnimalForm } from '../shelter/CreateAnimalForm';
import { AnimalCard } from '../../components/ui/card/AnimalCard';
import { AnimalDetailModal } from '../../components/ui/modal/AnimalDetailModal'; // Import modal
import { ShelterResponse } from '../../types/Shelter';
import { animalApi } from '../../services/api/AnimalApi';
import { DataResponse } from '../../types/DataResponse';

interface AnimalTabProps {
  onViewDetail?: (animal: Animal) => void;
  onEditAnimal?: (animal: Animal) => void;
  onDeleteAnimal?: (animalId: string) => void;
}

export const AnimalTab: React.FC<AnimalTabProps> = ({
  onViewDetail,
  onEditAnimal,
  onDeleteAnimal
}) => {

  //==========================
  // States
  //==========================

  const [animals, setAnimals] = useState<AnimalResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'AVAILABLE' | 'ADOPTED' | 'RESCUED' | 'PENDING'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const shelterString = localStorage.getItem('shelter');
  const shelter: ShelterResponse | null = shelterString ? JSON.parse(shelterString) : null;
  const shelterId = shelter?.shelterUuid;

  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalResponse | null>(null);

  //==========================
  // Effects
  //==========================

  useEffect(() => {
    if (shelterId) {
      getAnimalByShelter();
    }
  }, [shelterId]);

  //==========================
  // Handlers
  //==========================

  if (!shelterId) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          Shelter information not found. Please login again.
        </div>
      </div>
    );
  }

  // Fetch animals by shelter ID
  const getAnimalByShelter = async () => {
    if (!shelterId) {
      console.error('Shelter ID is missing');
      return;
    }

    setIsLoading(true);

    try {
      const response = await animalApi.getByShelter(shelterId);
      const data: DataResponse<AnimalResponse> = response.data;

      if (data && data.listData && Array.isArray(data.listData)) {
        setAnimals(data.listData);
      } else {
        setAnimals([]); // Fallback to empty array
      }

    } catch (error) {
      console.error('Failed to fetch animals:', error);
      setAnimals([]);
    } finally {
      setIsLoading(false);
    }
  }

  // Filtered animals based on search and status filter
  const filteredAnimals = (animals || []).filter(animal => {
    if (!animal) return false;
    // Null checks để tránh lỗi
    const name = animal.name || '';
    const breed = animal.breed || '';
    const categoryName = animal.categoryAnimals?.categoryName || '';

    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || animal.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handlers for modal actions
  const handleViewDetail = (animal: AnimalResponse) => {
    setSelectedAnimal(animal);
    setShowDetailModal(true);
    if (onViewDetail) {
      onViewDetail(animal);
    }
  };

  const handleEditAnimal = (animal: AnimalResponse) => {
    setSelectedAnimal(animal);
    setShowDetailModal(true);
    if (onEditAnimal) {
      onEditAnimal(animal);
    }
  };

  const handleDeleteAnimal = (animalId: string) => {
    if (window.confirm('Are you sure you want to delete this animal record?')) {
      setAnimals(prev => prev.filter(animal => animal.animalUuid !== animalId));
      if (onDeleteAnimal) {
        onDeleteAnimal(animalId);
      }
    }
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedAnimal(null);
  };

  // Save changes made in the modal
  const handleSaveAnimal = async (animalData: AnimalRequest) => {
    try {
      // Simulate API call
      console.log('Saving animal:', animalData);

      // Update the animal in the list
    } catch (error) {
      console.error('Failed to save animal:', error);
      throw error;
    }
  };

  const handleCreateAnimal = () => {
    setShowCreateForm(true);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const handleAnimalCreated = async () => {
    setShowCreateForm(false);
    await getAnimalByShelter();
  };


  // Nếu đang ở chế độ tạo animal, hiển thị form tạo animal
  if (showCreateForm) {
    return (
      <CreateAnimalForm
        onCancel={handleCancelCreate}
        onAnimalCreated={handleAnimalCreated}
      />
    );
  }

  const stats = {
    total: animals?.length || 0,
    available: animals?.filter(a => a.status === 'AVAILABLE').length || 0,
    adopted: animals?.filter(a => a.status === 'ADOPTED').length || 0,
    pending: animals?.filter(a => a.status === 'PENDING').length || 0,
    rescued: animals?.filter(a => a.status === 'RESCUED').length || 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Manage Animals</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add and manage animals in your shelter to help them find loving homes
          </p>
        </div>
        <Button
          onClick={handleCreateAnimal}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Animal
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search animals by name, breed, or category..."
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
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'AVAILABLE' | 'ADOPTED' | 'RESCUED' | 'PENDING')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="ADOPTED">Adopted</option>
              <option value="PENDING">Pending</option>
              <option value="RESCUED">Rescued</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Animals</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats.available}</div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats.adopted}</div>
          <div className="text-sm text-gray-600">Adopted</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{stats.rescued}</div>
          <div className="text-sm text-gray-600">Rescued</div>
        </div>
      </div>

      {/* Animals Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Loading animals...</span>
        </div>
      ) : filteredAnimals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Fix: Ensure unique keys và null checks */}
          {filteredAnimals.map((animal) => {
            // Double check animal exists và có animalUuid
            if (!animal || !animal.animalUuid) {
              console.warn('Invalid animal data:', animal);
              return null;
            }

            return (
              <AnimalCard
                key={animal.animalUuid} // This should be unique
                animal={animal}
                onViewDetail={handleViewDetail}
                onEdit={handleEditAnimal}
                onDelete={handleDeleteAnimal}
                showShelterInfo={false}
              />
            );
          }).filter(Boolean)} {/* Remove null elements */}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchQuery || statusFilter !== 'all'
              ? 'No animals found matching your criteria'
              : 'No animals added yet'
            }
          </div>
          <Button onClick={handleCreateAnimal} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Animal
          </Button>
        </div>
      )}

      {/* Animal Detail Modal */}
      <AnimalDetailModal
        isOpen={showDetailModal}
        animal={selectedAnimal}
        onClose={handleCloseModal}
        onSave={handleSaveAnimal}
        showActions={true}
      />
    </div>
  );
};