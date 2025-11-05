import React, { useState } from 'react';
import { X, Heart, Send, MessageSquare } from 'lucide-react';
import { AnimalResponse } from '../../../types/Animal';
import { Button } from '../Button';

interface AdoptionMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: AnimalResponse | null;
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}

export const AdoptionMessageModal: React.FC<AdoptionMessageModalProps> = ({
  isOpen,
  onClose,
  animal,
  onSubmit,
  isLoading = false
}) => {
  const [message, setMessage] = useState('');
  const [showContent, setShowContent] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setMessage('');
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen || !animal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message.trim());
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const suggestedMessages = [
    "I would love to provide a loving home for this pet. I have experience caring for animals and can provide excellent care.",
    "I'm very interested in adopting this wonderful animal. I have a safe environment and plenty of time to dedicate to their care.",
    "This pet would be a perfect addition to our family. We are committed to providing a lifetime of love and care.",
    "I've been looking for a companion like this. I promise to give them all the love and attention they deserve."
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/50 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto transform transition-all duration-300 ${
          showContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Adoption Request</h2>
                  <p className="text-orange-100 text-sm">Tell us why you want to adopt {animal.name}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="p-6 space-y-6">
              {/* Animal Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <img
                  src={animal.imgUrl}
                  alt={animal.name}
                  className="w-16 h-16 object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=No+Image';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{animal.name}</h3>
                  <p className="text-sm text-gray-600">{animal.breed} • {animal.age} years old</p>
                  <p className="text-sm text-gray-600">{animal.categoryAnimals?.categoryName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Shelter</p>
                  <p className="text-sm font-medium text-gray-900">{animal.shelter?.shelterName}</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Why do you want to adopt {animal.name}?
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please tell the shelter why you would be a great home for this pet. Include information about your living situation, experience with pets, and how you plan to care for them..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    rows={6}
                    required
                    disabled={isLoading}
                    maxLength={1000}
                  />
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>Be specific and genuine in your message</span>
                    <span>{message.length}/1000</span>
                  </div>
                </div>

                {/* Suggested Messages */}
                {message.length === 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Need inspiration? Try one of these:</h4>
                    <div className="space-y-2">
                      {suggestedMessages.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setMessage(suggestion)}
                          disabled={isLoading}
                          className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors disabled:opacity-50"
                        >
                          "{suggestion}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Important Notes */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Important Information:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Your message will be sent directly to the shelter</li>
                    <li>• Please be honest about your living situation and experience</li>
                    <li>• The shelter may contact you for additional information</li>
                    <li>• Adoption approval depends on the shelter's requirements</li>
                  </ul>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
            <div className="flex space-x-4">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!message.trim() || isLoading}
                loading={isLoading}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Adoption Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};