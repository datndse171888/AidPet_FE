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
  MapPin
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/input/Input';
import { AdoptionRequest } from '../../types/Adoption';
import { FormErrors } from '../../types';
import { navigationService } from '../../services/navigator/NavigationService';

export const Adoption: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    reason: '',
    experience: '',
    livingSpace: 'apartment'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const adoptionSteps = [
    {
      icon: FileText,
      title: 'Submit Application',
      description: 'Fill out our comprehensive adoption application form with your personal information and preferences.'
    },
    {
      icon: Users,
      title: 'Interview Process',
      description: 'Meet with our adoption counselors to discuss your lifestyle and find the perfect match.'
    },
    {
      icon: Home,
      title: 'Home Visit',
      description: 'Our team will visit your home to ensure it\'s a safe and suitable environment for your new pet.'
    },
    {
      icon: CheckCircle,
      title: 'Adoption Complete',
      description: 'Once approved, complete the adoption process and welcome your new family member home!'
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
      color: 'text-yellow-600'
    },
    {
      icon: Clock,
      title: 'Time Commitment',
      description: 'Available time for training, exercise, and care',
      color: 'text-purple-600'
    }
  ];

  const policies = [
    'All pets must be spayed/neutered within 30 days of adoption',
    'Adopters must provide veterinary care and maintain current vaccinations',
    'Pets cannot be given away, sold, or transferred without shelter approval',
    'Return policy: pets can be returned to the shelter if unable to care for them',
    'Follow-up visits may be conducted to ensure pet welfare',
    'Adoption fees are non-refundable but go towards caring for other animals'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please tell us why you want to adopt';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to submit an adoption application');
      navigationService.goTo('/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Prepare adoption request data
      const adoptionData: AdoptionRequest = {
        userId: user.id
      };

      // Simulate API call
      // const response = await adoptionApi.submitApplication(adoptionData);
      console.log('Adoption application submitted:', {
        adoptionData,
        additionalInfo: formData
      });

      alert('Adoption application submitted successfully! We will contact you within 24-48 hours.');
      setShowForm(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        reason: '',
        experience: '',
        livingSpace: 'apartment'
      });
    } catch (error) {
      setErrors({ general: 'Failed to submit application. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

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
              Give a loving animal a second chance at happiness. Every adoption saves a life and creates a lifelong bond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowForm(true)}
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50"
              >
                Start Adoption Process
              </Button>
              <Button
                onClick={() => navigationService.goTo('/news')}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                View Available Pets
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Adoption Process */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Adoption Process</h2>
            <p className="text-lg text-gray-600">Simple steps to find your perfect companion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {adoptionSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <Icon className="h-10 w-10 text-orange-600" />
                  </div>
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Adoption Requirements</h2>
            <p className="text-lg text-gray-600">What we look for in potential adopters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, index) => {
              const Icon = req.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <Icon className={`h-12 w-12 ${req.color} mb-4`} />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{req.title}</h3>
                  <p className="text-gray-600">{req.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Policies */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Shield className="h-6 w-6 mr-3 text-orange-600" />
                Adoption Policies & Guidelines
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policies.map((policy, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{policy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
              <p className="text-orange-100">Our adoption team is here to help you every step of the way</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-orange-100">0857575431</p>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-orange-100">adoption@aidpet.com</p>
              </div>
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <p className="text-orange-100">Saigon Hi-Tech Park, HCMC</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Adoption Application Modal */}
      {showForm && (
        <>
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 z-40 backdrop-blur-sm"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={() => setShowForm(false)}
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden pointer-events-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Adoption Application</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-white hover:text-orange-200 transition-colors"
                  >
                    <AlertCircle className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-orange-100 mt-2">Please fill out all required information</p>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(95vh-140px)]">
                {errors.general && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name *"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                      placeholder="John Doe"
                      required
                    />
                    
                    <Input
                      label="Email Address *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number *"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder="+84 123 456 789"
                      required
                    />
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Living Space *
                      </label>
                      <select
                        name="livingSpace"
                        value={formData.livingSpace}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      >
                        <option value="apartment">Apartment</option>
                        <option value="house_small">Small House</option>
                        <option value="house_large">Large House</option>
                        <option value="farm">Farm/Rural</option>
                      </select>
                    </div>
                  </div>
                  
                  <Input
                    label="Home Address *"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    placeholder="123 Main St, City, Country"
                    required
                  />
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Why do you want to adopt a pet? *
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tell us about your motivation to adopt..."
                      required
                    />
                    {errors.reason && (
                      <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Previous Pet Experience
                    </label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tell us about your experience with pets (optional)..."
                    />
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="text-sm text-orange-800">
                        <p className="font-medium mb-1">Application Review Process:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Applications are reviewed within 24-48 hours</li>
                          <li>You will be contacted for an interview if approved</li>
                          <li>Home visit may be required before final approval</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <Button
                      type="submit"
                      className="flex-1"
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      Submit Application
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};