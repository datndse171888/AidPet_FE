import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { AccountResponse } from '../../types/User';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/input/Input';

interface InformationTabProps {
  user: AccountResponse;
  onInformationUpdate?: (userData: any) => void;
}

export const InformationTab: React.FC<InformationTabProps> = ({ user, onInformationUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call API to update profile
      if (onInformationUpdate) {
        // await onInformationUpdate(formData);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
        {isEditing ? (
          <div className="flex space-x-4">
            <Button 
              type="submit" 
              className="flex items-center"
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

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="fullName"
          value={isEditing ? formData.fullName : user?.fullName || ''}
          onChange={handleChange}
          type="text"
          disabled={!isEditing}
          icon={<User className="h-5 w-5 text-gray-400" />}
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={isEditing ? formData.email : user?.email || ''}
          onChange={handleChange}
          disabled={!isEditing}
          icon={<Mail className="h-5 w-5 text-gray-400" />}
        />

        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={isEditing ? formData.phone : user?.phone || ''}
          onChange={handleChange}
          disabled={!isEditing}
          icon={<Phone className="h-5 w-5 text-gray-400" />}
        />

        <Input
          label="Address"
          name="address"
          type="text"
          value={isEditing ? formData.address : user?.address || ''}
          onChange={handleChange}
          disabled={!isEditing}
          icon={<MapPin className="h-5 w-5 text-gray-400" />}
        />
      </form>
    </div>
  );
};