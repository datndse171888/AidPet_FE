import React, { useState } from 'react';
import { X, User, Building, PawPrint, Mail, Phone, MapPin, Clock, Check } from 'lucide-react';
import { AdoptionResponse } from '../../../types/Adoption';
import { AnimalResponse } from '../../../types/Animal';
import { AccountResponse } from '../../../types/User';
import { ShelterResponse } from '../../../types/Shelter';
import { Button } from '../Button';

interface AdoptionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  adoption: AdoptionResponse | null;
  animal?: AnimalResponse;
  user?: AccountResponse;
  shelter?: ShelterResponse;
  userRole: 'SHELTER' | 'USER';
  onApprove?: (adoptionId: string) => void;
  onReject?: (adoptionId: string) => void;
  isActionLoading?: boolean;
}

export const AdoptionDetailModal: React.FC<AdoptionDetailModalProps> = ({
  isOpen,
  onClose,
  adoption,
  animal,
  user,
  shelter,
  userRole,
  onApprove,
  onReject,
  isActionLoading = false
}) => {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  if (!isOpen || !adoption) return null;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'Pending Review', icon: Clock },
      APPROVE: { color: 'bg-green-100 text-green-800 border-green-300', label: 'Approved', icon: Check },
      REJECT: { color: 'bg-red-100 text-red-800 border-red-300', label: 'Rejected', icon: X },
      CANCEL: { color: 'bg-gray-100 text-gray-800 border-gray-300', label: 'Cancelled', icon: X }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    const IconComponent = config.icon;

    return (
      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border-2 ${config.color}`}>
        <IconComponent className="h-4 w-4 mr-2" />
        {config.label}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleApprove = () => {
    if (onApprove && adoption.adoptionId) {
      onApprove(adoption.adoptionId);
    }
  };

  const handleReject = () => {
    if (onReject && adoption.adoptionId) {
      onReject(adoption.adoptionId);
      setShowRejectForm(false);
      setRejectReason('');
    }
  };

  const isPending = adoption.status === 'PENDING';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden pointer-events-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Adoption Request Details
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Application ID: {adoption.adoptionId}
                  </p>
                </div>
                {getStatusBadge(adoption.status)}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                disabled={isActionLoading}
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(95vh-140px)] p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Animal Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <PawPrint className="h-6 w-6 text-orange-600 mr-2" />
                    Animal Information
                  </h3>
                  
                  {animal ? (
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={animal.imgUrl}
                          alt={animal.name}
                          className="w-24 h-24 object-cover rounded-xl"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/96x96?text=No+Image';
                          }}
                        />
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900">{animal.name}</h4>
                          <p className="text-lg text-gray-600">{animal.breed}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">{animal.age} years old</span>
                            <span className="text-sm text-gray-600">•</span>
                            <span className="text-sm text-gray-600">{animal.gender}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
                          <p className="text-base font-medium text-gray-900">
                            {animal.categoryAnimals?.categoryName || 'Unknown'}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                          <p className="text-base font-medium text-gray-900">{animal.status}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
                        <p className="text-gray-700 leading-relaxed">{animal.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-center py-8">
                      Animal information not available
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 text-gray-600 mr-2" />
                    Timeline
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                        <p className="text-xs text-gray-600">{formatDate(adoption.applicationDate)}</p>
                      </div>
                    </div>
                    
                    {adoption.approvalDate && (
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          adoption.status === 'APPROVE' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Application {adoption.status === 'APPROVE' ? 'Approved' : 'Rejected'}
                          </p>
                          <p className="text-xs text-gray-600">{formatDate(adoption.approvalDate)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Information */}
              <div className="space-y-6">
                {userRole === 'SHELTER' && user ? (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-6 w-6 text-orange-600 mr-2" />
                      Applicant Information
                    </h3>
                    
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                          <p className="text-lg font-semibold text-gray-900">{user.fullName}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              <p className="text-base text-gray-900">{user.email}</p>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-gray-400 mr-2" />
                              <p className="text-base text-gray-900">{user.phone}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <p className="text-base text-gray-900">{user.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : shelter ? (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Building className="h-6 w-6 text-orange-600 mr-2" />
                      Shelter Information
                    </h3>
                    
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Shelter Name</label>
                          <p className="text-lg font-semibold text-gray-900">{shelter.shelterName}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              <p className="text-base text-gray-900">{shelter.email}</p>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-gray-400 mr-2" />
                              <p className="text-base text-gray-900">{shelter.phone}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <p className="text-base text-gray-900">{shelter.address}</p>
                          </div>
                        </div>

                        {shelter.description && (
                          <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">About Shelter</label>
                            <p className="text-gray-700 leading-relaxed">{shelter.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Reject Form */}
                {showRejectForm && userRole === 'SHELTER' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Rejection Reason</h3>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Please provide a reason for rejection (optional)"
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={4}
                      />
                      <div className="flex space-x-3 mt-4">
                        <Button
                          onClick={handleReject}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={isActionLoading}
                          loading={isActionLoading}
                        >
                          Confirm Rejection
                        </Button>
                        <Button
                          onClick={() => setShowRejectForm(false)}
                          variant="outline"
                          disabled={isActionLoading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          {userRole === 'SHELTER' && isPending && !showRejectForm && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => setShowRejectForm(true)}
                  variant="outline"
                  className="text-red-600 hover:bg-red-50 border-red-300"
                  disabled={isActionLoading}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={handleApprove}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isActionLoading}
                  loading={isActionLoading}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve Adoption
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};