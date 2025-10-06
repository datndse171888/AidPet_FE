import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Animal, AnimalRequest } from '../../types/Animal';
import { CreateAnimalForm } from '../shelter/CreateAnimalForm';
import { AnimalCard } from '../../components/ui/card/AnimalCard';
import { AnimalDetailModal } from '../../components/ui/modal/AnimalDetailModal'; // Import modal

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
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'AVAILABLE' | 'ADOPTED' | 'RESCUED' | 'PENDING'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockAnimals: Animal[] = [
      {
        animalUuid: '1',
        name: 'Max',
        age: 2,
        breed: 'Golden Retriever',
        gender: 'Male',
        description: 'Max is a friendly and energetic Golden Retriever who loves playing fetch and swimming. He is great with kids and other dogs.',
        img_url: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'AVAILABLE',
        category_animals: {
          animalCateUuid: '1',
          categoryName: 'Dogs',
          description: '',
        }
      },
      {
        animalUuid: '2',
        name: 'Luna',
        age: 1,
        breed: 'Persian Cat',
        gender: 'Female',  
        description: 'Luna is a gentle and affectionate Persian cat. She enjoys quiet environments and loves to be petted.',
        img_url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'ADOPTED',
        category_animals: {
          animalCateUuid: '2',
          categoryName: 'Cats',
          description: '',
        }
      },
      {
        animalUuid: '3',
        name: 'Charlie',
        age: 3,
        breed: 'Labrador Mix',
        gender: 'Male',
        description: 'Charlie is a rescue dog who has overcome a difficult past. He is now ready for a loving home and is very loyal.',
        img_url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'PENDING',
        category_animals: {
          animalCateUuid: '1',
          categoryName: 'Dogs',
          description: '',
        }
      },
      {
        animalUuid: '4',
        name: 'Bella',
        age: 4,
        breed: 'Siamese Cat',
        gender: 'Female',
        description: 'Bella is an active and intelligent Siamese cat. She loves interactive toys and climbing.',
        img_url: 'https://images.pexels.com/photos/982865/pexels-photo-982865.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'AVAILABLE',
        category_animals: {
          animalCateUuid: '2',
          categoryName: 'Cats',
          description: '',
        }
      }
    ];
    setAnimals(mockAnimals);
  }, []);

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animal.category_animals?.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || animal.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowDetailModal(true);
    if (onViewDetail) {
      onViewDetail(animal);
    }
  };

  const handleEditAnimal = (animal: Animal) => {
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

  const handleSaveAnimal = async (animalData: AnimalRequest) => {
    try {
      // Simulate API call
      console.log('Saving animal:', animalData);
      
      // Update the animal in the list
      if (selectedAnimal) {
        const updatedAnimal: Animal = {
          ...selectedAnimal,
          name: animalData.name,
          age: animalData.age,
          breed: animalData.breed,
          gender: animalData.gender,
          description: animalData.description,
          img_url: animalData.img_url,
          status: animalData.status || selectedAnimal.status,
          category_animals: {
            animalCateUuid: animalData.categoryAnimalsUuid,
            categoryName: ['Dogs', 'Cats', 'Birds', 'Rabbits', 'Other Pets'][parseInt(animalData.categoryAnimalsUuid) - 1] || 'Unknown',
            description: '',
          }
        };

        setAnimals(prev => prev.map(animal => 
          animal.animalUuid === selectedAnimal.animalUuid ? updatedAnimal : animal
        ));
        
        setSelectedAnimal(updatedAnimal);
      }
      
      alert('Animal updated successfully!');
    } catch (error) {
      console.error('Failed to save animal:', error);
      throw error;
    }
  };

  const handleCreateAnimal = () => {
    setShowCreateForm(true);
  };

  const handleAnimalCreated = (newAnimal: Animal) => {
    // Thêm animal mới vào danh sách
    setAnimals(prev => [newAnimal, ...prev]);
    setShowCreateForm(false);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  // Nếu đang ở chế độ tạo animal, hiển thị form tạo animal
  if (showCreateForm) {
    return (
      <CreateAnimalForm
        onAnimalCreated={handleAnimalCreated}
        onCancel={handleCancelCreate}
      />
    );
  }

  const stats = {
    total: animals.length,
    available: animals.filter(a => a.status === 'AVAILABLE').length,
    adopted: animals.filter(a => a.status === 'ADOPTED').length,
    pending: animals.filter(a => a.status === 'PENDING').length,
    rescued: animals.filter(a => a.status === 'RESCUED').length
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
        </div>
      ) : filteredAnimals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map((animal) => (
            <AnimalCard
              key={animal.animalUuid}
              animal={animal}
              onViewDetail={handleViewDetail}
              onEdit={handleEditAnimal}
              onDelete={handleDeleteAnimal}
              showShelterInfo={false} // Don't show shelter info since this is shelter's own page
            />
          ))}
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