import React from 'react';
import { Calendar, Clock, Eye, Check, X, User, Building, PawPrint, Mail, Phone, MapPin } from 'lucide-react';
import { AdoptionResponse } from '../../../types/Adoption';
import { AnimalResponse } from '../../../types/Animal';
import { AccountResponse } from '../../../types/User';
import { ShelterResponse } from '../../../types/Shelter';
import { Button } from '../Button';
import { formatDateAndTime } from '../../../utils/FormatUtil';

interface AdoptionCardProps {
  adoption: AdoptionResponse;
  animal?: AnimalResponse;
  user?: AccountResponse;
  shelter?: ShelterResponse;
  onViewDetail: (adoption: AdoptionResponse) => void;
  onApprove?: (adoptionId: string) => void;
  onReject?: (adoptionId: string) => void;
  userRole: 'SHELTER' | 'USER';
  isActionLoading?: boolean;
}

export const AdoptionCard: React.FC<AdoptionCardProps> = ({
  adoption,
  animal,
  user,
  shelter,
  onViewDetail,
  onApprove,
  onReject,
  userRole,
  isActionLoading = false
}) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      APPROVE: { color: 'bg-green-100 text-green-800', icon: Check },
      REJECT: { color: 'bg-red-100 text-red-800', icon: X },
      CANCEL: { color: 'bg-gray-100 text-gray-800', icon: X }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="h-3 w-3 mr-1" />
        {status}
      </span>
    );
  };

  const isPending = adoption.status === 'PENDING';

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {userRole === 'SHELTER' ? (
              <>
                <User className="h-8 w-8 text-orange-600 bg-orange-100 rounded-full p-1.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user?.fullName || 'Unknown User'}
                  </h3>
                  <p className="text-sm text-gray-600">Adoption Request</p>
                </div>
              </>
            ) : (
              <>
                <Building className="h-8 w-8 text-orange-600 bg-orange-100 rounded-full p-1.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {shelter?.shelterName || 'Unknown Shelter'}
                  </h3>
                  <p className="text-sm text-gray-600">My Adoption Request</p>
                </div>
              </>
            )}
          </div>
          {getStatusBadge(adoption.status)}
        </div>

        {/* Animal Info */}
        {animal && (
          <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
            <img
              src={animal.imgUrl}
              alt={animal.name}
              className="w-16 h-16 object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=No+Image';
              }}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <PawPrint className="h-4 w-4 text-orange-600" />
                <h4 className="font-semibold text-gray-900">{animal.name}</h4>
              </div>
              <p className="text-sm text-gray-600">{animal.breed} • {animal.age} years old</p>
              <p className="text-sm text-gray-600">{animal.gender} • {animal.categoryAnimals?.categoryName}</p>
            </div>
          </div>
        )}

        {/* Contact Info Preview */}
        <div className="space-y-2 mb-4">
          {userRole === 'SHELTER' && user ? (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              <span>{user.email}</span>
            </div>
          ) : shelter ? (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{shelter.address}</span>
            </div>
          ) : null}

          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Applied: {formatDateAndTime(adoption.applicationDate)}</span>
          </div>

          {adoption.approvalDate && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>
                {adoption.status === 'APPROVE' ? 'Approved' : 'Updated'}: {formatDateAndTime(adoption.approvalDate)}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={() => onViewDetail(adoption)}
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-center"
            disabled={isActionLoading}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>

          {/* Shelter Actions */}
          {userRole === 'SHELTER' && isPending && onApprove && onReject && (
            <>
              <Button
                onClick={() => onApprove(adoption.adoptionId)}
                size="sm"
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
                disabled={isActionLoading}
              >
                <Check className="h-4 w-4 mr-1" />
                Approve
              </Button>

              <Button
                onClick={() => onReject(adoption.adoptionId)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-50 border-red-300"
                disabled={isActionLoading}
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};