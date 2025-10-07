import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  FileText, 
  CheckCircle, 
  Shield, 
  Clock, 
  Users, 
  Home,
  DollarSign,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  PawPrint,
  Info,
  Award,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/input/Input';
import { AdoptionRequest } from '../../types/Adoption';
import { AnimalResponse } from '../../types/Animal';
import { FormErrors } from '../../types';
import { navigationService } from '../../services/navigator/NavigationService';
import { animalApi } from '../../services/api/AnimalApi';
import { DataResponse } from '../../types/DataResponse';

export const AdoptAnimal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalResponse | null>(null);
  
  // Adoption form data
  const [formData, setFormData] = useState<AdoptionRequest>({
    shelterUuid: '',
    userId: '',
    applicationDate: '',
    status: 'PENDING',
    approvalDate: '',
    animalUuid: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    // Get animal ID from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('animalId');
    
    if (animalId) {
      // Fetch animal details
      fetchAnimalDetails(animalId);
    }

    // Initialize form data with user info
    if (user) {
      const currentDate = new Date().toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        userId: user.id,
        applicationDate: currentDate
      }));
    }
  }, [user]);

  const fetchAnimalDetails = async (animalId: string) => {
    try {
      // In a real app, you'd fetch animal details by ID
      // For now, we'll use the animals from getByStatus
      const response = await animalApi.getAllAvailable(100, 0);
      const responseData: DataResponse<AnimalResponse> = response.data;
      const data = responseData.data;
      
      if (data) {
        const animal = data.find(a => a.animalUuid === animalId);
        if (animal) {
          setSelectedAnimal(animal);
          setFormData(prev => ({
            ...prev,
            animalUuid: animal.animalUuid,
            shelterUuid: animal.shelter?.shelterUuid || ''
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching animal details:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.userId) {
      newErrors.userId = 'User information is required';
    }

    if (!formData.animalUuid) {
      newErrors.animalUuid = 'Animal selection is required';
    }

    if (!formData.shelterUuid) {
      newErrors.shelterUuid = 'Shelter information is required';
    }

    if (!formData.applicationDate) {
      newErrors.applicationDate = 'Application date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitApplication = async () => {
    if (!user) {
      alert('Please log in to start the adoption process');
      navigationService.goTo('/login');
      return;
    }

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to submit adoption application
      console.log('Submitting adoption application:', formData);

      // In a real app, call adoptionApi.create(formData)
      
      alert('Adoption application submitted successfully! Please check your email for next steps and application forms.');
      
      // Redirect to profile or adoption status page
      navigationService.goTo('/profile?tab=adoptions');
      
    } catch (error) {
      alert('Failed to submit adoption application. Please try again.');
      console.error('Adoption error:', error);
      setErrors({ general: 'Failed to submit application. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const adoptionSteps = [
    {
      icon: FileText,
      title: 'Submit Application',
      description: 'Fill out our comprehensive adoption application form with your personal information and preferences.',
      step: '01'
    },
    {
      icon: Users,
      title: 'Interview Process',
      description: 'Meet with our adoption counselors to discuss your lifestyle and find the perfect match.',
      step: '02'
    },
    {
      icon: Home,
      title: 'Home Visit',
      description: 'Our team will visit your home to ensure it\'s a safe and suitable environment for your new pet.',
      step: '03'
    },
    {
      icon: CheckCircle,
      title: 'Adoption Complete',
      description: 'Once approved, complete the adoption process and welcome your new family member home!',
      step: '04'
    }
  ];

  const requirements = [
    {
      icon: Shield,
      title: 'Age Requirement',
      description: 'Must be 18 years or older to adopt',
      color: 'text-blue-600'
    },
    {
      icon: Home,
      title: 'Suitable Living Space',
      description: 'Adequate space and safe environment for the pet',
      color: 'text-green-600'
    },
    {
      icon: DollarSign,
      title: 'Financial Stability',
      description: 'Ability to provide for pet\'s ongoing needs',
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Time Commitment',
      description: 'Sufficient time for training, exercise, and care',
      color: 'text-orange-600'
    }
  ];

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  size="sm"
                  className="mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Adoption Application</h1>
                  {selectedAnimal && (
                    <p className="text-gray-600">
                      Applying to adopt: <span className="font-semibold text-orange-600">{selectedAnimal.name}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Animal Info */}
          {selectedAnimal && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Animal Information</h3>
              <div className="flex items-start space-x-4">
                <img
                  src={selectedAnimal.imgUrl}
                  alt={selectedAnimal.name}
                  className="w-32 h-32 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedAnimal.name}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Breed:</span> {selectedAnimal.breed}</p>
                    <p><span className="font-medium">Age:</span> {selectedAnimal.age} years old</p>
                    <p><span className="font-medium">Gender:</span> {selectedAnimal.gender}</p>
                    <p><span className="font-medium">Category:</span> {selectedAnimal.categoryAnimals?.categoryName}</p>
                    <p><span className="font-medium">Shelter:</span> {selectedAnimal.shelter?.shelterName}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Adoption Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-6">Application Details</h3>
            
            {errors.general && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="User ID"
                name="userId"
                type="text"
                value={formData.userId}
                onChange={handleChange}
                error={errors.userId}
                disabled
                placeholder="Auto-filled from your profile"
              />

              <Input
                label="Animal ID"
                name="animalUuid"
                type="text"
                value={formData.animalUuid}
                onChange={handleChange}
                error={errors.animalUuid}
                disabled
                placeholder="Auto-filled from selected animal"
              />

              <Input
                label="Shelter ID"
                name="shelterUuid"
                type="text"
                value={formData.shelterUuid}
                onChange={handleChange}
                error={errors.shelterUuid}
                disabled
                placeholder="Auto-filled from animal's shelter"
              />

              <Input
                label="Application Date"
                name="applicationDate"
                type="date"
                value={formData.applicationDate}
                onChange={handleChange}
                error={errors.applicationDate}
                required
              />

              <Input
                label="Status"
                name="status"
                type="text"
                value={formData.status}
                onChange={handleChange}
                disabled
                placeholder="Pending Review"
              />

              <Input
                label="Approval Date"
                name="approvalDate"
                type="date"
                value={formData.approvalDate}
                onChange={handleChange}
                error={errors.approvalDate}
                placeholder="Will be set after approval"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end space-x-4">
              <Button
                onClick={() => setShowForm(false)}
                variant="outline"
                size="lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitApplication}
                size="lg"
                loading={isLoading}
                disabled={isLoading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Heart className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Adopt a Pet Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Give a loving animal a forever home. Start your adoption journey and change a life today.
            </p>
            {selectedAnimal ? (
              <Button
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold"
              >
                <FileText className="h-5 w-5 mr-2" />
                Start Adoption Process
              </Button>
            ) : (
              <Button
                onClick={() => navigationService.goTo('/animals')}
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold"
              >
                <PawPrint className="h-5 w-5 mr-2" />
                Browse Animals
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Selected Animal Section */}
      {selectedAnimal && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Meet {selectedAnimal.name}
              </h2>
              <p className="text-lg text-gray-600">
                This wonderful {selectedAnimal.categoryAnimals?.categoryName.toLowerCase()} is waiting for a loving home
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <img
                    src={selectedAnimal.imgUrl}
                    alt={selectedAnimal.name}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedAnimal.name}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <PawPrint className="h-5 w-5 text-orange-600 mr-3" />
                      <span><strong>Breed:</strong> {selectedAnimal.breed}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-orange-600 mr-3" />
                      <span><strong>Age:</strong> {selectedAnimal.age} years old</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-orange-600 mr-3" />
                      <span><strong>Gender:</strong> {selectedAnimal.gender}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-orange-600 mr-3" />
                      <span><strong>Shelter:</strong> {selectedAnimal.shelter?.shelterName}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{selectedAnimal.description}</p>
                  <Button
                    onClick={() => setShowForm(true)}
                    size="lg"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={!user}
                  >
                    {user ? (
                      <>
                        <Heart className="h-5 w-5 mr-2" />
                        Start Adoption Process
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5 mr-2" />
                        Login to Adopt
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Adoption Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Adoption Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our adoption process is designed to ensure the best match between pets and families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {adoptionSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="bg-orange-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Adoption Requirements</h2>
            <p className="text-lg text-gray-600">
              Please ensure you meet these requirements before applying
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {requirements.map((requirement, index) => {
              const Icon = requirement.icon;
              return (
                <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Icon className={`h-6 w-6 ${requirement.color}`} />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{requirement.title}</h4>
                  <p className="text-gray-600 text-sm">{requirement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your New Best Friend?
          </h2>
          <p className="text-xl mb-8">
            Browse our available animals and start the adoption process today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigationService.goTo('/animals')}
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold"
            >
              <PawPrint className="h-5 w-5 mr-2" />
              Browse Animals
            </Button>
            <Button
              onClick={() => navigationService.goTo('/adoption')}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600"
            >
              <Info className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};