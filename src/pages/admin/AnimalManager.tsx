import React, { useState, useEffect } from 'react';
import { Search, Heart, Clock } from 'lucide-react';
import { AnimalResponse, AnimalUpdateStatusRequest } from '../../types/Animal';
import { AdminAnimalCard } from '../../components/ui/card/AdminAnimalCard';
import { AnimalDetailModal } from '../../components/ui/modal/AnimalDetailModal';
import { animalApi } from '../../services/api/AnimalApi';

export const AnimalManager: React.FC = () => {

  //========================
  // States
  //========================

  const [animals, setAnimals] = useState<AnimalResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalResponse | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  //========================
  // Effects
  //========================

  useEffect(() => {

    getPendingAnimals();

  }, []);

  const getPendingAnimals = async () => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      const response = await animalApi.getByStatus();
      const data = response.data;
      setAnimals(data.listData || []);
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
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.categoryAnimals.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.shelter?.shelterName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
  const handleApprove = async (animalId: string) => {
    if (window.confirm('Are you sure you want to approve this animal for adoption?')) {
      try {
        // Call API to update animal status to 'AVAILABLE'
        const data: AnimalUpdateStatusRequest = { status: 'AVAILABLE', message: 'Approved by admin' };
        const response = await animalApi.updateStatus(animalId, data);
        const updatedAnimal: AnimalResponse = response.data;

        await getPendingAnimals(); // Refresh the list after approval

        console.table(updatedAnimal);
      } catch (error) {
        console.error('Failed to approve animal:', error);
        return;
      }
      console.log('Approved animal:', animalId);
    }
  };

  const handleReject = async (animalId: string) => {
    if (window.confirm('Are you sure you want to reject this animal? This action cannot be undone.')) {
      try {
        // Call API to update animal status to 'AVAILABLE'
        const data: AnimalUpdateStatusRequest = { status: 'REJECT', message: 'Rejected by admin' };
        const response = await animalApi.updateStatus(animalId, data);
        const updatedAnimal: AnimalResponse = response.data;

        await getPendingAnimals(); // Refresh the list after rejection

        console.table(updatedAnimal);
      } catch (error) {
        console.error('Failed to approve animal:', error);
        return;
      } console.log('Rejected animal:', animalId);
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
              <h3 className="text-2xl font-bold text-gray-900">{animals.filter(a => a.status === 'PENDING').length}</h3>
              <p className="text-sm text-gray-600">Total Animals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
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
    </div>
  );
};