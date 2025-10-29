import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, PawPrint } from 'lucide-react';
import { AnimalResponse } from '../../types/Animal';
import { AnimalDetailModal } from '../../components/ui/modal/AnimalDetailModal';
import { animalApi } from '../../services/api/AnimalApi';
import { Button } from '../../components/ui/Button';
import { PublicAnimalCard } from '../../components/ui/card/PublicAnimalCard';
import { adoptionApi } from '../../services/api/AdoptionApi';
import { useAuth } from '../../hooks/AuthorizationRoute';
import { navigationService } from '../../utils/NavigationService';
import { AdoptionRequest } from '../../types/Adoption';
import { CategoryAnimalResponse } from '../../types/Category';
import { categoryApi } from '../../services/api/CategoryApi';

export const Animal: React.FC = () => {

  //=====================
  // States
  //=====================

  const [animals, setAnimals] = useState<AnimalResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingAdoption, setIsSubmittingAdoption] = useState(false);

  // Modal states
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalResponse | null>(null);

  const user = useAuth();

  // Categories for filter
  const [categories, setCategories] = useState<CategoryAnimalResponse[]>([]);

  //=====================
  // Effects
  //=====================

  useEffect(() => {
    getAllAvailableAnimals();
    getCategories();
  }, []);

  const getAllAvailableAnimals = async () => {
    setIsLoading(true);
    try {
      // Fetch available animals for adoption
      const response = await animalApi.getAllAvailable(100, 0);
      const data = response.data;
      setAnimals(data.listData);

    } catch (error) {
      console.error('Failed to fetch animals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await categoryApi.getAllCategoryAnimals();
      setCategories(response.data.listData);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    } finally {
      setIsLoading(false);
    }
  };

  //=====================
  // Filter
  //=====================

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.categoryAnimals?.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.shelter?.shelterName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' ||
      animal.categoryAnimals?.animalCateUuid === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  //=====================
  // Handlers
  //=====================

  const handleViewDetail = (animal: AnimalResponse) => {
    setSelectedAnimal(animal);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedAnimal(null);
  };

  const handleAdoption = async (animal: AnimalResponse) => {
    // Check if user is logged in
    if (!user?.isAuthenticated) {
      alert('Please log in to adopt a pet');
      navigationService.goTo('/login');
      return;
    }

    // Confirm adoption intent
    const confirmAdopt = window.confirm(
      `Are you sure you want to submit an adoption request for ${animal.name}?`
    );
    
    if (!confirmAdopt) {
      return;
    }

    setIsSubmittingAdoption(true);

    const formData :AdoptionRequest = {
      shelterUuid: animal.shelter.shelterUuid,
      userId: user?.uuid || '',
      animalUuid: animal.animalUuid
    };

    try {
      const response = await adoptionApi.create(formData)
      const data = response.data;
      console.log('Adoption request submitted:', data);
    } catch (error) {
      console.error('Failed to submit adoption request:', error);
    } finally {
      getAllAvailableAnimals();
      setIsSubmittingAdoption(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <PawPrint className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Companion
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover loving animals waiting for their forever homes. Every pet deserves a chance at happiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById('animals-section')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="border border-white text-white hover:bg-white hover:text-orange-600"
              >
                <Heart className="h-5 w-5 mr-2" />
                Browse Animals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Animals Section */}
      <section id="animals-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Animals Available for Adoption
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each of these wonderful animals is looking for a loving home. Browse through our available pets and find your new best friend.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name, breed, or shelter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  >
                    {categories.map(category => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {filteredAnimals.length}
              </div>
              <div className="text-gray-600">Animals Available</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {new Set(filteredAnimals.map(a => a.shelter?.shelterUuid)).size}
              </div>
              <div className="text-gray-600">Partner Shelters</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {new Set(filteredAnimals.map(a => a.categoryAnimals?.categoryName)).size}
              </div>
              <div className="text-gray-600">Animal Types</div>
            </div>
          </div>

          {/* Animals Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <span className="ml-3 text-gray-600">Loading animals...</span>
            </div>
          ) : filteredAnimals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAnimals.map((animal) => (
                <PublicAnimalCard
                  key={animal.animalUuid}
                  animal={animal}
                  onViewDetail={handleViewDetail}
                  onAdopt={handleAdoption}
                  isLoading={isSubmittingAdoption}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-gray-500 text-lg mb-2">
                {searchQuery || categoryFilter !== 'all'
                  ? 'No animals found matching your criteria'
                  : 'No animals available for adoption right now'
                }
              </div>
              <p className="text-gray-400">
                {searchQuery || categoryFilter !== 'all'
                  ? 'Try adjusting your search or filter settings'
                  : 'Please check back later for new animals'
                }
              </p>
            </div>
          )}

          {/* Animal Detail Modal */}
          <AnimalDetailModal
            isOpen={showDetailModal}
            animal={selectedAnimal}
            onClose={handleCloseModal}
            onSave={async () => { }} // Users cannot edit
            showActions={false} // Users only view
          />
        </div>
      </section>
    </div>
  );
};