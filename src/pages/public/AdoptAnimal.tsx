import React, { useState } from 'react';
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
  Award
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { AdoptionRequest } from '../../types/Adoption';
import { navigationService } from '../../services/navigator/NavigationService';

export const AdoptAnimal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

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
      details: 'Valid government-issued ID required for verification'
    },
    {
      icon: Home,
      title: 'Suitable Living Space',
      description: 'Adequate space and safe environment for the pet',
      details: 'Home visit will be conducted to ensure pet safety'
    },
    {
      icon: DollarSign,
      title: 'Financial Stability',
      description: 'Ability to provide for pet\'s ongoing needs',
      details: 'Including food, veterinary care, and emergency expenses'
    },
    {
      icon: Clock,
      title: 'Time Commitment',
      description: 'Available time for training, exercise, and care',
      details: 'Daily commitment of at least 2-3 hours for pet care'
    }
  ];

  const policies = [
    {
      title: 'Spaying/Neutering Policy',
      description: 'All pets must be spayed/neutered within 30 days of adoption (if not already done)',
      icon: Shield
    },
    {
      title: 'Veterinary Care',
      description: 'Adopters must provide regular veterinary care and maintain current vaccinations',
      icon: Heart
    },
    {
      title: 'No Transfer Policy',
      description: 'Pets cannot be given away, sold, or transferred without written shelter approval',
      icon: AlertCircle
    },
    {
      title: 'Return Policy',
      description: 'Pets can be returned to the shelter if unable to care for them - no questions asked',
      icon: Home
    },
    {
      title: 'Follow-up Visits',
      description: 'Follow-up visits may be conducted within the first 6 months to ensure pet welfare',
      icon: CheckCircle
    },
    {
      title: 'Adoption Fees',
      description: 'Adoption fees are non-refundable and go towards caring for other animals in need',
      icon: DollarSign
    }
  ];

  const adoptionRules = [
    'All family members must meet the pet before adoption',
    'Landlord permission required for renters',
    'Current pets must be up-to-date on vaccinations',
    'Reference check from current/previous veterinarian',
    'Adoption contract must be signed by all adult household members',
    'Trial period of 2 weeks available for compatibility assessment',
    'Microchip registration transfer required within 7 days',
    'Pet insurance or emergency fund of $1,000+ recommended'
  ];

  const handleStartAdoption = async () => {
    if (!user) {
      alert('Please log in to start the adoption process');
      navigationService.goTo('/login');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare adoption request data
      const adoptionData: AdoptionRequest = {
        userId: user.id
      };

      // Simulate API call
      // const response = await adoptionApi.submitApplication(adoptionData);
      console.log('Adoption process started for user:', adoptionData);

      alert('Adoption application initiated! Please check your email for next steps and application forms.');
      
      // Redirect to profile or adoption status page
      // navigationService.goTo('/profile?tab=adoptions');
      
    } catch (error) {
      alert('Failed to start adoption process. Please try again.');
      console.error('Adoption error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <PawPrint className="h-20 w-20 mx-auto mb-6 animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Adopt a Pet Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Give a loving animal a second chance at happiness. Every adoption saves a life and creates a lifelong bond filled with unconditional love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleStartAdoption}
                size="lg"
                loading={isLoading}
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Heart className="h-5 w-5 mr-2" />
                Start Adoption Process
              </Button>
              <Button
                onClick={() => navigationService.goTo('/news')}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold"
              >
                View Available Pets
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Adoption Process */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Adoption Process</h2>
            <p className="text-xl text-gray-600">Four simple steps to find your perfect companion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {adoptionSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="text-center pt-6">
                    <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Adoption Requirements</h2>
            <p className="text-xl text-gray-600">What we look for in potential adopters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((req, index) => {
              const Icon = req.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                      <Icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{req.title}</h3>
                      <p className="text-gray-700 mb-2">{req.description}</p>
                      <p className="text-sm text-gray-500 italic">{req.details}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Policies & Guidelines */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Adoption Policies & Guidelines</h2>
            <p className="text-xl text-gray-600">Important policies to ensure the welfare of our animals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-900">{policy.title}</h4>
                      <p className="text-gray-600">{policy.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Adoption Rules */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="text-center mb-8">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Adoption Rules & Regulations</h2>
              <p className="text-lg text-gray-600">Please review these important rules before proceeding</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adoptionRules.map((rule, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-blue-200">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white p-12">
            <div className="text-center mb-8">
              <Info className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
              <p className="text-xl text-orange-100">Our adoption team is here to help you every step of the way</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                <Phone className="h-10 w-10 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-orange-100 text-lg">0857575431</p>
                <p className="text-orange-200 text-sm mt-2">Mon-Fri: 8AM-6PM</p>
              </div>
              <div className="text-center bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                <Mail className="h-10 w-10 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-orange-100 text-lg">adoption@aidpet.com</p>
                <p className="text-orange-200 text-sm mt-2">Response within 24hrs</p>
              </div>
              <div className="text-center bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                <MapPin className="h-10 w-10 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-orange-100 text-lg">Saigon Hi-Tech Park</p>
                <p className="text-orange-200 text-sm mt-2">Ho Chi Minh City</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <Heart className="h-16 w-16 text-orange-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Change a Life?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Every adoption creates a bond that lasts a lifetime. Take the first step in giving a deserving animal their forever home.
          </p>
          <Button
            onClick={handleStartAdoption}
            size="lg"
            loading={isLoading}
            className="px-12 py-4 text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <PawPrint className="h-6 w-6 mr-3" />
            Begin Your Adoption Journey
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            By clicking above, you agree to our adoption policies and terms
          </p>
        </section>
      </div>
    </div>
  );
};