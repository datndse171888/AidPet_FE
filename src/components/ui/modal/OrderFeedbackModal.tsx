import React, { useEffect, useState } from 'react';

interface OrderFeedbackModalProps {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
  onSaved?: (feedback: OrderFeedback) => void;
}

export interface OrderFeedback {
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const storageKey = (orderId: string) => `orderFeedback:${orderId}`;

export const getSavedOrderFeedback = (orderId: string): OrderFeedback | null => {
  try {
    const raw = localStorage.getItem(storageKey(orderId));
    return raw ? JSON.parse(raw) as OrderFeedback : null;
  } catch {
    return null;
  }
};

export const OrderFeedbackModal: React.FC<OrderFeedbackModalProps> = ({ isOpen, orderId, onClose, onSaved }) => {
  const [rating, setRating] = useState<number>(5);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const existing = getSavedOrderFeedback(orderId);
      if (existing) {
        setRating(existing.rating);
        setComment(existing.comment);
      } else {
        setRating(5);
        setComment('');
      }
    }
  }, [isOpen, orderId]);

  if (!isOpen) return null;

  const save = () => {
    const payload: OrderFeedback = {
      orderId,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(storageKey(orderId), JSON.stringify(payload));
    onSaved?.(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Order Feedback</h3>
          <p className="text-xs text-gray-500 mt-1">Order ID: <span className="font-mono">{orderId.slice(-8)}</span></p>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex items-center space-x-1">
              {[1,2,3,4,5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  className="p-1"
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={(hover || rating) >= star ? '#f59e0b' : 'none'}
                    stroke={(hover || rating) >= star ? '#f59e0b' : '#9ca3af'}
                    className="w-7 h-7 transition-colors"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.2 3.6a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.406 20.537a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.2-3.6a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Chia sẻ trải nghiệm mua hàng của bạn..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
        <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={save}
            className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg"
          >
            Lưu phản hồi
          </button>
        </div>
      </div>
    </div>
  );
};


