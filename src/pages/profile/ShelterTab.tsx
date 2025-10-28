import React, { useState } from 'react';
import { Building, Mail, Phone, MapPin, Edit2, Save, X, FileText } from 'lucide-react';
import { ShelterResponse } from '../../types/Shelter';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/input/Input';

interface ShelterTabProps {
  onShelterUpdate?: (shelterData: any) => void;
}

export const ShelterTab: React.FC<ShelterTabProps> = ({ onShelterUpdate }) => {
  // Get shelter info from localStorage
  const shelterString = localStorage.getItem('shelter');
  const shelter: ShelterResponse | null = shelterString ? JSON.parse(shelterString) : null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    shelterName: shelter?.shelterName || '',
    email: shelter?.email || '',
    phone: shelter?.phone || '',
    address: shelter?.address || '',
    description: shelter?.description || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call API to update shelter info
      if (onShelterUpdate) {
        await onShelterUpdate(formData);
      }
      
      // Update localStorage with new data
      if (shelter) {
        const updatedShelter = { ...shelter, ...formData };
        localStorage.setItem('shelter', JSON.stringify(updatedShelter));
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update shelter information:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      shelterName: shelter?.shelterName || '',
      email: shelter?.email || '',
      phone: shelter?.phone || '',
      address: shelter?.address || '',
      description: shelter?.description || '',
    });
  };

  // If no shelter data found
  if (!shelter) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="text-gray-500 text-lg mb-2">
            Shelter Information Not Found
          </div>
          <p className="text-gray-400">
            Please contact support if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Shelter Information</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your shelter's basic information and contact details
          </p>
        </div>
        {isEditing ? (
          <div className="flex space-x-4">
            <Button 
              type="submit" 
              className="flex items-center bg-orange-600 hover:bg-orange-700"
              onClick={handleSubmit}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
              className="flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Information
          </Button>
        )}
      </div>

      {/* Shelter Stats Card */}
      {!isEditing && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-4">
            <Building className="h-12 w-12 text-white bg-white/20 rounded-full p-2" />
            <div>
              <h3 className="text-2xl font-bold">{shelter.shelterName}</h3>
              <p className="text-orange-100">Shelter ID: {shelter.shelterUuid}</p>
              {shelter.shelterAmount !== undefined && (
                <p className="text-orange-100">Total Animals: {shelter.shelterAmount}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          
          <Input
            label="Shelter Name"
            name="shelterName"
            value={isEditing ? formData.shelterName : shelter.shelterName}
            onChange={handleChange}
            type="text"
            disabled={!isEditing}
            icon={<Building className="h-5 w-5 text-gray-400" />}
            placeholder="Enter shelter name"
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={isEditing ? formData.email : shelter.email}
            onChange={handleChange}
            disabled={!isEditing}
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            placeholder="shelter@example.com"
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={isEditing ? formData.phone : shelter.phone}
            onChange={handleChange}
            disabled={!isEditing}
            icon={<Phone className="h-5 w-5 text-gray-400" />}
            placeholder="+1 (555) 123-4567"
          />

          <Input
            label="Address"
            name="address"
            type="text"
            value={isEditing ? formData.address : shelter.address}
            onChange={handleChange}
            disabled={!isEditing}
            icon={<MapPin className="h-5 w-5 text-gray-400" />}
            placeholder="123 Main St, City, State, ZIP"
          />
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 text-gray-400 mr-2" />
            About Our Shelter
          </h3>
          
          {isEditing ? (
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Tell people about your shelter, your mission, and what makes you special..."
            />
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
              {shelter.description ? (
                <p className="text-gray-700 leading-relaxed">{shelter.description}</p>
              ) : (
                <p className="text-gray-400 italic">No description provided yet.</p>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};