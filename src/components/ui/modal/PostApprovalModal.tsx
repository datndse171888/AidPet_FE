import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, MessageSquare, X } from 'lucide-react';
import { Button } from '../Button';

interface PostApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
  action: 'approve' | 'reject';
  postTitle: string;
  isLoading?: boolean;
}

export const PostApprovalModal: React.FC<PostApprovalModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  postTitle,
  isLoading = false
}) => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const isApprove = action === 'approve';
  const isReject = action === 'reject';

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
      ? 'Post has been approved and is now visible to users.'
      : 'Post has been rejected and will not be published.';
    
    onConfirm(defaultMessage);
    setMessage('');
    setShowMessage(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay with Blur Effect */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm"
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        {/* Modal */}
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all pointer-events-auto">
        {/* Header */}
        <div className={`px-6 py-4 rounded-t-xl ${
          isApprove 
            ? 'bg-gradient-to-r from-green-500 to-green-600' 
            : 'bg-gradient-to-r from-red-500 to-red-600'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isApprove ? (
                <CheckCircle className="h-6 w-6 text-white" />
              ) : (
                <XCircle className="h-6 w-6 text-white" />
              )}
              <h3 className="text-lg font-semibold text-white">
                {isApprove ? 'Approve Post' : 'Reject Post'}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {/* Post Info */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Post Title:</p>
            <p className="font-medium text-gray-900 line-clamp-2">{postTitle}</p>
          </div>

          {/* Action Description */}
          <div className={`p-4 rounded-lg mb-4 ${
            isApprove 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-start space-x-3">
              {isApprove ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div>
                <p className={`font-medium ${
                  isApprove ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isApprove ? 'Ready to approve this post?' : 'Are you sure you want to reject this post?'}
                </p>
                <p className={`text-sm mt-1 ${
                  isApprove ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isApprove 
                    ? 'This post will be published and visible to all users.'
                    : 'This post will be removed and the author will be notified.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Message Option */}
          <div className="mb-4">
            <button
              onClick={() => setShowMessage(!showMessage)}
              className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-medium">
                {showMessage ? 'Hide message' : 'Add a message (optional)'}
              </span>
            </button>
            
            {showMessage && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message to author:
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isApprove 
                      ? 'Great post! It has been approved and is now live...'
                      : 'Thank you for your submission. However, this post needs some adjustments...'
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleQuickAction}
              className={`flex-1 ${
                isApprove 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{isApprove ? 'Approving...' : 'Rejecting...'}</span>
                </div>
              ) : (
                `${isApprove ? 'Approve' : 'Reject'} Post`
              )}
            </Button>
          </div>

          {/* Custom Message Action */}
          {showMessage && message && (
            <div className="mt-3">
              <Button
                onClick={handleConfirm}
                className={`w-full ${
                  isApprove 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
                disabled={isLoading}
              >
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
