import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, MessageSquare, X, PawPrint } from 'lucide-react';
import { Button } from '../Button';

interface AnimalApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
  action: 'approve' | 'reject';
  animalName: string;
  isLoading?: boolean;
}

export const AnimalApprovalModal: React.FC<AnimalApprovalModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  animalName,
  isLoading = false
}) => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const isApprove = action === 'approve';

  const handleConfirm = () => {
    onConfirm(message);
    setMessage('');
    setShowMessage(false);
  };

  const handleClose = () => {
    setMessage('');
    setShowMessage(false);
    onClose();
  };

  const handleQuickAction = () => {
    const defaultMessage = isApprove 
      ? 'Animal has been approved and is now available for adoption.'
      : 'Animal has been rejected and will not be listed.';
    onConfirm(defaultMessage);
    setMessage('');
    setShowMessage(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm" onClick={handleClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all pointer-events-auto">
          <div className={`px-6 py-4 rounded-t-xl ${
            isApprove ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isApprove ? (
                  <CheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <XCircle className="h-6 w-6 text-white" />
                )}
                <h3 className="text-lg font-semibold text-white">
                  {isApprove ? 'Approve Animal' : 'Reject Animal'}
                </h3>
              </div>
              <button onClick={handleClose} className="text-white hover:text-gray-200 transition-colors" aria-label="Close modal">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Animal:</p>
              <p className="font-medium text-gray-900 line-clamp-2 flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-orange-600" /> {animalName}
              </p>
            </div>

            <div className={`p-4 rounded-lg mb-4 ${
              isApprove ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start space-x-3">
                {isApprove ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                )}
                <div>
                  <p className={`font-medium ${isApprove ? 'text-green-800' : 'text-red-800'}`}>
                    {isApprove ? 'Ready to approve this animal?' : 'Are you sure you want to reject this animal?'}
                  </p>
                  <p className={`text-sm mt-1 ${isApprove ? 'text-green-700' : 'text-red-700'}`}>
                    {isApprove 
                      ? 'This animal will be set as AVAILABLE and shown for adoption.'
                      : 'This animal will be set as REJECT and hidden from listing.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <button onClick={() => setShowMessage(!showMessage)} className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">{showMessage ? 'Hide message' : 'Add a message (optional)'}</span>
              </button>
              {showMessage && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message:</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isApprove ? 'Approved for adoption.' : 'Reason for rejection...'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleClose} variant="outline" className="flex-1" disabled={isLoading}>Cancel</Button>
              <Button
                onClick={handleQuickAction}
                className={`flex-1 ${isApprove ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{isApprove ? 'Approving...' : 'Rejecting...'}</span>
                  </div>
                ) : (
                  `${isApprove ? 'Approve' : 'Reject'} Animal`
                )}
              </Button>
            </div>

            {showMessage && message && (
              <div className="mt-3">
                <Button onClick={handleConfirm} className={`w-full ${isApprove ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{isApprove ? 'Approving...' : 'Rejecting...'}</span>
                    </div>
                  ) : (
                    `${isApprove ? 'Approve' : 'Reject'} with Message`
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


